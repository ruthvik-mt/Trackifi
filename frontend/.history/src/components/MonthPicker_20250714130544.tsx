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
          className="w-[200px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(selected, "MMMM, yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
       <Calendar
         mode="single"
         selected={selected}
         onSelect={onChange}
         required // ✅ ADD THIS LINE
         captionLayout="dropdown"
         fromYear={2020}
  t     oYear={2030}
  disableNavigation={false}
  fixedWeeks
/>

      </PopoverContent>
    </Popover>
  );
}
