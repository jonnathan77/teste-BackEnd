const express = require("express");
const router = express.Router();

router.get("/produtos", (req, res) => {
    console.log("GET produtos");
    admin
      .firestore()
      .collection("produtos")
      .get()
      .then((snapshot) => {
        const produtos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
        res.json(produtos);
        return res.status(200).json(produtos);

      });

  });

module.exports = router;