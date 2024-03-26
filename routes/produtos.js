const express = require("express");
const router = express.Router();

app.get("/getProdutos", async (req, res) => {
  try{
    console.log("GET produtos");
    var produtos2 = null;

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

        produtos2 = produtos;
        return res.status(200).json(produtos);

      });
      return res.status(200).json(produtos2);
  } catch (e) {
    return res.status(500).json(e);
  }
   
  });


router.get("/a", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "teste!",
  });
});

function produtos (){
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
}

module.exports = router;