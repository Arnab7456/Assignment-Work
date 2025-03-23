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
  const [internalValue, setInternalValue] = React.useState(() => {
    if (isControlled && Array.isArray(valueProp)) return valueProp
    if (Array.isArray(defaultValue)) return defaultValue
    return [min, max]
  })

  const values = isControlled ? valueProp : internalValue

  const handleValueChange = (newValues: number[]) => {
    if (isControlled) {
      onValueChange?.(newValues)
    } else {
      setInternalValue(newValues)
      onValueChange?.(newValues)
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
          "relative w-full h-1 rounded-full bg-gray-200"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-black absolute h-full rounded-full"
          )}
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "block h-5 w-5 rounded-full border-2 border-black bg-white ring-1 ring-black focus-visible:outline-none",
            "relative after:absolute after:w-3 after:h-3 after:bg-black after:rounded-full after:left-1/2 after:top-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }