let uid = localStorage.getItem('UID');
let token = localStorage.getItem('TOKEN');
let username = localStorage.getItem('USERNAME');
let login = document.querySelector('.header-nav-left-1');
let unLog = document.querySelector('.header-nav-left-2');
// console.log(uid);
let content = document.querySelector('.content');
let contentHide = document.querySelector('.content-hide');
if ((uid == null) | (uid == '') | (uid == undefined)) {
  login.style.display = 'none';
  unLog.style.display = 'block';
  contentHide.style.display = 'block';
  content.style.display = 'none';
} else {
  login.firstElementChild.innerHTML = username;
  login.style.display = 'block';
  unLog.style.display = 'none';
  contentHide.style.display = 'none';
  content.style.display = 'block';
}
// 数量增减 input框变换
function red(btn, pid) {
  let num = btn.parentElement.querySelector('input');
  if (num.value > 1) {
    num.value--;
    gold(btn);
  }
  if (btn.parentElement.parentElement.querySelector('.check').checked) {
    computed();
  }
  update(btn, pid, num);
}
function add(btn, pid) {
  // console.log(btn.parentElement.querySelector('input').value);
  let num = btn.parentElement.querySelector('input');
  num.value++;
  gold(btn);
  // console.log(1);
  if (btn.parentElement.parentElement.querySelector('.check').checked) {
    computed();
  }
  update(btn, pid, num);
}
// 获取购物车数据
let prodesc = document.querySelector('.prodesc');
let checkUrl = 'http://jx.xuzhixiang.top/ap/api/cart-list.php';
let unlog = document.querySelector('.unlog');
async function renderList() {
  await axios.get(checkUrl, { params: { id: uid } }).then(function (r) {
    // console.log(r.data.data);
    let resarr = r.data.data;
    // console.log(resarr.length);
    if (resarr.length == 0) {
      unlog.style.display = 'block';
    } else {
      let arr = resarr.map(
        (v) => `
    <div class="prod middle">
          <input type="checkbox" class="check" onchange="computed()"/>
          <img src=${v.pimg} alt="" />
          <span class="proname">${v.pname}</span>
          <span class="pprice">${v.pprice}</span>
          <div class="pnum">
            <button onclick="red(this,${v.pid})">-</button>
            <input type="text" name="" id="" class="pnumber" value=${
              v.pnum
            } onchange="gold(this)" />
            <button onclick="add(this,${v.pid})">+</button>
          </div>
          <span class="gold">${v.pprice * v.pnum}</span>
          <button class="dele" onclick=dele(${v.pid},this)>删除</button>
        </div>
    `
      );
      prodesc.innerHTML = arr.join('');
    }
  });
}
renderList();
// 删除
// let prodesc = document.querySelector('.prodesc');
let deleUrl = 'http://jx.xuzhixiang.top/ap/api/cart-delete.php';
async function dele(pid, btn) {
  await axios.get(deleUrl, { params: { uid, pid } }).then(function (r) {
    // console.log(r);
    if (r.data.msg == '删除成功') {
      btn.parentElement.remove();
      // console.log(prodesc.childElementCount);
      if (prodesc.childElementCount == 0) {
        unlog.style.display = 'block';
      }
      computed();
    }
  });

  // location.reload();
}
// 金额变动
function gold(btn) {
  let price = btn.parentElement.parentElement.querySelector('.pprice');
  // console.log(price);
  let pronum = btn.parentElement.parentElement.querySelector('.pnumber');
  // console.log(pronum.value);
  let gold = btn.parentElement.parentElement.querySelector('.gold');
  // console.log(gold);
  gold.innerHTML = pronum.value * price.innerHTML;
}
// 计算总价
let tt = document.querySelector('.total');
function computed() {
  let total = 0;
  let checkboxes = document.querySelectorAll('.check');
  // console.log(checkboxes);
  checkboxes.forEach((v) => {
    if (v.checked) {
      total += v.parentElement.querySelector('.gold').innerHTML * 1;
    }
  });
  tt.innerHTML = '￥' + total;
  if (Array.from(checkboxes).every((v) => v.checked == true)) {
    document.querySelector('.ckall').checked = true;
  } else {
    document.querySelector('.ckall').checked = false;
  }
}
// 全选计算价钱
function changeAll(ckall) {
  let checkboxes = document.querySelectorAll('.check');
  checkboxes.forEach((v) => {
    v.checked = ckall.checked;
  });
  computed();
}
// 退出登录
function out() {
  localStorage.removeItem('UID');
  location.href = 'login.html';
}
//修改商品数量
let updateUrl = 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php';
function update(btn, pid, num) {
  // console.log(num);
  axios
    .get(updateUrl, { params: { uid, pid, pnum: num.value } })
    .then(function (r) {
      // console.log(r);
    });
}
