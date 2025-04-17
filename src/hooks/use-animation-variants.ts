export const useAnimationVariants = () => {
  return {
    fadeIn: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    scaleIn: {
      hidden: { scale: 0, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
  };
};
