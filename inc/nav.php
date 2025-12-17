<?php 
class soul_Sub_Menu_Walker extends Walker_Nav_Menu {

/**
 * Starts the list before the elements are added.
 *
 * Adds classes to the unordered list sub-menus.
 *
 * @param string $output Passed by reference. Used to append additional content.
 * @param int    $depth  Depth of menu item. Used for padding.
 * @param array  $args   An array of arguments. @see wp_nav_menu()
 */
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        $indent = str_repeat( $t, $depth );

        $back_arrow = file_get_contents(get_template_directory().'/assets/back_arrow.svg');
        $back_button = '<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-back"><a href="#" class="menu-item-link menu-item-back-link">'.$back_arrow.__('Back','pebble').'</a></li>';
        $output .= "{$n}{$indent}<ul class='sub-menu' style='display:none'>{$back_button}{$n}";
    }
}


add_action('admin_menu', 'change_menus_position');
function change_menus_position() {

    // Remove old menu
    remove_submenu_page( 'themes.php', 'nav-menus.php' );

    //Add new menu page
     add_menu_page(
       'Menus',
       'Menus',
       'edit_others_posts',
       'nav-menus.php',
       '',
       'dashicons-list-view',
       11
    );
}

add_action('admin_menu','filter_admin_menu_privs');
function filter_admin_menu_privs(){
    global $_wp_submenu_nopriv;
    unset($_wp_submenu_nopriv['themes.php']['nav-menus.php']);
}