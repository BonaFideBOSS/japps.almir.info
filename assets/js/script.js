(function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
})()

$(function () {
    $(".filter-menu-mobile").on("show.bs.dropdown hide.bs.dropdown", function () {
        $(this).toggleClass("is-open");
    });
});

$(document).ready(function () {
    var matches = location.hash.match(/#([^&]+)/i);
    var hashFilter = matches && matches[1];
    if (hashFilter == 'apps') {
        $("li[data-filter='.category-app']").click();
    } else if (hashFilter == 'games') {
        $("li[data-filter='.category-game']").click();
    }
});

var buttonFilters = {};
var buttonFilter;
var qsRegex;

var menu = $('.japps').imagesLoaded(function () {
    $('#japp-loader').hide()
    menu.isotope({
        itemSelector: '.japps-item',
        filter: function () {
            var $this = $(this);
            var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
            var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
            return searchResult && buttonResult;
        },
    });
});

// menu.imagesLoaded().progress(function () {
//     menu.isotope('layout');
// });

$('.filter').on('click', '.filter-item', function () {
    var $this = $(this);
    var $buttonGroup = $this.parents('.filter');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    buttonFilters[filterGroup] = $this.attr('data-filter');
    buttonFilter = concatValues(buttonFilters);
    menu.isotope();
});

var $quicksearch = $('.filter-search').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    menu.isotope();
}));

var $quicksearchMob = $('.filter-search-mobile').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearchMob.val(), 'gi');
    menu.isotope();
}));

$('.filter').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', '.filter-item', function () {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
    });
});

function concatValues(obj) {
    var value = '';
    for (var prop in obj) {
        value += obj[prop];
    }
    return value;
}

function debounce(fn, threshold) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
        clearTimeout(timeout);
        var args = arguments;
        var _this = this;

        function delayed() {
            fn.apply(_this, args);
        }
        timeout = setTimeout(delayed, threshold);
    };
}


function scrollToTop() {
    var $backToTop = $('.back-to-top'),
        $showBackTotop = $(window).height();
    $backToTop.hide();

    $(window).scroll(function () {
        var windowScrollTop = $(window).scrollTop();
        if (windowScrollTop > $showBackTotop) {
            $backToTop.fadeIn('fast');
        } else {
            $backToTop.fadeOut('fast');
        }
    });

    $backToTop.on('click', function (e) {
        e.preventDefault();
        $(' body, html ').animate({
            scrollTop: 0
        }, 'fast');
    });
}
scrollToTop(); //Init