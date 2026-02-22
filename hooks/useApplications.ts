"use client";

import { useState, useEffect, useCallback } from "react";
import type { FormSubmission } from "@/app/apply/prodcon/layouts/prodconFormSchema";

export type ApplicationsPayload = {
  individuals: FormSubmission[]; // individual submissions (full FormSubmission shape)
  teams: FormSubmission[]; // team submissions (full FormSubmission shape)
};

export default function useApplications() {
  const [data, setData] = useState<ApplicationsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/prodcon-applications");
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const json = await res.json();
      setData(json.data ?? null);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    reload: fetchData,
  };
}
