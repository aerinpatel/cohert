{/* <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> */}

async function signup(){
    const pass = document.getElementById('signup-password1').value;
    const pass2 = document.getElementById('signup-password2').value;
    if(pass != pass2){
        alert('both password are not matching');
        focus(pass);
        focus(pass2);
        return;
    }
    const name = document.getElementById('signup-username').value;
    await axios.post('http://localhost:3000/signup',{
        username: name,
        password: pass
    });
    alert('you have signed up succesfully');
}

async function signin(){
    const name = document.getElementById('signin-username').value;
    const pass = document.getElementById('signin-password').value;
    const res = await axios.post('http://localhost:3000/signin',{
        username: name,
        password: pass
    });
    const token = res.data.token;
    localStorage.setItem('token',token);
    alert('you have signed in succesfully');
}