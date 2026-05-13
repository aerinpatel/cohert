const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mynameisaerinpatelandilovewebdevelopment';

app.use(express.json()); // used to parce(decript) any string data that come in body to workable object form
const users = [];

// function generateToken(){
//     let token = '';
//     const characters = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMOPQRSTUVWXYZ';
//     for(let i = 0; i < 32; i++){
//         token += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return token;
// }

function auth(req,res,next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,JWT_SECRET,(err,decoded) => {
            if(err){
                console.log(err);
                res.status(400).send({message: 'user not loggedin'});
            }else{
                req.body.username = decoded.username;
                next();
            }
        })
    }else{
        res.status(401).send({
            message: 'unauthorized'
        });
    }
    
}
app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/lect2/index.html');
});

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(users.find(user => user.username === username)){
        return res.status(400).json({ message: 'username already exists' });
    }
    users.push({ username, password });
    res.json({ message: 'you have signed up succesfully' });
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const person = users.find(userss => userss.username == username) && users.find(userss => userss.password == password);
    if(person){
        const token = jwt.sign({ username:username,password:password }, JWT_SECRET);
        person.token = token;
        res.send({token});
        console.log(users);
    }else{
        res.status(400).send({
            message: 'invalid username or password'
        });
    }
});

app.get('/me',auth,(req,res) => {
    const userid = req.body;
    console.log(userid);
    res.send(200).json({
        username: userid.username
    });
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});