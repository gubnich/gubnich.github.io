$(document).ready(function () {

//to hide logo-image 
    
    $('#header').find('.navbar-toggle').click(function () {
    var flag = $('.navbar-toggle').attr('aria-expanded');
        if(flag != 'true') {
            $('.navbar-header').addClass("hid");
        }
        else{
            setTimeout(function () {
                $('.navbar-header').removeClass("hid");
            },300)
        }
    });
    
//to show the links triangle
    
    $('.portfolio-item img').hover(function () {
        $('.portfolio-item-links').animate({
            transform: 'rotate(15deg)'
        }, 500, function () {
        });
    });

// scrolling animation

    //features section

    $('.feature-box').addClass('hidden-box');
    var windowHeight = $(window).height();

    var posBox = $('.feature-box.hidden-box').first().offset().top;
    var posDoc = $(document).scrollTop();

    function showBox () {
        $('.feature-box.hidden-box').first().css({
            transform: "scale(1)",
            transition: 'transform .7s',
            visibility: 'visible'
        });
        $('.feature-box.hidden-box').first().removeClass('hidden-box')
    }
    for(posBox;posBox<(windowHeight);posBox = $('.feature-box.hidden-box').first().offset().top){

        showBox()
    }

    $(window).scroll(function () {
        if ($('.feature-box').hasClass('hidden-box')) {
            posDoc = $(document).scrollTop();
            posBox = $('.feature-box.hidden-box').first().offset().top
        }
        if ((posDoc + windowHeight) > posBox) {
            showBox()
        }
    });

    //portfolio section

    $('.portfolio-item-inner').addClass('hidden-box');
    var posItem = $('.portfolio-item-inner.hidden-box').first().offset().top;

    function showItem () {
        $('.portfolio-item-inner.hidden-box').first().css({
            transform: "scale(1)",
            transition: 'transform .7s',
            visibility: 'visible'
        });
        $('.portfolio-item-inner.hidden-box').first().removeClass('hidden-box')
    }
    $(window).scroll(function () {
        if ($('.portfolio-item-inner').hasClass('hidden-box')) {
            posDoc = $(document).scrollTop();
            posItem = $('.portfolio-item-inner.hidden-box').first().offset().top
        }
        if ((posDoc + windowHeight) > posItem) {
            showItem()
        }
    });

    //team section

    $('.team-member').addClass('turned-box');
    var posMember = $('.team-member.turned-box').first().offset().top;
    function turn (){
        $('.team-member.turned-box').first().css({
            transform: "rotateY(0)",
            transition: 'transform .7s'
        });

        $('.team-member.turned-box').first().removeClass('turned-box')
    }
    $(window).scroll(function () {

        if ($('.team-member').hasClass('turned-box')) {
            posDoc = $(document).scrollTop();
            posMember = $('.team-member.turned-box').first().offset().top
        }
        if ((posDoc + windowHeight/1.5) > posMember) {

            turn()
        }
    });

    // links scrolling

    $("a[href='#header']").click(function (event) {
        event.preventDefault();
        $('body,html').animate({scrollTop: 0}, 1500);
    });
    $("a[href='#features']").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            goal = $(id).offset().top;
        $('body,html').animate({scrollTop: goal}, 500);
    });
    $("a[href='#portfolio']").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            goal = $(id).offset().top;
        $('body,html').animate({scrollTop: goal},700);
    });
    $("a[href='#team']").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            goal = $(id).offset().top;
        $('body,html').animate({scrollTop: goal}, 800);
    });
    $("a[href='#skills']").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            goal = $(id).offset().top;
        $('body,html').animate({scrollTop: goal}, 800);
    });
    $("a[href='#about']").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            goal = $(id).offset().top;
        $('body,html').animate({scrollTop: goal}, 1000);
    });
    $("a[href='#contact']").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            goal = $(id).offset().top;
        $('body,html').animate({scrollTop: goal}, 1200);
    });
});



