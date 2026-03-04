type ContentEntryLike = {
  slug?: string;
  id?: string;
};

export function getEntrySlug(entry: ContentEntryLike): string {
  const raw = (entry.slug ?? entry.id ?? "").replace(/\.(md|mdx)$/i, "");
  return raw.replace(/\/index$/i, "");
}