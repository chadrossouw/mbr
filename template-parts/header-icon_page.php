<?php $id = get_the_ID();

$icon_page_styles = [

    (object)[
        'id' => 'cafe',
        'title' => 'Our café',
        'icon' => 'cafe.svg',
        'background_color' => 'bg_blue'
    ],
    (object)[
        'id' => 'garden',
        'title' => 'Our garden',
        'icon' => 'garden.svg',
        'background_color' => 'bg_teal'
    ],
    (object)[
        'id' => 'shop',
        'title' => 'Our shop',
        'icon' => 'shop.svg',
        'background_color' => 'bg_grey'
    ],
    (object)[
        'id' => 'discover',
        'title' => 'Discover more',
        'icon' => 'discover.svg',
        'background_color' => 'bg_pink'
    ],
    (object)[
        'id' => 'venue_hire',
        'title' => 'Venue hire',
        'icon' => 'venue_hire.svg',
        'background_color' => 'bg_pink'
    ],
    (object)[
        'id' => 'families',
        'title' => 'For families',
        'icon' => 'families.svg',
        'background_color' => 'bg_red'
    ],
    (object)[
        'id' => 'learn',
        'title' => 'Learn more',
        'icon' => 'learn.svg',
        'background_color' => 'bg_yellow'
    ]
];

$featured_title = get_field('featured_title');
$featured_description = get_field('featured_description');
$featured_link = get_field('featured_button');
$featured_image = get_sub_field('featured_image', $id);
$featured_image = wp_get_attachment_image($featured_image, 'full');
$icon_page_style = get_field('icon_page_style');

?>

<header class="page-header header-featured black icon_page_header grid grid_35_65">
    <div class="header_text padding <?php echo get_icon_page_color($icon_page_style, $icon_page_styles) ?>">
        <div class="header_text_content">
            <?php echo file_get_contents(get_template_directory() . get_icon_page_icon($icon_page_style, $icon_page_styles)); ?>
            <h1 class="bold"><?php echo $featured_title ?></h1>
            <p><?php echo $featured_description ?></p>
            <?php echo get_link_normal($featured_link) ?>
        </div>

    </div>
    <div class="featured_image container container--sixteennine">
        <?php echo get_the_post_thumbnail($id, 'full'); ?>
    </div>
</header>
<div class="margins body center">
    <?php echo get_breadcrumb(get_the_ID()); ?>
</div>