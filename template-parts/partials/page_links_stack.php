<div class="page_links page_links--stacked">
    <?php if ($title): ?>
        <div class="padding page_links_title">
            <?php echo $title?'<h2>'.$title.'</h2>':''; ?>
            <?php if ($introduction): ?>
                <p><?php echo $introduction; ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <?php
    foreach ($blocks as $i => $block):
        include get_template_directory() . '/template-parts/cards/card-page-links-stack.php';
    endforeach; ?>
</div>