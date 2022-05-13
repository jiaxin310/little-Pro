// const { render } = require('vue');

// import axios from './axios';
let url = 'http://jx.xuzhixiang.top/ap/api/allproductlist.php';
let pagenum = 0,
  pagesize = 10;
let arr;
let uid = localStorage.getItem('uid');
let ul = document.querySelector('.maincontent-right ul');
let pre = document.querySelector('.pre');
let next = document.querySelector('.next');

function renderList() {
  axios.get(url, { params: { pagenum, pagesize, uid } }).then(function (r) {
    console.log(r.data.data);
    arr = r.data.data;
    next.style.color = '#2953A6';
    pre.style.color = 'grey';
    if (arr.length == 0) {
      next.style.cursor = 'default';
      next.style.color = 'grey';
      next.onclick = null;
    } else {
      next.style.cursor = 'pointer';
      next.style.color = '#2953A6';
    }
    if (pagenum == 0) {
      pre.style.cursor = 'default';
      pre.style.color = 'grey';
    } else {
      pre.style.cursor = 'pointer';
      pre.style.color = '#2953A6';
    }
    let strArr = arr.map(
      (obj) => `
      <li>
        <a href="detail.html?id=${obj.pid}"><img src=${obj.pimg} alt="" />
        <p class="price">￥${obj.pprice}</p>
        <p class="pname">${obj.pname}</p>
        </a>
      </li>
    `
    );
    ul.innerHTML = strArr.join('');
  });
}
renderList();

pre.onclick = function () {
  if (pagenum == 0) {
    return;
  } else {
    pagenum--;
    renderList();
  }
};
next.onclick = function () {
  pagenum++;
  renderList();
};
