// Theme Colors and Utilities
export const themeColors = {
  // Text Gradients
  textGradient: "bg-gradient-to-r from-sky-600 to-teal-500 bg-clip-text text-transparent",
  
  // Background Gradients
  bgGradient: {
    light: "bg-gradient-to-br from-slate-50 to-gray-100",
    medium: "bg-gradient-to-r from-sky-100 to-teal-100",
    dark: "bg-gradient-to-r from-slate-800 to-slate-900",
    accent: "bg-gradient-to-r from-sky-500 to-teal-500"
  },

  // Button Gradients
  buttonGradient: "bg-gradient-to-r from-sky-500 to-teal-500",
  buttonGradientHover: "hover:from-sky-600 hover:to-teal-600",
  
  // Glass Effect
  glassEffect: "backdrop-blur-lg bg-white/90",
  
  // Border Gradients
  borderGradient: "border-transparent hover:border-sky-200",
  
  // Shadows
  shadow: "shadow-lg shadow-sky-100/50",
  shadowHover: "hover:shadow-xl hover:shadow-sky-200/50",
  
  // Interactive States
  interactive: {
    base: "transition-all duration-300 ease-in-out",
    hover: "hover:scale-[1.02]",
    active: "active:scale-[0.98]"
  },
  
  // Form Elements
  input: {
    base: "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white/50 transition-all",
    focus: "focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none",
    error: "border-red-300 focus:ring-red-500 focus:border-red-500"
  },

  // Card Styles
  card: {
    base: "bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl overflow-hidden",
    hover: "hover:bg-white/90 hover:border-sky-200/50",
    active: "bg-white/90 border-sky-200"
  },
  
  // Status Colors
  status: {
    success: "text-emerald-600 bg-emerald-50 border-emerald-100",
    warning: "text-amber-600 bg-amber-50 border-amber-100",
    error: "text-red-600 bg-red-50 border-red-100",
    info: "text-sky-600 bg-sky-50 border-sky-100"
  },
  
  // Animation Classes
  animation: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    pulse: "animate-pulse-slow",
    float: "animate-float"
  }
};

// Utility function to combine class names
export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
