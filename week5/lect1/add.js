const express = require('express');
const app = express();

app.get('/add',(req,res) => {
    let a = req.query.a;
    let b = req.query.b;
    a = parseInt(a);
    b = parseInt(b);
    // res.status(200).send();
    res.status(200).json({ans:a+b});
});
app.get('/multiply',(req,res) => {
    let a = req.query.a;
    let b = req.query.b;
    a = parseInt(a);
    b = parseInt(b);
    res.status(200).json({ans:a*b});
});

app.get('/divide',(req,res) => {
    let a = req.query.a;
    let b = req.query.b;
    a = parseInt(a);
    b = parseInt(b);
    // res.status(200).send();
    res.status(200).json({ans:a/b});
});

app.get('/subtract',(req,res) => {
    let a = req.query.a;
    let b = req.query.b;
    a = parseInt(a);
    b = parseInt(b);
    // res.status(200).send();
    res.status(200).json({ans:a-b});
});


app.listen('3000',() => {
    console.log('running');
});