/**
 * Created by user on 21.10.2016.
 */
$(document).ready(function () {
    var idName = '#portfolio';
    $(idName).find('.photo-work.man img').magnificPopup({
        items: [
            {
                src: '#portfolio .photo-work.man .portfolio-modal', 
                type: 'inline'
            }
        ],
        type: 'image'
    });
    $(idName).find('.photo-work.railway img').magnificPopup({
        items: [
            {
                src: '#portfolio .photo-work.railway .portfolio-modal', 
                type: 'inline'
            }
        ],
        type: 'image'
    });
    $(idName).find('.logo-work.bird img').magnificPopup({
        items: [
            {
                src: '#portfolio .logo-work.bird .portfolio-modal',
                type: 'inline'
            }
        ],
        type: 'image'
    });
    $(idName).find('.logo-work.bar img').magnificPopup({
        items: [
            {
                src: '#portfolio .logo-work.bar .portfolio-modal',
                type: 'inline'
            }
        ],
        type: 'image'
    });
    $(idName).find('.design-work.stones img').magnificPopup({
        items: [
            {
                src: '#portfolio .design-work.stones .portfolio-modal', 
                type: 'inline'
            }
        ],
        type: 'image'
    });
    $(idName).find('.game-work.girl img').magnificPopup({
        items: [
            {
                src: '#portfolio .game-work.girl .portfolio-modal', 
                type: 'inline'
            }
        ],
        type: 'image'
    });
})