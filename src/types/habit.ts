/**
 * Habit 데이터 타입 정의
 * @property id - 고유 식별자
 * @property title - 습관 제목
 * @property completed - 완료 여부
 */
export interface Habit {
  id: number;
  title: string;
  completed: boolean;
}
