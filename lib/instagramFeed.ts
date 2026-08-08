export type InstagramPost = {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  isReel: boolean;
  permalink: string;
  caption: string;
  timestamp: string;
  likeCount: number;
  thumbUrl: string; // stable, square-cropped, from Behold's own CDN
  largeUrl: string; // for lightbox / higher-res view
};

export type InstagramProfile = {
  biography: string;
  profilePictureUrl: string;
  followersCount: number;
  followsCount: number;
};

export type InstagramFeedData = {
  profile: InstagramProfile;
  posts: InstagramPost[];
};

const FEED_URL = "https://feeds.behold.so/6rOoIqTtgWBNfbB2j61G";

export async function getInstagramFeed(): Promise<InstagramFeedData> {
  const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Gagal fetch Instagram feed: " + res.status);
  const data = await res.json();

  const posts: InstagramPost[] = (data.posts || []).map((p: any) => ({
    id: p.id,
    mediaType: p.mediaType,
    isReel: !!p.isReel,
    permalink: p.permalink,
    caption: p.prunedCaption || p.caption || "",
    timestamp: p.timestamp,
    likeCount: p.likeCount ?? 0,
    thumbUrl: p.sizes?.medium?.mediaUrl || p.sizes?.small?.mediaUrl || "",
    largeUrl: p.sizes?.large?.mediaUrl || p.sizes?.full?.mediaUrl || "",
  }));

  const profile: InstagramProfile = {
    biography: data.biography || "",
    profilePictureUrl: data.profilePictureUrl || "",
    followersCount: data.followersCount ?? 0,
    followsCount: data.followsCount ?? 0,
  };

  return { profile, posts };
}