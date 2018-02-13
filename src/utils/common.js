//深度比较两个对象是否相等
function compareObject(o1, o2) {
  if (typeof o1 != typeof o2)
    return false
  if (typeof o1 == 'object') {
    if (o1.length != o2.length) {
      return false
    }
    if (o1.length == undefined && o2 == undefined) {
      let o1_key = 0
      let o2_key = 0
      for (let key in o1) {
        o1_key++
      }
      for (let key in o2) {
        o2_key++
      }
      if (o1_key != o2_key) {
        return false
      }
    }
    for (let o in o1) {
      if (typeof o2[o] == 'undefined')
        return false
      if (!compareObject(o1[o], o2[o]))
        return false
    }
    return true
  } else {
    return o1 === o2
  }
}

//深度拷贝对象
function copyObj(obj,emptyObj={}) {
  for (let key in obj) {
    if(typeof obj[key] === 'object') {
      if(obj[key].length === undefined ){
        emptyObj[key] = copyObj(obj[key])
      }else{
        emptyObj[key] = copyObj(obj[key],[])
      }
    }else {
      emptyObj[key] = obj[key]
    }
  }
  return emptyObj;
}


//获取对象交集
function crossObj(rowobj, sourceobj) {
  let obj = {};
  Object.keys(rowobj).forEach(val=>{
    obj[val] = sourceobj[val];
  });
  return obj;
}

function uploadData(url, params) {
  return new Promise((resolve, reject) => {
    this.axios.post(url, params).then((d) => {
      if (d.status === 1) {
        this.$Message.success(d.message);
        resolve(d.data);
      } else {
        this.$Message.error(d.message);
      }
    })
  })
}

/**
 * renderBtn 渲染按钮
 * @param h
 * @param params
 * @param bdata 按钮的数据
 * @param rule(name: 状态，right：开启的结果，wbtn：开启的提示)选填
 * @returns {Promise}
 */
function renderBtn(h, params, bdata ,rule = {btns:[{func: '',type: '',name:'',right: '',wbtn: ''}],size: 2}){
  let BtnArr = [];
  const that = this;
  if(bdata.length < 4){
    BtnArr = loopBtn(that, h, params, bdata,rule);
  }else{
    BtnArr = loopBtn(that, h, params, bdata.slice(0,rule.size), rule);
    let moreBtn = [];
    bdata.slice(rule.size).forEach((val)=>{
      let type = val.type,
        text = val.text;
      rule.btns.forEach(btn=>{
        if(val.func === btn.func && params.row[btn.name] === btn.right){
          type = btn.type;
          text = btn.wbtn;
        }
      });
      const btn = h('DropdownItem',[h('Button',{
        props: {
          type
        },
        on: {
          click: ()=>{
            this[val.func](params.row)
          }
        }
      },text)]);
      moreBtn.push(btn);
    });
    BtnArr.push(h('Dropdown',{
      attrs:{
        trigger: 'click'
      }
    },[
      h('Button',{
        props: {
          type: 'info'
        }
      },[
        '更多 ',
        h('Icon',{
          props: {
            type: 'arrow-down-b'
          }
        })
      ]),
      h('DropdownMenu',{
        slot: 'list'
      }, moreBtn)
    ]));
  }
  return BtnArr;
}

function loopBtn(proto, h, params, bdata,rule){
  let res = [];
  bdata.forEach((val)=>{
    let type = val.type,
      text = val.text;
    rule.btns.forEach(btn=>{
      if(val.func === btn.func && params.row[btn.name] === btn.right){
        type = btn.type;
        text = btn.wbtn;
      }
    });
    const btn = h('Button',{
      props: {
        type
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: ()=>{
          proto[val.func](params.row)
        }
      },
    },text);
    res.push(btn);
  });
  return res;
}


//格式化日期
function formateDate(date,type) {  //type：日期类型  1：起始日期（+00:00:00）  2：终止日期(+23:59:59)  不填的话为正常日期
  if(!date) {
    return '';
  }
  let time = '';
  let Y = date.getFullYear();
  let M = date.getMonth()+1;
  if(M<10){
    M = '0'+M;
  }
  let D = date.getDate();
  if(D<10){
    D = '0'+ D
  }
  time = time + Y + '-' + M + '-' + D;
  switch(type){
    case 1:time += ' 00:00:00';break;
    case 2:time += ' 23:59:59';break;
  }
  return time;
}

export {
  compareObject,
  copyObj,
  crossObj,
  uploadData,
  renderBtn,
  formateDate
}
