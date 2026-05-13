const express = require('express');
const app = express();

let user = [
    {
        name: "sonali",
        kidneys: [
            { healthy: true }
        ]
    }
];
app.use(express.json());

app.get("/", (req, res) => {
    let sonaliKidneys = user[0].kidneys;

    let totalKidney = sonaliKidneys.length;
    let goodKidney = sonaliKidneys.filter(kidney => kidney.healthy).length;
    let badKidney = totalKidney - goodKidney;

    res.json({
        badKidney,
        totalKidney,
        goodKidney
    });
});

app.put('/',(req,res) => {
    for(let i = 0;i < user[0].kidneys.length;i++){
        user[0].kidneys.healthy = true;
    }
});

app.post('/',(req,res) => {
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: ('done')
    })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
