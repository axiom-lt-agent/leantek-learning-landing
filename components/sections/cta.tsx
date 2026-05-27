"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.25, y: y * 0.25 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Link
          ref={ref}
          href={href}
          className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-500 px-10 text-base font-semibold text-white shadow-xl shadow-brand-500/25 transition-colors hover:bg-brand-400"
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function CTA() {
  const t = useTranslations("cta");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(56,189,248,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(217,70,239,0.1) 0%, transparent 50%)",
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-500/20 mb-8"
          >
            <Sparkles className="h-7 w-7 text-brand-300" />
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-brand-200/70 max-w-2xl mx-auto mb-10">
            {t("subtitle")}
          </p>

          <MagneticButton href="/signup">{t("button")}</MagneticButton>
        </motion.div>
      </Container>
    </section>
  );
}
