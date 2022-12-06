

/**
 @name: tools
 @author: 戴伟
 @date: 004 2022/07/04 17:34:37
 @file: src/utils
 @description： do.....
 */

// 防抖
//　触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
// 每次触发事件时都取消之前的延时调用方法

export function debounce(fn,time=500) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, time);
  };
}

//函数节流
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
// 每次触发事件时都判断当前是否有等待执行的延时函数
export function throttle(fn,time = 500) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, time);
  };
}

//拆箱函数
// 解决tooltip显示问题
export const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);



// 判断是否是对象
const isObj = (object) => {
  // console.log(this);
  return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}
// 判断是否是数组
const isArr = (object) => {
  return object && typeof (object) == 'object' && object.constructor == Array;
}
// 获取对象长度
const getLength = (object) =>{
  let count = 0;
  for (let i in object) count++;
  return count;
}

const compareObj = (objA, objB, flag) => {
  for (var key in objA) {
    if (!flag) //跳出整个循环
      break;
    // hasOwnProperty表示是否有自己的属性。这个方法会查找一个对象是否有某个属性，但是不会去查找它的原型链。
    if (!objB.hasOwnProperty(key)) {
      flag = false;
      break;
    }
    if (!isArr(objA[key])) { //子级不是数组时,比较属性值
      if (objB[key] != objA[key]) {
        flag = false;
        break;
      }
    } else {
      if (!isArr(objB[key])) {
        flag = false;
        break;
      }
      var oA = objA[key],
        oB = objB[key];
      if (oA.length != oB.length) {
        flag = false;
        break;
      }
      for (var k in oA) {
        if (!flag) //这里跳出循环是为了不让递归继续
          break;
        flag = compareObj(oA[k], oB[k], flag);
      }
    }
  }
  return flag;
}


// 判断两个数据是否相同
export const isSameObj = (objA, objB) =>{
  if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
  if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
  return compareObj(objA, objB, true); //默认为true
}




export const getWindowLocation = ()=>{
  let _location = window.location
  let paramsStr = window.location.search
  let _urlQuery = { }
  // paramsStr.split('?')?.map(item=>{
  //   // console.log(item)
  //   if(!item) return false;
  //   // console.log(Qs.parse(item))
  //   let _data = Qs.parse(item);
  //   _urlQuery = {
  //     ..._urlQuery,
  //     ..._data
  //   }
  // })
  _location.params = _urlQuery;
  // console.log(_urlQuery);


  return _location;
}

//生成从minNum到maxNum的随机数
export const randomNum = function (minNum,maxNum){
  // console.log(arguments)

  let _len = arguments.length

  switch(_len){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}