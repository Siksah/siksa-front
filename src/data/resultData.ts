import { RESULT_ILLUSTRATIONS } from './resultImages';

export interface FoodResult {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
}

export const FOOD_RESULTS: FoodResult[] = [
  { id: 'soba', name: '소바', description: '오늘은 시원하고 산뜻한 소바', tags: ['시원한', '면', '일식'], image: RESULT_ILLUSTRATIONS[0] },
  { id: 'donkatsu', name: '돈까스', description: '오늘은 바삭하고 달콤한 돈까스!', tags: ['바삭한', '튀김', '일식'], image: RESULT_ILLUSTRATIONS[1] },
  { id: 'hamburger', name: '햄버거', description: '육즙 가득 패티와 신선한 야채!', tags: ['헤비한', '빵', '양식'], image: RESULT_ILLUSTRATIONS[2] },
  { id: 'kimchi-stew', name: '김치찌개', description: '칼칼하고 개운한 김치찌개', tags: ['뜨거운', '국물', '한식', '매운'], image: RESULT_ILLUSTRATIONS[3] },
  { id: 'soy-paste-stew', name: '된장찌개', description: '구수한 집밥 느낌 된장찌개', tags: ['뜨거운', '국물', '한식'], image: RESULT_ILLUSTRATIONS[4] },
  { id: 'gimbap', name: '김밥', description: '간편하고 든든한 김밥', tags: ['간편한', '밥', '한식'], image: RESULT_ILLUSTRATIONS[5] },
  { id: 'sushi', name: '초밥', description: '신선하고 깔끔한 초밥', tags: ['시원한', '밥', '일식', '해산물'], image: RESULT_ILLUSTRATIONS[6] },
  { id: 'bibimbap', name: '비빔밥', description: '건강하고 든든한 비빔밥', tags: ['건강한', '밥', '한식'], image: RESULT_ILLUSTRATIONS[7] },
  { id: 'pasta', name: '파스타', description: '분위기 있는 파스타', tags: ['분위기', '면', '양식'], image: RESULT_ILLUSTRATIONS[8] },
  { id: 'pizza', name: '피자', description: '치즈 가득 피자', tags: ['헤비한', '빵', '양식'], image: RESULT_ILLUSTRATIONS[9] },
  { id: 'salad', name: '샐러드', description: '가볍고 신선한 샐러드', tags: ['가벼운', '채소', '다이어트'], image: RESULT_ILLUSTRATIONS[10] },
  { id: 'tteokbokki', name: '떡볶이', description: '매콤달콤 국민 간식 떡볶이', tags: ['매운', '분식'], image: RESULT_ILLUSTRATIONS[11] },
  { id: 'ramen', name: '라면', description: '얼큰한 국물 라면', tags: ['뜨거운', '국물', '면', '간편한'], image: RESULT_ILLUSTRATIONS[12] },
  { id: 'fried-chicken', name: '치킨', description: '바삭바삭 치킨', tags: ['바삭한', '튀김', '헤비한'], image: RESULT_ILLUSTRATIONS[13] },
  { id: 'jajangmyeon', name: '짜장면', description: '달달하고 짭짤한 짜장면', tags: ['면', '중식'], image: RESULT_ILLUSTRATIONS[14] },
  { id: 'jjamppong', name: '짬뽕', description: '얼큰한 해물 짬뽕', tags: ['뜨거운', '국물', '면', '중식', '매운'], image: RESULT_ILLUSTRATIONS[15] },
  { id: 'bossam', name: '보쌈', description: '담백하고 부드러운 보쌈', tags: ['고기', '한식', '든든한'], image: RESULT_ILLUSTRATIONS[16] },
  { id: 'rice-soup', name: '국밥', description: '속이 든든한 국밥', tags: ['뜨거운', '국물', '밥', '한식', '든든한'], image: RESULT_ILLUSTRATIONS[17] },
  { id: 'sandwich', name: '샌드위치', description: '가볍고 신선한 샌드위치', tags: ['가벼운', '빵', '간편한'], image: RESULT_ILLUSTRATIONS[18] },
  { id: 'taco', name: '타코', description: '이색적인 맛 타코', tags: ['이색적인', '빵', '멕시칸'], image: RESULT_ILLUSTRATIONS[19] },
  { id: 'pho', name: '쌀국수', description: '담백한 국물 쌀국수', tags: ['뜨거운', '국물', '면', '아시안'], image: RESULT_ILLUSTRATIONS[20] },
  { id: 'mara-tang', name: '마라탕', description: '얼얼하고 중독적인 마라탕', tags: ['뜨거운', '국물', '매운', '중식'], image: RESULT_ILLUSTRATIONS[21] },
];
