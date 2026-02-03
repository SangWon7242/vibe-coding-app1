import { ListChecks } from "lucide-react";

/**
 * Empty State 컴포넌트
 * 습관 목록이 비어있을 때 표시되는 안내 UI
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {/* 아이콘 */}
      <div className="mb-4 rounded-full bg-purple-100 p-4">
        <ListChecks className="h-12 w-12 text-purple-400" />
      </div>

      {/* 안내 텍스트 */}
      <h3 className="mb-2 text-lg font-semibold text-gray-700">
        아직 등록된 습관이 없어요
      </h3>
      <p className="max-w-[200px] text-sm text-gray-500">
        위의 입력창에서 새로운 습관을 추가해보세요!
      </p>
    </div>
  );
}
