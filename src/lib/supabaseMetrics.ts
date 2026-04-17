type MetricEntry = {
    key: string;
    count: number;
    totalMs: number;
    lastMs: number;
  };

  type MetricsState = {
    totalCalls: number;
    entries: Record<string, MetricEntry>;
  };

  export const supabaseMetrics: MetricsState = {
    totalCalls: 0,
    entries: {}
  };

  export async function measureSupabaseCall<T>(key: string, task: () => Promise<T>): Promise<T> {
    const startedAt = performance.now();
    supabaseMetrics.totalCalls += 1;

    try {
      const result = await task();
      const durationMs = performance.now() - startedAt;
      const existing = supabaseMetrics.entries[key];

      supabaseMetrics.entries[key] = {
        key,
        count: (existing?.count ?? 0) + 1,
        totalMs: (existing?.totalMs ?? 0) + durationMs,
        lastMs: durationMs
      };

      if (import.meta.env.DEV) {
        console.table({
          operation: key,
          totalCalls: supabaseMetrics.totalCalls,
          count: supabaseMetrics.entries[key].count,
          lastMs: Number(durationMs.toFixed(2))
        });
      }

      return result;
    } catch (error) {
      const durationMs = performance.now() - startedAt;

      if (import.meta.env.DEV) {
        console.error('[supabase-metrics] request failed', {
          operation: key,
          totalCalls: supabaseMetrics.totalCalls,
          lastMs: Number(durationMs.toFixed(2)),
          error
        });
      }

      throw error;
    }
  }