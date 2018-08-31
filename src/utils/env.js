/**
 * env : constants
 */
var express = require('express');
var app = express();


//keys for development
if(app.get('env')==='local' || app.get('env')==='development'){

    var basePath = 'http://193.93.219.219:8888/'; //jungle

    var chainId= "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"; // 32 byte (64 char) hex string
    var privateKey= "5JtiUFrViqvXe8HmsJSE4hAtxoF7ZwWVWNbkjMnorjULdDUi9SM" ; // pooja

    var config = {
        chainId: chainId,
        keyProvider: [privateKey], // WIF string or array of keys..
        httpEndpoint: basePath,
        expireInSeconds: 60,
        broadcast: true,
        verbose: false, // API activity
        sign: true
    }

    //COIN PAYMENT INFORMATION

    var fixedAmount = 15; // 15$
    var fromCurrency='USD';
    var toCurrency = "BTC,ETH";

    var coinKey = "a607b5b06463fdb8ab760f273229cbfa6180f68f2ce224212b76e276d7ffdc9a";
    var coinSecretKey = "C01121664d3654D3c9a581915711401546447ea185ee424A9f30505d1929F471"; 
    var coinAutoIpn = true; //optional
    var coinIpnTime = 30;   //optional

    //path for USD to other coins
    var coinPath = "https://min-api.cryptocompare.com/data/price?";
}

//keys for production
if(app.get('env')==='production'){
    
}

module.exports={
    chainId:chainId,
    privateKey:privateKey,
    basePath:basePath,
    config:config,
    fixedAmount:fixedAmount,
    coinPath:coinPath,
    fromCurrency:fromCurrency,
    toCurrency:toCurrency,
    coinKey:coinKey,
    coinSecretKey:coinSecretKey,
    coinAutoIpn:coinAutoIpn,
    coinIpnTime:coinIpnTime
};