import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

interface TablePaginationProps {
  totalItems: number;
  onChange: (offset: number, limit: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  totalItems = 0,
  onChange,
}) => {
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const {
    page,
    offset,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    setCurrentPage,
    nextPage,
    prevPage,
  } = usePagination(0, currentLimit, totalItems);

  useEffect(() => {
    onChange(offset, limit);
  }, [offset, limit, onChange]);

  return (
    <div className="flex w-full items-center justify-center md:justify-between">
      <div className="hidden items-center gap-4 md:flex">
        <p className="whitespace-nowrap text-sm">Show rows</p>
        <Select
          defaultValue={currentLimit.toString()}
          onValueChange={(value) => setCurrentLimit(+value)}
        >
          <SelectTrigger />
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm">Page</p>

        <div className="flex items-center gap-1">
          <ChevronLeft
            className={cn("cursor-pointer", hasPrevPage ? "" : "text-gray-200")}
            onClick={() => prevPage()}
          />

          <div className="rounded-sm border border-gray-200 bg-background px-3 py-[10px] text-sm">
            <input
              type="text"
              className="w-6 bg-transparent text-right outline-none"
              value={page + 1}
              onChange={(e: any) => setCurrentPage(e.target.value)}
            />
            <span
              className="pointer-events-none text-gray-500"
              style={{
                pointerEvents: "none",
                color: "grey",
              }}
            >
              {" "}
              /{totalPages}
            </span>
          </div>

          <ChevronRight
            className={cn("cursor-pointer", hasNextPage ? "" : "text-gray-200")}
            onClick={() => nextPage()}
          />
        </div>
      </div>
    </div>
  );
};
