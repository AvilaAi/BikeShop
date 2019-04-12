var express = require('express');
var router = express.Router();


var dataBike = [{
    name: "Model BIKO45",
    price: 679,
    url: "/images/bike-1.jpg"
  },
  {
    name: "Model 1w23",
    price: 608,
    url: "/images/bike-2.jpg"
  },
  {
    name: "Model ZOOK7",
    price: 678,
    url: "/images/bike-3.jpg"
  },
  {
    name: "Model ci93",
    price: 478,
    url: "/images/bike-4.jpg"
  },
  {
    name: "Model 0me3",
    price: 358,
    url: "/images/bike-5.jpg"
  },
  {
    name: "Model 1293",
    price: 328,
    url: "/images/bike-6.jpg"
  }
];

// var CardBike = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.CardBike == undefined) {
    req.session.CardBike = []
  }
  res.render('index', {
    dataBike
  })
});

router.post('/shop', function(req, res, next) {

  var mustbeUpdated = false;
  for (var i = 0; i < req.session.CardBike.length; i++) {
    if (req.body.model == req.session.CardBike[i].model) {
      mustbeUpdated = true;
      req.session.CardBike[i].quantity++
    }
  };
  if (mustbeUpdated == false) {
    req.session.CardBike.push({
      model: req.body.model,
      price: req.body.price,
      image: req.body.image,
      quantity: req.body.quantity,
    });
  };
  res.render('shop', {
    dataBike,
    CardBike: req.session.CardBike
  });

});

router.get("/shop", function(req, res) {
  res.render('shop', {
    CardBike: req.session.CardBike
  });
});

router.get('/delete-shop', function(req, res) {
  const {
    position
  } = req.query;
  req.session.CardBike.splice(position, 1)
  res.render('shop', {
    CardBike: req.session.CardBike,
  })
});

router.post('/update-shop', function(req, res) {
  const {
    position,
    quantity
  } = req.body;
  if (quantity == 0) {
    req.session.CardBike.splice(position, 1)

  } else {
    req.session.CardBike[position].quantity = quantity;

  }

  res.render('shop', {
    CardBike: req.session.CardBike
  })
});


module.exports = router;
