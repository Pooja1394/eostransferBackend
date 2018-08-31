/**
 * Payment Controller
 */

const utility = require("../../utils/utility");
const env = require("../../utils/env");
const code = require("../../utils/statusCode");
const paymentModel = require("./model");

var paymentController = {};

paymentController.getPaymentFromCoin = (req, res)=>{
    console.log('req = ', req.body);
    res.status(200).send({data:"ok"})
}

module.exports = paymentController;
