"use client";

import { useState } from "react";
import { ChevronDown, Check, Pencil, Trash2 } from "lucide-react";
import { Habit, DayOfWeek } from "@/types/habit";

/**
 * 요일 목록 (월~일)
 */
const DAYS_OF_WEEK: DayOfWeek[] = ["월", "화", "수", "목", "금", "토", "일"];

/**
 * 요일별 색상 매핑
 */
const dayColorMap: Record<DayOfWeek, string> = {
  월: "bg-blue-500",
  화: "bg-orange-500",
  수: "bg-green-500",
  목: "bg-purple-500",
  금: "bg-pink-500",
  토: "bg-cyan-500",
  일: "bg-red-500",
};

interface WeeklyAccordionProps {
  habits: Habit[];
  onToggleComplete: (id: string) => void;
  onEdit: (habit: Habit, day?: DayOfWeek) => void;
  onDelete: (id: string, day?: DayOfWeek) => void;
}

/**
 * 주간 아코디언 컴포넌트
 * 요일별로 루틴을 그룹화하여 표시
 * 체크인 상태는 오늘 요일에서만 표시됨
 */
export function WeeklyAccordion({
  habits,
  onToggleComplete,
  onEdit,
  onDelete,
}: WeeklyAccordionProps) {
  // 현재 열린 요일 상태 (null이면 모두 닫힘)
  const [openDay, setOpenDay] = useState<DayOfWeek | null>(null);

  /**
   * 요일 클릭 핸들러
   */
  const handleDayClick = (day: DayOfWeek) => {
    setOpenDay(openDay === day ? null : day);
  };

  /**
   * 특정 요일에 해당하는 습관 필터링
   */
  const getHabitsForDay = (day: DayOfWeek): Habit[] => {
    return habits.filter((habit) => habit.days.includes(day));
  };

  /**
   * 오늘 요일 인덱스 가져오기 (월=0, 일=6)
   */
  const getTodayIndex = (): number => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  };

  /**
   * 오늘 요일 가져오기
   */
  const getTodayDay = (): DayOfWeek => {
    return DAYS_OF_WEEK[getTodayIndex()];
  };

  const todayIndex = getTodayIndex();
  const todayDay = getTodayDay();

  /**
   * 해당 요일에서의 완료 상태 확인
   * 오늘 요일에서만 실제 completed 상태 반환, 다른 요일은 false
   */
  const isCompletedForDay = (habit: Habit, day: DayOfWeek): boolean => {
    if (day === todayDay) {
      return habit.completed;
    }
    return false;
  };

  /**
   * 해당 요일의 완료된 습관 개수
   */
  const getCompletedCountForDay = (day: DayOfWeek): number => {
    const dayHabits = getHabitsForDay(day);
    return dayHabits.filter((h) => isCompletedForDay(h, day)).length;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {DAYS_OF_WEEK.map((day, index) => {
        const dayHabits = getHabitsForDay(day);
        const isOpen = openDay === day;
        const isToday = index === todayIndex;
        const completedCount = getCompletedCountForDay(day);

        return (
          <div key={day} className="border-b border-gray-100 last:border-b-0">
            {/* 요일 헤더 (클릭 가능) */}
            <button
              onClick={() => handleDayClick(day)}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                isToday ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              aria-expanded={isOpen}
              aria-controls={`accordion-${day}`}
            >
              <div className="flex items-center gap-3">
                {/* 요일 뱃지 */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    dayColorMap[day]
                  } ${isToday ? "ring-2 ring-offset-2 ring-blue-400" : ""}`}
                >
                  {day}
                </div>
                {/* 루틴 개수 표시 */}
                <span className="text-sm text-gray-600">
                  {dayHabits.length}개 루틴
                  {dayHabits.length > 0 && isToday && (
                    <span className="text-gray-400 ml-1">
                      ({completedCount}/{dayHabits.length} 완료)
                    </span>
                  )}
                </span>
                {/* 오늘 뱃지 */}
                {isToday && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    오늘
                  </span>
                )}
              </div>
              {/* 화살표 아이콘 */}
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* 아코디언 내용 (슬라이드 애니메이션) */}
            <div
              id={`accordion-${day}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pb-3 space-y-2">
                {dayHabits.length === 0 ? (
                  <p className="text-sm text-gray-400 py-2 text-center">
                    등록된 루틴이 없습니다.
                  </p>
                ) : (
                  dayHabits.map((habit) => {
                    const isCompleted = isCompletedForDay(habit, day);
                    const canToggle = isToday;

                    return (
                      <div
                        key={habit.id}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          isCompleted
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50 border border-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* 완료 체크 버튼 - 오늘만 클릭 가능 */}
                          <button
                            onClick={() =>
                              canToggle && onToggleComplete(habit.id)
                            }
                            disabled={!canToggle}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isCompleted
                                ? "bg-green-500 border-green-500"
                                : canToggle
                                  ? "border-gray-300 hover:border-green-400"
                                  : "border-gray-200 cursor-not-allowed opacity-50"
                            }`}
                            aria-label={`${habit.title} ${isCompleted ? "완료 취소" : "완료"}`}
                          >
                            {isCompleted && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </button>
                          {/* 습관 이름 */}
                          <span
                            className={`text-sm font-medium ${
                              isCompleted
                                ? "text-gray-400 line-through"
                                : "text-gray-700"
                            }`}
                          >
                            {habit.title}
                          </span>
                        </div>

                        {/* 수정/삭제 버튼 - 현재 요일 정보 전달 */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onEdit(habit, day)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                            aria-label={`${habit.title} 수정`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(habit.id, day)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            aria-label={`${habit.title} 삭제`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
