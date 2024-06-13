import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { usePagination } from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  totalItems: number;
  onChange: (offset: number, limit: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({ totalItems = 0, onChange }) => {
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const { page, offset, limit, totalPages, hasNextPage, hasPrevPage, setCurrentPage } = usePagination(
    0,
    currentLimit,
    totalItems
  );

  useEffect(() => {
    onChange(offset, limit);
  }, [offset, limit, onChange]);

  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center gap-4'>
        <p className='text-sm whitespace-nowrap'>Show rows</p>
        <Select defaultValue={currentLimit.toString()} onValueChange={(value) => setCurrentLimit(+value)}>
          <SelectTrigger />
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='25'>25</SelectItem>
            <SelectItem value='50'>50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-sm'>Page</p>

        <div className='flex items-center gap-1'>
          <ChevronLeft className={cn(hasPrevPage ? "" : "text-gray-200")} />

          <div className='border border-gray-200 py-[10px] px-3 text-sm rounded-sm bg-background'>
            <input
              type='text'
              className='bg-transparent outline-none text-right w-6'
              value={page + 1}
              onChange={(e: any) => setCurrentPage(e.target.value)}
            />
            <span
              className='pointer-events-none text-gray-500'
              style={{
                pointerEvents: "none",
                color: "grey",
              }}
            >
              {" "}
              /{totalPages}
            </span>
          </div>

          <ChevronRight className={cn(hasPrevPage ? "" : "text-gray-200")} />
        </div>
      </div>
    </div>
  );
};
