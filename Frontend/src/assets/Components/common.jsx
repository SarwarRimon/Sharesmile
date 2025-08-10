import React from 'react';
import { themeColors, combineClasses } from './theme';

// Gradient Text Component
export const GradientText = ({ children, className, as: Component = 'span' }) => (
  <Component className={combineClasses(themeColors.textGradient, className)}>
    {children}
  </Component>
);

// Section Header Component
export const SectionHeader = ({ children, className }) => (
  <h2 className={combineClasses(
    "text-3xl font-bold mb-6",
    themeColors.textGradient,
    themeColors.animation.slideUp,
    className
  )}>
    {children}
  </h2>
);

// Card Component
export const Card = ({ children, className, hover = true }) => (
  <div className={combineClasses(
    themeColors.glassEffect,
    "rounded-2xl p-6 border",
    themeColors.borderGradient,
    themeColors.shadow,
    hover && themeColors.shadowHover,
    hover && themeColors.interactive.base,
    hover && themeColors.interactive.hover,
    className
  )}>
    {children}
  </div>
);

// Button Component
export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: combineClasses(
      themeColors.buttonGradient,
      "text-white",
      themeColors.buttonGradientHover,
    ),
    secondary: combineClasses(
      "bg-white",
      themeColors.borderGradient,
      themeColors.textGradient,
    ),
    outline: combineClasses(
      "border-2",
      themeColors.borderGradient,
      themeColors.textGradientHover,
    ),
  };

  return (
    <button
      className={combineClasses(
        "px-6 py-2 rounded-xl font-medium",
        themeColors.interactive.base,
        themeColors.interactive.hover,
        themeColors.shadow,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Icon Container Component
export const IconContainer = ({ children, className }) => (
  <div className={combineClasses(
    themeColors.icon.gradient,
    themeColors.icon.size,
    themeColors.icon.rounded,
    "flex items-center justify-center",
    themeColors.interactive.base,
    themeColors.interactive.hover,
    className
  )}>
    {children}
  </div>
);

// Badge Component
export const Badge = ({ children, variant = 'primary', className }) => {
  const variants = {
    primary: "from-indigo-500 to-purple-500",
    success: "from-green-500 to-emerald-500",
    warning: "from-yellow-500 to-orange-500",
    danger: "from-red-500 to-pink-500",
  };

  return (
    <span className={combineClasses(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      "bg-gradient-to-r",
      variants[variant],
      "text-white",
      className
    )}>
      {children}
    </span>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ className }) => (
  <div className={combineClasses(
    "flex flex-col items-center justify-center",
    className
  )}>
    <div className="relative">
      <div className={combineClasses(
        "h-16 w-16 rounded-xl",
        "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20",
        themeColors.animation.pulseSlow
      )}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
      </div>
    </div>
    <p className="mt-4 text-gray-500 animate-pulse">Loading...</p>
  </div>
);

// Empty State Component
export const EmptyState = ({ icon, title, description, className }) => (
  <div className={combineClasses(
    "flex flex-col items-center justify-center p-8 text-center",
    className
  )}>
    <div className={combineClasses(
      "h-20 w-20 rounded-2xl mb-4",
      "bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20",
      "flex items-center justify-center text-4xl",
      themeColors.animation.float
    )}>
      {icon}
    </div>
    <h3 className={combineClasses(
      "text-xl font-semibold mb-2",
      themeColors.textGradient
    )}>
      {title}
    </h3>
    {description && (
      <p className="text-gray-500">{description}</p>
    )}
  </div>
);
