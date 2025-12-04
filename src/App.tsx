import React, { useState, useRef, useEffect } from 'react';
import { CommonService } from './comm/common.service';
import './App.css'

import mainImage from './assets/main.png';
import Q1Image from './assets/Q1.png';
import Q2Image from './assets/Q2.png';
import Q3Image from './assets/Q3.png';
import Q4Image from './assets/Q4.png';
import Q5Image from './assets/Q5.png';
import Q6Image from './assets/Q6.png';
import result_soba from './assets/result_soba.png';
import result_don from './assets/result_don.png';
import result_don2 from './assets/result_don2.png';
import result_don3 from './assets/result_don3.png';
import loading from './assets/loading.png';

// 💡 Kakao Map을 위한 타입 선언 (TS 에러 방지)
declare global {
  interface Window {
    kakao: any;
  }
}

const commonService = new CommonService();

// ====================================================================
// 💡 TypeScript 인터페이스 정의
// ====================================================================
type AreaValue = Record<string, any>;

interface AreaConfig {
    id: string;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    value: AreaValue;
    nextPage: PageKey;
}

interface PageConfigItem {
    image: string;
    questionKey: string | null;
    areas: AreaConfig[];
}

type PageKey = 'MAIN' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5' | 'Q6' | 'RS' | 'RD' | 'RD2' | 'RD3' | 'SAVING'| 'COMPLETE';

// 검색 결과를 위한 최소한의 타입
type PlaceResult = {
    x: string;
    y: string;
    place_name: string;
};

// 기준 해상도 정의
let REFERENCE_WIDTH = 447.53125; 
let REFERENCE_HEIGHT = 919;

// 모든 페이지 설정 및 클릭 영역 정의
const PAGE_CONFIG: Record<PageKey, PageConfigItem> = {
  'MAIN': {
      image: mainImage,
      questionKey: null, // 데이터 수집 없음
      areas: [
          { id: 'start', xMin: 800, xMax: 1100, yMin: 700, yMax: 760, value: { action: 'START' }, nextPage: 'Q1' },
      ],
  },
  'Q1': {
      image: Q1Image,
      questionKey: 'Q1', // 응답을 저장할 키
      areas: [
          { id: 'q1_opt_a', xMin: 790, xMax: 1125, yMin: 315, yMax: 452, value: { party_size: "solo", shareable_ok: false }, nextPage: 'Q2' },
          { id: 'q1_opt_b', xMin: 790, xMax: 1125, yMin: 464, yMax: 603, value: { party_size: "duo", shareable_ok: true }, nextPage: 'Q2' },
          { id: 'q1_opt_c', xMin: 790, xMax: 1125, yMin: 614, yMax: 754, value: { party_size: "group3p", shareable_ok: true }, nextPage: 'Q2' },
      ],
  },
  'Q2': {
      image: Q2Image,
      questionKey: 'Q2',
      areas: [
          { id: 'previous', xMin: 795, xMax: 815, yMin: 115, yMax: 135, value: { action: 'previous' }, nextPage: 'Q1' },
          { id: 'q2_opt_a', xMin: 790, xMax: 1127, yMin: 314, yMax: 394, value: { craving: "hearty", satiety_target: "high" }, nextPage: 'Q3' },
          { id: 'q2_opt_b', xMin: 790, xMax: 1127, yMin: 405, yMax: 485, value: { craving: "light", satiety_target: "low" }, nextPage: 'Q3' },
          { id: 'q2_opt_c', xMin: 790, xMax: 1127, yMin: 494, yMax: 573, value: { craving: "spicy" }, nextPage: 'Q3' },
          { id: 'q2_opt_d', xMin: 790, xMax: 1127, yMin: 583, yMax: 663, value: { craving: "sweet" }, nextPage: 'Q3' },
          { id: 'q2_opt_e', xMin: 790, xMax: 1127, yMin: 673, yMax: 753, value: { craving: ["no_appetite", "aromatic", "refreshing"], satiety_target: "low" }, nextPage: 'Q3' },
      ],
  },
  'Q3': {
      image: Q3Image,
      questionKey: 'Q3',
      areas: [
          { id: 'previous', xMin: 795, xMax: 815, yMin: 115, yMax: 135, value: { action: 'previous' }, nextPage: 'Q2' },
          { id: 'q3_opt_a', xMin: 790, xMax: 953, yMin: 314, yMax: 527, value: { texture: "soft", soft_hint_brothy: "true", soft_hint_saucy: "true" }, nextPage: 'Q4' },
          { id: 'q3_opt_b', xMin: 965, xMax: 1125, yMin: 314, yMax: 527, value: { texture: "chewy", satiety_target: "low" }, nextPage: 'Q4' },
          { id: 'q3_opt_c', xMin: 790, xMax: 953, yMin: 540, yMax: 754, value: { texture: "crispy" }, nextPage: 'Q4' },
          { id: 'q3_opt_d', xMin: 965, xMax: 1125, yMin: 540, yMax: 754, value: { texture: "any" }, nextPage: 'Q4' },
      ],
  },
  'Q4': {
      image: Q4Image,
      questionKey: 'Q4',
      areas: [
          { id: 'previous', xMin: 795, xMax: 815, yMin: 115, yMax: 135, value: { action: 'previous' }, nextPage: 'Q3' },
          { id: 'q4_opt_a', xMin: 790, xMax: 1127, yMin: 332, yMax: 529, value: { temp_pref: "cold" }, nextPage: 'Q5' },
          { id: 'q4_opt_b', xMin: 790, xMax: 1127, yMin: 539, yMax: 733, value: { temp_pref: "warmPlate" }, nextPage: 'Q5' },
      ],
  },
  'Q5': {
      image: Q5Image,
      questionKey: 'Q5',
      areas: [
          { id: 'previous', xMin: 795, xMax: 815, yMin: 115, yMax: 135, value: { action: 'previous' }, nextPage: 'Q4' },
          { id: 'q5_opt_a', xMin: 790, xMax: 955, yMin: 335, yMax: 460, value: { avoid : "greasy_fried" }, nextPage: 'Q6' },
          { id: 'q5_opt_b', xMin: 965, xMax: 1127, yMin: 335, yMax: 460, value: { avoid: "soupy_rice_stew" }, nextPage: 'Q6' },
          { id: 'q5_opt_c', xMin: 790, xMax: 955, yMin: 470, yMax: 595, value: { avoid: "wheat" }, nextPage: 'Q6' },
          { id: 'q5_opt_d', xMin: 965, xMax: 1127, yMin: 470, yMax: 595, value: { avoid: "seafood_raw" }, nextPage: 'Q6' },
          { id: 'q5_opt_e', xMin: 790, xMax: 955, yMin: 605, yMax: 730, value: { avoid: "salad_raw&vegies" }, nextPage: 'Q6' },
          { id: 'q5_opt_f', xMin: 965, xMax: 1127, yMin: 605, yMax: 730, value: { avoid: "none" }, nextPage: 'Q6' },
      ],
  },
  'Q6': {
      image: Q6Image,
      questionKey: 'Q6',
      areas: [
          { id: 'previous', xMin: 795, xMax: 815, yMin: 115, yMax: 135, value: { action: 'previous' }, nextPage: 'Q5' },
          { id: 'q6_opt_a', xMin: 790, xMax: 1127, yMin: 314, yMax: 453, value: { aftermeal: "back_to_work", time_budget: "little" }, nextPage: 'RS' },
          { id: 'q6_opt_b', xMin: 790, xMax: 1127, yMin: 463, yMax: 602, value: { aftermeal: "coffee_break", time_budget: "normal" }, nextPage: 'RD' },
          { id: 'q6_opt_c', xMin: 790, xMax: 1127, yMin: 614, yMax: 753, value: { aftermeal: "long_chat", time_budget: "plenty", shareable_ok: true }, nextPage: 'RD2' },
      ],
  },
  'RS': {
      image: result_soba,
      questionKey: 'RS',
      areas: [
          { id: 'restart', xMin: 793, xMax: 955, yMin: 725, yMax: 755, value: { action: 'RESULT_A1' }, nextPage: 'Q1' },
          { id: 'save', xMin: 965, xMax: 1127, yMin: 725, yMax: 755, value: { action: 'RESULT_A2' }, nextPage: 'SAVING' },
      ],
  },
  'RD': {
      image: result_don,
      questionKey: 'RD',
      areas: [
          { id: 'restart', xMin: 793, xMax: 955, yMin: 725, yMax: 755, value: { action: 'RESULT_A1' }, nextPage: 'Q1' },
          { id: 'save', xMin: 965, xMax: 1127, yMin: 725, yMax: 755, value: { action: 'RESULT_A2' }, nextPage: 'SAVING' },
      ],
  },
  'RD2': {
      image: result_don2,
      questionKey: 'RD2',
      areas: [
          { id: 'restart', xMin: 793, xMax: 955, yMin: 725, yMax: 755, value: { action: 'RESULT_A1' }, nextPage: 'Q1' },
          { id: 'save', xMin: 965, xMax: 1127, yMin: 725, yMax: 755, value: { action: 'RESULT_A2' }, nextPage: 'SAVING' },
      ],
  },
  'RD3': {
      image: result_don3,
      questionKey: 'RD3',
      areas: [
          { id: 'restart', xMin: 793, xMax: 955, yMin: 725, yMax: 755, value: { action: 'RESULT_A1' }, nextPage: 'Q1' },
          { id: 'save', xMin: 965, xMax: 1127, yMin: 725, yMax: 755, value: { action: 'RESULT_A2' }, nextPage: 'SAVING' },
      ],
  },
  'SAVING': { image: loading, questionKey: null, areas: [] },
  'COMPLETE': { image: "", questionKey: null, areas: [] },
};

// DB 저장 및 키워드 추천 함수
const saveToDatabase = async (
    dataToSave: Record<string, any>,
    setCurrentPage: (page: PageKey) => void,
    setSearchKeyword: (keyword: string) => void) => {

        setCurrentPage('SAVING'); // 저장 중 상태로 전환

        // 1. 데이터 저장
        try {
            const res = await commonService.requestService({
                serviceId: 'answer',
                data: dataToSave, 
            });
            console.log('res', res);
            // 🚨 시뮬레이션: 1초 지연 후 성공 처리
            // await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('✅ 데이터 MongoDB (시뮬레이션) 성공적으로 저장됨:', dataToSave);
            
        } catch (error) {
            console.error('🚨 데이터 저장 중 오류 발생:', error);
            setCurrentPage('Q6'); // 실패 시 Q6 페이지로 돌아가기
            return; // 저장 실패 시 키워드 검색 진행하지 않음
        }

        // 2. 키워드 추천 
        try {
            // 백엔드에 최종 응답 데이터를 보내서 추천 키워드를 받습니다.
            // 서버 응답은 { keyword: "추천_키워드" } 형태라고 가정합니다.
            const keywordResponse = await commonService.requestService<{ keyword: string }>({
                serviceId: 'api/common',
                data: dataToSave,
                devUrlIsTrue : false // 어느 환경이든 원격 서버에 호출
            });
            console.log('keywordResponse', keywordResponse)
            const recommendedKeyword = keywordResponse.data.keyword; 
            console.log('recommendedKeyword', recommendedKeyword)
            
            setSearchKeyword(recommendedKeyword);
            console.log('✅ 키워드 추천 성공:', recommendedKeyword);

        } catch (keywordError) {
            console.error('🚨 키워드 추천 API 호출 오류. 기본 키워드 사용:', keywordError);
            setSearchKeyword("맛집"); // 키워드 API 실패 시 기본값으로 '맛집' 설정
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentPage('COMPLETE'); // 모든 과정 성공 후 완료 페이지로 이동
    };

function App() {

    // 💡 리셋 핸들러 함수 추가
    const handleFullReset = () => {
        localStorage.clear(); // 로컬 스토리지 데이터 완전히 삭제
        setResponses({});     // 응답 데이터 초기화
        setCurrentPage('MAIN'); // 페이지를 MAIN으로 강제 이동
        console.log('✅ 애플리케이션 상태가 완전히 리셋되었습니다. 브라우저 설정을 확인해주세요.');
    };

  // 상태 및 Ref 정의
  const containerRef = useRef<HTMLDivElement>(null);; // DOM 요소에 접근하기 위한 ref

  // 💡 초기 상태 설정: localStorage에서 마지막 페이지를 불러오거나, 없으면 'MAIN'으로 설정
  const [currentPage, setCurrentPage] = useState<PageKey>(() => {
    // const savedPage = localStorage.getItem('lastPage');

    // // 💡 저장된 페이지가 'COMPLETE'이거나 저장된 값이 없으면 'MAIN'으로 초기화
    // if (savedPage === 'COMPLETE' || !savedPage) {
    //     return 'MAIN';
    // }
    // // 안전하게 PageKey로 캐스팅하여 초기 상태 설정
    // return (savedPage as PageKey) || 'MAIN';
    return 'MAIN';
  });
  // const [currentPage, setCurrentPage] = useState('MAIN');

  // const [responses, setResponses] = useState({});
  const [responses, setResponses] = useState<Record<string, any>>({});
  
  // 💡 [추가] 현재 위치 상태 (위도, 경도)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  // 💡 위치 권한 상태를 저장하는 상태
  const [locationPermissionState, setLocationPermissionState] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');

  // 카카오 본사 (실패시 사용할 기본 위치)
  const defaultLat = 33.450701;
  const defaultLng = 126.570667;

  // 💡 앱 로드 시 Geolocation API 호출하여 현재 위치 받기
  useEffect(() => {
    if (navigator.geolocation) {
        // 💡 권한 상태 미리 조회
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            setLocationPermissionState(result.state as 'granted' | 'denied' | 'prompt');
            
            if (result.state === 'denied') {
                console.log("🚨 위치 권한이 '거부' 상태입니다. 기본 위치를 사용합니다.");
                alert("🚨 위치 권한이 '거부' 상태입니다. 기본 위치를 사용합니다.");
                setUserLocation([defaultLat, defaultLng]);
                return;
            }

        // 'granted' 또는 'prompt' 상태일 경우에만 getCurrentPosition 시도
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // 성공: 현재 위치 저장
                setUserLocation([position.coords.latitude, position.coords.longitude]);
                console.log("✅ 현재 위치 수신 성공:", position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                // 실패: 기본 위치 사용
                // alert("위치 정보 사용이 거부되었거나 실패했습니다. 기본 위치(제주 카카오 본사)로 지도를 표시합니다.");
                console.error("🚨 현재 위치 수신 실패, 기본 위치 사용:", error.message);
                setUserLocation([defaultLat, defaultLng]);
            },
            {
                enableHighAccuracy: false,
                timeout: Infinity,
                maximumAge: 0
            }
        );
        }).catch(error => {
            console.error('🚨 권한 쿼리 중 오류 발생:', error);
            setUserLocation([defaultLat, defaultLng]);
            setLocationPermissionState('unknown');
        });
    } else {
        // 브라우저 미지원: 기본 위치 사용
        alert("이 브라우저는 위치 정보(Geolocation)를 지원하지 않아 기본 위치로 지도를 표시합니다.");
        console.error("🚨 이 브라우저는 Geolocation을 지원하지 않습니다. 기본 위치 사용.");
        setUserLocation([defaultLat, defaultLng]);
        setLocationPermissionState('unknown');
    }
  }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

  // 💡 Kakao Map 연동 (COMPLETE 페이지일 때 실행)
  useEffect(() => {
    // useEffect: currentPage가 바뀔 때마다 localStorage에 저장
    // localStorage.setItem('lastPage', currentPage);

    if (currentPage === 'COMPLETE' && userLocation && searchKeyword) {
      // index.html에 카카오 스크립트가 로드되어 있어야 함
      
      if (window.kakao && window.kakao.maps) {
        // maps.load 함수를 사용하여 라이브러리 로드가 완료되었음을 보장합니다.
        window.kakao.maps.load(() => {
          const mapContainer = document.getElementById('map'); // 지도를 표시할 div
          // 💡 현재 위치를 지도 중심으로 사용
          const [lat, lng] = userLocation; 
          const centerCoord = new window.kakao.maps.LatLng(lat, lng);

          const mapOption = { 
              center: centerCoord, 
              level: 3 // 확대 단계
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(mapContainer, mapOption); 

          // ===================================================
          // 💡 장소 검색 서비스 로직 시작
          // ===================================================
          
          // 장소 검색 객체를 생성
          const ps = new window.kakao.maps.services.Places();  

          // 검색 옵션 정의
          const searchOptions = {
              location: centerCoord, // 중심 좌표를 기준으로 검색
              radius: 1000,          // 1000m(1km) 반경 내 검색
              sort: window.kakao.maps.services.SortBy.DISTANCE // 거리순 정렬
          };

          // 키워드 검색 실행
          // 검색 키워드를 설정합니다.
          const keyword = searchKeyword;

          ps.keywordSearch(keyword, (data: PlaceResult[], status: any, _pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              
              // 검색 결과가 있다면 마커 표시
              data.forEach((place: PlaceResult) => {
                const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
                
                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: markerPosition
                });
                
                // 인포윈도우 생성 (클릭 시 장소 이름 표시)
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
                });

                // 마커에 클릭 이벤트 리스너 추가
                window.kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
              });
              
              console.log(`✅ [${keyword}] 검색 결과 ${data.length}개 마커 표시 완료`);

            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
              console.log('🚨 검색 결과가 없습니다.');
            } else {
              console.error('🚨 장소 검색 중 오류가 발생했습니다.');
            }
          }, searchOptions);
            // ===================================================
        });

        
      } else {
        console.error("Kakao Map 스크립트가 로드되지 않았습니다.");
      }
    }
  }, [currentPage, userLocation, searchKeyword]);

  // 현재 페이지 설정
  const currentConfig = PAGE_CONFIG[currentPage as PageKey];
  
  if (currentConfig.questionKey === null) {
    REFERENCE_WIDTH = 447.53125;
    commonService.createAnonymousSession().then(() => {
      console.log('session Id가 쿠키에 저장');
    }).catch(() => {
      console.log('session 생성 실패')
    })
  } else if (currentConfig.questionKey === 'RD') {
    REFERENCE_WIDTH = 377.0625;
  } else if (currentConfig.questionKey === 'RD2') {
    REFERENCE_WIDTH = 406.734375;
  } else {
    REFERENCE_WIDTH = 374.84375;
  }

  // 5. 클릭 핸들러: 핵심 로직
  const handleAppClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (!currentConfig || !currentConfig.areas || currentConfig.areas.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentWidth = rect.width;
    const currentHeight = rect.height;
    console.log(`- ${currentConfig.questionKey}비율 확인: currentWidth :${currentWidth} currentHeight : ${currentHeight}`);
    console.log('REFERENCE_WIDTH', REFERENCE_WIDTH);
    // X/Y 비율 계산 (반응형 비율)
    const scaleFactorX = currentWidth / REFERENCE_WIDTH;
    const scaleFactorY = currentHeight / REFERENCE_HEIGHT;
    console.log(`- ${currentConfig.questionKey}비율 확인: scaleFactorX :${scaleFactorX} scaleFactorY : ${scaleFactorY}`);

    // 마우스가 클릭한 브라우저 화면 기준의 좌표
    const clickX = e.clientX; 
    const clickY = e.clientY;
    // console.log(`클릭 : X좌표 : ${clickX}, Y좌표 : ${clickY}`);
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
            // console.log(`- 응답 저장: ${currentConfig.questionKey} = ${area.value}`);
            if (currentConfig.questionKey) {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [currentConfig.questionKey as string]: area.value 
                }));
                // console.log(`- 응답 저장: ${currentConfig.questionKey} = ${area.value}`);
            }
            
            // 2. 페이지 이동 또는 DB 저장 처리
            if (area.nextPage === 'SAVING') {
                saveToDatabase(responses, setCurrentPage, setSearchKeyword); 
            } else {
                setCurrentPage(area.nextPage); 
            }
            
            return; // 클릭 처리 완료 후 함수 종료
        }
    }

    // console.log(`- 빈 영역 클릭됨. 상대 좌표: (${clickX.toFixed(2)}, ${clickY.toFixed(2)})`);
    
  };

  // 6. 스타일 정의
  const appStyle: React.CSSProperties = {
    // backgroundImage: `url(${currentConfig.image})`, // 임포트한 이미지 사용
    backgroundImage: currentPage === 'COMPLETE' ? 'none' : `url(${currentConfig.image})`,
    backgroundSize: 'auto', // 배경 이미지가 요소를 꽉 채우도록 조절
    backgroundPosition: 'center', // 이미지 중앙을 기준으로 배치
    backgroundAttachment: 'fixed', // 스크롤해도 배경 이미지는 고정
    minHeight: '100vh', // 화면 전체 높이를 차지하도록 설정
    backgroundRepeat: 'no-repeat',
    // cursor: 'pointer', // 클릭 가능한 영역임을 시각적으로 나타냄
    cursor: currentPage === 'COMPLETE' ? 'default' : 'pointer', // 지도는 포인터 커서 X
  };

  return (
    <div className="App"
         style={appStyle}
         ref={containerRef}
         onClick={handleAppClick} >
      
      <div>
          <h1>현재 페이지: {currentPage}</h1>
      </div>

      {/* 개발자 디버깅용 (완료시 숨김 추천) */}
      {currentPage !== 'COMPLETE' && (
        <div style={{ position: 'fixed', top: 0, left: 0, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '10px' }}>
            <small>
                페이지: {currentPage} / 키워드: {searchKeyword || '로딩 중...'}<br/>
                권한 상태: {locationPermissionState} {/* 💡 TS6133 오류 해결을 위해 추가 */}
            </small>
            <pre>응답 데이터: {JSON.stringify(responses, null, 2)}</pre>
            <button 
                onClick={handleFullReset} 
                style={{ background: 'red', color: 'white', padding: '5px', border: 'none', cursor: 'pointer', marginTop: '5px' }}
            >
                강제 리셋 (LocalStorage 사용 안 함)
            </button>
        </div>
      )}

      {/* 💡 COMPLETE 페이지일 때 지도 표시 */}
      {currentPage === 'COMPLETE' && (
        <div 
          id="map" 
          style={{ 
            width: '100%', 
            height: '100vh', 
            zIndex: 100,
            position: 'relative', 
          }} 
        >
          {/* 💡 위치 권한 거부 시 안내 메시지 */}
          {locationPermissionState === 'denied' && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 0, 0, 0.8)', color: 'white', 
              padding: '20px', borderRadius: '8px', textAlign: 'center', zIndex: 200
            }}>
              <h3>⚠️ 위치 권한이 거부되었습니다.</h3>
              <p>현재 기본 위치(제주)로 지도를 표시하고 있습니다.</p>
              <p>실제 위치를 사용하려면 브라우저 주소창 옆 자물쇠 아이콘(🔒)을 눌러</p>
              <p><strong>'위치' 권한을 '허용'으로 변경</strong> 후 페이지를 새로고침 해 주세요.</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default App
