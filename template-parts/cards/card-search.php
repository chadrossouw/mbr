<?php
    $permalink = get_permalink( );
    $title = get_the_title(  );
    $image = get_the_post_thumbnail(get_the_ID(), 'card_image');
    if(!$image){
        $image = '';
    }
    $date = get_the_date('j F Y', get_the_ID());
    $description = get_field('short_description' );
    $post_type = get_post_type();
    $post_type_object = get_post_type_object($post_type);
    $post_type = $post_type_object->labels->singular_name;
    ?>
    <div class="listing-item flex_item">
        <div class ="card search-item flex gap_2">
            <?php if($image): ?>
                <div class = "container container--threetwo card-image">
                    <?php echo $image;?>
                </div>
            <?php endif; ?>
            <div>
                <a href = "<?php echo $permalink;?>" class="card_target"><h4><?php echo $title;?></h4></a>
                <p class><?php echo $description;?></p>
                <p class="black card-info-date"><strong class="semibold "><?php echo $post_type;?></strong></p>
            </div>
        </div>
</div>