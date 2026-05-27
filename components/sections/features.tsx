"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Users, Award, MessageCircle } from "lucide-react";

const featuresList = [
  {
    key: "handsOn" as const,
    icon: Code2,
    color: "text-brand-500",
    bg: "bg-brand-500/10",
  },
  {
    key: "mentorship" as const,
    icon: Users,
    color: "text-accent-500",
    bg: "bg-accent-500/10",
  },
  {
    key: "community" as const,
    icon: MessageCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    key: "certification" as const,
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function Features() {
  const t = useTranslations("features");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background" ref={ref}>
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}
                >
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`items.${feature.key}.description`)}
                </p>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-500/20 transition-colors" />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
