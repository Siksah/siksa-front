# 1. 빌드 스테이지 (builder): Node.js 환경에서 React 앱을 빌드합니다.
# Node.js LTS 버전의 Alpine 리눅스 이미지를 사용하여 가볍게 빌드합니다.
FROM node:lts-alpine as builder

# 💡 수정: Docker Compose로부터 API_BASE_URL 값을 받기 위한 ARG 정의
ARG VITE_API_BASE_URL

# 컨테이너 내부의 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# package.json 및 package-lock.json 파일을 복사하고 의존성 설치를 진행합니다.
# 이 단계가 별도의 레이어로 캐시되어 빌드 속도를 높입니다.
COPY package.json ./
RUN npm install

# 모든 소스 파일 복사 (src, public 등)
COPY . .

# React 앱을 프로덕션용으로 빌드합니다.
# 빌드 결과물은 보통 'build' 또는 'dist' 폴더에 생성됩니다.
# 🚨 만약 Vite를 사용한다면 'npm run build' 후 생성되는 폴더가 'dist'일 수 있으니 확인이 필요합니다.
RUN VITE_API_BASE_URL=${VITE_API_BASE_URL} npm run build

# 2. 호스팅 스테이지: 빌드된 결과물을 Nginx 서버에 담아 서비스합니다.
# 가볍고 보안에 강한 Nginx Alpine 이미지를 사용합니다.
FROM nginx:alpine

# Nginx 설정 파일 복사
# VM의 'siksa-front/nginx/default.conf' 파일이 컨테이너 내부의 설정 파일로 복사됩니다.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 빌드 스테이지(builder)에서 생성된 정적 파일(dist 폴더 내용)을 
# Nginx의 기본 웹 루트(/usr/share/nginx/html)로 복사합니다.
COPY --from=builder /app/dist /usr/share/nginx/html

# 컨테이너 시작 시 Nginx 서버를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]