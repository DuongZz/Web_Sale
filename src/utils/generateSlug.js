export const generateSlug = (value) => {
  const slug = slugify(value.name, { lower: true });
  return slug;
};
