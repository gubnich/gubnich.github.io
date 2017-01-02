/**
 * Created by user on 20.10.2016.
 */
$(document).ready(function () {
    var header = $('#header');
    var fill = header.find('.navbar-brand svg ellipse').attr('fill');

    function logocolor (){
        var logocolorR = Math.round(Math.random()*255);
        var logocolorG = Math.round(Math.random()*255);
        var logocolorB = Math.round(Math.random()*255);
        var logocolorRGB = 'rgb(' + logocolorR + ',' + logocolorG + ',' + logocolorB + ')';
        $('#header').find('.navbar-brand svg ellipse').css('fill',logocolorRGB)
    }

    header.find('.navbar-brand svg ellipse').mouseenter(logocolor);

    var setIDlogo;
    header.find('.navbar-brand svg ellipse').click (function (){
        if (setIDlogo == undefined){
            setIDlogo=setInterval(logocolor,100);
        }
        else{
            clearInterval(setIDlogo);
            setIDlogo=undefined;}
    });
    header.find('.navbar-brand svg polygon').click (function (){
        $('#header').find('.navbar-brand svg ellipse').css('fill',fill)
    });
});
