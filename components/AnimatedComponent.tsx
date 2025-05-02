"use client";

import {motion, Variants} from "framer-motion";

export const FadeIn = ({
 children,
 className = "",
 delay = 0,
 duration = 0.5,
}: {
 children: React.ReactNode;
 className?: string;
 delay?: number;
 duration?: number;
}) => {
 return (
  <motion.div
   initial={{opacity: 0, y: 20}}
   animate={{opacity: 1, y: 0}}
   transition={{duration, delay}}
   className={className}>
   {children}
  </motion.div>
 );
};

export const StaggerContainer = ({
 children,
 className = "",
 staggerChildren = 0.1,
}: {
 children: React.ReactNode;
 className?: string;
 staggerChildren?: number;
}) => {
 const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {
   opacity: 1,
   transition: {
    staggerChildren: staggerChildren,
   },
  },
 };

 return (
  <motion.div
   variants={containerVariants}
   initial="hidden"
   animate="show"
   className={className}>
   {children}
  </motion.div>
 );
};

export const MotionDiv = motion.div;
export const MotionButton = motion.button;