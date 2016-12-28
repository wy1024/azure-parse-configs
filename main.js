var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "7jwbfz4h3cyqq6q8",
  publicKey: "ngwd24rh8ncykb4g",
  privateKey: "078121f5ce38f36c099fd5f78e1fa1e2"
});

Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('client_token', function(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.success(response.clientToken);
  });
});

Parse.Cloud.define('checkout', function(req, res) {
  var nonceFromTheClient = req.params.payment_method_nonce;
  var amountFromTheClient = req.params.amount;
  var orderIdFromTheClient = req.params.orderId;
  var starryIdFromTheClient = req.params.starryUserId;
  // Use payment method nonce here
  gateway.transaction.sale({
    amount: amountFromTheClient,
    orderId: orderIdFromTheClient,
    paymentMethodNonce: nonceFromTheClient,
    customer: {
      firstName: starryIdFromTheClient
    },
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (result.success) {
      res.success(nonceFromTheClient + " with the value of " + amountFromTheClient);
    } else {
      res.fail(err);
    }
  });
});
