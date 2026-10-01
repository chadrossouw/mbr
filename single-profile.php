<?php
get_header();
?>

<main id="primary" class="site-main single-profile-page">

<?php while (have_posts()) : the_post(); ?>

    <?php
    /*
     * PROFILE FIELDS
     */

    $profile_image = get_field('profile_image');
    $profile_image_url = $profile_image
        ? wp_get_attachment_image_url($profile_image, 'large')
        : null;

    $profile_accolades = get_field('profile_accolades');

    $born_died_active = get_field('born_died_active_columns');

    $biography_summary = get_field('biography_summary');
    $biography_source = get_field('biography_source');
    $full_biography = get_field('full_biography');


    /*
     * BUILD BORN / DIED / ACTIVE DATA
     */

    $profile_dates = [];

    if (!empty($born_died_active) && is_array($born_died_active)) {

        foreach ($born_died_active as $column) {

            if (empty($column['label'])) {
                continue;
            }

            $label = $column['label'];

            /*
             * BORN / DIED
             */
            if (
                ($label === 'Born' || $label === 'Died') &&
                !empty($column['date'])
            ) {

                $profile_dates[$label] = [
                    'label' => $label,
                    'date' => $column['date'],
                    'city_label' => '',
                    'city_description' => '',
                ];

            }


            /*
             * ACTIVE
             */
            if (
                $label === 'Active' &&
                (!empty($column['start_date']) || !empty($column['end_date']))
            ) {

                $profile_dates[$label] = [
                    'label' => $label,
                    'start_date' => $column['start_date'] ?? '',
                    'end_date' => $column['end_date'] ?? '',
                    'city_label' => '',
                    'city_description' => '',
                ];

            }


            /*
             * CITY
             */
            if (!empty($profile_dates[$label])) {

                if (!empty($column['do_you_want_to_add_city'])) {

                    $profile_dates[$label]['city_label'] =
                        !empty($column['city_label'])
                            ? $column['city_label']
                            : 'City';

                    $profile_dates[$label]['city_description'] =
                        $column['city_description'] ?? '';
                }
            }
        }
    }
    ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <section class="page-content">

            <section class="single-profile-top three-col-grid with-1-col-2-col">


                <!-- PROFILE IMAGE — 1 COLUMN -->

                <?php if (!empty($profile_image_url)) : ?>

                    <div class="profile-image three-col-card">

                        <img
                            src="<?php echo esc_url($profile_image_url); ?>"
                            alt="<?php echo esc_attr(get_the_title()); ?>"
                        >

                    </div>

                <?php endif; ?>


                <!-- PROFILE INFORMATION — 2 COLUMNS -->

                <div class="profile-information two-column-span">


                    <!-- PROFILE TITLE -->

                    <?php if (!empty(get_the_title())) : ?>

                        <h1><?php the_title(); ?></h1>

                    <?php endif; ?>


                    <!-- ACCOLADES -->

                    <?php if (!empty($profile_accolades) && is_array($profile_accolades)) : ?>

                        <?php
                        $accolades = [];

                        foreach ($profile_accolades as $accolade) {

                            if (!empty($accolade['accolade_label'])) {

                                $accolades[] = $accolade['accolade_label'];

                            }
                        }
                        ?>

                        <?php if (!empty($accolades)) : ?>

                            <p class="profile-accolades">

                                <?php foreach ($accolades as $index => $accolade) : ?>

                                    <?php if ($index > 0) : ?>
                                        <span class="accolade-separator"></span>
                                    <?php endif; ?>

                                    <strong>
                                        <?php echo esc_html($accolade); ?>
                                    </strong>

                                <?php endforeach; ?>

                            </p>

                        <?php endif; ?>

                    <?php endif; ?>


                    <!-- BORN / DIED / ACTIVE GRID -->

                    <?php if (!empty($profile_dates)) : ?>

                        <div class="profile-dates-grid">

                            <!-- BORN -->
                            <?php if (!empty($profile_dates['Born'])) : ?>

                                <div class="profile-date-column">

                                    <?php
                                    $born = $profile_dates['Born'];
                                    ?>

                                    <?php if (!empty($born['label'])) : ?>

                                        <h2 class="profile-date-label">
                                            <?php echo esc_html($born['label']); ?>
                                        </h2>

                                    <?php endif; ?>


                                    <?php if (!empty($born['date'])) : ?>

                                        <p class="profile-date-value">
                                            <?php
                                            echo esc_html(date('j M Y', strtotime($born['date'])));
                                            ?>
                                        </p>

                                    <?php endif; ?>


                                    <?php if ( !empty($born['city_label']) && !empty($born['city_description'])) : ?>

                                        <h2 class="profile-city-label">
                                            <?php echo esc_html($born['city_label']); ?>
                                        </h2>

                                        <p class="profile-city-value">
                                            <?php echo esc_html($born['city_description']); ?>
                                        </p>

                                    <?php endif; ?>

                                </div>

                            <?php endif; ?>


                            <!-- DIED -->

                            <?php if (!empty($profile_dates['Died'])) : ?>

                                <div class="profile-date-column">

                                    <?php
                                    $died = $profile_dates['Died'];
                                    ?>

                                    <?php if (!empty($died['label'])) : ?>

                                        <h2 class="profile-date-label">
                                            <?php echo esc_html($died['label']); ?>
                                        </h2>

                                    <?php endif; ?>


                                    <?php if (!empty($died['date'])) : ?>

                                        <p class="profile-date-value">
                                            <?php
                                            echo esc_html(date('j M Y', strtotime($died['date'])));
                                            ?>
                                        </p>

                                    <?php endif; ?>


                                    <?php if ( !empty($died['city_label']) && !empty($died['city_description'])) : ?>

                                        <h2 class="profile-city-label">
                                            <?php echo esc_html($died['city_label']); ?>
                                        </h2>

                                        <p class="profile-city-value">
                                            <?php echo esc_html($died['city_description']); ?>
                                        </p>

                                    <?php endif; ?>

                                </div>

                            <?php endif; ?>


                            <!-- ACTIVE -->

                            <?php if (!empty($profile_dates['Active'])) : ?>

                                <div class="profile-date-column">

                                    <?php
                                    $active = $profile_dates['Active'];
                                    ?>

                                    <?php if (!empty($active['label'])) : ?>

                                        <h2 class="profile-date-label">
                                            <?php echo esc_html($active['label']); ?>
                                        </h2>

                                    <?php endif; ?>


                                    <?php
                                    $active_dates = [];

                                    if (!empty($active['start_date'])) {
                                        $active_dates[] = date('Y', strtotime($active['start_date']));
                                    }

                                    if (!empty($active['end_date'])) {
                                        $active_dates[] = date('Y', strtotime($active['end_date']));
                                    }
                                    ?>


                                    <?php if (!empty($active_dates)) : ?>

                                        <p class="profile-date-value">

                                            <?php
                                            echo esc_html(implode(' - ', $active_dates));
                                            ?>

                                        </p>

                                    <?php endif; ?>

                                    <?php if (!empty($active['city_label']) && !empty($active['city_description'])) : ?>

                                        <p class="profile-city-label">
                                            <?php echo esc_html($active['city_label']); ?>
                                        </p>

                                        <p class="profile-city-value">
                                            <?php echo esc_html($active['city_description']); ?>
                                        </p>

                                    <?php endif; ?>

                                </div>

                            <?php endif; ?>


                        </div>

                    <?php endif; ?>


                    <!-- BIOGRAPHY SUMMARY -->

                    <?php if (!empty($biography_summary)) : ?>

                        <div class="profile-biography-summary">

                            <?php echo wp_kses_post($biography_summary); ?>

                        </div>

                    <?php endif; ?>


                </div>

            </section>

            <!-- FULL BIOGRAPHY SECTION-->

            <?php if (!empty($biography_summary) || !empty($biography_source) || !empty($full_biography)) : ?>

                <section class="single-profile-biography three-col-grid bg-white">

                    <!-- LEFT COLUMN -->

                    <?php if (
                        !empty($biography_summary) ||
                        !empty($biography_source)
                    ) : ?>

                        <div class="profile-biography-meta three-col-card">


                            <?php if (!empty($biography_summary)) : ?>

                                <div class="profile-biography-summary">

                                    <?php echo wp_kses_post($biography_summary); ?>

                                </div>

                            <?php endif; ?>


                            <?php if (!empty($biography_source)) : ?>

                                <div class="profile-biography-source">

                                    <?php echo wp_kses_post($biography_source); ?>

                                </div>

                            <?php endif; ?>


                        </div>

                    <?php endif; ?>


                    <!-- RIGHT 2 COLUMNS -->

                    <?php if (!empty($full_biography)) : ?>

                        <div class="profile-full-biography two-column-span">

                            <?php echo wp_kses_post($full_biography); ?>

                        </div>

                    <?php endif; ?>


                </section>

            <?php endif; ?>

            <!-- PROFILE LAYOUT CONTENT -->
            <section class="essay-content">
                <?php get_essays_content_layouts(get_the_ID()); ?>
            </section>


        </section>

    </article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>