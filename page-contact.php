<?php
/*
Template Name: Contact Page
*/
get_header();
?>

<main id="primary" class="site-main contact-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">
            <?php
            if (get_field('contact_info')) {
                echo '<div class="contact-info">';
                the_field('contact_info');
                echo '</div>';
            }

            if ($form_shortcode = get_field('contact_form_shortcode')) {
                echo do_shortcode($form_shortcode);
            } else {
                echo do_shortcode('[contact-form-7 id="123" title="Contact form"]');
            }
            ?>
        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>