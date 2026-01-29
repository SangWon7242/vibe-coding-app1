import { Habit } from "@/types/habit";

/**
 * 하드코딩된 가짜 습관 데이터
 * DB 연동 전 테스트용 목 데이터
 */
export const initialHabits: Habit[] = [
  { id: 1, title: "아침 7시 기상하기", completed: true },
  { id: 2, title: "물 2리터 마시기", completed: false },
  { id: 3, title: "30분 운동하기", completed: false },
  { id: 4, title: "책 10페이지 읽기", completed: true },
  { id: 5, title: "일기 쓰기", completed: false },
];
