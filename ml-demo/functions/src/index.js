var functions=require('firebase-functions');
var tf=require('@tensorflow/tfjs')
const cors = require("cors")({
    origin: true,
    allowedHeaders: [
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Accept",
    ],
    methods: ["POST"],
    credentials: true,
});


let objectDetectionModel;
async function loadModel(input) {
    // Warm up the model
    if (!objectDetectionModel) {
        console.log('In the load model not statement')
        // Load the TensorFlow SavedModel through tfjs-node API. You can find more
        // details in the API documentation:
        // https://js.tensorflow.org/api_node/1.3.1/#node.loadSavedModel
        objectDetectionModel = await tf.loadSavedModel("./model/", ["serve"], "serving_default");
        console.log(objectDetectionModel)
    }
    var res = null;
    try {
        var input_data = tf.tensor(input);
        var predictions = objectDetectionModel.predict(input_data);
        res = predictions.array().then((array) => array);
        console.log(res);
    }
    catch (err) {
        console.log('Error in Load Model');
    }
    return res;
}
const runtimeOpts = {
    timeoutSeconds: 60,
    memory: "2GB",
};

exports.getQuestionQuality = functions
    .runWith(runtimeOpts)
    .https.onRequest(async (request, response) => {
    return cors(request, response, async () => {
       
        response.set("Content-Type", "Application/JSON");
        response.set("Access-Control-Allow-Origin", "http://localhost:3000");
        response.set("Vary", "Origin");
        let body ={"instances":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,16,310,3,1489,2,2841,15,52,366,54,2,595,636,250,60,1489,44,93,78,131,19,52,366,5,1209,60,914]]}
        const obj = JSON.stringify(body)
        const instances=JSON.parse(obj).instances;
        console.log('Instance',instances)
        // const instances = JSON.parse(request.body).instances;

        loadModel(instances)
            .then((r) => {
            console.log("Prediction done");
            // return response.send(JSON.stringify({ predictions: r }));
            return response.send(r)
        })
            .catch((e) => {
            response.send(e)
            // response.sendStatus(e);
            console.log('Model not initialized properly!')
        });
    });
});
// ----------------------
// exports.getQuestionQuality=functions.https.onRequest((req,res)=>{

//     let body ={"instances":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,16,310,3,1489,2,2841,15,52,366,54,2,595,636,250,60,1489,44,93,78,131,19,52,366,5,1209,60,914]]}
   
//     t=tf.loadLayersModel("https://firebasestorage.googleapis.com/v0/b/stackoverflow-quality-analysis.appspot.com/o/model.json?alt=media&token=46f44324-c5f0-4431-af77-1e3c3670e8e0")


  
//     return res.send(t)
// })


// // async function predict(){
// //     let model=await tf.loadLayersModel("https://firebasestorage.googleapis.com/v0/b/stackoverflow-quality-analysis.appspot.com/o/model.json?alt=media&token=46f44324-c5f0-4431-af77-1e3c3670e8e0");
// //      console.log(model)

// // }