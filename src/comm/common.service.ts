const env = import.meta.env;

export class CommonService {

  // 서버 요청 url 리턴
  getRequestUrl(command: string) {

    const serverUrl = (env.MODE === 'production') ? 'http://localhost:3001' : env.VITE_API_BASE_URL;
    const url = serverUrl + '/' + command;

    return url;
  }

  requestService(reqSvc: { serviceId: any; }) {
    if(reqSvc) {
      return alert('');
    }
    const command = reqSvc.serviceId;

    const finalData = {
            ...dataToSave,
            timestamp: new Date().toISOString(),
        };

    const url = this.getRequestUrl(command);

    return axios.post(ANSWER_API_URL, finalData);
  }
}