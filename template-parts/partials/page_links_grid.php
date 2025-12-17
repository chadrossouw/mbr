<div class="page_links page_links--grid <?php echo $background_color; ?> padding">
    <?php if ($title): ?>
        <?php echo get_header_with_icon_colour($title, $icon, $title_colour); ?>
        <?php if ($introduction): ?>
            <p><?php echo $introduction; ?></p>
        <?php endif;?>
    <?php endif;
    $count = count($blocks);
    ?>

    <div class="flex flex_33 gap_3 <?php echo $count > 3 ? 'flex-center' : ''; ?>">
        <?php
        foreach ($blocks as $i => $block): ?>
            <div class="flex_item">
                <?php include get_template_directory() . '/template-parts/cards/card-page-links-grid.php'; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>