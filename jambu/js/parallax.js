/**
 * Created by user on 19.10.2016.
 */
$(document).ready(function () {
    var delta = [1];
    var bgpos = 1000;
    var missions = [$('#missions').offset().top - $(window).height(),
        $('#missions').offset().top + $('#missions').height()];
    $(window).scroll(function parallax() {

        var pos = $(document).scrollTop();
        if(pos >= missions[0] && pos <= missions[1]){

            if(delta.length<2) {
                delta.push(pos , pos)
            }
            else{
                delta.push(pos)
            }

            delta.splice(0,delta.length - 2);
            deltaresult = delta[0]-delta[1];
            bgpos = bgpos+ deltaresult;
            var pixel = '50%' + (bgpos*0.05) + '%';
            $('#missions .container-fluid').css("backgroundPosition",pixel)
        }
    });
});

