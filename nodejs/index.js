const express=require('express');
const path=require('path')
const parser=require('body-parser')
const routing=require('./routing');
const ejs=require('ejs')
var session=require('express-session')
const app=express();
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(parser.urlencoded({extended:false}))
app.use(parser.json())
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}: ${new Date()}`)
    next();
})
app.use(session({
    secret: 'asdf',
    resave: false,
    saveUninitialized:true
}));

app.use('/',routing);
initDB()
app.listen(3000,()=>{
    console.log("server is running");
});


function initDB(){
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
        if (err) throw err
    
        var db = client.db('store')
        db.collection('movies').countDocuments().then((num)=>{
            console.log(num)
            if(num===0){
                db.collection('movies').insertMany([
                    {
                        title:'First movie',
                        director:'Jan',
                        price:30,
                        quantity:2
                    },
                    {
                        title:'Second movie',
                        director:'Martin',
                        price:40,
                        quantity:3
                    },
                    {
                        title:'Third movie',
                        director:'Thomas',
                        price:20,
                        quantity:2
                    },
                    {
                        title:'Fourth movie',
                        director:'George',
                        price:10,
                        quantity:4
                    }
                ])  
            }
            client.close()
        })
    })
}





