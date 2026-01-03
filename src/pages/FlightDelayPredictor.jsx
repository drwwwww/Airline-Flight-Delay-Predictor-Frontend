import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/flight-predictor/WelcomeScreen';
import FlightInputScreen from '@/components/flight-predictor/FlightInputScreen';
import ResultsScreen from '@/components/flight-predictor/ResultsScreen';
import { toast } from '@/components/ui/use-toast';

export default function FlightDelayPredictor() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Connect to backend predict endpoint
  const onPredictPress = async (formData) => {
    console.log('Predict pressed with data:', formData);
    setLoading(true);
    const base = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const parseTime = (timeStr) => {
      if (!timeStr || typeof timeStr !== 'string') return null;
      const t = timeStr.trim();
      // Match HH:MM or HH:MM AM/PM (case-insensitive)
      const m = t.match(/^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/);
      if (!m) return null;
      let hours = parseInt(m[1], 10);
      const minutes = parseInt(m[2], 10);
      const ampm = m[3];
      if (ampm) {
        if (/pm/i.test(ampm) && hours !== 12) hours += 12;
        if (/am/i.test(ampm) && hours === 12) hours = 0;
      }
      if (Number.isNaN(hours) || Number.isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
      return { hours, minutes };
    };

    const combineDateTime = (date, time) => {
      const parsed = parseTime(time);
      if (!parsed) throw new Error('Invalid time format. Please enter time as HH:MM (24-hour) or HH:MM AM/PM.');
      const { hours, minutes } = parsed;
      const d = new Date(date);
      d.setHours(hours, minutes, 0, 0);
      if (isNaN(d.getTime())) throw new Error('Invalid date or time');
      return d.toISOString();
    };

    try {
      const departure_datetime = combineDateTime(formData.departureDate, formData.departureTime);
      const payload = {
        airline: formData.airline,
        flightNumber: formData.flightNumber,
        departureAirport: formData.departureAirport,
        arrivalAirport: formData.arrivalAirport,
        departure_datetime,
      };

      const res = await fetch(`${base}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || res.statusText);
      }

      const data = await res.json();
      // store both the original payload and prediction response
      setFlightData({ ...payload, prediction: data });
      setCurrentScreen('results');
    } catch (err) {
      console.error(err);
      toast({ title: 'Prediction failed', description: err.message || 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setCurrentScreen('input');
  };

  const handleBackToHome = () => {
    setFlightData(null);
    setCurrentScreen('welcome');
  };

  const handleTryAnother = () => {
    setFlightData(null);
    setCurrentScreen('input');
  };

  const handleBackFromInput = () => {
    setCurrentScreen('welcome');
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <motion.div
            key="welcome"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentScreen === 'input' && (
          <motion.div
            key="input"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FlightInputScreen 
              onBack={handleBackFromInput}
              onPredictPress={onPredictPress}
              loading={loading}
            />
          </motion.div>
        )}

        {currentScreen === 'results' && (
          <motion.div
            key="results"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ResultsScreen 
              flightData={flightData}
              onBackToHome={handleBackToHome}
              onTryAnother={handleTryAnother}
            />
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}