<?php $text = get_sub_field('text');
if ($text):
?>
    <div class="text padding-x">
        <?php echo apply_filters('the_content', $text); ?>
    </div>
<?php
endif;
?>