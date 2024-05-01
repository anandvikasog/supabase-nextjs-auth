import * as React from "react";
import type { Viewport } from "next";

import "@/styles/global.css";

import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import ToastContext from "@/contexts/toast-context";
import ReduxProvider from "@/contexts/redux-context";
import { LocalizationProvider } from "@/contexts/localization-context";

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastContext>
            <LocalizationProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </LocalizationProvider>
          </ToastContext>
        </ReduxProvider>
      </body>
    </html>
  );
}
