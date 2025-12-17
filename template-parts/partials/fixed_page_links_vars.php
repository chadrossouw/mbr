<?php $icon_pages = get_posts([
    'post_type' => 'page',
    'posts_per_page' => -1,
    'orderby' => 'menu_order',
    'order' => 'ASC',
    'meta_query' => [
        [
            'key' => '_wp_page_template',
            'value' => 'icon_page.php',
            'compare' => '='
        ]
    ]
]);

$_fixed_page_links = [
    'discover'=>[
        'link_label' => 'Find out more about us >',
        'background_color' => 'bg_pink'
    ],
    'cafe'=>[
        'link_label' => 'Visit our café >',
        'background_color' => 'bg_blue'
    ],
    'garden'=>[
        'link_label' => 'Visit our garden >',
        'background_color' => 'bg_teal'
    ],
    'shop'=>[
        'link_label' => 'Visit our shop >',
        'background_color' => 'bg_grey'
    ],
    'families'=>[
        'link_label' => 'Your family day out >',
        'background_color' => 'bg_red'
    ],
    'learn'=>[
        'link_label' => 'Visit our learning hub >',
        'background_color' => 'bg_yellow'
    ],
    'venue_hire'=>[
        'link_label' => 'Hire our venue >',
        'background_color' => 'bg_pink'
    ],
    
];
$fixed_page_links = [];
foreach ($_fixed_page_links as $link=>$details) {
    $page = array_filter($icon_pages, function ($page) use ($link) {
        return get_field('icon_page_style',$page->ID)==$link;
    });
    if($page){
        $page = array_values($page)[0];
    }
    else{
        $page_id = wp_insert_post([
            'post_title' => $link,
            'post_type' => 'page',
            'post_status' => 'publish',
            'post_content' => '',
            'post_name' => $link,
            'post_excerpt' => '',
            'page_template' => 'icon_page.php',
        ]);
        $page = get_post($page_id);
        update_field('icon_page_style', $link, $page->ID);
    }

    $fixed_page_links[$link] = (object)[
        'id' => $link,
        'title' => $page->post_title,
        'icon' => $link.'.svg',
        'image' => get_the_post_thumbnail_url($page->ID)?: get_template_directory_uri().'/assets/images/'.$link.'.jpg',
        'description' => get_field('featured_description', $page->ID),
        'link' => get_permalink($page->ID),
        'link_label' =>$details['link_label'] ,
        'background_color' => $details['background_color'],
    ];
}