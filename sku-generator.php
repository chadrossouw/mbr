<?php
/* 
Template Name: SKU Generator
*/
get_header();
?>

<main id="primary" class="site-main exhibitions-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">
            <h1><?php the_title(); ?></h1>
            <section class="contact-top three-col-grid with-1-col-2-col">
                <?php
                    //Generate a six digit SKU
                    $sku = strtoupper(substr(md5(uniqid(rand(), true)), 0, 6));
                    echo '<p>Generated Code: ' . esc_html($sku) . '</p>';
                ?>
            </section>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>