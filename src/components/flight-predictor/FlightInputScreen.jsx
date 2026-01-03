import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2,
  Hash,
  ChevronDown,
  Search,
  Loader2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import AviationButton from './AviationButton';

const AIRLINES = [
  { code: 'AA', name: 'American Airlines' },
  { code: 'DL', name: 'Delta Air Lines' },
  { code: 'UA', name: 'United Airlines' },
    { code: 'WN', name: 'Southwest Airlines' },
    { code: 'B6', name: 'JetBlue Airways' },
  { code: 'AS', name: 'Alaska Airlines' },
  { code: 'NK', name: 'Spirit Airlines' },
  { code: 'F9', name: 'Frontier Airlines' },
  { code: 'HA', name: 'Hawaiian Airlines' },
    { code: 'G4', name: 'Allegiant Air' },
];

const AIRPORTS = [
  // United States - major hubs
  { code: 'ATL', name: 'Hartsfield–Jackson Atlanta International Airport', city: 'Atlanta' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York' },
  { code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles' },
  { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco' },
  { code: 'OAK', name: 'Oakland International Airport', city: 'Oakland' },
  { code: 'SJC', name: 'San Jose International Airport', city: 'San Jose' },
  { code: 'SAN', name: 'San Diego International Airport', city: 'San Diego' },
  { code: 'SEA', name: 'Seattle–Tacoma International Airport', city: 'Seattle' },
  { code: 'PDX', name: 'Portland International Airport', city: 'Portland' },
  { code: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas' },
  { code: 'DEN', name: 'Denver International Airport', city: 'Denver' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago' },
  { code: 'MDW', name: 'Midway International Airport', city: 'Chicago' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas' },
  { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas' },
  { code: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston' },
  { code: 'HOU', name: 'William P. Hobby Airport', city: 'Houston' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix' },
  { code: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte' },
  { code: 'RDU', name: 'Raleigh–Durham International Airport', city: 'Raleigh' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami' },
  { code: 'TPA', name: 'Tampa International Airport', city: 'Tampa' },
  { code: 'MCO', name: 'Orlando International Airport', city: 'Orlando' },
  { code: 'BOS', name: 'Logan International Airport', city: 'Boston' },
  { code: 'BWI', name: 'Baltimore/Washington International Thurgood Marshall Airport', city: 'Baltimore' },
  { code: 'MSP', name: 'Minneapolis–Saint Paul International Airport', city: 'Minneapolis' },
  { code: 'DTW', name: 'Detroit Metropolitan Wayne County Airport', city: 'Detroit' },
  { code: 'CLE', name: 'Cleveland Hopkins International Airport', city: 'Cleveland' },
  { code: 'PIT', name: 'Pittsburgh International Airport', city: 'Pittsburgh' },
  { code: 'STL', name: 'St. Louis Lambert International Airport', city: 'St. Louis' },
  { code: 'IND', name: 'Indianapolis International Airport', city: 'Indianapolis' },
  { code: 'SLC', name: 'Salt Lake City International Airport', city: 'Salt Lake City' },
  { code: 'CMH', name: 'John Glenn Columbus International Airport', city: 'Columbus' },
  { code: 'BNA', name: 'Nashville International Airport', city: 'Nashville' },

  // Canada
  { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto' },
  { code: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver' },
  { code: 'YUL', name: 'Montréal–Trudeau International Airport', city: 'Montreal' },
  { code: 'YYC', name: 'Calgary International Airport', city: 'Calgary' },

  // Mexico & Caribbean
  { code: 'MEX', name: 'Mexico City International Airport', city: 'Mexico City' },
  { code: 'CUN', name: 'Cancún International Airport', city: 'Cancún' },
  { code: 'GDL', name: 'Guadalajara International Airport', city: 'Guadalajara' },

  // Central & South America
  { code: 'GRU', name: 'São Paulo–Guarulhos International Airport', city: 'São Paulo' },
  { code: 'EZE', name: 'Ministro Pistarini International Airport', city: 'Buenos Aires' },
  { code: 'LIM', name: 'Jorge Chávez International Airport', city: 'Lima' },
  { code: 'BOG', name: 'El Dorado International Airport', city: 'Bogotá' },
  { code: 'SCL', name: 'Arturo Merino Benítez International Airport', city: 'Santiago' },

  // Europe
  { code: 'LHR', name: 'Heathrow Airport', city: 'London' },
  { code: 'LGW', name: 'Gatwick Airport', city: 'London' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris' },
  { code: 'ORY', name: 'Paris Orly Airport', city: 'Paris' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich' },
  { code: 'BCN', name: 'Barcelona–El Prat Airport', city: 'Barcelona' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid' },
  { code: 'LYS', name: 'Lyon–Saint-Exupéry Airport', city: 'Lyon' },
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublin' },
  { code: 'LIS', name: 'Lisbon Humberto Delgado Airport', city: 'Lisbon' },

  // Asia
  { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo' },
  { code: 'KIX', name: 'Kansai International Airport', city: 'Osaka' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul' },
  { code: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai' },
  { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing' },
  { code: 'CAN', name: 'Guangzhou Baiyun International Airport', city: 'Guangzhou' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore' },
  { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai' },

  // Middle East
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha' },
  { code: 'JED', name: 'King Abdulaziz International Airport', city: 'Jeddah' },
  { code: 'RUH', name: 'King Khalid International Airport', city: 'Riyadh' },

  // Africa
  { code: 'JNB', name: 'O. R. Tambo International Airport', city: 'Johannesburg' },
  { code: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town' },
  { code: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi' },

  // Oceania
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne' },
  { code: 'BNE', name: 'Brisbane Airport', city: 'Brisbane' },
  { code: 'AKL', name: 'Auckland Airport', city: 'Auckland' },

  // Regional & others
  { code: 'SJU', name: 'Luis Muñoz Marín International Airport', city: 'San Juan' },
];

const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00', '23:30',
];

export default function FlightInputScreen({ onBack, onPredictPress, loading = false }) {
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: null,
    departureTime: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      if (field === 'flightNumber') {
        // Remove any leading airline code if the user pasted or typed it (e.g., "AA123")
        const airlineCode = (prev.airline || '').toUpperCase();
        let cleaned = String(value || '').toUpperCase();
        // Remove spaces
        cleaned = cleaned.replace(/\s+/g, '');
        if (airlineCode && cleaned.startsWith(airlineCode)) {
          cleaned = cleaned.slice(airlineCode.length);
        }
        // Also strip any leading non-alphanumeric characters
        cleaned = cleaned.replace(/^[^A-Z0-9]+/, '');
        return { ...prev, [field]: cleaned };
      }

      if (field === 'airline') {
        // If airline changes and flightNumber includes the previous airline code, strip it
        const prevFlight = prev.flightNumber || '';
        const newAirline = String(value || '').toUpperCase();
        let cleanedFlight = prevFlight;
        // If prev flight started with a 2-3 letter code + numbers, remove it
        const match = cleanedFlight.match(/^([A-Z]{1,3})([0-9].*)$/);
        if (match) {
          // If the code matches the new airline, drop it
          if (match[1] === newAirline) {
            cleanedFlight = (match[2] || '').replace(/\s+/g, '').toUpperCase();
          }
        }
        return { ...prev, [field]: value, flightNumber: cleanedFlight };
      }

      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = () => {
    // Placeholder function - backend will be connected later
    onPredictPress(formData);
  };

  const isFormValid = formData.airline && 
    formData.flightNumber && 
    formData.departureAirport && 
    formData.arrivalAirport && 
    formData.departureDate && 
    formData.departureTime;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white">
        <div className="max-w-lg mx-auto px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Plane className="w-6 h-6 text-white rotate-[-30deg]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Flight Details</h1>
              <p className="text-blue-100 text-sm">Enter your flight information</p>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Wave */}
        <svg className="w-full h-6 -mb-1" viewBox="0 0 1200 30" preserveAspectRatio="none">
          <path 
            d="M0,30 L0,15 Q300,0 600,15 T1200,15 L1200,30 Z" 
            fill="#f8fafc"
          />
        </svg>
      </div>

      {/* Form Content */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {/* Airline Selection */}
          <motion.div variants={itemVariants}>
            <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Airline
            </Label>
            <Select value={formData.airline} onValueChange={(v) => handleChange('airline', v)}>
              <SelectTrigger className="h-14 rounded-xl bg-white border-slate-200 shadow-sm">
                <SelectValue placeholder="Select Airline" />
              </SelectTrigger>
              <SelectContent>
                {AIRLINES.map(airline => (
                  <SelectItem key={airline.code} value={airline.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">{airline.code}</span>
                      <span>{airline.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Flight Number */}
          <motion.div variants={itemVariants}>
            <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-600" />
              Flight Number
            </Label>
            <Input
              value={formData.flightNumber}
              onChange={(e) => handleChange('flightNumber', e.target.value)}
              placeholder="e.g., 1234 (no airline code)"
              className="h-14 rounded-xl bg-white border-slate-200 shadow-sm text-lg"
            />
          </motion.div>

          {/* Airport Selection Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Departure Airport */}
            <div>
              <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                From
              </Label>
              <Select value={formData.departureAirport} onValueChange={(v) => handleChange('departureAirport', v)}>
                <SelectTrigger className="h-14 rounded-xl bg-white border-slate-200 shadow-sm">
                  <SelectValue placeholder="Departure" />
                </SelectTrigger>
                <SelectContent>
                  {AIRPORTS.map(airport => (
                    <SelectItem key={airport.code} value={airport.code}>
                      <div className="flex flex-col">
                        <span className="font-semibold">{airport.code}</span>
                        <span className="text-xs text-slate-500">{airport.city}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Arrival Airport */}
            <div>
              <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                To
              </Label>
              <Select value={formData.arrivalAirport} onValueChange={(v) => handleChange('arrivalAirport', v)}>
                <SelectTrigger className="h-14 rounded-xl bg-white border-slate-200 shadow-sm">
                  <SelectValue placeholder="Arrival" />
                </SelectTrigger>
                <SelectContent>
                  {AIRPORTS.filter(a => a.code !== formData.departureAirport).map(airport => (
                    <SelectItem key={airport.code} value={airport.code}>
                      <div className="flex flex-col">
                        <span className="font-semibold">{airport.code}</span>
                        <span className="text-xs text-slate-500">{airport.city}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Flight Route Visual */}
          {formData.departureAirport && formData.arrivalAirport && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-4 border border-blue-100"
            >
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">{formData.departureAirport}</div>
                  <div className="text-xs text-slate-500">
                    {AIRPORTS.find(a => a.code === formData.departureAirport)?.city}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center px-4">
                  <div className="w-full h-px bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 relative">
                    <Plane className="w-5 h-5 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">{formData.arrivalAirport}</div>
                  <div className="text-xs text-slate-500">
                    {AIRPORTS.find(a => a.code === formData.arrivalAirport)?.city}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Date and Time Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Picker */}
            <div>
              <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Departure Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-xl bg-white border-slate-200 shadow-sm justify-start text-left font-normal"
                  >
                    {formData.departureDate ? (
                      <span className="text-slate-900">{format(formData.departureDate, "PPP")}</span>
                    ) : (
                      <span className="text-slate-400">Select date</span>
                    )}
                    <ChevronDown className="ml-auto h-4 w-4 text-slate-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.departureDate}
                    onSelect={(date) => handleChange('departureDate', date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Picker (HH:MM) */}
            <div>
              <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Departure Time <span className="text-xs text-slate-400 ml-2">(HH:MM)</span>
              </Label>
              <Input
                type="time"
                value={formData.departureTime}
                onChange={(e) => handleChange('departureTime', e.target.value)}
                step={300}
                className="h-14 rounded-xl bg-white border-slate-200 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <AviationButton
              onClick={handleSubmit}
              variant="danger"
              icon={loading ? undefined : Search}
              disabled={!isFormValid || loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Flight...
                </span>
              ) : (
                'Predict Delay'
              )}
            </AviationButton>
            
            {!isFormValid && (
              <p className="text-center text-sm text-slate-400 mt-3">
                Please fill in all fields to continue
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}