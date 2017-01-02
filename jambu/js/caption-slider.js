$(document).ready(function () {
    $('.carousel-caption-slogan').first().addClass('active');
    $('.carousel-caption-feature').first().addClass('active');
    //$('.carousel-caption-inner').addClass('start')
    var sloganClass;
    var featureClass;
    var slogan = $('.carousel-caption-slogan');
    var feature = $('.carousel-caption-feature');
    var flag = [1];

    function captionSlider(){
        sloganClass = slogan.last().attr('class');
        if(sloganClass.indexOf('active')+1) {
            slogan.first().addClass('active');
            feature.first().addClass('active');
            slogan.last().removeClass('active');
            feature.last().removeClass('active');
        }
        else {

            $('.carousel-caption-slogan.active + .carousel-caption-slogan').addClass('active').addClass('new');
            $('.carousel-caption-slogan[class!="new"]').removeClass('active');
            $('.carousel-caption-slogan.new').addClass('active');
            $('.carousel-caption-slogan.active').removeClass('new');
            $('.carousel-caption-feature.active + .carousel-caption-feature').addClass('active').addClass('new');
            $('.carousel-caption-feature[class!="new"]').removeClass('active');
            $('.carousel-caption-feature.new').addClass('active');
            $('.carousel-caption-feature.active').removeClass('new');
        }
    };

    function captionSliderReverse() {
        sloganClass = slogan.first().attr('class');
        if(sloganClass.indexOf('active')+1) {
            slogan.last().addClass('active');
            feature.last().addClass('active');
            slogan.first().removeClass('active');
            feature.first().removeClass('active');
        }
        else {
            $('.carousel-caption-slogan.active').prev().addClass('active').addClass('new');
            $('.carousel-caption-slogan[class!="new"]').removeClass('active');
            $('.carousel-caption-slogan.new').addClass('active');
            $('.carousel-caption-slogan.active').removeClass('new');
            $('.carousel-caption-feature.active').prev().addClass('active').addClass('new');
            $('.carousel-caption-feature[class!="new"]').removeClass('active');
            $('.carousel-caption-feature.new').addClass('active');
            $('.carousel-caption-feature.active').removeClass('new');
        }
    };
    $('#carousel-a').mouseenter(function () {
        flag[0] = 0;
        });
    $('#carousel-a').mouseleave(function (){
        flag[0] = 1;
    });

    $('.carousel-control .icon-angle-right').click(captionSlider);
    $('.carousel-control .icon-angle-left').click(captionSliderReverse);
    $('.carousel-caption-controls .icon-angle-right').click(captionSlider);

        $('#carousel-a').on('slid.bs.carousel', function(){
           if (flag[0] == 1){
               captionSlider()
           }
        });
    $('.carousel-caption-controls .icon-angle-left').click(captionSliderReverse);
});