# 1. 빌드 단계 (Build Stage)
# React 앱을 빌드하기 위해 Node 환경을 사용합니다.
FROM node:lts-alpine as builder

# compose 파일에서 전달받는 빌드 아규먼트 (API URL)
ARG VITE_API_BASE_URL

WORKDIR /app

# 프로젝트 루트 디렉토리에서 siksa-front 폴더의 내용을 복사합니다.
# Docker Compose의 context가 "."(루트)이므로, siksa-front 폴더 내부 내용만 복사해야 합니다.
COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \ 
    npm ci

# 나머지 React 소스 코드 복사
COPY . .

# React 빌드 명령어를 실행합니다.
# 빌드 결과물(정적 파일)은 보통 /app/dist 또는 /app/build 폴더에 생성됩니다.
RUN VITE_API_BASE_URL=${VITE_API_BASE_URL} npm run build

# ----------------------------------------------------

# 2. 프로덕션 단계 (Production Stage)
# 가볍고 안전한 Nginx 이미지를 사용하여 정적 파일을 호스팅합니다.
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

# Nginx 설정 파일을 이미지 내부로 복사합니다.
# 빌드 컨텍스트의 경로에 맞춰 정확히 지정합니다.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# 🌟 핵심: 빌더 스테이지에서 생성된 React 정적 파일을 Nginx의 루트 디렉토리로 복사합니다.
# 이 단계가 호스트의 파일 권한 문제를 근본적으로 해결해줍니다.
# 'builder' 스테이지가 존재하고, 빌드 결과물이 /app/dist 에 있다고 가정합니다.
COPY --from=builder /app/dist/ /usr/share/nginx/html 

# 🚨 Nginx Worker Process가 복사된 파일을 읽을 수 있도록 권한을 설정합니다.
RUN chown -R nginx:nginx /usr/share/nginx/html

# Nginx가 기본 포트 80으로 실행됩니다.
EXPOSE 80

# Nginx 시작 명령어
CMD ["nginx", "-g", "daemon off;"]

# React 앱을 프로덕션용으로 빌드합니다.
# 빌드 결과물은 보통 'build' 또는 'dist' 폴더에 생성됩니다.
# 🚨 만약 Vite를 사용한다면 'npm run build' 후 생성되는 폴더가 'dist'일 수 있으니 확인이 필요합니다.
#RUN VITE_API_BASE_URL=${VITE_API_BASE_URL} npm run build
