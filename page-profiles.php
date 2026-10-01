<?php
/*
Template Name: Profiles Page
*/
get_header();
?>

<main id="primary" class="site-main profiles-page">

<?php while (have_posts()) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content white">

            <h1><?php the_title(); ?></h1>

            <section class="three-col-no-form">

                <?php
                $args = [
                    'post_type'      => 'profile',
                    'post_status'    => 'publish',
                    'posts_per_page' => -1,
                    'orderby'        => 'menu_order',
                    'order'          => 'ASC',
                ];

                $profiles = new WP_Query($args);
                ?>

                <?php if ($profiles->have_posts()) : ?>

                    <div class="three-col-grid">

                        <?php
                        $profile_index = 0;

                        while ($profiles->have_posts()) : $profiles->the_post();

                            $profile_image = get_field('profile_image');
                            $profile_image = $profile_image
                                ? wp_get_attachment_image_url($profile_image, 'large')
                                : null;

                            $title = get_the_title();
                            $biography_summary = get_field('biography_summary');
                            $born_died_active = get_field('born_died_active_columns');
                            $link = get_permalink();

                            /*
                             * Get Born and Died dates.
                             */
                            $born_date = '';
                            $died_date = '';

                            if (!empty($born_died_active) && is_array($born_died_active)) {

                                foreach ($born_died_active as $column) {

                                    if (empty($column['label'])) {
                                        continue;
                                    }

                                    if ($column['label'] === 'Born' && !empty($column['date'])) {
                                        $born_label = $column['label'];
                                        $born_date = date('Y', strtotime($column['date']));
                                    }

                                    if ($column['label'] === 'Died' && !empty($column['date'])) {
                                        $died_label = $column['label'];
                                        $died_date = date('Y', strtotime($column['date']));
                                    }
                                }
                            }

                            // Skip completely empty cards
                            if (
                                empty($profile_image) &&
                                empty($title) &&
                                empty($born_date) &&
                                empty($died_date) &&
                                empty($biography_summary)
                            ) {
                                continue;
                            }

                            /*
                             * Alternate between a single-column and
                             * double-column card.
                             */
                            $card_class = ($profile_index % 2 === 0)
                                ? 'three-col-card profile-card profile-card-single'
                                : 'three-col-card profile-card profile-card-double';

                            $profile_index++;
                        ?>

                            <a class="<?php echo esc_attr($card_class); ?>" href="<?php echo esc_url($link); ?>">

                                <!-- PROFILE TITLE -->

                                <?php if (!empty($title)) : ?>

                                    <h2 class="white"><?php echo esc_attr($title); ?></h2>

                                <?php endif; ?>

                                <?php if (!empty($profile_image)) : ?>

                                    <div class="card-image">

                                        <img
                                            src="<?php echo esc_url($profile_image); ?>"
                                            alt="<?php echo esc_attr($title); ?>"
                                        >

                                    </div>

                                <?php endif; ?>


                                <div class="card-text">

                                    <?php if (!empty($born_date) || !empty($died_date)) : ?>

                                        <p class="profile-dates card-title">

                                            <?php if (!empty($born_date)) : ?>
                                                <span class="profile-born">
                                                    <?php echo esc_html($born_label); ?> <?php echo esc_html($born_date); ?>
                                                </span>
                                            <?php endif; ?>

                                            <?php if (!empty($born_date) && !empty($died_date)) : ?>
                                                <span class="profile-date-separator"> - </span>
                                            <?php endif; ?>

                                            <?php if (!empty($died_date)) : ?>
                                                <span class="profile-died">
                                                    <?php echo esc_html($died_label); ?> <?php echo esc_html($died_date); ?>
                                                </span>
                                            <?php endif; ?>

                                        </p>

                                    <?php endif; ?>


                                    <?php if (!empty($biography_summary)) : ?>

                                        <div class="profile-summary">
                                            <?php echo wp_kses_post($biography_summary); ?>
                                        </div>

                                    <?php endif; ?>

                                </div>

                            </a>

                        <?php endwhile; ?>

                    </div>

                    <?php wp_reset_postdata(); ?>

                <?php endif; ?>

            </section>

        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>