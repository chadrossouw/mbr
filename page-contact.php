<?php
get_header();
?>

<main id="primary" class="site-main contact-page">

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <!-- <header class="page-header">
            <h1><?php the_title(); ?></h1>
        </header> -->

        <section class="page-content">
            <?php
            // Optional WYSIWYG content (ACF field 'contact_info')
            if (get_field('contact_info')) {
                echo '<div class="contact-info">';
                the_field('contact_info');
                echo '</div>';
            }

            // Contact Form 7 shortcode
            // Add your form shortcode in the WordPress editor or hardcode it here
            if ($form_shortcode = get_field('contact_form_shortcode')) {
                echo do_shortcode($form_shortcode);
            } else {
                // Fallback if no ACF shortcode field
                echo do_shortcode('[contact-form-7 id="123" title="Contact form"]');
            }
            ?>
        </section>

    </article>

</main>

<?php
get_footer();