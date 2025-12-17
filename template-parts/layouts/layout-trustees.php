<?php
$id = get_the_ID();
$title = get_sub_field('heading', $id);
$introduction = get_sub_field('introduction', $id);
$blocks = get_sub_field('trustees', $id);
?>
<div class="block trustees margins grid gap_1">
    <?php if ($title): ?>
        <h2 class="trustees_title bold">
            <?php echo $title; ?>
        </h2>
    <?php endif; ?>
    <?php if ($introduction): ?>
        <p class="max-text">
            <?php echo $introduction; ?>
        </p>
    <?php endif; ?>
    <div class="trustees grid grid_30 gap_3 padding-top">
        <?php
        foreach ($blocks as $i => $block):
            include get_template_directory() . '/template-parts/cards/card-trustee.php';
        endforeach; ?>
    </div>
</div>