$(function () {
    //添加栏目
    $.each(datas,function (i,v) {
        // attr()   设置元素本身有的属性值
        // prop()   设置元素本身没有的属性值
        $('<li>').appendTo($('ul')).text(v.title).prop('param',v.param);
        if (i == 0){
            $('li').addClass('active');
        }
    });
    //设置li的点击事件
    $('ul').on('click',"li",function (e) {
        // console.log(e.currentTarget);
        //把点击的li添加active类，把他的兄弟节点去除active类
        $(e.currentTarget).addClass('active').siblings().removeClass('active');

        //发送请求，获取列表数据
        requestData(e.currentTarget.param,loadContentList);
        $('.content').html('');
    });
    
    //加载最新数据
    function loadContentList(cDatas) {
        console.log(cDatas.data);
        $.each(cDatas.data,function (i,v) {
            var clist = $("<div>").appendTo($('.content')).addClass('clist').prop('data_id',v.id);
            clist.append($("<img>").attr('src',v.recommend_covers[0]).css({
                width:"0.8rem",
                height:"0.6rem"
            }));
            clist.append($("<p>").text(v.title));
        });
    }

    //模拟自动加载最新 数据
    $('li:first').trigger('click');


    //加载更多
    $('button').on('click',function (e) {
        // 更改参数中的id
        moreParam["params[lastId]"] = $('.clist:last')[0].data_id;
        // 发起请求
        requestData(moreParam,loadContentList);
    });


    //  详情
    $('.content').on('click','.clist',function (e) {
        //更改详情参数中的id
        detailParam['params[id]'] = e.currentTarget.data_id;

        requestData(detailParam,function (detailData) {
            console.log(detailData.data);
            window.open(detailData.data.share_url)
        });
    });


    // 请求轮播图
    requestData(banerParam,function (banerData) {
        // console.log(banerData.data.list);
        //添加轮播图
        $.each(banerData.data.list,function (i,v) {
            // 添加类名为swiper-slide的div
            var d = $("<div>").addClass('swiper-slide').appendTo($('.swiper-wrapper'));
            //在类名为swiper-slide的div的div中添加img
            d.append($('<img>').attr('src',v.image_url).css({
                height:"2rem",
                width:'100%'
            }));
        });
        //设置轮播图 添加pagination，2s自动轮播，循环轮播
        var mySwiper = new Swiper('.swiper-container',{
            pagination : '.swiper-pagination',
            autoplay: 2000,
            loop:true
        });
    });
});