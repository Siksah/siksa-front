import { useState, useCallback } from 'react';
import { CommonService } from '../comm/common.service'; // 경로에 맞춰 수정

const commonService = new CommonService();

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(
    // 초기값으로 이미 저장된 세션이 있다면 가져옴
    sessionStorage.getItem('anon_session_id')
  );
  const oldsessionId = sessionStorage.getItem('anon_session_id');
  console.log('sessionId', sessionId);
  console.log('oldsessionId', oldsessionId);
  const createSession = useCallback(async () => {
    try {
      // 이미 세션이 있으면 새로 만들지 않음 (기존 요구사항 유지)
      if (sessionId || sessionStorage.getItem('anon_session_id')) {
        console.log('이미 세션이 존재합니다.');
        return;
      }

      const data = await commonService.createAnonymousSession();
      if (data && data.data.sessionId) {
        setSessionId(data.data.sessionId);
        console.log('세션 생성 완료:', data.data.sessionId);
      }
    } catch (err) {
      console.error('세션 생성 중 오류 발생:', err);
    }
  }, [sessionId]);

  return { sessionId, createSession };
};
