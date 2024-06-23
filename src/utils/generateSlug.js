import slugify from "slugify";

export const generateSlug = (name) => {
  const slug = slugify(name, { lower: true });
  return slug;
};
