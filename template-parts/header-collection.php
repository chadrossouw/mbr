<?php $id = get_the_ID();


$grand_parent = get_posts([
    'post_type' => 'page',
    'pagename' => 'collections',
])[0];

$parent = get_posts([
    'post_type' => 'page',
    'pagename' => 'collections/in-the-archive',
])[0];

$featured_title = get_the_title();
$featured_description =  get_field('short_description');
$featured_subtitle = get_field('subheader');
$theme_color = $grand_parent ? get_field('theme_color', $grand_parent->ID) : 'bg_green';
$menu_post_id = get_parent_for_nav($id);
$menu_items = get_posts([
    'post_type' => 'page',
    'posts_per_page' => -1,
    'post_parent' => $grand_parent->ID,
    'orderby' => 'menu_order',
    'order' => 'ASC'
]);
ob_start(); ?>
<div class="desktop_only sub_nav_container">
    <ul class="page_sub_nav event_info">
        <?php
        foreach ($menu_items as $item) { ?>
            <li class="sub_menu_item uc bold  <?php echo $item->ID == $parent->ID ? 'current' : ''; ?>">
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
            <option value="<?php echo get_the_permalink($item->ID); ?>" <?php echo get_the_permalink($item->ID) == get_the_permalink($parent->ID) ? 'selected' : ''; ?>><?php echo get_the_title($item->ID); ?></option>
        <?php
                                        } ?>
    </select>
</div>
<?php $mobile_menu = ob_get_clean();


?>
<header class="page-header header-simple grid grid_content padding gap_5 <?php echo $theme_color ?>">
    <article class="event_content">
        <h1 class="bold"><?php echo $featured_title ?></h1>
        <?php if ($featured_subtitle): ?>
            <h3 class="subheader"><?php echo $featured_subtitle ?></h3>
        <?php endif; ?>
        <p><?php echo $featured_description ?></p>
    </article>
    <aside>
        <?php if ($desktop_menu): echo $desktop_menu;
        endif; ?>
        <?php if ($mobile_menu): echo $mobile_menu;
        endif; ?>
    </aside>
</header>
