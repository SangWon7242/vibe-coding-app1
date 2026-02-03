/**
 * 요일 타입 정의
 */
export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

/**
 * Habit 데이터 타입 정의
 * @property id - 고유 식별자
 * @property title - 습관 제목
 * @property icon - 아이콘 종류
 * @property color - 프로그레스 바 색상
 * @property current - 현재 달성 횟수
 * @property goal - 목표 횟수
 * @property unit - 단위 (잔, 경, 분 등)
 * @property completed - 오늘 체크인 완료 여부
 * @property days - 수행할 요일 목록
 */
export interface Habit {
  id: number;
  title: string;
  icon: "droplet" | "run" | "book" | "brain" | "dumbbell" | "pen" | "moon";
  color: string;
  current: number;
  goal: number;
  unit: string;
  completed: boolean;
  days: DayOfWeek[];
}
