let sub = document.querySelector('.send input');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let url = 'http://jx.xuzhixiang.top/ap/api/login.php';
let unReg = /^[a-z]\w{5,17}/i;
let pwdReg = /^\S{6,18}$/;
username.onfocus = function () {
  this.placeholder = '';
};
username.onblur = function () {
  if (unReg.test(this.value)) {
    this.nextElementSibling.innerHTML = '';
  } else {
    this.nextElementSibling.innerHTML = '6-18位字符，以字母开头';
    this.nextElementSibling.style.color = 'red';
  }
};
password.onblur = function () {
  if (pwdReg.test(this.value)) {
    this.nextElementSibling.innerHTML = '';
  } else {
    this.nextElementSibling.innerHTML = '6-18位字符，以字母开头';
    this.nextElementSibling.style.color = 'red';
  }
};
sub.onclick = function (e) {
  e.preventDefault();
  axios
    .get(url, {
      params: { username: username.value, password: password.value },
    })
    .then(function (r) {
      console.log(r.data.data);
      if (r.data.code != 1) {
        alert(r.data.msg);
      } else {
        localStorage.setItem('UID', r.data.data.id);
        localStorage.setItem('TOKEN', r.data.data.token);
        localStorage.setItem('USERNAME', r.data.data.username);
        alert(r.data.msg);
        location.href = 'index.html';
      }
    });
};
