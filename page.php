<?php
get_header();
?>

<main id="primary" class="site-main">

<?php
while (have_posts()) :
    the_post();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <section class="page-content">
        <h1><?php the_title(); ?></h1>
        <?php if(has_post_thumbnail()) : ?>
            <div class="featured-image container container--sixteennine">
                <?php the_post_thumbnail('full'); ?>
            </div>
        <?php endif; ?>
        <?php the_content(); ?>
        <?php if($gallery = get_field('gallery')) : ?>
            <div class="gallery grid grid_30 gap_1">
                <?php foreach($gallery as $image) : ?>
                    <div class="gallery-item">
                        <?php echo wp_get_attachment_image($image, 'large'); ?>
                        <?php if($caption = get_post_field('post_excerpt', $image)) : ?>
                            <div class="gallery-caption"><?php echo $caption; ?></div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

    </section>
</article>

<?php endwhile; ?>

</main>

<?php
get_footer();