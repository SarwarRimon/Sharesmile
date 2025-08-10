// Theme constants for consistent design
export const themeColors = {
  // Background gradients
  bgGradient: "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",
  bgGradientDarker: "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100",
  bgGradientHover: "hover:bg-gradient-to-br hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100",
  
  // Text gradients
  textGradient: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
  textGradientHover: "hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent",
  
  // Button gradients
  buttonGradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  buttonGradientHover: "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
  
  // Border gradients
  borderGradient: "border-purple-100",
  borderGradientHover: "hover:border-purple-200",
  
  // Glass effect
  glassEffect: "bg-white/80 backdrop-blur-sm",
  
  // Shadows
  shadow: "shadow-xl",
  shadowHover: "hover:shadow-2xl",
  
  // Animations
  animation: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    slideDown: "animate-slide-down",
    slideInLeft: "animate-slide-in-left",
    scale: "animate-scale",
    float: "animate-float",
    pulseSlow: "animate-pulse-slow",
  },
  
  // Interactive elements
  interactive: {
    base: "transition-all duration-300",
    hover: "hover:scale-[1.02]",
    active: "active:scale-[0.98]",
  },
  
  // Icons
  icon: {
    gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    text: "text-white",
    size: "h-10 w-10",
    rounded: "rounded-xl",
  },
};

// Helper function to combine theme classes
export const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
