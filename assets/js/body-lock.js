/*!
 * body-lock for DS v1.0.0
 */

var offsetTop;

export function bodyLock(lock) {

    lock = lock === undefined ? true : lock;
    offsetTop = offsetTop === undefined ? window.pageYOffset : offsetTop;

    var $page = $('html, body');

    if ($page.hasClass('bodyLock') || !lock ) {
        $page
            .removeClass('bodyLock')
            .scrollTop(offsetTop);
    }
    else {
        setTimeout(function () {
            $page.addClass('bodyLock');
            setTimeout(function () {
                $page.scrollTop(0);
            }, 50);
        }, 300);
    }
}
