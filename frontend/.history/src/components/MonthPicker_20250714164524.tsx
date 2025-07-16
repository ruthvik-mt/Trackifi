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
          className="w-[200px] justify-start text-left font-normal text-foreground"
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
          required
          captionLayout="dropdown"
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
          disableNavigation={false}
          fixedWeeks
        />
      </PopoverContent>
    </Popover>
  );
}
