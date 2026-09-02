import type { Transition, Variants } from 'framer-motion'

export const motionEase = [0.2, 0.8, 0.2, 1] as const

export const defaultTransition: Transition = {
  duration: 0.5,
  ease: motionEase,
}

export const fastTransition: Transition = {
  duration: 0.3,
  ease: motionEase,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: motionEase },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.35, ease: motionEase },
  },
}

export const viewportOnce = { once: true, margin: '-40px' as const }

export function motionProps(reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      initial: false as const,
      animate: undefined,
      whileInView: undefined,
      transition: { duration: 0 },
    }
  }

  return {}
}
