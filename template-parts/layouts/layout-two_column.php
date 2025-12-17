<?php
$separator = get_sub_field('add_separator');
$heading = get_sub_field('heading');
$left_content = get_sub_field('left_content');
$right_content = get_sub_field('right_content');
$right_content = apply_filters('the_content', $right_content);
$left_content = apply_filters('the_content', $left_content);
?>
<div class="block margins <?php echo $separator ? 'separated' : ''; ?>">
    <h3 class="uc bold"><?php echo $heading ?></h3>
    <div class="two_column grid grid_50 gap_5">
        <div class="left_content">
            <?php echo $left_content ?>
        </div>
        <div class="right_content">
            <?php echo $right_content ?>
        </div>
    </div>

</div>