"use client";

import { AnalyticsChart } from "@/features/dashboard/components/analytics-chart";
import { CampaignOverview } from "@/features/dashboard/components/campaign-overview";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { PerformanceCards } from "@/features/dashboard/components/performance-cards";
import { PlatformBreakdown } from "@/features/dashboard/components/platform-breakdown";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { SocialAccountOverview } from "@/features/dashboard/components/social-account-overview";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";

export function DashboardView() {
  const dashboard = useDashboardData();
  const { model } = dashboard;

  return (
    <div className="space-y-8" aria-busy={dashboard.refreshing}>
      <DashboardHeader
        range={dashboard.range}
        onRangeChange={dashboard.setRange}
        customStart={dashboard.customStart}
        customEnd={dashboard.customEnd}
        onCustomStartChange={dashboard.setCustomStart}
        onCustomEndChange={dashboard.setCustomEnd}
        rangeValid={model.rangeValid}
        startDate={model.startDate}
        endDate={model.endDate}
        refreshing={dashboard.refreshing}
        updatedAt={dashboard.updatedAt}
        onRefresh={dashboard.refresh}
      />
      <div
        className={
          dashboard.refreshing ? "opacity-60 transition-opacity" : undefined
        }
      >
        <div className="space-y-8">
          <PerformanceCards metrics={model.metrics} />
          <div className="grid items-start gap-4 xl:grid-cols-3">
            <div className="min-w-0 xl:col-span-2">
              <AnalyticsChart
                points={model.chart}
                metric={dashboard.metric}
                onMetricChange={dashboard.setMetric}
                refreshing={dashboard.refreshing}
              />
            </div>
            <PlatformBreakdown platforms={model.platforms} />
          </div>
          <SocialAccountOverview
            accounts={model.accounts}
            platforms={model.platforms}
          />
          <div className="grid items-start gap-4 xl:grid-cols-3">
            <div className="min-w-0 xl:col-span-2">
              <CampaignOverview campaigns={model.campaigns} />
            </div>
            <RecentActivity activities={model.activities} />
          </div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
