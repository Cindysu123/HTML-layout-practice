window.addEventListener('load', function() {
    // 鼠标经过轮播图显示按钮
    var btnl = document.querySelector('.arrow-l')
    var btnr = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    var focuswidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        btnl.style.display = 'block';
        btnr.style.display = 'block';
    })
    focus.addEventListener('mouseleave', function() {
            btnl.style.display = 'none';
            btnr.style.display = 'none';
        })
        // 有几个轮播图就有几个小圆圈
    var ul = focus.querySelector('ul')
    var ol = focus.querySelector('ol')
    var num = 0;
    var circle = 0;
    for (i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        // 记录当前小圆圈的索引号 通过自定义属性来做
        ol.appendChild(li);
        li.addEventListener('click', function() {
            // 按小圆圈变色
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈移动图片
            // 当我们点击了某个小li就拿到当前li的索引号
            //当我们点击了某个小li就拿到当前小li的索引号
            // num = this.index
            // circle = this.index;
            var focuswidth = focus.offsetWidth;
            var index = this.getAttribute('index');
            animate(ul, -index * focuswidth);
        })
    }
    ol.children[0].className = 'current';

    // 克隆第一张图片,放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击左右侧按钮,图片滚动
    // 控制小圆圈播放
    btnr.addEventListener('click', function() {
        if (num >= ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, num * -focuswidth);
        circle++;
        if (circle >= ol.children.length) {
            circle = 0;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    })
    $(function() {
        var flag = true;
        var toolTop = $(".recommend").offset().top;
        toggleTool();

        function toggleTool() {
            if ($(document).scrollTop() >= toolTop) {
                $(".fixedtool").fadeIn();
            } else {
                $(".fixedtool").fadeOut();
            };
        }
        $(window).scroll(function() {
            toggleTool();
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top && flag) {
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        })
        $(".fixedtool li").click(function() {
            flag = false;
            // 选出对应索引好的内容去的盒子
            var current = $(".floor .w").eq($(this).index()).offset().top;
            // 页面动画滚动效果
            $("body, html").stop().animate({
                scrollTop: current
            }, function() {
                flag = true;
            })
            $(this).addClass("current").siblings().removeClass();
        })
    })
})