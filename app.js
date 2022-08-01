const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.static(__dirname + "/images"));

const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

const detectTEXT = async () => {
  // const fileName = "/images/Screenshot.png";

  const request = {
    image: {
      source: { imageUri: `gs://images/Screenshot.png` },
    },
  };

  const [result] = await client.textDetection(request);

  const detections = result.textAnnotations;

  detections.forEach((text) => console.log(text));
};

detectTEXT();

const detectFACE = async () => {
  const fileName = {
    image: {
      source: { imageUri: `gs://images/Screenshot.png` },
    },
  };

  const [result] = await client.faceDetection(fileName);

  const faces = result.faceAnnotation;

  faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
  });
};

detectFACE()

app.listen(5000, () => console.log("Running"));
