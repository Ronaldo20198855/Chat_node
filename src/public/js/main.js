const $loginForm = document.getElementById('login-form');
const $loginName = document.getElementById('username');
const $nameError = document.getElementById('nameError');
const $users = document.getElementById('usersNames');
const $loginView = document.getElementById('login');
const $chatView = document.querySelector('.chat-container');
const $userDiv = document.querySelector('.users');
const $chat = document.getElementById('chat');
const $formChat = document.querySelector('.chat-footer');
const $messege = document.getElementById('messege');

const sockets = io();

$formChat.addEventListener('submit',(e)=>{
    e.preventDefault();
    if($messege.value){
        sockets.emit('send-message', $messege.value);
        $messege.value='';
    }
})

sockets.on('req-messege', function (data) {
    $chat.innerHTML+=  `<p><b>${data.nick}</b>: ${data.msg}</p>`
    console.log(data)
})

$loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    sockets.emit('validate-user', $loginName.value, function (data) {
        if(data){
            $loginView.setAttribute('style', 'display : none');
            $nameError.innerHTML = '';
            $chatView.setAttribute('style', 'display : inline-block');
            $userDiv.setAttribute('style', 'display : inline-block');
       
        }else{
            $nameError.setAttribute('style', 'color:red')
            $nameError.innerHTML =  `El nombre ${$loginName.value} no es valido o no esta disponible`
        }
    })
    sockets.on('new-user', (data)=>{
        let fragment = '';
        for (let i =1; i < data.length; i++) {
            fragment += `<p class= 'bi bi-person-badge-fill'>${data[i]}</p>`
            $users.innerHTML= `${fragment}`;
        }
    })
})


