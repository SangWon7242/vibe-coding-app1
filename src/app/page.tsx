"use client";

import { useState } from "react";
import {
  Menu,
  Plus,
  Check,
  Pencil,
  Trash2,
  X,
  Save,
  Home,
  PieChart,
  Settings,
} from "lucide-react";
import Swal from "sweetalert2";
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
import { EmptyState } from "@/components/EmptyState";
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
  // 수정 모드 상태: 현재 수정 중인 습관의 ID (null이면 수정 모드가 아님)
  const [editingId, setEditingId] = useState<number | null>(null);
  // 수정 중인 텍스트 상태
  const [editingText, setEditingText] = useState<string>("");

  /**
   * 새 습관 추가 핸들러
   * 빈칸일 경우 경고창 표시
   */
  const handleAddHabit = () => {
    if (newHabit.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "입력 오류",
        text: "루틴을 입력하세요.",
        confirmButtonColor: "#9333ea",
      });
      return;
    }
    const newId =
      habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1;
    setHabits([
      ...habits,
      { id: newId, title: newHabit.trim(), completed: false },
    ]);
    setNewHabit("");
    Swal.fire({
      icon: "success",
      title: "추가 완료",
      text: "새로운 습관이 추가되었습니다!",
      timer: 1500,
      showConfirmButton: false,
    });
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

  /**
   * 수정 모드 진입 핸들러
   * @param habit - 수정할 습관 객체
   */
  const handleStartEdit = (habit: Habit) => {
    setEditingId(habit.id);
    setEditingText(habit.title);
  };

  /**
   * 수정 취소 핸들러
   * 수정하지 않은 경우 이전 상태 유지
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  /**
   * 수정 완료 핸들러
   * 수정된 내용을 반영
   */
  const handleSaveEdit = () => {
    if (editingId === null) return;

    // 수정된 텍스트가 비어있으면 원래 값 유지
    const trimmedText = editingText.trim();
    if (trimmedText === "") {
      handleCancelEdit();
      return;
    }

    setHabits(
      habits.map((habit) =>
        habit.id === editingId ? { ...habit, title: trimmedText } : habit,
      ),
    );
    setEditingId(null);
    setEditingText("");
  };

  /**
   * 습관 삭제 핸들러
   * 확인 후 삭제 진행
   * @param id - 삭제할 습관의 ID
   */
  const handleDeleteHabit = async (id: number) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "삭제 확인",
      text: "정말 이 습관을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      setHabits(habits.filter((habit) => habit.id !== id));
      Swal.fire({
        icon: "success",
        title: "삭제 완료",
        text: "습관이 삭제되었습니다.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // 완료된 습관 개수 계산
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 pb-24">
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

        {/* 습관 리스트 - 스크롤 가능하도록 설정 */}
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-380px)]">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide sticky top-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 py-2">
            Today&apos;s Habits
          </h2>
          {/* Empty State: 습관이 없을 때 표시 */}
          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            habits.map((habit) => (
              <Card
                key={habit.id}
                className={`border-0 shadow-md transition-all duration-300 ${
                  habit.completed
                    ? "bg-green-50 border-l-4 border-l-green-400"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <CardContent className="p-4">
                  {/* 수정 모드일 때 */}
                  {editingId === habit.id ? (
                    <div className="flex flex-col gap-3">
                      <Input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                        className="border-purple-200 focus-visible:ring-purple-400"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="text-gray-500"
                        >
                          <X className="h-4 w-4 mr-1" />
                          취소
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          수정 완료
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* 일반 모드일 때 */
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`habit-${habit.id}`}
                        checked={habit.completed}
                        onCheckedChange={() => handleToggleComplete(habit.id)}
                        className="h-5 w-5 border-purple-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 shrink-0"
                      />
                      <label
                        htmlFor={`habit-${habit.id}`}
                        className={`flex-1 cursor-pointer break-words ${
                          habit.completed
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        {habit.title}
                      </label>
                      {habit.completed && (
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                      )}
                      {/* 수정 버튼 */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStartEdit(habit)}
                        className="h-8 w-8 text-purple-500 hover:text-purple-700 hover:bg-purple-100 shrink-0"
                        aria-label={`${habit.title} 수정하기`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {/* 삭제 버튼 */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-100 shrink-0"
                        aria-label={`${habit.title} 삭제하기`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* 하단 네비게이션 (모바일 앱 스타일) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-purple-600"
            aria-label="홈으로 이동"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">홈</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-gray-400"
            aria-label="통계 보기"
          >
            <PieChart className="h-5 w-5" />
            <span className="text-xs">통계</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-gray-400"
            aria-label="설정으로 이동"
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">설정</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
