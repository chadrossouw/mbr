<?php
get_header();
?>

<main id="primary" class="site-main home-page">

    <?php get_home_hero(); ?>

    <?php get_content_layouts(get_the_ID()); ?>

</main>

<?php get_footer(); ?>