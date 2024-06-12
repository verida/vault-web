import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

interface TablePaginationProps {}

export const TablePagination = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center gap-4'>
        <p className='text-sm whitespace-nowrap'>Show rows</p>
        <Select defaultValue='a'>
          <SelectTrigger />
          <SelectContent>
            <SelectItem value='a'>10</SelectItem>
            <SelectItem value='b'>20</SelectItem>
            <SelectItem value='c'>50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center'>
        <p className='text-sm'>Page</p>

        <ChevronLeft />
        <ChevronRight />
      </div>
    </div>
  );
};
