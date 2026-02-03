"use client";

import { useState } from "react";
import {
  Search,
  Home,
  BarChart3,
  List,
  User,
  ChevronRight,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { CheckInCard } from "@/components/CheckInCard";
import { WeeklyAccordion } from "@/components/WeeklyAccordion";
import { EmptyState } from "@/components/EmptyState";
import { Habit, DayOfWeek } from "@/types/habit";
import { initialHabits } from "@/data/habits";

/**
 * 요일 목록
 */
const DAYS_OF_WEEK: DayOfWeek[] = ["월", "화", "수", "목", "금", "토", "일"];

/**
 * 오늘 날짜를 포맷팅하여 반환
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

/**
 * 오늘 요일 가져오기 (DayOfWeek 형식)
 */
function getTodayDayOfWeek(): DayOfWeek {
  const today = new Date().getDay();
  const dayMap: DayOfWeek[] = ["일", "월", "화", "수", "목", "금", "토"];
  return dayMap[today];
}

export default function HabitTrackerPage() {
  // 습관 목록 상태 관리
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  // 오늘 요일
  const todayDay = getTodayDayOfWeek();

  // 오늘 해야 할 습관만 필터링
  const todayHabits = habits.filter((h) => h.days.includes(todayDay));

  /**
   * 체크인 토글 핸들러
   */
  const handleToggleCheckIn = (id: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newCompleted = !habit.completed;
          const newCurrent = newCompleted
            ? Math.min(habit.current + 1, habit.goal)
            : Math.max(habit.current - 1, 0);

          if (newCompleted) {
            Swal.fire({
              icon: "success",
              title: "체크인 완료!",
              text: `${habit.title} 완료되었습니다.`,
              timer: 1200,
              showConfirmButton: false,
              position: "top",
              toast: true,
            });
          }

          return { ...habit, completed: newCompleted, current: newCurrent };
        }
        return habit;
      }),
    );
  };

  /**
   * 새 습관 추가 핸들러 (요일 선택 포함)
   */
  const handleAddHabit = async () => {
    // Step 1: 습관 이름 입력
    const { value: title } = await Swal.fire({
      title: "새 루틴 추가",
      input: "text",
      inputLabel: "루틴 이름을 입력하세요",
      inputPlaceholder: "예: 스트레칭하기",
      showCancelButton: true,
      confirmButtonText: "다음",
      cancelButtonText: "취소",
      confirmButtonColor: "#3B82F6",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "루틴 이름을 입력해주세요.";
        }
        return null;
      },
    });

    if (!title) return;

    // Step 2: 요일 선택
    const { value: selectedDays } = await Swal.fire({
      title: "요일 선택",
      html: `
        <p class="text-sm text-gray-500 mb-4">루틴을 수행할 요일을 선택하세요</p>
        <div class="flex flex-wrap justify-center gap-2" id="day-selector">
          ${DAYS_OF_WEEK.map(
            (day) => `
            <label class="cursor-pointer">
              <input type="checkbox" value="${day}" class="hidden peer" checked>
              <div class="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center 
                          text-sm font-bold text-gray-500 transition-all
                          peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white
                          hover:border-blue-400">
                ${day}
              </div>
            </label>
          `,
          ).join("")}
        </div>
        <div class="mt-4 flex justify-center gap-2">
          <button type="button" id="select-all" class="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">전체 선택</button>
          <button type="button" id="select-weekday" class="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">평일만</button>
          <button type="button" id="select-weekend" class="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200">주말만</button>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "추가",
      cancelButtonText: "취소",
      confirmButtonColor: "#3B82F6",
      didOpen: () => {
        // 전체 선택 버튼
        document.getElementById("select-all")?.addEventListener("click", () => {
          document
            .querySelectorAll<HTMLInputElement>("#day-selector input")
            .forEach((cb) => (cb.checked = true));
          document.querySelectorAll("#day-selector input").forEach((cb) => {
            cb.dispatchEvent(new Event("change"));
          });
        });
        // 평일만 선택
        document
          .getElementById("select-weekday")
          ?.addEventListener("click", () => {
            document
              .querySelectorAll<HTMLInputElement>("#day-selector input")
              .forEach((cb) => {
                cb.checked = ["월", "화", "수", "목", "금"].includes(cb.value);
              });
          });
        // 주말만 선택
        document
          .getElementById("select-weekend")
          ?.addEventListener("click", () => {
            document
              .querySelectorAll<HTMLInputElement>("#day-selector input")
              .forEach((cb) => {
                cb.checked = ["토", "일"].includes(cb.value);
              });
          });
      },
      preConfirm: () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>(
          "#day-selector input:checked",
        );
        const days = Array.from(checkboxes).map((cb) => cb.value as DayOfWeek);
        if (days.length === 0) {
          Swal.showValidationMessage("최소 하나의 요일을 선택해주세요.");
          return false;
        }
        return days;
      },
    });

    if (!selectedDays) return;

    // 습관 추가
    const newId =
      habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1;
    const icons: Habit["icon"][] = [
      "droplet",
      "run",
      "book",
      "brain",
      "dumbbell",
      "pen",
      "moon",
    ];
    const colors = [
      "#3B82F6",
      "#F59E0B",
      "#8B5CF6",
      "#10B981",
      "#F43F5E",
      "#EC4899",
      "#6366F1",
    ];
    const randomIndex = Math.floor(Math.random() * icons.length);

    setHabits([
      ...habits,
      {
        id: newId,
        title: title.trim(),
        icon: icons[randomIndex],
        color: colors[randomIndex],
        current: 0,
        goal: 10,
        unit: "회",
        completed: false,
        days: selectedDays,
      },
    ]);

    Swal.fire({
      icon: "success",
      title: "추가 완료!",
      text: `"${title}" 루틴이 추가되었습니다.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  /**
   * 루틴 수정 핸들러
   */
  const handleEditHabit = async (habit: Habit) => {
    // Step 1: 이름 수정
    const { value: newTitle } = await Swal.fire({
      title: "루틴 수정",
      input: "text",
      inputLabel: "루틴 이름",
      inputValue: habit.title,
      showCancelButton: true,
      confirmButtonText: "다음",
      cancelButtonText: "취소",
      confirmButtonColor: "#3B82F6",
      inputValidator: (value) => {
        if (!value?.trim()) {
          return "루틴 이름을 입력해주세요.";
        }
        return null;
      },
    });

    if (!newTitle) return;

    // Step 2: 요일 수정
    const { value: selectedDays } = await Swal.fire({
      title: "요일 선택",
      html: `
        <p class="text-sm text-gray-500 mb-4">루틴을 수행할 요일을 선택하세요</p>
        <div class="flex flex-wrap justify-center gap-2" id="day-selector">
          ${DAYS_OF_WEEK.map(
            (day) => `
            <label class="cursor-pointer">
              <input type="checkbox" value="${day}" class="hidden peer" ${habit.days.includes(day) ? "checked" : ""}>
              <div class="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center 
                          text-sm font-bold text-gray-500 transition-all
                          peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white
                          hover:border-blue-400">
                ${day}
              </div>
            </label>
          `,
          ).join("")}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "저장",
      cancelButtonText: "취소",
      confirmButtonColor: "#3B82F6",
      preConfirm: () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>(
          "#day-selector input:checked",
        );
        const days = Array.from(checkboxes).map((cb) => cb.value as DayOfWeek);
        if (days.length === 0) {
          Swal.showValidationMessage("최소 하나의 요일을 선택해주세요.");
          return false;
        }
        return days;
      },
    });

    if (!selectedDays) return;

    // 습관 업데이트
    setHabits(
      habits.map((h) =>
        h.id === habit.id
          ? { ...h, title: newTitle.trim(), days: selectedDays }
          : h,
      ),
    );

    Swal.fire({
      icon: "success",
      title: "수정 완료!",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  /**
   * 루틴 삭제 핸들러
   */
  const handleDeleteHabit = async (id: number) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "삭제 확인",
      text: "정말 삭제하겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      setHabits(habits.filter((h) => h.id !== id));
      Swal.fire({
        icon: "success",
        title: "삭제 완료",
        text: `"${habit.title}" 루틴이 삭제되었습니다.`,
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  // 완료된 습관 개수 (오늘 기준)
  const completedCount = todayHabits.filter((h) => h.completed).length;
  // 전체 달성률 (오늘 기준)
  const totalProgress =
    todayHabits.length > 0
      ? Math.round((completedCount / todayHabits.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 영역 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            My Daily Habits
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600"
            aria-label="검색"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-md mx-auto px-4 py-4">
        {/* 안내 배너 */}
        <div className="relative mb-4">
          <div className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded-full mb-2">
            오늘의 습관 달성률을 확인하세요!
            <div className="absolute left-6 top-8 w-3 h-3 bg-blue-500 rotate-45 transform" />
          </div>

          {/* 데일리 리포트 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">데일리 리포트</p>
              <p className="text-xs text-gray-400 mt-1">{getFormattedDate()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">
                {totalProgress}%
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 오늘의 체크인 섹션 */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">오늘의 체크인</h2>
            <span className="text-sm text-gray-500">
              {completedCount}/{todayHabits.length} 완료
            </span>
          </div>

          {/* 가로 스크롤 카드 영역 */}
          <div className="flex gap-3 overflow-x-auto pt-1 pb-2 -mx-1 px-1 scrollbar-hide">
            {todayHabits.length === 0 ? (
              <p className="text-gray-400 text-sm py-8 w-full text-center">
                오늘은 등록된 루틴이 없습니다.
              </p>
            ) : (
              todayHabits.map((habit) => (
                <CheckInCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleCheckIn}
                />
              ))
            )}
          </div>
        </section>

        {/* 주간 루틴 섹션 (아코디언) */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">주간 루틴</h2>
            <span className="text-sm text-gray-500">총 {habits.length}개</span>
          </div>

          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            <WeeklyAccordion
              habits={habits}
              onToggleComplete={handleToggleCheckIn}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
            />
          )}
        </section>

        {/* 습관 추가 플로팅 버튼 */}
        <Button
          onClick={handleAddHabit}
          className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          aria-label="새 루틴 추가"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto px-4 py-2 flex justify-around items-center">
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-blue-600"
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
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">통계</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-gray-400"
            aria-label="습관 목록"
          >
            <List className="h-5 w-5" />
            <span className="text-xs">습관 목록</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-1 h-auto py-2 text-gray-400"
            aria-label="프로필"
          >
            <User className="h-5 w-5" />
            <span className="text-xs">프로필</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
