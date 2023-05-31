import { PropsWithChildren } from "react";
import { cubicBezier, motion } from "framer-motion";

export default function Reveal({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25, once: true }}
      transition={{
        duration: 0.5,
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
