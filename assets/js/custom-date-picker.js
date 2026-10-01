(function ($) {

    acf.add_filter('date_picker_args', function (args, $field) {

        args.yearRange = '1700:2100';
        args.changeYear = true;
        args.changeMonth = true;

        return args;

    });

})(jQuery);