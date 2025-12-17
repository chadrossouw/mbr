<div class="content_two_column grid grid_50 gap_1">
    <div class="content_two_column__column">
        <?php  while ( have_rows('column_one') ) : the_row();
            $layout = get_row_layout();
            include(get_template_directory() . "/template-parts/layouts/layout-content_{$layout}.php");
        endwhile; ?>
    </div>
    <div class="content_two_column__column">
    <?php  while ( have_rows('column_two') ) : the_row();
            $layout = get_row_layout();
            include(get_template_directory() . "/template-parts/layouts/layout-content_{$layout}.php");
        endwhile; ?>
    </div>
</div>
