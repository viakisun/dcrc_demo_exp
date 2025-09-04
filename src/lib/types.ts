export const sampleSlugs = [
  'rokaf-data-analyst-workstation',
  'rokaf-flight-controller-workstation',
  'rokaf-mcrc-advanced-v2',
  'rokaf-mcrc-ai-system',
  'rokaf-mcrc-east-asia',
  'rokaf-radar-controller-workstation',
  'rokaf-sector-ke14-operations',
  'comm-coordinator-workstation',
] as const;

export type SampleSlug = typeof sampleSlugs[number];
