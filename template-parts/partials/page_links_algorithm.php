<?php $count = count($blocks);
if ($count < 4):
    include get_template_directory() . '/template-parts/partials/page_links_stack.php';

else: ?>
    <div class="page_links page_links--algorithm">
        <?php if ($title): ?>
            <div class="margins">
                <?php echo get_header_with_icon_colour($title, $icon, $title_colour); ?>
                <?php if ($introduction): ?>
                    <p><?php echo $introduction; ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="grid grid_30 gap_3 margins">
            <?php
            foreach ($blocks as $i => $block):
                if ($i % 4 == 0) {
                    include get_template_directory() . '/template-parts/cards/card-page-links-algo-stack.php';
                } else {
                    include get_template_directory() . '/template-parts/cards/card-page-links-grid.php';
                }
            endforeach; ?>
        </div>
    </div>
<?php
endif;
