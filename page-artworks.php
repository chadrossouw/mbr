<?php
/*
Template Name: Artworks Page
*/
get_header();
?>

<main id="primary" class="site-main artworks-page">

<?php while ( have_posts() ) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<section class="page-content">

			<h1><?php the_title(); ?></h1>

			<section class="three-col-no-form artworks-listing">

				<?php
                $parent_page = get_page_by_path('art-books');

                $selected_artworks = get_field(
                    'selected_artworks',
                    $parent_page->ID
                );
                ?>

				<?php if ( ! empty( $selected_artworks ) ) : ?>

					<div class="three-col-grid">

						<?php foreach ( $selected_artworks as $artwork ) :

							$product_id = is_object( $artwork ) ? $artwork->ID : $artwork;
							$featured_image  = get_the_post_thumbnail_url( $product_id, 'large' );
							$title           = get_the_title( $product_id );
							$link            = get_permalink($product_id);

							$artists = get_field( 'artists', $product_id );

							$artist_names = [];

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
						?>

                            <div class="art-card-wrapper">
                                <a class="three-col-card artwork-card" href="<?php echo esc_url( $link ); ?>">

                                    <?php if ( ! empty( $featured_image ) ) : ?>

                                        <div class="card-image">
                                            <img
                                                src="<?php echo esc_url( $featured_image ); ?>"
                                                alt="<?php echo esc_attr( $title ); ?>"
                                            >
                                        </div>

                                    <?php endif; ?>

                                    <div class="card-text">

                                        <?php if ( ! empty( $artist_output ) ) : ?>

                                            <h2 class="card-artists">
                                                <?php echo esc_html( $artist_output ); ?>
                                            </h2>

                                        <?php endif; ?>

                                        <p class="card-title">
                                            <?php echo esc_html( $title ); ?>
                                        </p>

                                    </div>

                                </a>

                                <?php
                                $enquiry_url = add_query_arg(
                                    [
                                        'artwork' => rawurlencode( $title ),
                                        'artist'  => rawurlencode( $artist_output ),
                                    ],
                                    get_permalink( get_page_by_path( 'enquire-product' ) )
                                );
                                ?>

                                <div class="artwork-inquire">
                                    <a href="<?php echo esc_url( $enquiry_url ); ?>" class="inquire-button">Enquire</a>
                                </div>
                            </div>

						<?php endforeach; ?>

					</div>

				<?php endif; ?>

			</section>

		</section>

	</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>