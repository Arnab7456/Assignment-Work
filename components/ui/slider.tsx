"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value: valueProp,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const isControlled = valueProp !== undefined
  const initialFixedValue = React.useRef<number>(
    (Array.isArray(valueProp) ? valueProp[0] : undefined) ??
    (Array.isArray(defaultValue) ? defaultValue[0] : min)
  ).current

  const [internalValue, setInternalValue] = React.useState(() => {
    if (isControlled && Array.isArray(valueProp)) return valueProp
    if (Array.isArray(defaultValue)) return defaultValue
    return [min, max]
  })

  const values = isControlled ? valueProp : internalValue

  const handleValueChange = (newValues: number[]) => {
    const adjustedValues = [initialFixedValue, ...newValues.slice(1)]
    if (isControlled) {
      onValueChange?.(adjustedValues)
    } else {
      setInternalValue(adjustedValues)
      onValueChange?.(adjustedValues)
    }
  }

  return (
    <SliderPrimitive.Root
      value={values}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative w-full h-0.5 rounded-full bg-gray-300"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-black absolute h-full "
          )}
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        key={index}
        className={cn(
          "ring-black border-white bg-white block h-5 w-5 rounded-full border-2 shadow-sm ring-1 focus-visible:outline-none",
          index === 0 && "pointer-events-none ",
          "relative before:absolute before:w-3 before:h-3 before:bg-black before:rounded-full before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2"
        )}
      />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }