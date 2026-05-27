"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { HeroBackground } from "./hero-background";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden py-16">
      <HeroBackground />

      <Container className="relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-300 backdrop-blur-sm border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-brand-200/80 md:text-xl"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-500 px-8 text-sm font-semibold text-white transition-all hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/25"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/curriculum"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3"
          >
            <motion.div
              variants={statsVariants}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <Users className="h-5 w-5 text-brand-300" />
              <div className="text-lg font-bold text-white">{t("stats.students")}</div>
            </motion.div>
            <motion.div
              variants={statsVariants}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <Star className="h-5 w-5 text-brand-300" />
              <div className="text-lg font-bold text-white">{t("stats.rating")}</div>
            </motion.div>
            <motion.div
              variants={statsVariants}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <BookOpen className="h-5 w-5 text-brand-300" />
              <div className="text-lg font-bold text-white">{t("stats.courses")}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
