/**
 * User Controller
 */
const utility = require("../../utils/utility");
const env = require("../../utils/env");
const code = require("../../utils/statusCode");
const userModel = require("./model");
const paymentModel = require("../payment/model");

var userController = {};

userController.nameAlreadyExist = (req, res) => {
  console.log("createAcount", req.body);
  if (req.body.name.length === 1) {
    console.log("calling");
    userModel.findOne({ name: req.body.name }, (err, userData) => {
      if (err) {
        res.status(code.internal).send(err);
      } else if (userData) {
        res.status(code.found).send({ data: "Already exist" });
      } else {
        utility.getAccountDetails(req.body.name, (err, data) => {
          if (err) {
            res.send(err);
          } else if (data.statusCode === 500) {
            res.status(code.notFound).send({ data: "Not Found!" });
          } else {
            res.status(code.found).send({ data: "Already exist" });
          }
        });
      }
    });
  } else {
    res.status(code.bad).send({ err: "Incomplete Parameters!" });
  }
};

userController.getPayAmount = (req, res) => {
  let data = {
    from: env.fromCurrency,
    to: env.toCurrency
  };
  utility.convertUSDtoCoins(data, (err, result) => {
    if (err) {
      console.log("in err");
      res.status(code.internal).send({ err: err });
    } else if (result) {
      console.log("find result = ");
      let _result = JSON.parse(result.body);
      let data = {
        BTC: parseFloat(_result.BTC * env.fixedAmount).toFixed(6),
        ETH: parseFloat(_result.ETH * env.fixedAmount).toFixed(6)
      };
      res.status(code.ok).send({ data: data });
    } else {
      console.log("result not fount = ");
      res.status(code.notFound).send({ err: "NOT FOUND!" });
    }
  });
};

userController.createAccount = (req, res) => {
  console.log("req = ", req.body);
  if (
    req.body.name &&
    req.body.ownerKey &&
    req.body.activeKey &&
    req.body.currency
  ) {
    utility.createTransaction(req.body.currency, (err, result) => {
      if (err) {
        console.log("in err");
        res.status(code.internal).send({ err: err });
      } else {
        console.log("in success");
        // res.status(code.ok).send({data:result});
        userModel.findOne({ name: req.body.name }, (err, findData) => {
          if (err) {
            res.status(code.internal).send({ err: err });
          } else if (findData) {
            res.status(code.found).send({ data: "Already exist" });
          } else {
            let _obj = {
              name: req.body.name,
              ownerKey: req.body.ownerKey,
              activeKey: req.body.activeKey
            };
            let user = new userModel(_obj);
            user.save((err, saveData) => {
              if (err) {
                res.status(code.internal).send({ err: err });
              } else {
                _obj={};
                _obj = {
                  userName: req.body.name,
                  address: result.address,
                  status: "pending",
                  txnId: result.txn_id,
                  confirmsNeeded: result.confirms_needed,
                  timeout: result.timeout,
                  statusUrl: result.status_url,
                  qrcodeUrl: result.qrcode_url,
                  amount: result.amount
                };
                let payment = new paymentModel(_obj);
                payment.save((err, paymentData)=>{
                    if(err){
                        res.status(code.internal).send({ err: err });
                    }else{
                        let _sendData = {
                            address:result.address,
                            qrcodeUrl:result.qrcode_url
                        }
                        res.status(code.ok).send({ data : _sendData });
                    }
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.status(req.bad).send({ err: "Incomplete Parameters!" });
  }
};

module.exports = userController;
