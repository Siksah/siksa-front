import React, { useState, useRef } from 'react';
import './App.css'
import axios from 'axios';

import mainImage from './assets/main.png';
import q1Image from './assets/q1.png';
import q2Image from './assets/q2.png';
import q6Image from './assets/q6.png';
import a1Image from './assets/a1.png';
import a2Image from './assets/a2.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://fallback.api'; 

// ====================================================================
// 💡 TypeScript 인터페이스 정의
// ====================================================================
interface AreaConfig {
    id: string;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    value: string;
    nextPage: string;
}

interface PageConfigItem {
    image: string;
    questionKey: string | null;
    areas: AreaConfig[];
}

type PageKey = 'MAIN' | 'Q1' | 'Q2' | 'Q6' | 'A1' | 'A2' | 'SAVING' | 'COMPLETE';

// 1. 기준 해상도 정의
var REFERENCE_WIDTH = 447.53125; 
var REFERENCE_HEIGHT = 919;

// 2. 모든 페이지 설정 및 클릭 영역 정의
// const PAGE_CONFIG: { [key: string]: any } = {
const PAGE_CONFIG: Record<PageKey, PageConfigItem> = {
  // 💡 초기 시작 페이지: main
  'MAIN': {
      image: mainImage,
      questionKey: null, // 데이터 수집 없음
      areas: [
          // '시작' 버튼 영역 정의 (좌표는 1920x1080 기준 픽셀 값)
          { id: 'start', xMin: 800, xMax: 1100, yMin: 700, yMax: 760, value: 'START', nextPage: 'Q1' },
      ],
  },
  'Q1': {
      image: q1Image,
      questionKey: 'Q1', // 응답을 저장할 키
      areas: [
          { id: 'q1_opt_a', xMin: 780, xMax: 1125, yMin: 320, yMax: 455, value: 'Option_A', nextPage: 'Q2' },
          { id: 'q1_opt_b', xMin: 780, xMax: 1125, yMin: 470, yMax: 605, value: 'Option_B', nextPage: 'Q2' },
          { id: 'q1_opt_c', xMin: 780, xMax: 1125, yMin: 620, yMax: 760, value: 'Option_C', nextPage: 'Q2' },
      ],
  },
  'Q2': {
      image: q2Image,
      questionKey: 'Q2',
      areas: [
          { id: 'q2_opt_a', xMin: 790, xMax: 1130, yMin: 310, yMax: 390, value: 'Option_A', nextPage: 'Q6' },
          { id: 'q2_opt_b', xMin: 790, xMax: 1130, yMin: 405, yMax: 482, value: 'Option_B', nextPage: 'Q6' },
          { id: 'q2_opt_c', xMin: 790, xMax: 1130, yMin: 493, yMax: 571, value: 'Option_C', nextPage: 'Q6' },
          { id: 'q2_opt_d', xMin: 790, xMax: 1130, yMin: 582, yMax: 661, value: 'Option_D', nextPage: 'Q6' },
          { id: 'q2_opt_e', xMin: 790, xMax: 1130, yMin: 673, yMax: 751, value: 'Option_E', nextPage: 'Q6' },
      ],
  },
  'Q6': {
      image: q6Image,
      questionKey: 'Q6',
      areas: [
          { id: 'area_a', xMin: 791, xMax: 899, yMin: 336, yMax: 444, value: 'Option_A', nextPage: 'A1' },
          { id: 'area_b', xMin: 906, xMax: 1014, yMin: 336, yMax: 444, value: 'Option_B', nextPage: 'A2' },
          { id: 'area_c', xMin: 1020, xMax: 1126, yMin: 336, yMax: 444, value: 'Option_C', nextPage: 'A1' },
          { id: 'area_d', xMin: 791, xMax: 899, yMin: 454, yMax: 561, value: 'Option_D', nextPage: 'A2' },
          { id: 'area_e', xMin: 906, xMax: 1014, yMin: 454, yMax: 561, value: 'Option_E', nextPage: 'A1' },
          { id: 'area_f', xMin: 1020, xMax: 1126, yMin: 454, yMax: 561, value: 'Option_F', nextPage: 'A2' },
          { id: 'area_g', xMin: 791, xMax: 899, yMin: 572, yMax: 678, value: 'Option_G', nextPage: 'A1' },
          { id: 'area_h', xMin: 906, xMax: 1014, yMin: 572, yMax: 678, value: 'Option_H', nextPage: 'A2' },
          { id: 'area_i', xMin: 1020, xMax: 1126, yMin: 572, yMax: 678, value: 'Option_I', nextPage: 'A1' },
          { id: 'area_j', xMin: 791, xMax: 899, yMin: 689, yMax: 794, value: 'Option_J', nextPage: 'A2' },
          { id: 'area_k', xMin: 906, xMax: 1014, yMin: 689, yMax: 794, value: 'Option_K', nextPage: 'A1' },
          { id: 'area_l', xMin: 1020, xMax: 1126, yMin: 689, yMax: 794, value: 'Option_L', nextPage: 'A2' },
      ],
  },
  'A1': {
      image: a1Image,
      questionKey: 'Result_Type',
      areas: [
          { id: 'restart', xMin: 793, xMax: 955, yMin: 700, yMax: 755, value: 'RESULT_A1', nextPage: 'Q1' },
          { id: 'save', xMin: 965, xMax: 1130, yMin: 700, yMax: 755, value: 'RESULT_A2', nextPage: 'SAVING' },
      ],
  },
  'A2': {
      image: a2Image,
      questionKey: 'Result_Type',
      areas: [
          { id: 'restart', xMin: 793, xMax: 955, yMin: 700, yMax: 755, value: 'RESULT_A1', nextPage: 'Q1' },
          { id: 'save', xMin: 965, xMax: 1130, yMin: 700, yMax: 755, value: 'RESULT_A2', nextPage: 'SAVING' },
      ],
  },
  'SAVING': { image: "https://placehold.co/1920x1080/673AB7/FFFFFF?text=SAVING+DATA...", questionKey: null, areas: [] },
  'COMPLETE': { image: "https://placehold.co/1920x1080/000000/FFFFFF?text=COMPLETE!", questionKey: null, areas: [] },
};

// 3. 더미 DB 저장 함수 (실제 MongoDB API 호출로 대체 필요)
const saveToDatabase = async (dataToSave: Record<string, string>, setCurrentPage: (page: PageKey) => void) => {
    setCurrentPage('SAVING'); // 저장 중 상태로 전환

    // 💡 실제 백엔드 API 엔드포인트 URL로 변경해야 합니다.
    const API_URL = `${API_BASE_URL}/answer`;
    
    // 최종적으로 서버에 보낼 데이터 (필요하다면 userId도 추가)
    const finalData = {
        ...dataToSave,
        timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(API_URL, finalData);
        
        // 🚨 시뮬레이션: 2초 지연 후 성공 처리
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('✅ 데이터 MongoDB (시뮬레이션) 성공적으로 저장됨:', dataToSave);
        
        setCurrentPage('COMPLETE'); // 저장 성공 시 완료 페이지로 이동
    } catch (error) {
        console.error('🚨 데이터 저장 중 오류 발생:', error);
        alert('데이터 저장에 실패했습니다. (서버 연결 확인 필요)');
        setCurrentPage('A1'); // 실패 시 결과 페이지로 돌아가기
    }
};

function App() {
  // 4. 상태 및 Ref 정의
  const containerRef = useRef<HTMLDivElement>(null);; // DOM 요소에 접근하기 위한 ref
  const [currentPage, setCurrentPage] = useState('MAIN');
  const [responses, setResponses] = useState({}); 

  // 현재 페이지 설정
  const currentConfig = PAGE_CONFIG[currentPage as PageKey];
  
  // 5. 클릭 핸들러: 핵심 로직
  const handleAppClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (!currentConfig || !currentConfig.areas || currentConfig.areas.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentWidth = rect.width;
    const currentHeight = rect.height;
    console.log(`- 비율 확인: currentWidth :${currentWidth} currentHeight : ${currentHeight}`);
    // X/Y 비율 계산 (반응형 비율)
    const scaleFactorX = currentWidth / REFERENCE_WIDTH;
    const scaleFactorY = currentHeight / REFERENCE_HEIGHT;
    console.log(`- 비율 확인: scaleFactorX :${scaleFactorX} scaleFactorY : ${scaleFactorY}`);

    // 마우스가 클릭한 브라우저 화면 기준의 좌표
    const clickX = e.clientX; 
    const clickY = e.clientY;

    // console.log(`✅ [${currentPage}] 값 X ${clickX} 클릭됨. 값Y: ${clickY}`);
    // 현재 페이지의 모든 클릭 영역을 순회하며 검사
    for (const area of currentConfig.areas) {
        
        // 비례 축소된 클릭 영역의 경계 계산
        const targetXMinScaled = area.xMin * scaleFactorX;
        const targetXMaxScaled = area.xMax * scaleFactorX;
        const targetYMinScaled = area.yMin * scaleFactorY;
        const targetYMaxScaled = area.yMax * scaleFactorY;

        // 💡 상대 좌표(relativeX/Y)가 스케일링된 영역 내에 있는지 확인
        const isInside = (
            clickX >= targetXMinScaled &&
            clickX <= targetXMaxScaled &&
            clickY >= targetYMinScaled &&
            clickY <= targetYMaxScaled
        );

        if (isInside) {
            // 1. 응답 데이터 누적
            console.log(`- 응답 저장: ${currentConfig.questionKey} = ${area.value}`);
            if (currentConfig.questionKey) {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [currentConfig.questionKey as string]: area.value 
                }));
                console.log(`- 응답 저장: ${currentConfig.questionKey} = ${area.value}`);
            }
            
            // 2. 페이지 이동 또는 DB 저장 처리
            if (area.nextPage === 'SAVING') {
                saveToDatabase(responses, setCurrentPage); 
            } else {
                setCurrentPage(area.nextPage); 
            }
            
            if (currentConfig.questionKey === null) {
              REFERENCE_WIDTH = 374.84375; 
            }
            return; // 클릭 처리 완료 후 함수 종료
        }
    }
    console.log(`- 빈 영역 클릭됨. 상대 좌표: (${clickX.toFixed(2)}, ${clickY.toFixed(2)})`);
    
  };

  // 6. 스타일 정의
  const appStyle: React.CSSProperties = {
    backgroundImage: `url(${currentConfig.image})`, // 임포트한 이미지 사용
    backgroundSize: 'auto', // 배경 이미지가 요소를 꽉 채우도록 조절
    backgroundPosition: 'center', // 이미지 중앙을 기준으로 배치
    backgroundAttachment: 'fixed', // 스크롤해도 배경 이미지는 고정
    minHeight: '100vh', // 화면 전체 높이를 차지하도록 설정
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer', // 클릭 가능한 영역임을 시각적으로 나타냄
  };

  return (
    <div className="App"
         style={appStyle}
         ref={containerRef}
         onClick={handleAppClick} >
      
      <div>
          <h1>현재 페이지: {currentPage}</h1>
          <pre>
              응답 데이터: {JSON.stringify(responses, null, 2)}
          </pre>
      </div>

    </div>
  )
}

export default App
