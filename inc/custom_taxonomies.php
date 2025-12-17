<?php
// create custom taxonomy
// options are here https://developer.wordpress.org/reference/functions/register_taxonomy/

function soul_tax_init(){
    $labels_tax= array(
		'name' => _x( 'Event type', 'taxonomy general name', 'soul' ),
		'singular_name' => _x( 'Event type', 'taxonomy singular name', 'soul' ),
		'search_items' =>  __( 'Search Event types', 'soul' ),
		'all_items' => __( 'All Event types', 'soul' ),
		'parent_item' => __( 'Parent Event type', 'soul' ),
		'parent_item_colon' => __( 'Parent Event type:', 'soul' ),
		'edit_item' => __( 'Edit Event type', 'soul' ), 
		'update_item' => __( 'Update Event type', 'soul' ),
		'add_new_item' => __( 'Add New Event type', 'soul' ),
		'new_item_name' => __( 'New Event type Name', 'soul' ),
		'menu_name' => __( 'Event types', 'soul' ),
    ); 
    register_taxonomy('event_type',array('event'), array(
        'hierarchical' => true,
        'labels' => $labels_tax,
        'show_ui' => true,
		'show_in_rest'=>true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'event_type' ),
		'publicly_queryable'=>false,
    ));
    
	$labels_tax= array(
		'name' => _x( 'Event audience', 'taxonomy general name', 'soul' ),
		'singular_name' => _x( 'Event audience', 'taxonomy singular name', 'soul' ),
		'search_items' =>  __( 'Search Event audiences', 'soul' ),
		'all_items' => __( 'All Event audiences', 'soul' ),
		'parent_item' => __( 'Parent Event audience', 'soul' ),
		'parent_item_colon' => __( 'Parent Event audience:', 'soul' ),
		'edit_item' => __( 'Edit Event audience', 'soul' ), 
		'update_item' => __( 'Update Event audience', 'soul' ),
		'add_new_item' => __( 'Add New Event audience', 'soul' ),
		'new_item_name' => __( 'New Event audience Name', 'soul' ),
		'menu_name' => __( 'Event audiences', 'soul' ),
    ); 
    register_taxonomy('event_audience',array('event'), array(
        'hierarchical' => true,
        'labels' => $labels_tax,
        'show_ui' => true,
		'show_in_rest'=>true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'event_audience' ),
		'publicly_queryable'=>false,
    ));
	
	$labels_tax= array(
		'name' => _x( 'News type', 'taxonomy general name', 'soul' ),
		'singular_name' => _x( 'News type', 'taxonomy singular name', 'soul' ),
		'search_items' =>  __( 'Search News types', 'soul' ),
		'all_items' => __( 'All News types', 'soul' ),
		'parent_item' => __( 'Parent News type', 'soul' ),
		'parent_item_colon' => __( 'Parent News type:', 'soul' ),
		'edit_item' => __( 'Edit News type', 'soul' ), 
		'update_item' => __( 'Update News type', 'soul' ),
		'add_new_item' => __( 'Add New News type', 'soul' ),
		'new_item_name' => __( 'New News type Name', 'soul' ),
		'menu_name' => __( 'News types', 'soul' ),
    ); 

    register_taxonomy('news_type',array('news'), array(
        'hierarchical' => true,
        'labels' => $labels_tax,
        'show_ui' => true,
		'show_in_rest'=>true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'news_type' ),
		'publicly_queryable'=>false,
    ));
    
	

	/* $labels_tax= array(
		'name' => _x( 'Collection', 'taxonomy general name', 'soul' ),
		'singular_name' => _x( 'Collection', 'taxonomy singular name', 'soul' ),
		'search_items' =>  __( 'Search Collections', 'soul' ),
		'all_items' => __( 'All Collections', 'soul' ),
		'parent_item' => __( 'Parent Collection', 'soul' ),
		'parent_item_colon' => __( 'Parent Collection:', 'soul' ),
		'edit_item' => __( 'Edit Collection', 'soul' ), 
		'update_item' => __( 'Update Collection', 'soul' ),
		'add_new_item' => __( 'Add New Collection', 'soul' ),
		'new_item_name' => __( 'New Collection Name', 'soul' ),
		'menu_name' => __( 'Collections', 'soul' ),
    ); 
    register_taxonomy('object_collection',array('object'), array(
        'hierarchical' => false,
        'labels' => $labels_tax,
        'show_ui' => true,
		'show_in_rest'=>true,
        'show_admin_column' => true,
        'query_var' => false,
        'rewrite' => array( 'slug' => 'object_collection' ),
		'publicly_queryable'=>false,
    )); */
}
    
add_action( 'init', 'soul_tax_init' );