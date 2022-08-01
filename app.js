const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.static(__dirname + '/images'))


const vision = require('@google-cloud/vision');

const textDetect = async () => {

    const client = new vision.ImageAnnotatorClient();

    // const fileName = "/images/Screenshot.png";

    const request = {
        image: {
            source: { imageUri: `gs://images/Screenshot.png` },
        },
    };

    const [result] = await client.textDetection(request);

    const detections = result.textAnnotations;

    detections.forEach(text => console.log(text))
}

textDetect();

app.listen(5000,()=>console.log('Running'))