<?php
$id = get_the_ID();
$title = get_sub_field('heading', $id);
$description = get_sub_field('description', $id);
$blocks = get_sub_field('team', $id);
$image = get_sub_field('team_image', $id);
$image = wp_get_attachment_image($image, 'full');
?>
<div class="block team padding grid gap_1 bg_beige">
    <?php if ($title): ?>
        <h2 class="bold">
            <?php echo $title ?>
        </h2>
    <?php endif; ?>
    <?php if ($description): ?>
        <p class="max-text"><?php echo $description; ?></p>
    <?php endif; ?>
    <?php if ($image): ?>
        <?php echo $image; ?>
    <?php endif; ?>

    <div class="team grid grid_30 members gap_3 padding-top">
        <?php
        foreach ($blocks as $i => $block):
            include get_template_directory() . '/template-parts/cards/card-member.php';
        endforeach; ?>
    </div>
</div>