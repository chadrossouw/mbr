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

global $post;
$parent_ID = $post->post_parent;
$parent = get_post($parent_ID);
$grand_parent = $parent->post_parent;
$featured_title = get_field('featured_title');
$featured_description = get_field('featured_description') ?: get_field('short_description');
$featured_subtitle = get_field('subheader');
$featured_link = get_field('featured_button');
if (get_field('icon_page_style', $parent)) {
    $theme_color = get_icon_page_color(get_field('icon_page_style', $parent), $icon_page_styles);
} else {
    $theme_color = $grand_parent ? get_field('theme_color', $grand_parent) : get_field('theme_color', $parent);
}


$menu_post_id = get_parent_for_nav($id);
$menu_items = get_posts([
    'post_type' => 'page',
    'posts_per_page' => -1,
    'post_parent' => $parent_ID,
    'orderby' => 'menu_order',
    'order' => 'ASC'
]);

if ($grand_parent) {
    $menu_items = get_posts([
        'post_type' => 'page',
        'posts_per_page' => -1,
        'post_parent' => $grand_parent,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ]);
};
ob_start(); ?>
<div class="desktop_only sub_nav_container">
    <ul class="page_sub_nav event_info">
        <?php
        foreach ($menu_items as $item) { ?>
            <li class="sub_menu_item uc bold  <?php echo $item->ID == $id ? 'current' : ''; ?>">
                <a href="<?php echo get_the_permalink($item->ID); ?>" class="arrowed"><?php echo get_the_title($item->ID); ?></a>
            </li><?php
                } ?>
    </ul>
</div>
<?php $desktop_menu = ob_get_clean();
ob_start(); ?>
<div class="mobile_only mobile_sub_nav_container">
    <select class="quick_links_select mobile_sub_nav_select" onchange="console.log(this.value);window.location.href = this.value">
        <?php
        ?><option value="">Menu</option><?php
                                        foreach ($menu_items as $item) { ?>
            <option value="<?php echo get_the_permalink($item->ID); ?>" <?php echo get_the_permalink($item->ID) == get_the_permalink($id) ? 'selected' : ''; ?>><?php echo get_the_title($item->ID); ?></option>
        <?php
                                        } ?>
    </select>
</div>
<?php $mobile_menu = ob_get_clean();


?>
<header class="page-header header-simple grid grid_content padding gap_5 <?php echo $theme_color ?>">
    <article class="event_content">
        <h1 class="bold"><?php echo $featured_title ?: get_the_title(); ?></h1>
        <p><?php echo $featured_description ?></p>
        <?php echo get_link_normal($featured_link) ?>
    </article>
    <aside>
        <?php if ($desktop_menu): echo $desktop_menu;
        endif; ?>
        <?php if ($mobile_menu): echo $mobile_menu;
        endif; ?>
    </aside>
</header>
<div class="margins body center">
    <?php echo get_breadcrumb(get_the_ID()); ?>
</div>