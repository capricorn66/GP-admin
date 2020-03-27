/*!
 * sidebar for DS v1.0.0
 */

export function sidebarInit() {
    const $sidebarBtn = $('[data-toggle="sidebar"]');
    const sidebarID = $sidebarBtn.attr('data-target');
    const $sidebar = $(sidebarID);
    const $sidebarOverlay = $('main');
    let prevDistance = 0;
    let currentDistance = 0;
    let startClosing = false;

    $sidebarBtn.on('click', function() {
        if ($sidebar.hasClass('sidebar-end-position')) {
            closeSideBar();
        } else {
            openSideBar();
            swipeToggle();
        }
    });

    $(document).keyup(function(e) {
        if (e.key === 'Escape' && $sidebar.hasClass('sidebar-end-position')) {
            closeSideBar();
        }
    });

    function initSideBarSwipe() {
        $('body').swipe( {
            swipeStatus: function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
                if (direction === 'left') {
                    startClosing = true;
                    $sidebarOverlay.off('click');
                }

                if (direction === 'right' && prevDistance < distance) {
                    startClosing = false;
                    $sidebarOverlay.off('click');
                    openSideBar();
                }

                if (direction === 'left' && distance >= 280) {
                    startClosing = false;
                    closeSideBar();
                }

                if ( $sidebar.hasClass('sidebar-state-opened') && startClosing) {
                    currentDistance = 279 - distance;
                    $sidebar
                        .addClass('sidebar-move')
                        .removeClass('sidebar-end-position');

                    if ( phase==='move' && (currentDistance >= 0 && currentDistance <= 280 ) ) {
                        $sidebar.css({
                            'transform': 'translateX('+ currentDistance +'px)',
                            'box-shadow': '280px 0 0 100vw rgba(0,0,0,'+ (parseInt(currentDistance) / 1000) +' )',
                        });
                    }

                    if ( phase!=='move' ) {
                        if (direction === 'left') {
                            closeSideBar();
                        } else if (direction === 'right') {
                            openSideBar();
                        }
                    }
                }

                prevDistance = distance;
            },
            threshold: 200,
            maxTimeThreshold: 5000,
            fingers: 'all',
        });
    }

    const openSideBar = function() {
        $sidebar
            .removeClass('sidebar-move')
            .addClass('sidebar-end-position sidebar-state-opened')
            .attr('style', '');
        $sidebarBtn
            .addClass('is-active');

        setTimeout(function() {
            $sidebarOverlay.one('click', function() {
                closeSideBar();
            });
        }, 10);
    };

    const closeSideBar = function() {
        $sidebar
            .removeClass('sidebar-move sidebar-end-position sidebar-state-opened')
            .attr('style', '');
        $sidebarBtn
            .removeClass('is-active');

        $sidebarOverlay.off('click');
        $('body').swipe('destroy');
        startClosing = false;
    };

    const swipeToggle = debounce(function() {
        if ( (rwdMedia.xs() || rwdMedia.sm() || rwdMedia.md() || rwdMedia.lg()) && $sidebar.hasClass('sidebar-state-opened') ) {
            initSideBarSwipe();
        } else {
            $('body').swipe('destroy');
            startClosing = false;
        }
    }, 250);

    swipeToggle();

    window.addEventListener('resize', swipeToggle);

}
