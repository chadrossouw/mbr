<?php

$artworks = get_sub_field('artwork');
$images = get_sub_field('images');
if (!$artworks) {
    return;
}
$artworks = is_array($artworks) ? array_map(function($n){ 
    $artwork_id = $n->ID;

    $image = get_field('artwork_image', $artwork_id);
    $title = get_field('artwork_caption', $artwork_id);

    // Artist relationship
    $artist = get_field('artist_name', $artwork_id);

    if (is_array($artist)) {
        $artist = $artist[0];
    }

    $artist_name = $artist ? get_the_title($artist->ID) : null;
    $artist_link = $artist ? get_permalink($artist->ID) : null;
    return [
        'image' => $image,
        'title' => $title,
        'artist_name' => $artist_name,
        'artist_link' => $artist_link
    ];
}, $artworks) : [];

$images = is_array($images) ? array_map(function($n){ 
    $image = wp_get_attachment_image($n, 'full');
    $title = wp_get_attachment_caption($n);
    return [
        'image' => $image,
        'title' => $title,
    ];
}, $images) : [];

$artworks = array_merge($artworks, $images);
?>

<div class="essay-layout multiple-half-image-text padding grid--two-to-one gap_3">

    <?php foreach ($artworks as $artwork) : 

    ?>

        <div class="essay-artwork card">

            <div class="essay-artwork-image">

                <?php if ($artwork['image']) : ?>
                    <img
                        class=""
                        src="<?php echo esc_url($artwork['image']); ?>"
                        alt="<?php echo esc_attr($artwork['title']); ?>"
                        oncontextmenu="return false;">
                <?php endif; ?>

            </div>

            <div class="essay-artwork-meta inside-grid white card-meta-padding">

                <?php if (isset($artwork['title'])) : ?>

                    
                        <div class="caption">
                            <?php echo apply_filters('the_content', $artwork['title']); ?>
                        </div>
                    <?php endif; ?>

                

                <?php if (isset($artwork['artist_name'])) : ?>
                    <p class="artwork-artist">
                        <?php if (isset($artwork['artist_link'])) : ?>
                        <a class="artwork-title card_target" href="<?php echo esc_url($artwork['artist_link']); ?>">
                            <?php echo esc_html($artwork['artist_name']); ?>
                        </a>
                        <?php else : ?>
                            <?php echo esc_html($artwork['artist_name']); ?>
                        <?php endif; ?>
                    </p>
                <?php endif; ?>
            </div>

        </div>

    <?php endforeach; ?>

</div>