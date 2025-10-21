import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

export const TextReveal = ({ children, className }) => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")
  
  // Add overall container transform - faster transition
  const containerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const containerScale = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.98, 1, 1, 0.98])

  return (
    <motion.div 
      ref={targetRef} 
      className={cn("relative z-0 h-[150vh] bg-black", className)}
      style={{
        opacity: containerOpacity,
        scale: containerScale
      }}
    >
      <div
        className={
          "sticky top-0 mx-auto flex h-screen max-w-5xl items-center justify-center bg-transparent px-[1rem] py-[2rem]"
        }>
        <span
          ref={targetRef}
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-white md:p-6 md:text-3xl lg:p-8 lg:text-4xl xl:text-5xl"
          }>
          {words.map((word, i) => {
            // Quick transition to white when scrolling in middle of screen
            const start = (i / words.length) * 0.62
            const end = Math.min(1, start + 0.05)
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </motion.div>
  );
}

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const scale = useTransform(progress, range, [0.9, 1])
  const glow = useTransform(progress, range, [0, 1.5])
  const brightness = useTransform(progress, range, [0, 1])
  const backgroundOpacity = useTransform(progress, range, [0.3, 0.05])
  const contrast = useTransform(progress, range, [0.8, 1])
  
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span 
        className="absolute text-white/30"
        style={{ opacity: backgroundOpacity }}
      >
        {children}
      </span>
      <motion.span 
  style={{ 
    opacity: opacity,
    scale: scale,
    filter: `drop-shadow(0 0 ${glow}px rgba(255,255,255,1)) brightness(${brightness}) contrast(${contrast})`, 
    color: 'white',
    textShadow: `0 0 ${glow}px rgba(255,255,255,0.8), 0 0 ${glow * 1.5}px rgba(255,255,255,0.4)`
  }} 
  className={"font-bold"}
>
  {children}
</motion.span>


    </span>
  );
}
