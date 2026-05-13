function generateToken(){
    let token = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMOPQRSTUVWXYZ';
    for(let i = 0; i < 32; i++){
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}
console.log(generateToken());