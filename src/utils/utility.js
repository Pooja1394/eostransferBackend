/**
 * utility : CONSTANT METHODS OR THIRD PARTY API
 */
const env = require('./env');
const request = require('request');
var Coinpayments = require('coinpayments');

// Initialization of coinPayment
var options = {
    key : env.coinKey,
    secret : env.coinSecretKey,
    autoIpn : env.coinAutoIpn,
    ipnTime : env.coinIpnTime,
}
var client = new Coinpayments(options); 


// GET ACCOUNT DETAILS OF A USER BY ACCOUNT NAME
exports.getAccountDetails = (data, callback)=>{
    let body = {
        "account_name":data
    }
    body = JSON.stringify(body);
    const options = {
        method:'POST',
        url:env.basePath + 'v1/chain/get_account',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body:body
    };
    request(options, (error, response, body)=>{
        if(error){
            console.log('error in ');
            callback(error);
        }
        else{
            console.log('response in');
            callback(null, response);
        }
    });
}

exports.convertUSDtoCoins = (data, callback)=>{
    console.log('USD = ', env.coinPath+"fsym="+data.from+"&tsyms="+data.to);
    const options = {
        method:'GET',
        url:env.coinPath+"fsym="+data.from+"&tsyms="+data.to,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        }
    };
    request(options, (err , res)=>{
        console.log('in err ', err)
        if(err){
            callback(err);
        }
        else{
            callback(null, res);
        }
    })
}

exports.createTransaction = (currency, callback) =>{
    client.createTransaction({
        'currency1' : 'USD', 
        'currency2' : currency,
        'amount' : env.fixedAmount
    },function(err,result){
        if(err){
            callback(err);
        }
        else{
            callback(null, result);
        }
    });
}