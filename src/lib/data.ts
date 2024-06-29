export const defaultLoomLink =
  "https://www.loom.com/share/6cb225198962416bbc9a685b57bc5270?sid=16d6be0a-bd70-4328-bd8c-caa8c70b15eb";

export const defaultBannerUrl = "/bannerDefault.png";

export const generateCustomSlug = (word: string) => {
  const slug = word
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return slug;
};
