let sub = document.querySelector('.send input');
let url = 'http://jx.xuzhixiang.top/ap/api/checkname.php';
let regUrl = 'http://jx.xuzhixiang.top/ap/api/reg.php';
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let ck = document.querySelector('.conck');
let unFlag = false,
  pwdFlag = false;
let unReg = /^[a-z]\w{5,17}/i;
let pwdReg = /^\S{6,18}$/;
username.onfocus = function () {
  this.placeholder = '';
};
username.onblur = function () {
  if (unReg.test(this.value)) {
    axios.get(url, { params: { username: username.value } }).then(function (r) {
      console.log(r.data);
      if (r.data.code == 0) {
        username.nextElementSibling.style.color = 'red';
        username.nextElementSibling.innerHTML = r.data.msg;
      } else {
        username.nextElementSibling.innerHTML = r.data.msg;
        username.nextElementSibling.style.color = 'green';
        unFlag = true;
      }
    });
  } else {
    this.nextElementSibling.innerHTML = '6-18位字符，以字母开头';
    this.nextElementSibling.style.color = 'red';
  }
};
password.onblur = function () {
  if (pwdReg.test(this.value)) {
    this.nextElementSibling.innerHTML = '✔';
    this.nextElementSibling.style.color = 'green';
    pwdFlag = true;
  } else {
    this.nextElementSibling.innerHTML = '6-18位字符，以字母开头';
    this.nextElementSibling.style.color = 'red';
  }
};
sub.onclick = function (e) {
  e.preventDefault();
  if (ck.checked) {
    if (pwdFlag && unFlag) {
      axios
        .get(regUrl, {
          params: { username: username.value, password: password.value },
        })
        .then(function (r) {
          console.log(r);
          alert(r.data.msg);
          if (r.data.code == 1) {
            location.href = 'login.html';
          }
        });
    } else {
      this.nextElementSibling.innerHTML = '请检查帐号和密码';
      this.nextElementSibling.style.color = 'red';
    }
  } else {
    console.log(ck.parentElement);
    ck.parentElement.style.border = '1px solid rgb(180, 64, 64)';
  }
};
ck.onchange = function () {
  if (ck.checked) {
    ck.parentElement.style.border = 'none';
  }
};
