<?php
$above_the_fold = get_field('above_the_fold_line');
$image = get_the_post_thumbnail(get_the_ID(), 'full');
$content = get_field('description');
$sold_out = get_field('ticket_sold_out', $id);
$iframe = get_field('ticket_iframe_code', $id);
$ticket_link = get_field('ticketing_link', $id);
?>

<div class="event_content_wrapper margins">
    <article class="event_content grid grid_content center_grid gap_1">
        <h3 class="above_the_fold"><?php echo $above_the_fold ?></h3>
        <?php if ($image): ?>
            <div class="container container--threetwo">
                <?php echo $image; ?>
            </div>
        <?php endif;
        echo $content ? apply_filters('the_content', $content) : '';
        $test = get_field('content_blocks');
        if (have_rows('content')):
            while (have_rows('content')) : the_row();
                $layout = get_row_layout();
                include(get_template_directory() . "/template-parts/layouts/layout-content_{$layout}.php");
            endwhile;
        endif; ?>
        <?php if (!$sold_out):
            if ($ticket_link): ?>
                <a href="<?php echo $ticket_link['url'] ?>" class="button" target="_blank"><?php echo $ticket_link['title'] ? $ticket_link['title'] : 'Book tickets'  ?></a>
            <?php elseif ($iframe): ?>
                <a href="#ticketing" class="button center"><?php echo __('Book tickets', 'soul') ?></a>
            <?php endif; ?>
        <?php endif; ?>
        <?php if ($iframe): ?>
            <div class="ticketing" id="ticketing">
                <div class="iframe_container">
                    <?php echo $iframe; ?>
                </div>
            </div>
        <?php endif; ?>
    </article>
</div>
<?php if (have_rows('event_footer_banner', 'option')):
    while (have_rows('event_footer_banner', 'option')) : the_row();
        include(get_template_directory() . "/template-parts/layouts/layout-banner.php");
    endwhile;
endif; ?>