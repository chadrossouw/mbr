<?php
$header = get_sub_field('header');
$description = get_sub_field('description');
$link = get_sub_field('link');
$background_color = get_sub_field('background_color');
$image = get_sub_field('image');
if(!$image){
    $image = get_sub_field('background_image');
}
?>
<div class="block cta-block padding no_margin_mobile container grid grid_50 gap_2" style="background-image: url(<?php echo $image; ?>);">
    <div class="cta-block-content padding_2 <?php echo $background_color ?> grid">
        <h2 class="bold"><?php echo $header; ?></h2>
        <p class="white"><?php echo $description; ?></p>
        <?php echo $link ? get_link_button($link) : ''; ?>
    </div>
</div>
<?php 