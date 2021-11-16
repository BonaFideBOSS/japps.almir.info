(function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
})()

$('.select').on('click', '.filter-dropdown', function () {
    var parent = $(this).closest('.select');
    if (!parent.hasClass('is-open')) {
        parent.addClass('is-open');
        $('.select.is-open').not(parent).removeClass('is-open');
    } else {
        parent.removeClass('is-open');
    }
}).on('click', 'ul>li', function () {
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.filter-dropdown').text($(this).text());

    $('.filter-item').removeClass('active');
    $(this).addClass('active');
    var selector = $(this).attr('data-filter');

    $('.japps-container').isotope({
        filter: selector
    });
    return false;
});

$('.filter-search').click(function () {
    location.reload();
});

var qsRegex;
var japps = $('.japps').isotope({
    // options
    itemSelector: '.japps-item',
    layoutMode: 'fitRows',
    filter: function () {
        var $this = $(this);
        var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
        return searchResult;
    }
});

var $quicksearch = $('.filter-search').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    japps.isotope();
}, 1));

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

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log(this.responseText);
    }
    xhttp.open("GET", "data/votes.txt");
    xhttp.send();
}
window.onload = loadDoc;