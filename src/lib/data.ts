export const defaultLoomLink =
  "https://www.loom.com/share/db09d673257c4f288d1ea607b459f5bf?sid=4896839c-5a04-4724-9d89-4e1c6d83c9e0";

export const defaultBannerUrl = "/bannerDefault.png";

export const generateCustomSlug = (word: string) => {
  const slug = word
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug;
};
