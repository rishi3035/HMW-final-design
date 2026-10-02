import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Play, Pause } from "lucide-react";

interface KotaReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KotaReelModal: React.FC<KotaReelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
        >
          {/* Top Bar */}
          <div className="absolute top-6 inset-x-6 sm:inset-x-12 flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-400">[ 00:44 ]</span>
              <span className="font-extrabold text-sm tracking-tight">KOTA 2026 SHOWREEL</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
                title="Close Reel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Reel Viewport */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-5xl aspect-video rounded-[32px] overflow-hidden bg-neutral-900 border border-white/15 shadow-2xl flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Visual Canvas Representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-indigo-950 opacity-90 flex items-center justify-center overflow-hidden">
              <div className="absolute w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse" />

              <div className="relative text-center z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white">
                  <span>MOTION REEL · 60 FPS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  Crafting Digital Impact
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono">
                  Framer • 3D Motion • WebGL • Kinetic Typography
                </p>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="relative z-20 flex items-center justify-between text-xs font-mono text-white mt-auto pt-6 border-t border-white/10 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-2xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <span>00:18 / 00:44</span>
              </div>

              {/* Fake Audio Bars */}
              <div className="flex items-center gap-1 h-4">
                {[4, 12, 8, 16, 10, 6, 14, 18, 8, 12].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? { height: [h, Math.max(3, (h * 1.5) % 18), h] }
                        : { height: 3 }
                    }
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.1 }}
                    className="w-1 bg-white/80 rounded-full"
                  />
                ))}
              </div>

              <div className="hidden sm:block text-neutral-400">
                Press [ESC] to exit
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
