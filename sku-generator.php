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
                <div class="three-col-card">
                <?php
                    //Generate a six digit SKU
                    $all_skus = get_option('all_skus', array());
                    $sku = strtoupper(substr(md5(uniqid(rand(), true)), 0, 6));
                    while(in_array($sku, $all_skus)) {
                        $sku = strtoupper(substr(md5(uniqid(rand(), true)), 0, 6));
                    }
                    $all_skus[] = $sku;
                    update_option('all_skus', $all_skus);
                    echo '<p>Generated Code: ' . esc_html($sku) . '</p>';
                ?>
                </div>
            </section>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>