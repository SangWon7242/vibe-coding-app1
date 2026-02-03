import { Habit } from "@/types/habit";

/**
 * 초기 습관 데이터
 * 요일별 루틴 설정 포함
 */
export const initialHabits: Habit[] = [
  {
    id: 1,
    title: "물 마시기",
    icon: "droplet",
    color: "#3B82F6",
    current: 3,
    goal: 10,
    unit: "잔",
    completed: false,
    days: ["월", "화", "수", "목", "금", "토", "일"], // 매일
  },
  {
    id: 2,
    title: "운동하기",
    icon: "run",
    color: "#F59E0B",
    current: 10,
    goal: 10,
    unit: "경",
    completed: true,
    days: ["월", "수", "금"], // 주 3회
  },
  {
    id: 3,
    title: "독서하기",
    icon: "book",
    color: "#8B5CF6",
    current: 10,
    goal: 10,
    unit: "경",
    completed: true,
    days: ["월", "화", "수", "목", "금"], // 평일
  },
  {
    id: 4,
    title: "명상하기",
    icon: "brain",
    color: "#10B981",
    current: 0,
    goal: 10,
    unit: "경",
    completed: false,
    days: ["월", "화", "수", "목", "금", "토", "일"], // 매일
  },
  {
    id: 5,
    title: "스트레칭",
    icon: "dumbbell",
    color: "#F43F5E",
    current: 5,
    goal: 10,
    unit: "회",
    completed: false,
    days: ["화", "목", "토"], // 주 3회
  },
];
