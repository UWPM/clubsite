"use client";

import React from "react";
import useApplications from "@/hooks/useApplications";

export default function TestApplicationsPage() {
  const { data, loading, error, reload } = useApplications();

  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1>ProdCon Applications — Test Page</h1>

      <div style={{ marginBottom: 12 }}>
        <button onClick={reload}>Reload</button>
      </div>

      {loading && <p>Loading…</p>}
      {error && (
        <div style={{ color: "crimson" }}>
          <strong>Error:</strong>
          <pre>{String(error)}</pre>
        </div>
      )}

      {data ? (
        <div>
          <section style={{ marginBottom: 20 }}>
            <h2>Individuals ({data.individuals?.length ?? 0})</h2>
            <pre style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: 12 }}>
              {JSON.stringify(data.individuals ?? [], null, 2)}
            </pre>
          </section>

          <section>
            <h2>Teams ({data.teams?.length ?? 0})</h2>
            <pre style={{ whiteSpace: "pre-wrap", background: "#fafafa", padding: 12 }}>
              {JSON.stringify(data.teams ?? [], null, 2)}
            </pre>
          </section>
        </div>
      ) : (
        !loading && <p>No data returned from the hook.</p>
      )}
    </div>
  );
}
