<?php $id = get_the_ID(); ?>
<header class="page-header new_header bg_black white padding grid gap_2">
    <div class="news_header--inner white grid grid_content center_grid">
        <p class="uc small"><?php echo preg_replace('/[^A-Za-z0-9]/', ' ', get_post_type($id)); ?></p>
        <h1 class="page-title"><?php echo get_the_title(); ?></h1>
        <p class="description"><?php echo get_field('short_description', $id); ?></p>
    </div>
</header>
<div class="margins body center news_crumbs">
    <?php echo get_breadcrumb(get_the_ID()); ?>
</div>