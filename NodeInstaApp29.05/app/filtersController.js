let { imagesArray } = require("./model.js");
const sharp = require("sharp");
const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");

const downloadImage = (imgName, folderName) => {
  const file = fs.createWriteStream("file.jpg");
  http.get(`./app/upload/${folderName}/${imgName}`, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  });
};

const getMetadata = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let photo = imagesArray.find((img) => img.id == id);
      let url = `${photo.url}`;
      console.log(url);
      //   let meta = await sharp(url).metadata();
      //   console.log(meta);
      //   resolve(meta);
      if (url) {
        let meta = await sharp(url).metadata();
        console.log(meta);
        resolve(meta);
      } else {
        resolve("url_not_found");
      }
    } catch (err) {
      console.log(err);
      reject(err.mesage);
    }
  });
};

const useEffect = (parsedData) => {
  let filterType = parsedData.filterType;
  return new Promise(async (resolve, reject) => {
    try {
      let photo = imagesArray.find((img) => img.id == parsedData.id);
      let url = `${photo.url}`;
      // let id = reqUrl.substring(reqUrl.lastIndexOf("/") + 1);

      let tempUrl = url.substring(0, url.lastIndexOf("."));
      let extension = url.substring(url.lastIndexOf("."));
      let newUrl = `${tempUrl}-${filterType}${extension}`;
      console.log(newUrl);
      //   let meta = await sharp(url).metadata();
      //   console.log(meta);
      //   resolve(meta);
      if (url) {
        // if (filterType == "tint") {
        // } else if (filterType == "")
        switch (filterType) {
          case "tint":
            var meta = await sharp(url)
              .tint({ r: 255, g: 0, b: 0 })
              .toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
          case "rotate":
            var meta = await sharp(url).rotate(90).toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
          case "resize":
            var meta = await sharp(url)
              .resize({
                width: 150,
                height: 97,
              })
              .toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
          case "grayscale":
            var meta = await sharp(url).grayscale().toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
          case "flip":
            var meta = await sharp(url).flip().toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
          case "flop":
            var meta = await sharp(url).flop().toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
          case "negate":
            var meta = await sharp(url).negate().toFile(newUrl);
            console.log(meta);
            resolve(meta);
            break;
        }
      } else {
        resolve("url_not_found");
      }
    } catch (err) {
      console.log(err);
      reject(err.mesage);
    }
  });
};

module.exports = {
  getAll: (req) => {},
  getSpecific: async (id) => {
    console.log("GET specific ", id);
    let metadeta;
    // try {
    //   metadeta = await getMetadata(id);
    //   console.log(metadeta);
    // } catch (err) {
    //   console.error(err);
    // }
    return await getMetadata(id);
  },
  editSpecific: async (data) => {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    await useEffect(parsedData);
  },
  downloadSpecific: async (imgName, folderName) => {
    // console.log(data);
    await downloadImage(imgName, folderName);
  },
};
