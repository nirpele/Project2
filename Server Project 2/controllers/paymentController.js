const braintree = require("braintree");
const express = require("express");
const router = express.Router();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",
});

exports.generateToken("/generate/token", (req, res) => {
  gateway.clientToken.generate({}).then((response)=>{
    res.status(200).send(response)
  }).catch(err=>res.status(500).send(err))
});
module.exports = router;
