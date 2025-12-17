<?php
$id = get_the_ID();
$has_aside = get_sub_field('layout');
$mobile_menu = '';
$desktop_menu = '';
$center = get_sub_field('center_content');
if ($has_aside) {
    $menu_post_id = get_parent_for_nav($id);
    $menu_items = get_posts([
        'post_type' => 'page',
        'posts_per_page' => -1,
        'post_parent' => $menu_post_id,
        'orderby' => 'menu_order',
        'order' => 'ASC'
    ]);
    ob_start(); ?>
    <div class="desktop_only sub_nav_container">
        <ul class="page_sub_nav event_info"><?php
                                            foreach ($menu_items as $item) { ?>
                <li class="sub_menu_item uc bold <?php echo $item->ID == $id ? 'current' : ''; ?>">
                    <a href="<?php echo get_the_permalink($item->ID); ?>" class="arrowed"><?php echo get_the_title($item->ID); ?></a>
                </li><?php
                                            } ?>
        </ul>
    </div>
    <?php $desktop_menu = ob_get_clean();
    ob_start(); ?>
    <div class="mobile_only mobile_sub_nav_container">
        <h3 class="uc gray work bold"><?php echo __('Quick links', 'soul'); ?></h3>
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
}
?>
<div class="margins grid grid_content <?php echo $center && !$has_aside ? 'center_grid' : ''; ?> gap_5 content_layout bg_white">
    <?php if (have_rows('content')): ?>
        <div class="content">
            <?php
            while (have_rows('content')) : the_row();
                $layout = get_row_layout();
                include(get_template_directory() . "/template-parts/layouts/layout-content_{$layout}.php");
            endwhile; ?>
        </div>
    <?php endif; ?>
    <?php if ($has_aside): ?>
        <aside>
            <?php if ($desktop_menu): echo $desktop_menu;
            endif; ?>
            <?php if ($mobile_menu): echo $mobile_menu;
            endif; ?>
        </aside>
    <?php endif; ?>
</div>