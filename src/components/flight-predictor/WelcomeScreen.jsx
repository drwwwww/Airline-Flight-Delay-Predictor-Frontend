import React from 'react';
import { motion } from 'framer-motion';
import { Plane, ArrowRight, Cloud } from 'lucide-react';
import AviationButton from './AviationButton';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      {/* Animated Clouds Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cloud Layer 1 - Far */}
        <motion.div
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 opacity-60"
        >
          <Cloud className="w-32 h-32 text-white fill-white" />
        </motion.div>
        
        <motion.div
          animate={{ x: [0, -80, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 opacity-50"
        >
          <Cloud className="w-24 h-24 text-white fill-white" />
        </motion.div>

        <motion.div
          animate={{ x: [0, 60, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-60 left-1/3 opacity-40"
        >
          <Cloud className="w-40 h-40 text-white fill-white" />
        </motion.div>

        <motion.div
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-1/4 opacity-30"
        >
          <Cloud className="w-36 h-36 text-white fill-white" />
        </motion.div>

        {/* Animated Plane */}
        <motion.div
          initial={{ x: '-100%', y: '100%' }}
          animate={{ x: '200%', y: '-100%' }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
          className="absolute top-1/2 left-0"
        >
          <Plane className="w-8 h-8 text-white/60 rotate-[-30deg]" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Plane Icon Circle */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-8 w-28 h-28 rounded-full bg-white shadow-2xl shadow-blue-500/30 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <Plane className="w-10 h-10 text-white rotate-[-30deg]" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Fly
            <span className="inline text-blue-900">Smart.ai</span>
          </h1>

          {/* Red Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '10rem' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full mb-6"
          />
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-md w-full"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-blue-900/20 border border-white/50">
            <p className="text-slate-600 text-center text-lg leading-relaxed mb-8">
              Get an instant prediction of whether your flight is likely to be delayed. 
              <span className="block mt-2 font-medium text-slate-800">
                Enter your flight details to begin.
              </span>
            </p>

            <AviationButton
              onClick={onStart}
              variant="primary"
              icon={ArrowRight}
              className="w-full"
            >
              Start Prediction
            </AviationButton>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center gap-8 mt-8 text-white/80"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">AI</div>
              <div className="text-xs uppercase tracking-wider">Powered</div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">Real</div>
              <div className="text-xs uppercase tracking-wider">Time Data</div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">81%</div>
              <div className="text-xs uppercase tracking-wider">Accuracy</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}