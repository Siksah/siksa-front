import axios, {
  type AxiosPromise,
  type AxiosResponse,
  AxiosError,
} from 'axios';

// type ImportMetaEnv = {
//   readonly MODE: 'development' | 'production';
//   readonly VITE_API_BASE_URL: string;
// }

const env = import.meta.env;

export interface RequestServiceArgs {
    serviceId: string;
    data?: Record<string, any>;
    prodUrlIsTrue?: boolean;
}

// AxiosPromise의 제네릭 T는 응답 데이터의 타입이 됩니다.
// requestService가 반환하는 Promise는 T 타입의 응답 데이터를 포함하는 AxiosResponse를 resolve합니다.
// 하지만 serviceId가 없을 경우 ServiceRejectError를 reject합니다.
type ServiceRequestResult<T> = AxiosPromise<T>;

export class CommonService {
  /**
   * 서버 요청 URL을 리턴
   * @param command, prodUrlIsTrue - API 커맨드 (예: 'login', 'users'), local에서 prodUrl을 사용시 false로 전송
   * @returns 완전한 서버 요청 URL
   */
  getRequestUrl(command: string, prodUrlIsTrue?: boolean): string {

    // console.log('command', command);
    // console.log('Server Mode', env.MODE);

    const isProdUrl = prodUrlIsTrue === true;
    
    const serverUrl = (env.MODE === 'production' || isProdUrl)
        ? env.VITE_API_BASE_URL // 배포 주소
        : 'http://localhost:3001/api' // local 주소
        ;
    
    // serverUrl이 null, undefined이거나, 공백 문자열인 경우
    if (!serverUrl || serverUrl.trim() === '') {
      throw new Error(
        '🚨 Error: 서버 요청 URL이 유효하지 않습니다. ' +
          '(BASE_URL 값이 설정되었는지 확인하세요. 현재 값: ' +
          `"${serverUrl}"` +
          ')'
      );
    }

    const safeBase = serverUrl.replace(/\/$/, '');
    const safeCommand = command.replace(/^\//, '');
    // console.log('Url', `${safeBase}/${safeCommand}`);
    return `${safeBase}/${safeCommand}`;
  }

  /**
   * 값이 비어있는지 확인
   * @param value 검사할 값
   * @returns 값이 비어 있으면 true, 값이 존재하면 false
   */
  isEmpty(value: unknown): boolean {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === 'string') {
      return value.trim() === '';
    }

    if (typeof value === 'number') {
      return Number.isNaN(value);
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    if (typeof value === 'object') {
      return Object.keys(value as object).length === 0;
    }

    return false;
  }

  /**
   * API 서버로 POST 요청
   * @param reqSvc, prodUrlIsTrue - { serviceId: API 커맨드, data: 요청 본문 데이터 }
   * @param prodUrlIsTrue - local 환경에서 true를 전달하면 상용 URL, 생략하거나 false면 로컬 URL 사용
   * @returns Axios Promise(성공 시 AxiosResponse<T>, 실패 시 AxiosError 또는 ServiceRejectError)
   */
  requestService<T = any>(
    reqSvc: RequestServiceArgs,
    prodUrlIsTrue: boolean = false
  ): ServiceRequestResult<T> {

    if(!reqSvc || !reqSvc.serviceId) {
      const errorStub = new AxiosError('서비스 ID가 없습니다.', '-20001');
      return Promise.reject(errorStub);
    }

    const { serviceId: command, data = {} } = reqSvc;

    // 인자가 없거나 false면 false, 오직 true일 때만 true가 됩니다.
    const finalProdUrl = prodUrlIsTrue === true;

    const finalData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    console.log('finalData', finalData);

    const url = this.getRequestUrl(command, finalProdUrl);
    console.log('requestService url', url);

    try {
      // axios.post 호출은 Promise를 반환
      return axios.post<T>(url, finalData, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(`🚨 [${command}] API 호출 중 공통 오류 발생:`, error);

      // 에러를 일관된 형태로 변환하여 반환
      if (axios.isAxiosError(error)) {
        // Axios 에러인 경우, 그대로 reject 하거나 커스텀 처리
        return Promise.reject(error);
      } else if (error instanceof Error) {
        // 네트워크 오류 등 일반 JavaScript Error인 경우
        const errorMessage =
          '알 수 없는 API 오류가 발생했습니다: ' + (error as Error).message;

        const mockResponse: AxiosResponse = {
          data: {
            message:
              (error as Error).message || '알 수 없는 클라이언트 측 오류',
          },
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

  // session 생성
  createAnonymousSession = async () => {
    // sessionStorage에 세션 ID가 있는지 확인
    const savedSessionId = sessionStorage.getItem('anon_session_id');
    console.log('createAnonymousSession savedSessionId:', savedSessionId);

    if (!this.isEmpty(savedSessionId)) {
      console.log('기존 탭 세션 유지:', savedSessionId);
      return { sessionId: savedSessionId };
    }

    try {
      // 세션이 없으면(새 탭) 서버에서 새로 생성
      const response = await axios.post(
        this.getRequestUrl('session/create'),
        {},
        { withCredentials: true } // CORS 허용을 위해 필수
      );
      console.log('createResponse', response);
      
      const sessionId = response.data.data.sessionId;

      // sessionStorage에 저장 (탭 닫으면 자동 삭제됨)
      sessionStorage.setItem('anon_session_id', sessionId);

      return response.data;
    } catch (error) {
      console.error('🚨 익명 세션 생성 실패:', error);
      throw error;
    }

  }

  /**
   * 기기 정보 및 환경 정보를 수집하여 반환
   */
  getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(userAgent);
    
    return {
      os: this.getOS(),
      browser: this.getBrowser(userAgent), // 브라우저 감별 로직 추가
      isMobile: isMobile,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`, // 실제 가시 영역 추가
      language: navigator.language,
      userAgent: userAgent // 분석용 원본 데이터 포함
    };
  };

  /**
   * navigator.platform 대신 userAgent를 분석하여 OS 정보 반환
   */
  getOS = () => {
    // 1. 최신 브라우저 대응 (userAgentData)
    // @ts-ignore: userAgentData는 최신 표준이라 타입 정의가 없을 수 있음
    const userAgentData = navigator.userAgentData;
    if (userAgentData?.platform) {
      return userAgentData.platform;
    }

    // 2. userAgent 문자열 기반 정밀 분석
    const ua = navigator.userAgent;
    
    if (/android/i.test(ua)) return "Android";
    if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
    if (/Win/i.test(ua)) return "Windows";
    if (/Mac/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";
    
    return "Unknown OS";
  };

  /**
   * 브라우저 종류를 판별하는 보조 메서드
   */
  private getBrowser = (ua: string) => {
    if (ua.indexOf("Kakaotalk") !== -1) return "Kakaotalk"; // 인앱 브라우저 체크
    if (ua.indexOf("SamsungBrowser") !== -1) return "Samsung Browser";
    if (ua.indexOf("Chrome") !== -1 && ua.indexOf("Edg") === -1) return "Chrome";
    if (ua.indexOf("Edg") !== -1) return "Edge";
    if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) return "Safari";
    if (ua.indexOf("Firefox") !== -1) return "Firefox";
    return "Other";
  };

}
