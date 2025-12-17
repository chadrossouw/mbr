<?php $text = get_sub_field('text'); 
if($text):
    echo apply_filters('the_content', $text);
endif;
?>