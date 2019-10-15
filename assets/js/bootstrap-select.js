/* !
 * bootstrap select wrapper for DS v1.1.1
 */

(function(root, factory) {
    if (root === undefined && window !== undefined) root = window;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(['jquery'], function(a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        factory(root['jQuery']);
    }
}(this, function(jQuery) {
    (function($) {
        $.fn.bsSelectInit = function(config) {
            const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
            let $selectpicker;
            let $parentBlock;
            let bsOpenedClass;
            let $hintItemSelected;
            let $selectDropdownInner;

            function toggler() {
                $parentBlock.toggleClass(bsOpenedClass);
                if (rwdMedia.bs4_md() || rwdMedia.bs4_sm() || rwdMedia.bs4_xs()) {
                    bodyLock();
                }
            }

            return this.each( function() {
                bsOpenedClass = 'custom-select-opened';
                $selectpicker = $(this);
                $parentBlock = $selectpicker.parentsUntil('body').last();

                // ie11 'live-search' disabled, due to the issue with option selections
                if (isIE11) {
                    $selectpicker
                        .attr('data-ie11', 'true')
                        .attr('data-live-search', 'false');
                    $('[data-ie11]')
                        .selectpicker(config);
                } else {
                    $selectpicker
                        .selectpicker(config);
                }

                $selectpicker.on('loaded.bs.select', function() {
                    const $this = $(this);
                    const dropdownBtn = $this.siblings('.dropdown-toggle');
                    const dropdownMenu = $this.siblings('.dropdown-menu');
                    const closeBtnHtmlTemplate = '<div class="bs-close"><button type="button" class="close" aria-label="Close"><span aria-hidden="true"></span></button></div>';
                    const bsSelectToggle = 'show.bs.select hide.bs.select';

                    dropdownBtn.attr('data-display', 'static');

                    if ( $this.parent().parent().hasClass('input-group') && $this.data('label') !== 'undefined') {
                        $this.parent().parent().attr('data-label', $this.data('label'));
                    }

                    $this.on(bsSelectToggle, function() {
                        if ($this.attr('required') && $this[0].checkValidity()) {
                            $this.parent('.is-invalid').addClass('is-valid').removeClass('is-invalid');
                        } else {
                            $this.parent('.is-valid').addClass('is-invalid').removeClass('is-valid');
                        }

                        toggler();
                    });

                    dropdownMenu.prepend(closeBtnHtmlTemplate);
                });

                $selectpicker.on('shown.bs.select', function() {
                    const $this = $(this);
                    const dropdownMenu = $this.siblings('.dropdown-menu');
                    let selectDropdownScrollTop = 0;
                    $selectDropdownInner = $('.inner:not(.dropdown-menu)', dropdownMenu);
                    $hintItemSelected = $('.active', $selectDropdownInner);

                    // arrow navigation
                    $(window).bind('keydown', function(e) {
                        $hintItemSelected = $('.active', $selectDropdownInner);
                        const hintItemSelectedTop = $selectDropdownInner.scrollTop() + $hintItemSelected.position().top;

                        $selectDropdownInner.scrollTop(selectDropdownScrollTop);
                        if (dropdownMenu.hasClass('show')) {
                            if ( ( hintItemSelectedTop > $selectDropdownInner.scrollTop() + ($selectDropdownInner.height() - $hintItemSelected.outerHeight()) ) || ( hintItemSelectedTop < $selectDropdownInner.scrollTop() ) ) {
                                if (e.which === 40 || e.which === 39) { // arrow down or left key
                                    $selectDropdownInner.scrollTop( hintItemSelectedTop - ($selectDropdownInner.height() - $hintItemSelected.outerHeight()) ); // Scroll to the bottom
                                } else if (e.which === 38 || e.which === 37) { // arrow up or right key
                                    $selectDropdownInner.scrollTop( hintItemSelectedTop ); // Scroll to the top
                                }
                            }
                            selectDropdownScrollTop = $selectDropdownInner.scrollTop();
                        }
                    });
                });

                $selectpicker.on('changed.bs.select', function() {
                    if ( $(this).is('[multiple]')) {
                        const $this = $(this);
                        const dropdownToggle = $this.siblings('.dropdown-toggle');
                        const dropdownMenu = $this.siblings('.dropdown-menu');

                        $('.filter-option-inner-inner .tag', dropdownToggle).click( function(e) {
                            e.stopPropagation();
                            const $option = $('option:contains('+ $(this).text() +')', $this);
                            const optionVal = $option.val();

                            $('option[value=\''+optionVal+'\']', $this).prop('selected', false);
                            $('.inner li:eq(' + $option.index() + ')', dropdownMenu).removeClass('selected');

                            $(this).remove();

                            if ( !$this.val().length ) {
                                if ($this.attr('title')) {
                                    $('.filter-option-inner-inner', dropdownToggle).text($this.attr('title'));
                                } else {
                                    $('.filter-option-inner-inner', dropdownToggle).text('Nothing selected');
                                }
                            }
                        });
                    }
                });

                $(window).on('resize', function() {
                    if ($parentBlock.hasClass(bsOpenedClass)) {
                        if (rwdMedia.bs4_md() || rwdMedia.bs4_sm() || rwdMedia.bs4_xs()) {
                            bodyLock();
                        }
                    }
                });
            });
        };
    })(jQuery);
}));
