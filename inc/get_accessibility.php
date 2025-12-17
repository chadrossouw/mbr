<?php
/** uses js functions in accessibility.js  */

function get_accessibility_mode_switcher($mode='vivid'){
 ?>
    <p><?php echo __('Colour mode','ace');?></p>
    <button class="switch" type="button" aria-label="<?php echo __('Use muted mode','ace'); ?>" <?php echo $mode=='muted'?'aria-pressed="true"':''; ?>>
        <!-- <div class="toggle"><?php echo file_get_contents(get_template_directory() . '/assets/brightness.svg'); ?></div> -->
        <span class="vivid_text"><?php echo __('Vivid','ace'); ?></span>
        <span class="muted_text"><?php echo __('Muted','ace'); ?></span>
    </button>
<?php 
}

function get_accessibility_text_sizer($size){
    ?>
    <p><?php echo __('Text Size','ace'); ?></p>
        <button class="text_sizer_button" data-size="larger" <?php echo $size==200?'disabled':'';?>><span class="screen-reader-text"><?php echo __('Increase text size','ace'); ?></span><?php echo file_get_contents(get_template_directory().'/assets/larger.svg');?></button>
        <button class="text_sizer_button" data-size="reset" <?php echo $size==100?'disabled':'';?>><span class="screen-reader-text"><?php echo __('Reset text size to default','ace'); ?></span><?php echo file_get_contents(get_template_directory().'/assets/reset.svg');?></button>
        <button class="text_sizer_button" data-size="smaller" <?php echo $size==100?'disabled':'';?>><span class="screen-reader-text"><?php echo __('Decrease text size','ace'); ?></span><?php echo file_get_contents(get_template_directory().'/assets/smaller.svg');?></button>
    <?php 
}