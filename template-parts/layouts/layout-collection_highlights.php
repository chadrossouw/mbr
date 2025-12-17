<div class="block bg_beige">
    <?php if (have_rows('highlights')):
        while (have_rows('highlights')):
            the_row();
            $layout = get_row_layout();
            include(get_template_directory() . "/template-parts/layouts/layout-collection-{$layout}.php");
        endwhile;
    endif; ?>
</div>