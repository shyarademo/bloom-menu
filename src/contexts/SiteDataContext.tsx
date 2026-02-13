import React, { createContext, useContext } from "react";
import { siteDataSchema, type SiteData } from "@/data/schema";
import rawData from "@/data/siteData.json";

type SiteDataContextType = {
  data: SiteData;
  error: string[] | null;
};

const SiteDataContext = createContext<SiteDataContextType | null>(null);

function validateSiteData(): { data: SiteData | null; errors: string[] | null } {
  const result = siteDataSchema.safeParse(rawData);
  if (result.success) {
    return { data: result.data, errors: null };
  }
  const errors = result.error.issues.map(
    (issue) => `${issue.path.join(" → ")}: ${issue.message}`
  );
  return { data: null, errors };
}

function applyTheme(data: SiteData) {
  const root = document.documentElement;
  const p = data.branding.palette;
  const vars: Record<string, string> = {
    "--primary": p.primary,
    "--primary-foreground": p.primaryForeground,
    "--accent": p.accent,
    "--accent-foreground": p.accentForeground,
    "--secondary": p.secondary,
    "--secondary-foreground": p.secondaryForeground,
    "--background": p.background,
    "--foreground": p.foreground,
    "--card": p.card,
    "--card-foreground": p.cardForeground,
    "--muted": p.muted,
    "--muted-foreground": p.mutedForeground,
    "--border": p.border,
    "--input": p.input,
    "--ring": p.ring,
    "--destructive": p.destructive,
    "--destructive-foreground": p.destructiveForeground,
    "--popover": p.popover,
    "--popover-foreground": p.popoverForeground,
  };
  Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));
}

const { data: validatedData, errors } = validateSiteData();
if (validatedData) applyTheme(validatedData);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  if (errors || !validatedData) {
    return <ErrorOverlay errors={errors || ["Unknown validation error"]} />;
  }

  return (
    <SiteDataContext.Provider value={{ data: validatedData, error: null }}>
      {children}
    </SiteDataContext.Provider>
  );
}

function ErrorOverlay({ errors }: { errors: string[] }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-50 p-8">
      <div className="max-w-2xl w-full rounded-2xl bg-white shadow-2xl border border-red-200 p-8 overflow-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-red-600 mb-2">⚠️ siteData.json Validation Error</h1>
        <p className="text-red-500 mb-6 text-sm">
          The following fields in <code className="bg-red-100 px-1 rounded">src/data/siteData.json</code> have issues. Fix them and reload.
        </p>
        <ul className="space-y-2">
          {errors.map((err, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-red-400 mt-0.5 shrink-0">✗</span>
              <code className="text-red-700 break-all">{err}</code>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-gray-500">See EDITING_GUIDE.md for field documentation.</p>
      </div>
    </div>
  );
}

export function useSiteData(): SiteData {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx.data;
}
