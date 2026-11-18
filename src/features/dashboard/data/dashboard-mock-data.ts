import {
  addDays,
  formatISODate,
  parseISODate,
} from "@/features/dashboard/lib/dates";
import type {
  ActivityRecord,
  CampaignRecord,
  DailyMetric,
  DashboardSource,
  Platform,
  SocialAccount,
} from "@/features/dashboard/types/dashboard";

/**
 * Fixed demonstration dataset for the dashboard preview.
 * Dates end on 18 Nov 2026 so every range stays reproducible.
 * These records are not live platform results.
 */

export const dashboardAsOf = "2026-11-18";

const accounts: readonly SocialAccount[] = [
  {
    id: "acct_facebook",
    platform: "facebook",
    name: "Creator Growth Studio",
    handle: "creatorgrowthstudio",
    accountType: "Page",
    followers: 48_240,
  },
  {
    id: "acct_instagram",
    platform: "instagram",
    name: "Saheed Creates",
    handle: "@saheed.creates",
    accountType: "Creator",
    followers: 86_420,
  },
  {
    id: "acct_tiktok",
    platform: "tiktok",
    name: "Saheed Growth",
    handle: "@saheedgrowth",
    accountType: "Creator",
    followers: 124_860,
  },
];

const platformProfiles: Record<
  Platform,
  {
    base: number;
    amplitude: number;
    engagement: number;
    visits: number;
    phase: number;
  }
> = {
  facebook: {
    base: 5_400,
    amplitude: 900,
    engagement: 0.024,
    visits: 0.041,
    phase: 0.4,
  },
  instagram: {
    base: 11_200,
    amplitude: 1_800,
    engagement: 0.037,
    visits: 0.058,
    phase: 1.2,
  },
  tiktok: {
    base: 15_800,
    amplitude: 2_800,
    engagement: 0.049,
    visits: 0.033,
    phase: 2.1,
  },
};

function unitNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43_758.5453;
  return value - Math.floor(value);
}

function buildSeries(asOf: string, days: number): DailyMetric[] {
  const end = parseISODate(asOf);
  const points: DailyMetric[] = [];

  (Object.keys(platformProfiles) as Platform[]).forEach(
    (platform, platformIndex) => {
      const profile = platformProfiles[platform];

      for (let index = 0; index < days; index += 1) {
        const date = formatISODate(addDays(end, index - (days - 1)));
        const progress = index / (days - 1);
        const wave =
          0.5 + 0.5 * Math.sin(progress * Math.PI * 3 + profile.phase);
        const weekday = parseISODate(date).getUTCDay();
        const weekend = weekday === 0 || weekday === 6 ? 1.06 : 1;
        const noise = 0.94 + unitNoise(index * 17 + platformIndex * 31) * 0.12;
        const reachTrend = 0.6 + progress * 0.75;
        const visitTrend = 1.28 - progress * 0.55;
        const reach = Math.round(
          (profile.base + profile.amplitude * wave) *
            noise *
            weekend *
            reachTrend,
        );
        const engagement = Math.round(
          reach *
            profile.engagement *
            (0.92 + unitNoise(index * 13 + platformIndex) * 0.16),
        );
        const profileVisits = Math.round(
          reach *
            profile.visits *
            visitTrend *
            (0.9 + unitNoise(index * 19 + platformIndex) * 0.2),
        );

        points.push({
          date,
          platform,
          reach,
          engagement,
          profileVisits,
        });
      }
    },
  );

  return points;
}

const campaigns: readonly CampaignRecord[] = [
  {
    id: "cmp_spring_lookbook",
    name: "Spring lookbook reels",
    platform: "instagram",
    type: "paid-promotion",
    status: "active",
    reach: 186_400,
    engagement: 14_220,
    startDate: "2026-11-04",
    endDate: "2026-11-18",
  },
  {
    id: "cmp_weekend_stories",
    name: "Weekend story series",
    platform: "instagram",
    type: "collaboration",
    status: "completed",
    reach: 62_400,
    engagement: 4_180,
    startDate: "2026-10-24",
    endDate: "2026-11-02",
  },
  {
    id: "cmp_creator_seeding",
    name: "Creator seeding wave",
    platform: "tiktok",
    type: "collaboration",
    status: "active",
    reach: 248_900,
    engagement: 18_640,
    startDate: "2026-11-08",
    endDate: "2026-11-30",
  },
  {
    id: "cmp_page_awareness",
    name: "Page awareness flight",
    platform: "facebook",
    type: "paid-promotion",
    status: "paused",
    reach: 91_200,
    engagement: 3_648,
    startDate: "2026-10-12",
    endDate: "2026-11-10",
  },
  {
    id: "cmp_holiday_lookbook",
    name: "Holiday lookbook",
    platform: "instagram",
    type: "organic",
    status: "scheduled",
    reach: 0,
    engagement: 0,
    startDate: "2026-11-22",
    endDate: "2026-12-06",
  },
  {
    id: "cmp_northwind",
    name: "Northwind teaser cutdowns",
    platform: "tiktok",
    type: "paid-promotion",
    status: "completed",
    reach: 156_300,
    engagement: 9_804,
    startDate: "2026-09-28",
    endDate: "2026-10-20",
  },
];

const activities: readonly ActivityRecord[] = [
  {
    id: "act_holiday_created",
    kind: "campaign-created",
    description: "Holiday lookbook was scheduled for Instagram.",
    occurredAt: "2026-11-17T16:20:00.000Z",
    status: "Scheduled",
  },
  {
    id: "act_report",
    kind: "report-generated",
    description: "A 30-day performance report was prepared for this workspace.",
    occurredAt: "2026-11-16T08:00:00.000Z",
    status: "Ready",
  },
  {
    id: "act_payment",
    kind: "payment-received",
    description: "A $1,250.00 wallet credit was recorded.",
    occurredAt: "2026-11-15T14:16:00.000Z",
    status: "Recorded",
  },
  {
    id: "act_tiktok",
    kind: "account-preview",
    description: "A TikTok preview account was added to the workspace.",
    occurredAt: "2026-11-12T11:40:00.000Z",
    status: "Preview",
  },
  {
    id: "act_stories_completed",
    kind: "campaign-completed",
    description: "Weekend story series finished its delivery window.",
    occurredAt: "2026-11-02T09:05:00.000Z",
    status: "Completed",
  },
];

export const dashboardSource: DashboardSource = {
  asOf: dashboardAsOf,
  accounts,
  series: buildSeries(dashboardAsOf, 180),
  campaigns,
  activities,
};
