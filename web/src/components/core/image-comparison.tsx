"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

interface ImageComparisonContextType {
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ImageComparisonContext = createContext<ImageComparisonContextType | undefined>(
  undefined
);

export function useImageComparison() {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error(
      "useImageComparison must be used within an ImageComparison component"
    );
  }
  return context;
}

export interface ImageComparisonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultValue?: number;
  enableHover?: boolean;
}

export function ImageComparison({
  children,
  className,
  defaultValue = 50,
  enableHover = false,
  ...props
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [handleMove, isDragging]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging || enableHover) {
        handleMove(e.clientX);
      }
    },
    [handleMove, isDragging, enableHover]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <ImageComparisonContext.Provider
      value={{
        sliderPosition,
        setSliderPosition,
        isDragging,
        setIsDragging,
        containerRef,
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative select-none overflow-hidden cursor-ew-resize",
          className
        )}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        {...props}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

export interface ImageComparisonImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  position: "left" | "right";
  children?: React.ReactNode;
}

export function ImageComparisonImage({
  src,
  alt = "",
  position,
  className,
  children,
  ...props
}: ImageComparisonImageProps) {
  const { sliderPosition } = useImageComparison();

  // Inset clipping formula:
  // position === 'left' -> reveal 0% to sliderPosition%
  // position === 'right' -> reveal sliderPosition% to 100%
  const clipPath =
    position === "left"
      ? `inset(0 ${100 - sliderPosition}% 0 0)`
      : `inset(0 0 0 ${sliderPosition}%)`;

  return (
    <div
      className={cn(
        "absolute inset-0 size-full overflow-hidden pointer-events-none transition-all duration-75",
        className
      )}
      style={{ clipPath }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover select-none pointer-events-none"
          {...props}
        />
      ) : (
        children
      )}
    </div>
  );
}

export interface ImageComparisonSliderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  labelLeft?: string;
  labelRight?: string;
}

export function ImageComparisonSlider({
  className,
  children,
  labelLeft,
  labelRight,
  ...props
}: ImageComparisonSliderProps) {
  const { sliderPosition } = useImageComparison();

  return (
    <div
      className={cn(
        "absolute top-0 bottom-0 w-0.5 z-30 pointer-events-none bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]",
        className
      )}
      style={{ left: `${sliderPosition}%` }}
      {...props}
    >
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-10 rounded-full bg-neutral-950 text-white shadow-2xl border-2 border-emerald-400 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform duration-150">
        {children || (
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l-4 3 4 3m8-6l4 3-4 3"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export function ImageComparisonBasic() {
  return (
    <ImageComparison className="aspect-16/10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800">
      <ImageComparisonImage
        src="/mp_dark.png"
        alt="Motion Primitives Dark"
        position="left"
      />
      <ImageComparisonImage
        src="/mp_light.png"
        alt="Motion Primitives Light"
        position="right"
      />
      <ImageComparisonSlider className="bg-white" />
    </ImageComparison>
  );
}
