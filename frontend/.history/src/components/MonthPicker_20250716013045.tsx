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
          // ✅ Fix: Force update even when same date (e.g., July 1) is clicked
          onSelect={(date) => {
            if (!date) return;

            // Always normalize to 1st of the selected month
            const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

            // ✅ If already selected, force update to re-trigger effects
            if (selected.getTime() === firstOfMonth.getTime()) {
              onChange(new Date(firstOfMonth)); // force a new instance
            } else {
              onChange(firstOfMonth);
            }
          }}
          captionLayout="dropdown"
          fromMonth={new Date(2020, 0)}
          toMonth={new Date(2030, 11)}
          className="rounded-md bg-background text-foreground"
          // ✅ Hide day grid — make it look like a true month picker
          classNames={{
            table: "hidden",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
