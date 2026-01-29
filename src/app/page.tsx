"use client";

import { useState } from "react";
import { Menu, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Habit } from "@/types/habit";
import { initialHabits } from "@/data/habits";

/**
 * 오늘 날짜를 포맷팅하여 반환
 * @returns 'YYYY년 MM월 DD일 (요일)' 형식의 문자열
 */
function getFormattedDate(): string {
  const now = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = days[now.getDay()];
  return `${year}년 ${month}월 ${date}일 (${day})`;
}

export default function HabitTrackerPage() {
  // 습관 목록 상태 관리
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  // 새 습관 입력값 상태
  const [newHabit, setNewHabit] = useState<string>("");

  /**
   * 새 습관 추가 핸들러
   */
  const handleAddHabit = () => {
    if (newHabit.trim() === "") return;
    const newId =
      habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1;
    setHabits([
      ...habits,
      { id: newId, title: newHabit.trim(), completed: false },
    ]);
    setNewHabit("");
  };

  /**
   * 습관 완료 토글 핸들러
   * @param id - 토글할 습관의 ID
   */
  const handleToggleComplete = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  };

  // 완료된 습관 개수 계산
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* 헤더 영역 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-purple-700 tracking-tight">
              My Daily Habits
            </h1>
            <p className="text-sm text-gray-500">{getFormattedDate()}</p>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-purple-600">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gradient-to-b from-pink-50 to-purple-50"
            >
              <SheetHeader>
                <SheetTitle className="text-purple-700">메뉴</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Button variant="ghost" className="justify-start text-gray-700">
                  홈
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700">
                  통계
                </Button>
                <Button variant="ghost" className="justify-start text-gray-700">
                  설정
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* 진행률 카드 */}
        <Card className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
          <CardContent className="p-5">
            <p className="text-sm opacity-90">오늘의 달성률</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-4xl font-bold">
                {habits.length > 0
                  ? Math.round((completedCount / habits.length) * 100)
                  : 0}
                %
              </span>
              <span className="text-sm opacity-80 pb-1">
                ({completedCount}/{habits.length} 완료)
              </span>
            </div>
            {/* 프로그레스 바 */}
            <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{
                  width: `${habits.length > 0 ? (completedCount / habits.length) * 100 : 0}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* 습관 입력 폼 */}
        <Card className="mb-6 border-pink-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="새로운 습관을 입력하세요..."
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
                className="flex-1 border-purple-200 focus-visible:ring-purple-400"
              />
              <Button
                onClick={handleAddHabit}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
              >
                <Plus className="h-4 w-4 mr-1" />
                추가
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 습관 리스트 */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Today&apos;s Habits
          </h2>
          {habits.map((habit) => (
            <Card
              key={habit.id}
              className={`border-0 shadow-md transition-all duration-300 ${
                habit.completed
                  ? "bg-green-50 border-l-4 border-l-green-400"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox
                  id={`habit-${habit.id}`}
                  checked={habit.completed}
                  onCheckedChange={() => handleToggleComplete(habit.id)}
                  className="h-5 w-5 border-purple-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <label
                  htmlFor={`habit-${habit.id}`}
                  className={`flex-1 cursor-pointer ${
                    habit.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {habit.title}
                </label>
                {habit.completed && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 하단 네비게이션 (모바일 앱 스타일) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-purple-600"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs">홈</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-gray-400"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span className="text-xs">통계</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-gray-400"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">설정</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
