import axios, { type AxiosPromise, type AxiosResponse, AxiosError } from 'axios';

// type ImportMetaEnv = {
//   readonly MODE: 'development' | 'production';
//   readonly VITE_API_BASE_URL: string;
// }

const env = import.meta.env;

export interface RequestServiceArgs {
    serviceId: string;
    data: Record<string, any>;
    devUrlIsTrue?: boolean;
}

// AxiosPromise의 제네릭 T는 응답 데이터의 타입이 됩니다.
// requestService가 반환하는 Promise는 T 타입의 응답 데이터를 포함하는 AxiosResponse를 resolve합니다.
// 하지만 serviceId가 없을 경우 ServiceRejectError를 reject합니다.
type ServiceRequestResult<T> = AxiosPromise<T>;

export class CommonService {

  /**
   * 서버 요청 URL을 리턴
   * @param command, devUrlIsTrue - API 커맨드 (예: 'login', 'users')
   * @returns 완전한 서버 요청 URL
   */
  getRequestUrl(command: string, devUrlIsTrue?: boolean): string {

    console.log('command', command);
    console.log('devUrlIsTrue', devUrlIsTrue);
    console.log('Server Mode', env.MODE);
    
    const serverUrl = (env.MODE === 'production' || !devUrlIsTrue) // 개발 모드
        ? env.VITE_API_BASE_URL
        : 'http://localhost:3001';
    
    // serverUrl이 null, undefined이거나, 공백 문자열인 경우
    if (!serverUrl || serverUrl.trim() === '') {
        throw new Error(
            '🚨 Error: 서버 요청 URL이 유효하지 않습니다. ' +
            '(BASE_URL 값이 설정되었는지 확인하세요. 현재 값: ' + 
            `"${serverUrl}"` + ')'
        );
    }

    const safeBase = serverUrl.replace(/\/$/, '');
    const safeCommand = command.replace(/^\//, '');

    return `${safeBase}/${safeCommand}`;
  }

  /**
   * API 서버로 POST 요청
   * @param reqSvc - { serviceId: API 커맨드, data: 요청 본문 데이터 }
   * @returns Axios Promise(성공 시 AxiosResponse<T>, 실패 시 AxiosError 또는 ServiceRejectError)
   */
  requestService<T = any>(reqSvc: RequestServiceArgs): ServiceRequestResult<T> {
    if(!reqSvc || !reqSvc.serviceId) {
      const errorStub = new AxiosError('서비스 ID가 없습니다.', '-20001');
      return Promise.reject(errorStub);
    }

    const { serviceId: command, data, devUrlIsTrue = true } = reqSvc;

    const finalData = {
        ...data,
        timestamp: new Date().toISOString(),
    };

    const url = this.getRequestUrl(command, devUrlIsTrue);

    try {
        // axios.post 호출은 Promise를 반환
        return axios.post<T>(url, finalData); 
    } catch (error) {
        console.error(`🚨 [${command}] API 호출 중 공통 오류 발생:`, error);
        
        // 에러를 일관된 형태로 변환하여 반환
        if (axios.isAxiosError(error)) {
            // Axios 에러인 경우, 그대로 reject 하거나 커스텀 처리
            return Promise.reject(error);
        } else if (error instanceof Error) {
            // 네트워크 오류 등 일반 JavaScript Error인 경우
            const errorMessage = '알 수 없는 API 오류가 발생했습니다: ' + (error as Error).message;

            const mockResponse: AxiosResponse = {
              data: { message: (error as Error).message || '알 수 없는 클라이언트 측 오류' },
              status: 500, // 서버에 연결되지 않은 상태지만 500으로 모킹
              statusText: 'Client-side Unknown Error',
              headers: {},
              config: undefined as any, // AxiosRequestConfig는 타입 단언이 필요할 수 있습니다.
              request: undefined,
            };

            const unknownError = new AxiosError(
                errorMessage, 
                'E_UNKNOWN_CLIENT_ERROR', // 커스텀 오류 코드
                undefined, 
                undefined, 
                mockResponse
            );

          return Promise.reject(unknownError);
        }
        throw error;
    }
  }

  createAnonymousSession = async () => {
    try {
      const response = await axios.post(
        this.getRequestUrl('session/create'),
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.error('🚨 익명 세션 생성 실패:', error);
      throw error;
    }

  }
}