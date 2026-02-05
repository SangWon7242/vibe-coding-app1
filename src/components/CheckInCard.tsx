"use client";

import {
  Droplet,
  PersonStanding,
  BookOpen,
  Brain,
  Dumbbell,
  Pen,
  Moon,
} from "lucide-react";
import { Habit } from "@/types/habit";

/**
 * 아이콘 타입에 따른 Lucide 아이콘 반환
 */
const iconMap = {
  droplet: Droplet,
  run: PersonStanding,
  book: BookOpen,
  brain: Brain,
  dumbbell: Dumbbell,
  pen: Pen,
  moon: Moon,
};

/**
 * 아이콘 타입에 따른 배경색 반환
 */
const bgColorMap: Record<string, string> = {
  droplet: "bg-blue-50",
  run: "bg-amber-50",
  book: "bg-violet-50",
  brain: "bg-emerald-50",
  dumbbell: "bg-rose-50",
  pen: "bg-pink-50",
  moon: "bg-indigo-50",
};

/**
 * 아이콘 타입에 따른 아이콘 색상 반환
 */
const iconColorMap: Record<string, string> = {
  droplet: "text-blue-500",
  run: "text-amber-500",
  book: "text-violet-500",
  brain: "text-emerald-500",
  dumbbell: "text-rose-500",
  pen: "text-pink-500",
  moon: "text-indigo-500",
};

interface CheckInCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
}

/**
 * 데일리 체크인 아이콘 카드 컴포넌트
 * 터치/클릭으로 체크인 토글 가능
 */
export function CheckInCard({ habit, onToggle }: CheckInCardProps) {
  const IconComponent = iconMap[habit.icon];
  const bgColor = bgColorMap[habit.icon];
  const iconColor = iconColorMap[habit.icon];

  return (
    <button
      onClick={() => onToggle(habit.id)}
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 min-w-[80px] border border-gray-100 ${
        habit.completed
          ? "bg-green-100 ring-2 ring-green-400 shadow-md"
          : "bg-white shadow-sm hover:shadow-md"
      }`}
      aria-label={`${habit.title} ${habit.completed ? "완료됨" : "체크인하기"}`}
    >
      {/* 아이콘 영역 */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
          habit.completed ? "bg-green-200" : bgColor
        }`}
      >
        <IconComponent
          className={`w-7 h-7 ${habit.completed ? "text-green-600" : iconColor}`}
        />
      </div>
      {/* 습관 이름 */}
      <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
        {habit.title}
      </span>
    </button>
  );
}
