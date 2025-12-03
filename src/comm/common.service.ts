import axios, { type AxiosPromise, type AxiosResponse, AxiosError } from 'axios';


interface ImportMetaEnv {
  readonly MODE: 'development' | 'production';
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const env = import.meta.env;

interface RequestServiceArgs {
    serviceId: string;
    data: Record<string, any>;
    devUrlIsTrue?: boolean;
}

interface CustomServiceError {
  errorCode: string;
  errorMessage: string;
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
  getRequestUrl(command: string, devUrlIsTrue: boolean): string {

    const serverUrl = (env.MODE === 'production' || !devUrlIsTrue) // 개발 모드
        ? env.VITE_API_BASE_URL
        : 'http://localhost:3001';
    
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

    return axios.post<T>(url, finalData);
  }
}