<?php

$zoom_anchor = get_sub_field('zoom_anchor_point');
$non_zooming_text = get_sub_field('non_zooming_text');
$zooming_text = get_sub_field('zooming_text');
$use_artworks = get_sub_field('use_artwork_product');
$text_left = get_sub_field('text_on_the_left');
$zoom_id= null;
if($use_artworks){
// Relationship field returns array (max 1)
    $artwork = get_sub_field('artwork');
    $artwork_post = $artwork[0];
    $artwork_id = $artwork_post->ID;

    $product_id = is_object( $artwork_post ) ? $artwork_post->ID : $artwork_post;
    $image  = get_the_post_thumbnail_url( $product_id, 'large' );
    $title           = get_the_title( $product_id );
    $link            = get_permalink($product_id);

    $artists = get_field( 'artists', $product_id );

    $artist_names = [];

    // if (is_array($artist)) {
    //     $artist = $artist[0];
    // }

    // $artist_name = $artist ? get_the_title($artist->ID) : null;
    // $artist_link = $artist ? get_permalink($artist->ID) : null;

    if ( ! empty( $artists ) ) {

        foreach ( $artists as $artist ) {

            $artist_names[] = is_object( $artist )
                ? get_the_title( $artist->ID )
                : get_the_title( $artist );
        }
    }

    if ( count( $artist_names ) > 1 ) {

        $last_artist = array_pop( $artist_names );

        $artist_output = implode( ', ', $artist_names ) . ' & ' . $last_artist;

    } else {

        $artist_output = $artist_names[0] ?? '';
    }
}
else{
    $title = get_sub_field('caption');
    $image = get_sub_field('image');
    $image = $image?wp_get_attachment_image_url($image, 'full'):null;
} 
if($zoom_anchor=='coordinates'){
    $top = get_sub_field('zoom_anchor_top');
    $left = get_sub_field('zoom_anchor_left');
    $zoom_id = 'zoom_'.rand(0,9999);
    echo "<style>#$zoom_id{
        --zoomtop:{$top}%;
        --zoomleft:{$left}%;
    }</style>";
}
?>

<div <?php echo $zoom_id ? 'id="' . esc_attr($zoom_id) . '"' : ''; ?> class="essay-layout zoom-block card scroll-detect bg-brown">
    
    <div class="essay-artwork-image <?php echo $zoom_anchor ?: ''; ?>" style="background-image: url('<?php echo esc_url($image); ?>');" >
        <span class="screen-reader-text">
            <?php echo esc_html($title); ?>
            <?php if (!empty($artist_output)) : ?>
                <?php echo esc_html($artist_output); ?>
            <?php endif; ?>
        </span>
    </div>
    <div class="zoom-block__overlay-text white scroll-detect">
        <?php echo apply_filters('the_content', $non_zooming_text); ?>
    </div>

    <div class="zoom-block__zooming-text white bg-brown scroll-detect <?php echo $text_left ? 'text-left' : ''; ?>">
        <?php echo apply_filters('the_content', $zooming_text); ?>
    </div>


    <div class="zoom-block__meta white essay-artwork-meta card-meta-padding">

        <?php if ($title) : ?>
                <div class="caption">
                    <?php echo apply_filters('the_content', $title); ?>
                </div>
        <?php  endif; ?>

        <?php if ($artist_output) : ?>
            <?php if ($link) : ?>
                <p class="artwork-artist"><a class="card_target" href="<?php echo esc_url($link); ?>"><?php echo esc_html($artist_name); ?></a></p>
            <?php else : ?>
            <p class="artwork-artist"><?php echo esc_html($artist_output); ?></p>
            <?php endif; ?>
        <?php endif; ?>

    </div>

</div>