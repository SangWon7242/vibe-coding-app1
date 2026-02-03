"use client";

import { Habit } from "@/types/habit";

interface HabitProgressCardProps {
  habit: Habit;
}

/**
 * 진행 중인 습관 프로그레스 카드 컴포넌트
 * 현재 진행률을 시각적으로 표시
 */
export function HabitProgressCard({ habit }: HabitProgressCardProps) {
  // 진행률 계산 (0~100%)
  const progress = habit.goal > 0 ? (habit.current / habit.goal) * 100 : 0;

  return (
    <div className="py-3">
      {/* 상단: 습관 이름 + 진행 수치 */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-800">{habit.title}</span>
        <span className="text-sm text-gray-500">
          {habit.current}/{habit.goal} {habit.unit}
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: habit.color,
          }}
        />
      </div>
    </div>
  );
}
