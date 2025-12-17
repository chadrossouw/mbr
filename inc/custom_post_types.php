<?php
// create new post types
//For available options see https://developer.wordpress.org/reference/functions/register_post_type/
//Menu icons are here https://developer.wordpress.org/resource/dashicons/ or use a base-64 svg https://base64.guru/converter/encode/image/svg

function soul_init(){
    $labels_event = array(
		'name'               => __( 'Events', 'soul' ),
		'singular_name'      => __( 'Event', 'soul' ),
		'menu_name'          => __( 'Events', 'soul' ),
		'name_admin_bar'     => __( 'Events', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New Event', 'soul' ),
		'new_item'           => __( 'New Event', 'soul' ),
		'edit_item'          => __( 'Edit Event', 'soul' ),
		'view_item'          => __( 'View Event', 'soul' ),
		'all_items'          => __( 'All Events', 'soul' ),
		'search_items'       => __( 'Search Events', 'soul' ),
		'parent_item_colon'  => __( 'Parent Events:', 'soul' ),
		'not_found'          => __( 'No Events found.', 'soul' ),
		'not_found_in_trash' => __( 'No Events found in Trash.', 'soul' )
	);
	$args_event = array(
		'labels'             => $labels_event,
        'description'        => __( 'Shoemakers Events.', 'soul' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
        'show_in_rest'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'event','with_front' => false, ),
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 4.5,
        'menu_icon'          => 'dashicons-tickets',
        'supports'           => array( 'title', 'thumbnail' ),
	);
	
	register_post_type('event', $args_event); 


	$labels_news = array(
		'name'               => __( 'News', 'soul' ),
		'singular_name'      => __( 'News', 'soul' ),
		'menu_name'          => __( 'News', 'soul' ),
		'name_admin_bar'     => __( 'News', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New News', 'soul' ),
		'new_item'           => __( 'New News', 'soul' ),
		'edit_item'          => __( 'Edit News', 'soul' ),
		'view_item'          => __( 'View News', 'soul' ),
		'all_items'          => __( 'All News', 'soul' ),
		'search_items'       => __( 'Search News', 'soul' ),
		'parent_item_colon'  => __( 'Parent News:', 'soul' ),
		'not_found'          => __( 'No News found.', 'soul' ),
		'not_found_in_trash' => __( 'No News found in Trash.', 'soul' )
	);
	$args_news = array(
		'labels'             => $labels_news,
        'description'        => __( 'Shoemakers News.', 'soul' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
        'show_in_rest'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'news','with_front' => false, ),
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 4.4,
        'menu_icon'          => 'dashicons-text-page',
        'supports'           => array( 'title', 'thumbnail' ),
	);

	register_post_type('news', $args_news); 
	$labels = array(
		'name'               => __( 'Object highlights', 'soul' ),
		'singular_name'      => __( 'Object highlight', 'soul' ),
		'menu_name'          => __( 'Object highlights', 'soul' ),
		'name_admin_bar'     => __( 'Object highlights', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New Object highlight', 'soul' ),
		'new_item'           => __( 'New Object highlight', 'soul' ),
		'edit_item'          => __( 'Edit Object highlight', 'soul' ),
		'view_item'          => __( 'View Object highlight', 'soul' ),
		'all_items'          => __( 'All Object highlights', 'soul' ),
		'search_items'       => __( 'Search Object highlights', 'soul' ),
		'parent_item_colon'  => __( 'Parent Object highlights:', 'soul' ),
		'not_found'          => __( 'No Object highlights found.', 'soul' ),
		'not_found_in_trash' => __( 'No Object highlights found in Trash.', 'soul' )
	);

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'A post type for Shoemakers Object highlights.', 'soul' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'object_highlight' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 4.3,
		'menu_icon'           => 'dashicons-vault',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		
	);

	register_post_type( 'object_highlight', $args );
	
	$labels = array(
		'name'               => __( 'Objects', 'soul' ),
		'singular_name'      => __( 'Object', 'soul' ),
		'menu_name'          => __( 'Objects', 'soul' ),
		'name_admin_bar'     => __( 'Objects', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New Object', 'soul' ),
		'new_item'           => __( 'New Object', 'soul' ),
		'edit_item'          => __( 'Edit Object', 'soul' ),
		'view_item'          => __( 'View Object', 'soul' ),
		'all_items'          => __( 'All Objects', 'soul' ),
		'search_items'       => __( 'Search Objects', 'soul' ),
		'parent_item_colon'  => __( 'Parent Objects:', 'soul' ),
		'not_found'          => __( 'No Objects found.', 'soul' ),
		'not_found_in_trash' => __( 'No Objects found in Trash.', 'soul' )
	);
	

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'A post type for Shoemakers Objects.', 'soul' ),
		'public'             => false,
		'publicly_queryable' => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => true,
		'query_var'          => false,
		'rewrite'            => array( 'slug' => 'object' ),
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 4.2,
		'menu_icon'           => 'dashicons-vault',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		
	);

	
	register_post_type( 'object', $args );
	
	$labels = array(
		'name'               => __( 'Collections', 'soul' ),
		'singular_name'      => __( 'Collection', 'soul' ),
		'menu_name'          => __( 'Collections', 'soul' ),
		'name_admin_bar'     => __( 'Collections', 'soul' ),
		'add_new'            => __( 'Add New', 'soul' ),
		'add_new_item'       => __( 'Add New Collection', 'soul' ),
		'new_item'           => __( 'New Collection', 'soul' ),
		'edit_item'          => __( 'Edit Collection', 'soul' ),
		'view_item'          => __( 'View Collection', 'soul' ),
		'all_items'          => __( 'All Collections', 'soul' ),
		'search_items'       => __( 'Search Collections', 'soul' ),
		'parent_item_colon'  => __( 'Parent Collections:', 'soul' ),
		'not_found'          => __( 'No Collections found.', 'soul' ),
		'not_found_in_trash' => __( 'No Collections found in Trash.', 'soul' )
	);

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'A post type for Shoemakers Collections.', 'soul' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'collection/in-the-archive' ),
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 4.1,
		'menu_icon'           => 'dashicons-vault',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
		
	);

	
	register_post_type( 'collection', $args );
} 
	add_action( 'init', 'soul_init' );


	