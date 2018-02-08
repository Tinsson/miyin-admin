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
  formateDate
}
