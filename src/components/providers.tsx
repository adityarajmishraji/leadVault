// src/components/providers.tsx
"use client";

import {ReactNode} from "react";
import { NhostProvider } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apollo";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ApolloProvider>
    </NhostProvider>
  );
}