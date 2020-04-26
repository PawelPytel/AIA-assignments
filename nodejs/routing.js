const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err

        var db = client.db('store')

        db.collection('movies').find().toArray(function (err, result) {
            if (err) throw err
            response.render('main', { 'movies': result })

        })
        client.close()
    })

});

router.post('/add', (req, res) => {
    var movie = req.body
    if (!req.session.inCart) {
        req.session.inCart = []
    }
    var inCartCounter = 0
    var cart = req.session.inCart
    for (var i = 0; i < cart.length; i++) {
        if (cart[i]._id === movie._id) {
            inCartCounter++;
        }
    }
    if (inCartCounter >= movie.quantity)
        res.redirect('/', 204)
    else {
        req.session.inCart.push(req.body)
        res.redirect('/', 200)
    }

})

router.post('/remove', (req, res) => {
    if (!req.session.inCart) {
        req.session.inCart = []
    }
    const index = req.session.inCart.map((e) => { return e._id }).indexOf(req.body._id);
    if (index !== -1) {
        req.session.inCart.splice(index, 1);
    }

    res.redirect('/checkout')
})


router.get('/checkout', (req, res) => {

    res.render('checkout', { 'movies': req.session.inCart })
})

router.post('/cancell', (req, res) => {
    req.session.inCart = []
    res.redirect('/')
})

router.post('/reset', (req, res) => {
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err

        var db = client.db('store')

        db.collection('movies').updateMany({}, {
            $set: { quantity: 5 }
        })
        client.close()
    })
    res.redirect('/')
})

router.post('/finalize', (req, res) => {
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err
        var success = true;
        var db = client.db('store')
        var dbState;
        db.collection('movies').find().toArray(function (err, result) {
            if (err) throw err
            if (req.session.inCart && req.session.inCart.length !== 0) {

                var cart = req.session.inCart
                for (var i = 0; i < result.length; i++) {
                    for (var e of cart) {
                        console.log(e._id)
                        if (e._id == result[i]._id) {
                            result[i].quantity -= 1
                        }
                        if (result[i].quantity < 0) {
                            success = false;
                            break;
                        }
                    }
                }
                    if (success) {
                        for (var i = 0; i < result.length; i++) {
                            db.collection('movies').updateOne(
                                {_id:{$eq:result[i]._id}},
                                {$set:{quantity:result[i].quantity}}
                            )
                        }
                        req.session.inCart = []
                        res.redirect('/', 200)
                    }
                    else {
                        req.session.inCart = []
                        res.redirect('/', 400)
                    }
                }
            else {
                req.session.inCart = []
                    res.redirect('/', 204)
                }
            })


    })
})
module.exports = router;