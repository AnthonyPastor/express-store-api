const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["png", "jpg", "jpeg"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { img } = files;
    console.log(img);
    const fileName = img.name.split(".");
    const extension = fileName[fileName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} is not allowed, please use one of them: ${validExtensions}`
      );
    }

    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    img.mv(uploadPath, (err) => {
      if (err) return reject(err.toString());

      resolve(uploadPath);
    });
  });
};

module.exports = {
  uploadFile,
};
