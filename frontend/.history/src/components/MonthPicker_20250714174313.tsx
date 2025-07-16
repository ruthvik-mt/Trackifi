// components/MonthPicker.tsx
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface MonthPickerProps {
  selected: Date;
  onChange: (date: Date) => void;
}

export function MonthPicker({ selected, onChange }: MonthPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start text-left font-normal text-foreground bg-background border border-border"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(selected, "MMMM, yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white text-black dark:bg-zinc-900 dark:text-white border dark:border-zinc-700 rounded-md shadow-lg"
        side="bottom"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onChange}
          captionLayout="dropdown" 
          ={new Date(2020, 0)}
          toMonth={new Date(2030, 11)}
          className="rounded-md bg-background text-foreground"
          // 👇 Force day cells to never render
          components={{
            Head: () => null,
            Row: () => null,
            Cell: () => null,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
