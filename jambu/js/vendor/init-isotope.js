/**
 * Created by user on 21.10.2016.
 */
// external js: isotope.pkgd.min.js

// init Isotope
$(document).ready(function () {

    var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'

    });

// bind filter button click
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({filter: filterValue});
    });

// change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

});