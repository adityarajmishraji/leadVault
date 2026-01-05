// src/components/ui/sonner.tsx
"use client";

import { CircleCheck, Info, Loader2, TriangleAlert, XCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark"}
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-5 text-green-600 dark:text-green-400" />,
        error: <XCircle className="size-5 text-red-600 dark:text-red-400" />,
        info: <Info className="size-5 text-blue-600 dark:text-blue-400" />,
        warning: <TriangleAlert className="size-5 text-yellow-600 dark:text-yellow-400" />,
        loading: <Loader2 className="size-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster };