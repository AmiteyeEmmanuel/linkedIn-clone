/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const cors = require("cors")({origin: true});
const storage = admin.storage();

exports.getImageUrl = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Parse the image filename from the request query string
      const imageName = req.query.name;

      // Create a reference to the image in Firebase Storage
      const imageRef = storage.bucket().file(`images/${imageName}`);

      // Get the download URL of the image
      const downloadUrl = await imageRef.getSignedUrl({
        action: "read",
        expires: "01-01-2099", // Set an appropriate expiration date
      });

      // Return the download URL as a response
      res.json({imageUrl: downloadUrl[0]});
    } catch (error) {
      console.error("Error fetching image URL:", error);
      res.status(500).json({error: "Error fetching image URL"});
    }
  });
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
