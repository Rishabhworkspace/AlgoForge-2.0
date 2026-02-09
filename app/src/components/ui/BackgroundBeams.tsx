"use client";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!beamsRef.current) return;
        const canvas = beamsRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Optional: Add specific beam animation logic here if needed
        // For now, providing a stable skeleton that resolves the import error

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={beamsRef}
            className={cn(
                "fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50",
                className
            )}
        />
    );
};
