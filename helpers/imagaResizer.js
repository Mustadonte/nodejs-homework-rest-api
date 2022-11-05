const jimp = require("jimp");

const imageResizer = async (imagePath, width, height) => {
  const image = await jimp.read(imagePath);
  await image.resize(width, height);
  await image.writeAsync(imagePath);
};

module.exports = imageResizer;
