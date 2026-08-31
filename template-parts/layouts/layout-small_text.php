<?php

$small_text = get_sub_field('small_text');

if (!$small_text) {
    return;
}

?>
<section class="single-exhibition-description three-col-grid">

    <div class="empty-column three-col-card"></div>

    <div class="description-content two-column-span">
        <?php echo apply_filters('the_content', $small_text); ?>
    </div>

</section>