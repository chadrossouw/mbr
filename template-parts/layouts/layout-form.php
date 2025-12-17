<?php $form = get_sub_field('form');
$title = get_sub_field('form_title');
$description = get_sub_field('form_description');
$description = $description ? apply_filters('the_content', $description) : false;
$form_meta = get_post_meta($form->ID); ?>
<div class="double_padding bg_white form_section">
    <h3 class="uc"><?php echo $title; ?></h3>
    <?php if ($description): ?>
        <div class="description">
            <?php echo $description; ?>
        </div>
    <?php endif; ?>
    <div class="form_container">
        <?php echo do_shortcode('[contact-form-7 id="' . $form_meta['_hash'][0] . '"]'); ?>
    </div>
</div>