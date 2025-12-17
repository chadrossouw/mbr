<?php $id = get_the_ID();
global $post;
$parent = $post->post_parent;
$featured_title = get_field('featured_title');
$featured_description = get_field('featured_description');
$featured_link = get_field('featured_button');
$background_color = $parent ? get_field('background_color', $parent) : get_field('theme_color');
?>
<header class="page-header header-featured black non_icon_page_header grid grid_35_65">
    <div class="header_text padding-left <?php echo $background_color; ?>">
        <div class="header_text_content">
            <h1 class="bold"><?php echo $featured_title?: get_the_title();?></h1>
            <p><?php echo $featured_description ;?></p>
            <?php echo get_link_button($featured_link) ?>
        </div>

    </div>
    <div class="featured_image container container--sixteennine">
        <?php echo get_the_post_thumbnail($id, 'full'); ?>
    </div>
</header>
<div class="margins body">
    <?php echo get_breadcrumb(get_the_ID()); ?>
</div>