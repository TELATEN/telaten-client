"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "task" | "milestone";
  title: string;
  points?: number;
  level?: string;
  message?: string;
}

export default function CelebrationModal({
  isOpen,
  onClose,
  type,
  title,
  points = 0,
  level,
  message,
}: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position before modal opens
      scrollPosition.current = window.scrollY;
      
      setShowConfetti(true);
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowConfetti(false);
      setShowContent(false);
      
      // Small delay to ensure modal is fully closed before restoring scroll
      setTimeout(() => {
        if (scrollPosition.current > 0) {
          window.scrollTo(0, scrollPosition.current);
          scrollPosition.current = 0;
        }
      }, 50);
    }
  }, [isOpen]);

  const isMilestone = type === "milestone";

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent
        className={cn(
          "max-w-md overflow-hidden border-0 p-0",
          "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <VisuallyHidden.Root>
          <DialogTitle>
            {isMilestone ? "Milestone Selesai" : "Task Selesai"}
          </DialogTitle>
          <DialogDescription>
            {title} - {points} points earned
          </DialogDescription>
        </VisuallyHidden.Root>
        
        {/* Animated Background Effects */}
        {showConfetti && (
          <>
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              >
                <Star
                  className="text-yellow-300 opacity-70"
                  size={8 + Math.random() * 12}
                  fill="currentColor"
                />
              </div>
            ))}

            {/* Sparkles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              >
                <Sparkles
                  className="text-white opacity-60"
                  size={6 + Math.random() * 10}
                />
              </div>
            ))}
          </>
        )}

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Icon */}
          <div
            className={cn(
              "mx-auto mb-6 transform transition-all duration-500",
              showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"
            )}
          >
            <div className="relative">
              <div
                className={cn(
                  "absolute inset-0 blur-2xl opacity-50",
                  isMilestone ? "bg-yellow-300" : "bg-white"
                )}
              />
              <div
                className={cn(
                  "relative w-24 h-24 mx-auto rounded-full flex items-center justify-center",
                  "bg-white/20 backdrop-blur-sm border-4 border-white/30",
                  "animate-bounce-slow"
                )}
              >
                {isMilestone ? (
                  <Trophy className="w-12 h-12 text-yellow-300" fill="currentColor" />
                ) : (
                  <CheckCircle2
                    className="w-12 h-12 text-green-300"
                    fill="currentColor"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <h2
            className={cn(
              "text-3xl font-bold text-white mb-2 transition-all duration-500 delay-100",
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            {isMilestone ? "🎉 Milestone Selesai!" : "✨ Task Selesai!"}
          </h2>

          {/* Task/Milestone Name */}
          <p
            className={cn(
              "text-white/90 text-lg mb-4 transition-all duration-500 delay-200",
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            {title}
          </p>

          {/* Points Card */}
          {points > 0 && (
            <div
              className={cn(
                "bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4",
                "border border-white/30 transition-all duration-500 delay-300",
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">
                    Points Earned
                  </p>
                  <p className="text-4xl font-bold text-white">+{points}</p>
                </div>
              </div>

              {level && (
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <Zap className="w-4 h-4 text-yellow-300" fill="currentColor" />
                    <span className="text-sm font-semibold">
                      Level: {level}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Message */}
          {message && (
            <p
              className={cn(
                "text-white/90 text-sm mb-6 transition-all duration-500 delay-400",
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              {message}
            </p>
          )}

          {/* Action Button */}
          <Button
            onClick={onClose}
            className={cn(
              "w-full bg-white text-purple-600 hover:bg-white/90 font-bold py-6 rounded-xl",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              "hover:scale-105",
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "500ms" }}
          >
            {isMilestone ? "Lanjutkan Petualangan!" : "Ayo Lanjut!"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
