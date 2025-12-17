<?php
$image = get_sub_field('image');
$quote = get_sub_field('quote');
$attribution = get_sub_field('attribution');
$image = wp_get_attachment_image($image, 'full');
?>
<div class="block double_padding quote_and_image grid grid_2_1">
    <div class="padding_2 ">
        <?php if ($quote) { ?>
            <p class="quote_text">"<?php echo $quote; ?>"</p>
        <?php } ?>
        <p class="bold"><?php echo $attribution; ?></p>
    </div>
    <div class="container container--round">
        <?php echo $image; ?>
    </div>

</div>