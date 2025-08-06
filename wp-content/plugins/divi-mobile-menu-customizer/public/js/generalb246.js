( function( $ ) {
    $(function() { 
     
        /**
         * Remove Divi native mobile menu to prevent menu duplication.
         * (remove ul.et_mobile_menu added by Divi)
         * 
         * @since   ???
         * @since   v2.7.6  setTimeout used
         */
        setTimeout(function(){
            $('#main-header #et_mobile_nav_menu .et_mobile_menu:not(.chimmc_mobile_menu)').remove();
        }, 0);
       
        /**
         * manage secondary menu items
         */
        $(function() {
            // get the value for secondary menu items position
            var $chimmc_sec_menu_items_position = Chi_MMC_gen_options.chimmc_sec_menu_items_position;

            if ( $( '#et-secondary-nav' ).length ) {

                if ( $chimmc_sec_menu_items_position === 'before' ) {

                    // remove secondary menu items added to chimmc_mobile_menu by Divi
                    $('#main-header .chimmc_mobile_menu li.sec_menu_item').remove();

                    if ($('.chimmc_mobile_menu li[id^="menu-item-"]').length){

                        // insert before the first main menu item
                        $($( '#et-secondary-nav' ).clone().html()).insertBefore('#et-top-navigation .chimmc_mobile_menu > li[id^="menu-item-"]:first-of-type');

                    } else if($('.chimmc_mobile_menu .et_pb_section').length) {

                        // insert before the first et_pb_section
                        $($( '#et-secondary-nav' ).clone().html()).insertBefore('#et-top-navigation .chimmc_mobile_menu .et_pb_section:first-of-type');

                    } else {

                        // prepend secondary menu items to chimmc_mobile_menu
                        $('#et-top-navigation .chimmc_mobile_menu').prepend( $( '#et-secondary-nav' ).clone().html() );

                    }

                } else if ( $chimmc_sec_menu_items_position === 'after' ) {

                    // remove secondary menu items added to chimmc_mobile_menu by Divi
                    $('#main-header .chimmc_mobile_menu li.sec_menu_item').remove();

                    if ($('.chimmc_mobile_menu li[id^="menu-item-"]').length){
                        
                        // insert after the last main menu item
                        $($( '#et-secondary-nav' ).clone().html()).insertAfter('#et-top-navigation .chimmc_mobile_menu > li[id^="menu-item-"]:last-of-type');

                    } else if($('.chimmc_mobile_menu .et_pb_section').length) {

                        // insert after the last et_pb_section
                        $($( '#et-secondary-nav' ).clone().html()).insertAfter('#et-top-navigation .chimmc_mobile_menu .et_pb_section:last-of-type');

                    } else {

                        // append secondary menu items to chimmc_mobile_menu
                        $('#et-top-navigation .chimmc_mobile_menu').append( $( '#et-secondary-nav' ).clone().html() );

                    }

                } else {

                    // remove secondary menu items added to chimmc_mobile_menu by Divi
                    $('#main-header .chimmc_mobile_menu li.sec_menu_item').remove();

                }
            }
        });

        // End 
      
        /**
         * Add chi_mmc_activated css class
         */
        $(function() { 
            $('#main-header').addClass('chi_mmc_activated');   
        });

        // End
      
        /**
         * Add chi_mmc_fixed_menu css class
         */

        $(function() {      

            var $chiMMCfixedMenu = Chi_MMC_gen_options.fixedMenu;

            if( $chiMMCfixedMenu == 'fixed' ) {
                $('body:not(.et_header_style_slide):not(.et_header_style_fullscreen).chi_dmm_styles .chi_mmc_activated #mobile_menu').addClass('chi_mmc_fixed_menu');
            } else {
                $('body:not(.et_header_style_slide):not(.et_header_style_fullscreen).chi_dmm_styles .chi_mmc_activated #mobile_menu').removeClass('chi_mmc_fixed_menu');
            }

        });

        // End

        /**
         * Collapse nested mobile menu submenu items  
         */

        function chi_dmm_collapse_submenus() {

            // pulled value using wp_localize_script()
            var $chiCollapseSubmenu = Chi_MMC_gen_options.collapseSubmenu;

            if( $chiCollapseSubmenu == 1 ){ 

                $('.chi_dmm_styles .chi_mmc_activated #mobile_menu').addClass('chidmm_collapsable');

                // add class for making the parent menu item clickable
                if($('body').hasClass('chimmc_parent_clickable')){

                    $('.chi_dmm_styles #mobile_menu.chidmm_collapsable .menu-item-has-children').addClass('chimmc_clickable_parent');

                }

                // append arrow to parent menu item
                $('.chi_dmm_styles:not(.et_header_style_slide):not(.et_header_style_fullscreen) .chidmm_collapsable.et_mobile_menu li.menu-item-has-children > a').append('<span class="chimmc_mobile_menu_arrow"></span>');

            } else {
                $('.chi_dmm_styles .chi_mmc_activated #mobile_menu').removeClass('chidmm_collapsable');

                // remove arrow from parent menu item
                $('<span class="chimmc_mobile_menu_arrow"></span>').remove();

            }

            var $menu = $('.chi_dmm_styles .chi_mmc_activated #mobile_menu.chidmm_collapsable'),
            top_level_link = '.chi_dmm_styles .chi_mmc_activated #mobile_menu.chidmm_collapsable .menu-item-has-children > a';

            $menu.find('a').each(function() {
                $(this).off('click');

                if ( $(this).is(top_level_link) ) {

                    if((/#/.test(this.href)) && $(this).attr('href').length == 1){

                        $(this).parent().removeClass('chimmc_clickable_parent');

                        $(this).attr('href', '#').off('click');

                    } else {

                        if ($(this).parent().hasClass('chimmc_clickable_parent')) {
                            $('<a class="chimmc_clickable_link"></a>').attr('href', $(this).attr('href')).on('click', function(e){ e.stopPropagation(); }).appendTo($(this));
                        }

                        $(this).attr('href', '#');

                    }
                }

                if ( ! $(this).siblings('.sub-menu').length  ) {
                    $(this).on('click', function(event) {
                        $(this).parents('.mobile_nav').trigger('click');
                    });
                } else {

                    $(this).on('click', function(event) {
                        event.preventDefault();

                        var this_parent_siblings = $(this).parent().siblings('li.menu-item-has-children');

                        // if submenu accordion is enabled
                        if ($('body').hasClass('chimmc_toggle_submenus')){
                            // close other opened submenus of the same submenu level if a new one is opened
                            this_parent_siblings.removeClass('visible').addClass('hidden_sub');
                        }

                        // toggle current submenu
                        $(this).parent().removeClass('hidden_sub').toggleClass('visible');

                    });
                }
            });
        }

        $(function() {
            chi_dmm_collapse_submenus(); 
        });   

        // End Collapse nested mobile menu submenu items 

       /*
        * Menu custom animations
        */

        // pulled value using wp_localize_script()
        var $chiCustomInAnimation = Chi_MMC_gen_options.customInAnimation;
        var $chiCustomOutAnimation = Chi_MMC_gen_options.customOutAnimation;

        $(function() {

            if ( $('body:not(.et_header_style_slide):not(.et_header_style_fullscreen)').hasClass('et_header_style_left') || $('body').hasClass('et_header_style_centered') || $('body').hasClass('et_header_style_split')  ){

                var $this_menu = $('#main-header .mobile_nav');
                var $dropdown_nav = $('#main-header .et_mobile_menu');

                $this_menu.off('click');

                // the mobile menu hamburger icon click
                $this_menu.find('.mobile_menu_bar').on( 'click', function(e){

                    if ( $this_menu.hasClass('closed') ){
                        $this_menu.removeClass( 'closed' ).addClass( 'opened' );

                        if ($chiCustomInAnimation != 'default') {
                            // remove default slideDown effect
                            $dropdown_nav.stop(true, true);
                        } else {
                            // add slideDown effect
                            $('.chi_mmc_activated .mobile_nav.opened .et_mobile_menu').slideDown(500);
                        }

                        // keep the menu visible while animation runs
                        $('.chi_mmc_activated .mobile_nav.opened .et_mobile_menu').css( { 'display' : 'block' } );


                    } else if ( $this_menu.hasClass('opened') ) {

                        $this_menu.removeClass( 'opened' ).addClass( 'closed' );

                        if ( $chiCustomOutAnimation != 'default' ){
                            // remove default slideUp effect
                            $dropdown_nav.stop(true, true);
                        } else {
                            // add slideUp effect
                            $('.chi_mmc_activated .mobile_nav.closed .et_mobile_menu').slideUp(500);
                        }

                        // hide the menu after css animation completed
                        if ( $chiCustomOutAnimation == 'none' ){

                            setTimeout( function() {
                                // fix for menu disappearing due to animation delay despite having class 'opened' 
                                $this_menu.removeClass( 'opened' ).addClass( 'closed' );
                                // hide menu without delay for 'none' value
                                $dropdown_nav.css( { 'display' : 'none' } );
                            }, 0 );
                        } else {
                            setTimeout( function() {
                                // fix for menu disappearing due to animation delay despite having class 'opened' 
                                $this_menu.removeClass( 'opened' ).addClass( 'closed' );
                                // hide menu with a delay
                                $dropdown_nav.css( { 'display' : 'none' } );
                            }, 700 );
                        }
                    }
                    return false;
                } );
            }
        }); 
        // End menu custom animations
      
        /*
        * Anchor scroll fix for fixed mobile menu
        */

        $(function() {
            $(window).on("load resize", function() {        

                if ( $('body:not(.et_header_style_slide):not(.et_header_style_fullscreen)').hasClass('et_header_style_left') || $('body').hasClass('et_header_style_centered') || $('body').hasClass('et_header_style_split') && $('.chi_mmc_activated .et_mobile_menu').hasClass('chi_mmc_fixed_menu')) {

                    // Mobile menu dropdown
                    var $dropdown_nav = $('#main-header .et_mobile_menu');
                        
                    $( 'body:not(.et_header_style_slide):not(.et_header_style_fullscreen) .chi_mmc_activated #mobile_menu.chi_mmc_fixed_menu a[href*="#"]:not([href="#"])' ).on("click", function() {

                        $(this).parents( '.chi_mmc_activated .mobile_nav' ).removeClass( 'opened' ).addClass( 'closed' );

                        if ( $chiCustomOutAnimation == 'default' ){
                            // add slideUp effect
                            $('.chi_mmc_activated .mobile_nav.closed .et_mobile_menu').slideUp(500);
                        }

                        // hide the menu after css animation completed
                        if ( $chiCustomOutAnimation == 'none' ){
                            setTimeout( function() {
                                // hide menu without delay for 'none' value
                                $dropdown_nav.css( { 'display' : 'none' } );
                            }, 0 );
                        } else {
                            setTimeout( function() {
                                // hide menu with a delay
                                $dropdown_nav.css( { 'display' : 'none' } );
                            }, 700 );
                        }

                        var $this_link = $( this ),
                        has_closest_smooth_scroll_disabled = $this_link.closest( '.et_smooth_scroll_disabled' ).length,
                        has_closest_woocommerce_tabs = ( $this_link.closest( '.woocommerce-tabs' ).length && $this_link.closest( '.tabs' ).length ),
                        has_closest_eab_cal_link = $this_link.closest( '.eab-shortcode_calendar-navigation-link' ).length,
                        has_acomment_reply = $this_link.hasClass( 'acomment-reply' ),
                        disable_scroll = has_closest_smooth_scroll_disabled || has_closest_woocommerce_tabs || has_closest_eab_cal_link || has_acomment_reply;

                        var topHeaderHeight = $( '#top-header' ).length > 0 ? parseInt( $( '#top-header' ).outerHeight() ) : 0;
                        var mainHeaderHeight = $( '#main-header' ).length > 0 ? parseInt( $( '#main-header' ).outerHeight() ) : 0;
                        var adminBarHeight = $( '#wpadminbar' ).length > 0 ? parseInt( $( '#wpadminbar' ).outerHeight() ) : 0;
                        var offset = parseInt(adminBarHeight) + parseInt(topHeaderHeight) + parseInt(mainHeaderHeight) ;

                        if ( ( location.pathname.replace( /^\//,'' ) == this.pathname.replace( /^\//,'' ) && location.hostname == this.hostname ) && ! disable_scroll ) {
                            var target = $( this.hash );

                            target = target.length ? target : $( '[name=' + this.hash.slice(1) +']' );

                            /**
                             * Get the anchor from the url (eg. '#home').
                             * @since v2.7.7
                             */
                            let _url = $(this).attr("href"),
                                _hash = _url.substring(_url.indexOf("#"));

                            if ( target.length ) {
                                $("html, body").animate({
                                    scrollTop: $( _hash ).offset().top - offset
                                }, 1000);

                                // Prevent the jump/flash
                                return false;
                            }
                        }
                    });  
                }
            }); /* on: load resize */
        });

        // End anchor scroll fix for fixed mobile menu   
      
        // SINCE V1.3.2

        /*
        * Fix for vertical nav bar and non-fixed nav main content top offsets
        */
        $(function() {

            $(window).on("load resize", function (e) {
                chimmc_fix_header_and_content_position();
            });

            function chimmc_fix_header_and_content_position(){

                var default_centered_split_headers = 'body:not(.et_header_style_slide):not(.et_header_style_fullscreen).chi_dmm_styles.et_header_style_left, body.chi_dmm_styles.et_header_style_centered, body.chi_dmm_styles.et_header_style_split';

                if( $( default_centered_split_headers ).hasClass( 'et_vertical_nav' ) && $('#et_mobile_nav_menu').is(':visible') ) {

                    var adminBarHeight = $( '#wpadminbar' ).length > 0 ? parseInt( $( '#wpadminbar' ).outerHeight() ) : 0;
                    var topHeaderHeight = $( '#top-header' ).length > 0 ? parseInt( $( '#top-header' ).outerHeight() ) : 0;
                    var mainHeaderHeight = $( '#main-header' ).length > 0 ? parseInt( $( '#main-header' ).outerHeight() ) : 0;
                    var offset = adminBarHeight + topHeaderHeight + mainHeaderHeight;

                    $('#main-header.chi_mmc_activated').css( 'top' , adminBarHeight + topHeaderHeight );
                    $( '#main-content' ).css( 'padding-top', offset );

                } else if ( $( default_centered_split_headers ).hasClass( 'et_vertical_nav' ) && ! $('#et_mobile_nav_menu').is(':visible')  ) {

                    $('#main-header.chi_mmc_activated').css( 'top' , 0 );
                    $( '#main-content' ).css( 'padding-top', 0 );

                } else if ( $( default_centered_split_headers ) ) {

                    $( '#main-content' ).css( 'padding-top', 0 );

                } 

                // fix main content padding top issue for non-fixed nav (v2.0.4)

                if( $( default_centered_split_headers ).hasClass( 'et_non_fixed_nav' ) && ! $( default_centered_split_headers ).hasClass( 'et_transparent_nav' ) && $('#et_mobile_nav_menu').is(':visible') ) {

                    // var adminBarHeight = $( '#wpadminbar' ).length > 0 ? parseInt( $( '#wpadminbar' ).outerHeight() ) : 0;
                    var topHeaderHeight = $( '#top-header' ).length > 0 ? parseInt( $( '#top-header' ).outerHeight() ) : 0;
                    var mainHeaderHeight = $( '#main-header' ).length > 0 ? parseInt( $( '#main-header' ).outerHeight() ) : 0;
                    var offset = topHeaderHeight + mainHeaderHeight ;

                    $( '#main-content' ).css( { paddingTop: offset } );

                } 

                // end fix main content padding top issue for non-fixed nav
            }
        });
        // End fix for vertical nav bar and non-fixed nav main content top offsets
      
        /**
         * fix main header top offset (since v2.0.2)
         */
        function chimmc_update_styles( style_id, $style_content ) {
            if ( $( style_id ).length ) {
                if ( '' !== $style_content ) {
                    $( style_id ).replaceWith( $style_content );
                } else {
                    $( style_id ).remove();
                }
            } else {
                $( 'head' ).append( $style_content );
            }
        }

        $(function() {
            function main_header_top_offset( value ) {

                // fix for pre-header layout injected using the Divi Layout Injector plugin
                // v2.0.5
                if ( $( 'body' ).hasClass( 'et_non_fixed_nav' ) && $("#main-header:not(.sticky-element-cloned)").prev('.et_pb_section').hasClass('sb_dli_pre_header') && !$( '#main-header #mobile_menu' ).hasClass( 'chi_mmc_fixed_menu' ) ) {
                    offset_value = 0;
                    header_position = 'body.chi_dmm_styles #main-header.chi_mmc_activated, body.chi_dmm_styles #top-header { position: relative !important;} body.chi_dmm_styles.et_non_fixed_nav #main-content { padding-top: 0px !important; }';
                } else {
                    offset_value = value;
                    header_position = '';
                }

                // end Divi Layout Injector fix
                var $style_content = '<style id="main_header_top_offset">@media all and (max-width: 980px){ body:not(.divibar-open):not(.et_header_style_slide):not(.et_header_style_fullscreen).chi_dmm_styles.et_header_style_left #main-header, body.chi_dmm_styles.et_header_style_centered #main-header, body.chi_dmm_styles.et_header_style_split #main-header {top: ' + offset_value + 'px !important;} ' + header_position + ' } </style>',
                style_id = 'style#main_header_top_offset';

                chimmc_update_styles( style_id, $style_content );
            } 

            $(window).on("load resize", function (e) {

                var chiScreenWidth = parseInt( $(window).width() );

                if ( chiScreenWidth < 981 ){

                    var adminBarHeight = $( '#wpadminbar' ).length > 0 ? parseInt( $( '#wpadminbar' ).outerHeight() ) : 0;
                    var topHeaderHeight = $( '#top-header' ).length > 0 ? parseInt( $( '#top-header' ).outerHeight() ) : 0;
                    var header_top_offset = adminBarHeight + topHeaderHeight;

                    main_header_top_offset( header_top_offset );

                }
            });
        });

        // End fix for main header top offset 
      
        /**
         * prevent menu icons from being applied to Menu Module menu items
         */
        $(function() {
            $('.et_pb_module.et_pb_fullwidth_menu ul.et_mobile_menu li, .et_pb_module.et_pb_menu ul.et_mobile_menu li').each( function(){
                if ( $(this).hasClass( 'chimmc-has-icon' ) ) {
                    $(this).removeClass( 'chimmc-has-icon' );
                }
            });
        });

        // End fix for Menu Module
      
        $(function() {

            /**
             * append search icon 
             */
            $(window).on("load resize", function (e) {
                chimmc_show_search_icon();
            });

            // pulled value using wp_localize_script()
            // mmc plugin show search icon option
            var $chiShowSearchIcon = Chi_MMC_gen_options.showSearchIcon;
            // divi core show search icon option
            var $etShowSearchIcon = Chi_MMC_gen_options.etShowSearchIcon;

            function chimmc_show_search_icon(){
                if (  $('#et_mobile_nav_menu').is(':visible') && ! $( '#et_top_search' ).length && 1 == $chiShowSearchIcon ){
                    $( '#top-menu-nav' ).after( '<div id="et_top_search" class="chimmc_top_search"><span id="et_search_icon"></span></div>' );
                } 
            }

            // end appending search icon
            // delegate click event to #et_top_search to make sure click works for appended #et_top_search too    
            $( '#et-top-navigation' ).on( 'click', '#et_top_search', function() {
                var $search_container = $( '.et_search_form_container' );

                if ( $search_container.hasClass('et_pb_is_animating') ) {
                    return;
                }

                $( '.et_menu_container' ).removeClass( 'et_pb_menu_visible et_pb_no_animation' ).addClass('et_pb_menu_hidden');
                $search_container.removeClass( 'et_pb_search_form_hidden et_pb_no_animation' ).addClass('et_pb_search_visible et_pb_is_animating');

                setTimeout( function() {
                    $( '.et_menu_container' ).addClass( 'et_pb_no_animation' );
                    $search_container.addClass( 'et_pb_no_animation' ).removeClass('et_pb_is_animating');
                }, 1000);

                $search_container.find( 'input' ).focus();

                et_set_search_form_css();
            });

            // copy of et_set_search_form_css() function taken from custom.js file
            function et_set_search_form_css() {

                var $search_container = $( '.et_search_form_container' );
                var $body = $( 'body' );

                if ( $search_container.hasClass( 'et_pb_search_visible' ) ) {

                    var header_height = $( '#main-header' ).innerHeight(),
                    menu_width = $( '#top-menu' ).width(),
                    font_size = $( '#top-menu li a' ).css( 'font-size' );
                    $search_container.css( { 'height' : header_height + 'px' } );
                    $search_container.find( 'input' ).css( 'font-size', font_size );

                    if ( ! $body.hasClass( 'et_header_style_left' ) ) {
                        $search_container.css( 'max-width', menu_width + 60 );
                    } else {
                        $search_container.find( 'form' ).css( 'max-width', menu_width + 60 );
                    }
                }
            }

            /**
             * calculate right offset for search icon on Centered and Split headers
             */

            $(window).on("load resize", function (e) {
                chimmc_search_icon_right_offset();
            });

            function chimmc_search_icon_right_offset(){

                if ( ! $( 'body' ).hasClass( 'et_header_style_left' ) && $('#et_mobile_nav_menu').is(':visible') ) {

                    // Clone #main-header
                    $( '#main-header' ).clone().addClass( 'main_header-clone' ).css({ top : 'auto', bottom : 0, 'opacity' : 0 }).appendTo( $('body') );

                    // get width of cloned #main-header's .mobile_menu_bar when dropdown menu is closed
                    closed_mobile_menu_bar_width = $( '.main_header-clone .mobile_nav.closed .mobile_menu_bar' ).width();

                    closed_mobile_menu_bar_width = parseInt( closed_mobile_menu_bar_width );

                    // "open" dropdown menu of cloned header
                    $( ".main_header-clone .mobile_nav" ).removeClass( 'closed' ).addClass( 'opened' );

                    // get width of cloned #main-header's .mobile_menu_bar when dropdown menu is opened
                    opened_mobile_menu_bar_width = $( '.main_header-clone .mobile_nav.opened .mobile_menu_bar' ).width();

                    opened_mobile_menu_bar_width = parseInt( opened_mobile_menu_bar_width );

                    setTimeout( function(){
                        // remove cloned #main-header
                        $('.main_header-clone').remove();
                    }, 1000 );

                    // set initial right offset for search icon
                    $( '#main-header #et_top_search' ).css({'right' : closed_mobile_menu_bar_width });

                    // toggle search icon right offset for opened and closed menu
                    $( ".mobile_menu_bar" ).on("click", function() {

                        if ( $( '#main-header .mobile_nav' ).hasClass('closed') && $('#et_mobile_nav_menu').is(':visible') ) {
                            // set right offset for closed menu
                            $( '#main-header #et_top_search' ).css({'right' : opened_mobile_menu_bar_width });
                        } else if ( $( '#main-header .mobile_nav' ).hasClass('opened') && $('#et_mobile_nav_menu').is(':visible') ) {
                            // set right offset for opened menu
                            $( '#main-header #et_top_search' ).css({'right' : closed_mobile_menu_bar_width });
                        } 
                    });

                } else {
                    // unset search icon right offset
                    $( '#main-header #et_top_search' ).css({'right' : "" });
                }
                
                // remove additional logo contaiers created on resize
                $('#main-header .centered-inline-logo-wrap .logo_container').not(':first').remove();
                $('#main-header .et_menu_container .logo_container').not(':first').remove();
            }

            // end calculation of right offset for search icon on Centered and Split headers

            /**
             * adjust search form vertical positioning
             */
            // execute on screen resizing and scrolling
            $(window).on("resize scroll", function (e) {
                chimmc_search_form_position();
            });
            // execute on search icon click or tap
            $( "#et-top-navigation" ).on("click tap", '#et_top_search', function (e) {
                chimmc_search_form_position();
            });

            function chimmc_search_form_position(){

                if ( ! $( 'body' ).hasClass( 'et_header_style_left' ) && $('#et_mobile_nav_menu').is(':visible') ) {

                    // calculate #et-top-navigation top position and add #main-header's padding-top to it
                    var search_form_top_offset = parseInt( $( '#et-top-navigation' ).position().top ) + 20;

                    // adjust vertical positioning of search form and its container
                    $( '.container.et_search_form_container.et_pb_search_visible' ).css({ paddingTop : search_form_top_offset });
                    $( '.et_pb_search_visible .et-search-form' ).css({ 'top' : search_form_top_offset });

                } else {

                    // adjust vertical positioning of search form and its container
                    $( '.container.et_search_form_container' ).css({ paddingTop : "" , 'max-width' : "" });
                    $( '.et-search-form' ).css({ 'top' : "" });

                }
            }
            // end adjusting search form vertical positioning

        });

        // End calculation of right offset for search icon on Centered and Split headers
          
    });    

} )( jQuery );