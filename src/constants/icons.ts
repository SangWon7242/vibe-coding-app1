import {
  Droplet,
  PersonStanding,
  BookOpen,
  Brain,
  Dumbbell,
  Pen,
  Moon,
  LucideIcon,
} from "lucide-react";
import { Habit } from "@/types/habit";

/**
 * 아이콘 타입 정의
 */
export type IconType = Habit["icon"];

/**
 * 아이콘 옵션 인터페이스
 */
export interface IconOption {
  value: IconType;
  label: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  color: string;
}

/**
 * 사용 가능한 아이콘 리스트
 * value: 아이콘 키, label: 표시 이름, icon: Lucide 컴포넌트
 */
export const ICON_OPTIONS: IconOption[] = [
  {
    value: "droplet",
    label: "물방울",
    icon: Droplet,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    color: "#3B82F6",
  },
  {
    value: "run",
    label: "운동",
    icon: PersonStanding,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
    color: "#F59E0B",
  },
  {
    value: "book",
    label: "독서",
    icon: BookOpen,
    bgColor: "bg-violet-50",
    iconColor: "text-violet-500",
    color: "#8B5CF6",
  },
  {
    value: "brain",
    label: "명상",
    icon: Brain,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
    color: "#10B981",
  },
  {
    value: "dumbbell",
    label: "헬스",
    icon: Dumbbell,
    bgColor: "bg-rose-50",
    iconColor: "text-rose-500",
    color: "#F43F5E",
  },
  {
    value: "pen",
    label: "글쓰기",
    icon: Pen,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
    color: "#EC4899",
  },
  {
    value: "moon",
    label: "수면",
    icon: Moon,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-500",
    color: "#6366F1",
  },
];

/**
 * 아이콘 키로 아이콘 옵션 조회
 */
export const getIconOption = (value: IconType): IconOption | undefined => {
  return ICON_OPTIONS.find((opt) => opt.value === value);
};

/**
 * 아이콘 SVG 경로 반환 (SweetAlert2 HTML용)
 */
export const getIconSvgPath = (value: IconType): string => {
  const paths: Record<IconType, string> = {
    droplet:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.97 0-9-4.03-9-9 0-3.87 3.13-7.13 9-12 5.87 4.87 9 8.13 9 12 0 4.97-4.03 9-9 9z"/>',
    run: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a2 2 0 100 4 2 2 0 000-4zM10 22V12m4 10V12m-6-4h8l-2 4H8l2-4z"/>',
    book: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>',
    brain:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>',
    dumbbell:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h1v10H4a1 1 0 01-1-1V8a1 1 0 011-1zm15 0h1a1 1 0 011 1v8a1 1 0 01-1 1h-1V7zM6 5h2v14H6a1 1 0 01-1-1V6a1 1 0 011-1zm10 0h2a1 1 0 011 1v12a1 1 0 01-1 1h-2V5zM9 10h6v4H9v-4z"/>',
    pen: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>',
    moon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>',
  };
  return paths[value] || "";
};
