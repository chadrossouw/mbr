<section class="margins news_content">
    <div class="content grid grid_content center_grid gap_1">
        <h4 class="regular"><?php echo get_field('above_the_fold_line') ?></h4>
        <?php echo apply_filters('the_content', get_field('above_the_fold_description'));  ?></p>
        <?php if (has_post_thumbnail()): ?>
            <div class="container container--threetwo">
                <?php echo get_the_post_thumbnail(); ?>
            </div>
        <?php endif; ?>
        <?php

        if (have_rows('content')):
            while (have_rows('content')) : the_row();
                $layout = get_row_layout();
                include(get_template_directory() . "/template-parts/layouts/layout-content_{$layout}.php");
            endwhile;
        endif; ?>
    </div>
</section>
<?php
