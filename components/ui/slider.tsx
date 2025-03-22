"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  value: valueProp,
  onValueChange,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState(
    isControlled ? valueProp : [min, max]
  );

  // Determine the fixed value (first thumb)
  const fixedValue = React.useMemo(() => {
    return isControlled ? valueProp[0] : internalValue[0];
  }, [isControlled, valueProp, internalValue]);

  const handleValueChange = (newValues: number[]) => {
    // Always keep the first value fixed
    const adjustedValues = [fixedValue, Math.max(fixedValue, newValues[1])];
    if (isControlled) {
      onValueChange?.(adjustedValues);
    } else {
      setInternalValue(adjustedValues);
      onValueChange?.(adjustedValues);
    }
  };

  return (
    <SliderPrimitive.Root
      value={isControlled ? valueProp : internalValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-gray-300">
        <SliderPrimitive.Range className="absolute h-full bg-purple-500 rounded-full" />
      </SliderPrimitive.Track>
      {/* Fixed Minimum Thumb (hidden but keeps spacing) */}
      <SliderPrimitive.Thumb
        className="hidden"
        aria-label="Fixed minimum"
      />
      {/* Adjustable Maximum Thumb */}
      <SliderPrimitive.Thumb
        className={cn(
          "block h-5 w-5 rounded-full border-2 border-purple-500 bg-white shadow-lg transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        )}
      />
    </SliderPrimitive.Root>
  );
}

export { Slider };