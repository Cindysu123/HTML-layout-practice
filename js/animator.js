
function animate(obj, target, callback) {                
    //清楚以前的定时器， 只保留当前的定时器执行
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        //步长值写到定时器里面，改为整数，不要出现小数问题
        var step = (target - obj.offsetLeft) / 10;
        console.log(step);
        if (step == 0) {
            clearInterval(obj.timer);
        }
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft >= Math.abs(target)) {
            //停止定时器
            clearInterval(obj.timer);
            //回调函数写在定时器里面
            if (callback) {
                callback();
            }
        }
        //把每次加1这个步长值改为一个慢慢变小的值 步长公式：（目标值-现在的位置）/ 10
        obj.style. left = obj.offsetLeft + step + 'px'
    }, 20)
}