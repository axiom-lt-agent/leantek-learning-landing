"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Route, Hammer, MessageSquare, Rocket } from "lucide-react";

const steps = [
  { key: "1" as const, icon: Route, color: "bg-brand-500", border: "border-brand-500" },
  { key: "2" as const, icon: Hammer, color: "bg-accent-500", border: "border-accent-500" },
  { key: "3" as const, icon: MessageSquare, color: "bg-emerald-500", border: "border-emerald-500" },
  { key: "4" as const, icon: Rocket, color: "bg-amber-500", border: "border-amber-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-muted/30" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.key}
                  variants={itemVariants}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 md:items-center ${
                    index > 0 ? "md:mt-12" : ""
                  }`}
                >
                  {/* Content side */}
                  <div
                    className={`${
                      isEven ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 mb-3 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${step.color} text-white shadow-lg`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Step {step.key}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center`}
                    style={{ top: `${index * 144 + 20}px` }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.2, duration: 0.4, type: "spring" }}
                      className={`h-5 w-5 rounded-full border-4 border-background ${step.color}`}
                    />
                  </div>

                  {/* Empty side for alignment */}
                  <div className={isEven ? "md:col-start-2" : "md:col-start-1 md:row-start-1"} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
