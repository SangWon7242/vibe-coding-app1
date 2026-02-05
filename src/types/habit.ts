/**
 * 요일 타입 정의
 */
export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

/**
 * 아이콘 타입 정의
 */
export type IconType =
  | "droplet"
  | "run"
  | "book"
  | "brain"
  | "dumbbell"
  | "pen"
  | "moon";

/**
 * Habit 데이터 타입 정의 (프론트엔드용)
 * DB에서 가져온 데이터에 오늘의 체크인 상태를 추가
 */
export interface Habit {
  id: string;
  user_id: string;
  title: string;
  icon: IconType;
  goal: number;
  unit: string;
  days: DayOfWeek[];
  created_at: string;
  updated_at: string;
  // 오늘 체크인 상태 (프론트엔드에서 계산)
  completed: boolean;
  current: number;
}
