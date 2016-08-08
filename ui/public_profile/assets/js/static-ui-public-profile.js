var EqStUi = {};
(function ($) {
    EqStUi.public_profile = {};
    var _this = function(){return EqStUi.public_profile;}();

    // Init
    _this.init = function() {
        // Init with custom options
        $(document).ready(function(){
            $('.eq-ui-modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: 0.5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: function() { console.log('Modal Open'); }, // Callback for Modal open
                complete: function() { console.log('Modal Close'); } // Callback for Modal close
            });
        });

        _this.update_fixed_menu();

        _this.update_masonry();
    };

    // Update
    _this.update = function() {
        _this.update_fixed_menu();
    };

    // Scroll
    _this.scroll = function() {
        _this.update_fixed_menu();
    };

    // Load
    _this.load = function() {
        //...
    };

    /* --------------------------------------- */
    /* Helps
    /* --------------------------------------- */

    // Update masonry
    _this.update_masonry = function() {
        var $container = $('.masonry-container');
        $container.imagesLoaded( function () {
            $container.masonry({
                columnWidth: '.item',
                itemSelector: '.item'
            });
        });

        // Event Show
        $('#eq-ui-tab-posts').bind('isShow', function () {
            $container.imagesLoaded( function () {
                $container.masonry({
                    columnWidth: '.item',
                    itemSelector: '.item'
                });
            });
        });
    };

    // Update fixed menu
    _this.update_fixed_menu = function() {
        var _s_top = $(window).scrollTop();
        var _header = $('.eq-st-ui-public-profile-header');
        var _header_height = _header.outerHeight(false);

        if(_s_top < _header_height){
            if(_header.hasClass('eq-st-ui-public-profile-header-nav-fixed')){
                _header.removeClass('eq-st-ui-public-profile-header-nav-fixed');
            }
        } else if(_s_top >= _header_height) {
            if(!_header.hasClass('eq-st-ui-public-profile-header-nav-fixed')){
                _header.addClass('eq-st-ui-public-profile-header-nav-fixed');
            }
        }
    };

    $(document).ready(function() {
        // Init
        _this.init();

        // Update
        _this.update();

        // Resize
        $(window).resize( function() {
            _this.update();
        });

        $(window).scroll(function() {
            _this.scroll();
        });

        // Load complete
        $(window).load(function(){
            _this.load();
        });
    });
}( jQuery ));
