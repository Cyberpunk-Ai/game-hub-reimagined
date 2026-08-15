/**
 * Storage bucket names, provider-agnostic.
 *
 * These are plain object keys/prefixes, so they work the same whether storage
 * is served by the managed backend, S3, R2 or a self-hosted gateway.
 */
export const STORAGE_BUCKETS = {
  STATUS_MEDIA: "status-media",
  AVATARS: "avatars",
  TOURNAMENT_IMAGES: "tournament-images",
  FLEX: "flex",
  MESSAGES: "messages",
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
