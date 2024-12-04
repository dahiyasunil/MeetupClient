export const transformCloudinaryUrl = (
  originalUrl,
  width,
  aspectRatio,
  cropMode,
  gravity,
  quality,
  sharpness
) => {
  const splitUrl = originalUrl.split("/upload/");
  const baseUrl = splitUrl[0];
  const endurl = splitUrl[1];

  let transformationString = "";
  if (width) {
    transformationString += `w_${width}`;
  }
  if (aspectRatio) {
    transformationString += `,ar_${aspectRatio}`;
  }
  if (cropMode) {
    transformationString += `,c_${cropMode}`;
  }
  if (gravity) {
    transformationString += `,g_${gravity}`;
  }
  if (quality) {
    transformationString += `/q_auto:${quality}`;
  }
  if (sharpness) {
    transformationString += `/e_sharpen:${sharpness}/`;
  }

  const transformedUrl = `${baseUrl}/upload/${transformationString}/${endurl}`;

  return transformedUrl;
};
