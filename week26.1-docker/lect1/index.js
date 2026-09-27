import express from 'express';
const app = express();

app.get("/",(req,res) => {
    res.send("hello there bhag maderchod bhag -- maa ka bosdaa AAGG!!!!!");
})

app.listen(3000,() => {
    console.log("app thattt teri ma ka bosdaa is up and running");
})

