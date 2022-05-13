let url = 'http://jx.xuzhixiang.top/ap/api/detail.php';
let addUrl = 'http://jx.xuzhixiang.top/ap/api/add-product.php';
let id = new URLSearchParams(location.search).get('id');
console.log(id);
let left = document.querySelector('.left img');
let rightTitle = document.querySelector('.right .name');
let price = document.querySelector('.pprice b');
let add = document.querySelector('.add');
let token = localStorage.getItem('TOKEN');
let uid = localStorage.getItem('UID');
console.log(uid);
axios.get(url, { params: { id } }).then(function (r) {
  console.log(r.data.data);
  let res = r.data.data;
  left.src = res.pimg;
  rightTitle.innerHTML = res.pname;
  // console.log(price.lastChild);
  price.innerHTML = '￥' + res.pprice;
  // right.innerHTML = `
  // <p class="name">${res.pname}</p>
  // <p class="pprice"><span>价格</span><b>￥${res.pprice}</b></p>`;
});
add.onclick = function () {
  let pnum = document.querySelector('#num').value;
  if (uid != undefined && uid != null) {
    axios.get(addUrl, { params: { uid, pid: id, pnum } }).then(function (r) {
      console.log(r);
      alert('加入成功');
    });
  } else {
    layer.msg('您还没有登录，是否登录', {
      icon: 7,
      time: 0, //time取0则不关闭
      btn: ['确定', '取消'],
      yes: function () {
        location.href = 'login.html';
      },
    });
  }
};
