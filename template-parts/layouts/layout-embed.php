<div class="embed container container--header">
    <?php
    $code = get_sub_field('embed_code'); 
    if($code):
        echo $code;
    else:
        if($url = get_sub_field('embed_url')):?>
            <iframe src="<?php echo $url; ?>" frameborder="0" allowfullscreen></iframe>
        <?php endif;
    endif;
    ?>
</div>