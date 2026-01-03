import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function AviationButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  icon: Icon,
  disabled = false 
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30',
    secondary: 'bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white shadow-lg border border-white/50',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300",
        "flex items-center justify-center gap-3",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
}