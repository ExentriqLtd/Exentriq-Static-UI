var EqStUi = {};
(function ($) {
    EqStUi.login = {};
    var _this = function(){return EqStUi.login;}();

    // Init
    _this.init = function() {

        // Validate form (login)
        /*EqUI.forms.add_form_for_submit_validate($('#form-login'));
         $('#form-login-submit').on('click', function(e) {
         $('#form-login').submit();
         });*/

        // Validate form (login)
        $('#form-login-submit').on('click', function(e) {
            var result = EqUI.forms.validate_form($('#form-login'));
            console.log(result);
        });

        // Validate form (signin)
        /*EqUI.forms.add_form_for_submit_validate($('#form-signin'));
         $('#form-signin-submit').on('click', function(e) {
         $('#form-signin').submit();
         });*/

        // Validate form (signin)
        $('#form-signin-submit').on('click', function(e) {
            var result = EqUI.forms.validate_form($('#form-signin'));
            console.log(result);
        });
    };

    // Update
    _this.update = function() {
        if (window.innerWidth > 768) {


        }
        else {


        }
    };

    // Load
    _this.load = function() {
        //...
    };

    /* --------------------------------------- */
    /* Helps
    /* --------------------------------------- */



    $(document).ready(function() {
        // Init
        _this.init();

        // Update
        _this.update();

        // Resize
        $(window).resize( function() {
            _this.update();
        });

        // Load complete
        $(window).load(function(){
            _this.load();
        });
    });
}( jQuery ));
