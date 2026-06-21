export const getAiProfileImage = (originalUrl, accentColor) => {
  if (!originalUrl) return "";
  const hex = accentColor.replace("#", "");
  // Transformations: remove bg, center face, set background color, size
  return `${originalUrl}?tr=w-320,h-320,fo-auto,c-face,e-bgremove,bg-${hex}`;
};
