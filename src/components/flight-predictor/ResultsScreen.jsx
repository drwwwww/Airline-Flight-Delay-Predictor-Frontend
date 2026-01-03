import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Home, 
  Clock, 
  AlertCircle,
  ArrowLeft,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import AviationButton from './AviationButton';

export default function ResultsScreen({ flightData, onBackToHome, onTryAnother }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 -right-20 w-64 h-64 bg-red-500 rounded-full blur-3xl"
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onTryAnother}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Form</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">Your Prediction</h1>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-slate-400">Flight delay analysis results</p>
          </motion.div>

          {/* Flight Info Card (if data exists) */}
          {flightData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md mb-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between text-white">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{flightData.departureAirport}</div>
                    <div className="text-xs text-slate-400">Departure</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent relative">
                      <motion.div
                        animate={{ x: ['-50%', '150%', '-50%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 -translate-y-1/2"
                      >
                        <Plane className="w-4 h-4 text-white rotate-90" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{flightData.arrivalAirport}</div>
                    <div className="text-xs text-slate-400">Arrival</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-4 text-sm text-slate-300">
                  <span className="font-semibold text-blue-400">{flightData.airline} {flightData.flightNumber}</span>
                  <span>•</span>
                  <span>{flightData.departureTime}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Placeholder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">Delay Prediction</h2>
                    <p className="text-blue-100 text-sm">ML Model Results</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {flightData && flightData.prediction ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <div className="text-6xl font-bold text-blue-600">
                        {Math.round(flightData.prediction.delayed_probability * 100)}%
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {flightData.prediction.delayed_bool ? 'Flight likely delayed' : 'Flight likely on time'}
                    </h3>

                    <p className="text-slate-500 leading-relaxed mb-6">
                      {Math.round(flightData.prediction.delayed_probability * 100)}% probability of delay
                    </p>

                    <div className="w-full grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{Math.round(flightData.prediction.delayed_probability * 100)}%</div>
                        <div className="text-xs text-slate-400">Delay Probability</div>
                      </div>
                      <div className="text-center border-l border-slate-200">
                        <div className="text-2xl font-bold text-slate-900">{flightData.prediction.delayed_bool ? 'YES' : 'NO'}</div>
                        <div className="text-xs text-slate-400">Prediction</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center mb-6"
                    >
                      <AlertCircle className="w-8 h-8 text-slate-300" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      Awaiting Backend Connection
                    </h3>
                    
                    <p className="text-slate-500 leading-relaxed mb-6">
                      Prediction results will appear here once the backend ML model is connected.
                    </p>

                    {/* Placeholder Stats */}
                    <div className="w-full grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-300">--%</div>
                        <div className="text-xs text-slate-400">Delay Chance</div>
                      </div>
                      <div className="text-center border-x border-slate-200">
                        <div className="text-2xl font-bold text-slate-300">--</div>
                        <div className="text-xs text-slate-400">Est. Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-300">--</div>
                        <div className="text-xs text-slate-400">Confidence</div>
                      </div>
                    </div>
                  </div>
                )}

                
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md"
          >
            <AviationButton
              onClick={onTryAnother}
              variant="secondary"
              icon={RefreshCw}
              className="flex-1"
            >
              Try Another Flight
            </AviationButton>
            
            <AviationButton
              onClick={onBackToHome}
              variant="primary"
              icon={Home}
              className="flex-1"
            >
              Back to Home
            </AviationButton>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 text-center">
          <p className="text-slate-500 text-sm">
            Powered by Machine Learning
          </p>
        </div>
      </div>
    </div>
  );
}