"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Stat } from "@/lib/cms-data";

function Counter({
    target,
    suffix,
    duration = 2000,
}: {
    target: number;
    suffix: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!inView) return;
        const start = Date.now();
        const end = start + duration;
        const tick = () => {
            const now = Date.now();
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, target, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString("en-GB")}
            {suffix}
        </span>
    );
}

interface StatsCounterProps {
    stats: Stat[];
}

export default function StatsCounter({ stats }: StatsCounterProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="text-center"
                >
                    <p className="text-4xl md:text-5xl font-black text-white">
                        <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-gray-400 font-medium uppercase tracking-wider">
                        {stat.label}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
