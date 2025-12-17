<?php
$title = get_sub_field('title');
$link = get_sub_field('link');
$description = get_sub_field('description');
$background_color = get_sub_field('background_color');
?>
<div class="block cta-text padding no_margin_mobile">
    <div class="inner-padding cta-text <?php echo $background_color ?> grid grid_50">
        <div class="cta-text-content">
            <h4 class="uc bold"><?php echo $title; ?></h4>
            <p class=""><?php echo $description; ?></p>
        </div>
        <?php echo get_link_button($link); ?>
    </div>
</div>