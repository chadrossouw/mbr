<?php
/*
Template Name: Art & Books
*/
get_header();
?>

<main id="primary" class="site-main art-books-page">

<?php woocommerce_output_all_notices(); ?>

<?php while (have_posts()) : the_post(); ?>

	<?php
	$featured_image = get_the_post_thumbnail_url(get_the_ID(), 'large');

	$selected_artworks = get_field('selected_artworks');
	$selected_books    = get_field('selected_books'); // future use
	?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<section class="page-content">

			<section class="three-col-grid with-1-col-2-col">

				<!-- LEFT: ARTWORKS -->
				<div class="three-col-card">
                    <h1>Art</h1>

					<?php if (!empty($selected_artworks)) : ?>

						<?php foreach (array_slice($selected_artworks, 0, 2) as $artwork) :

							$artwork_id = is_object($artwork) ? $artwork->ID : $artwork;

							$artwork_title = get_the_title($artwork_id);
							$artwork_link  = get_permalink($artwork_id);
							$artwork_image = get_the_post_thumbnail_url($artwork_id, 'large');

							$artists = get_field('artists', $artwork_id);

							$artist_names = [];

							if (!empty($artists)) {
								foreach ($artists as $artist) {
									$artist_names[] = is_object($artist)
										? get_the_title($artist->ID)
										: get_the_title($artist);
								}
							}

							$artist_output = !empty($artist_names)
								? implode(', ', $artist_names)
								: '';
						?>

							<div class="artbook-item">

								<!-- LINK 1: artwork page -->
								<a class="artwork-main-link" href="<?php echo esc_url($artwork_link); ?>">

									<?php if (!empty($artwork_image)) : ?>
										<img src="<?php echo esc_url($artwork_image); ?>" alt="<?php echo esc_attr($artwork_title); ?>">
									<?php endif; ?>

									<div class="art-main-link-text">
                                        <?php if (!empty($artist_output)) : ?>
                                            <h2><?php echo esc_html($artist_output); ?></h2>
                                        <?php endif; ?>

                                        <p><?php echo esc_html($artwork_title); ?></p>
                                    </div>
								</a>

								<!-- LINK 2: enquiry -->
								<a class="artwork-enquire-link"
								   href="<?php
									echo esc_url(add_query_arg([
										'artwork' => rawurlencode($artwork_title),
										'artist'  => rawurlencode($artist_output),
									], get_permalink(get_page_by_path('enquire-product'))));
								   ?>">
									Enquire
								</a>

							</div>

						<?php endforeach; ?>

					<?php endif; ?>

					<!-- SEE MORE ARTWORKS-->
					<div class="see-more">
						<a href="/art-books/artworks/">See more artworks</a>
					</div>

				</div>

				<!-- RIGHT: BOOKS -->
                <div class="two-column-span">
                    <h1>Books</h1>

                    <?php if (!empty($selected_books)) : ?>

                        <div class="three-col-grid">

                            <?php foreach (array_slice($selected_books, 0, 6) as $book) :

								$book_id = is_object($book) ? $book->ID : $book;
								$product = wc_get_product($book_id);
                                $book_title = get_the_title($book_id);
                                $book_link  = get_permalink($book_id);
                                $book_image = get_the_post_thumbnail_url($book_id, 'large');
                                $book_author = get_field('book_author_name', $book_id);
                                $book_price = '';

                                if (function_exists('wc_get_product')) {
                                    $product = wc_get_product($book_id);
                                    if ($product) {
                                        $book_price = $product->get_price_html();
                                    }
                                }

								$enquiry_url = add_query_arg(
									[
										'book'   => rawurlencode($book_title),
										'author' => rawurlencode($book_author),
									],
									get_permalink(get_page_by_path('enquire-product'))
								);
                            ?>

                                <div class="book-card-wrapper">
									<a class="three-col-card book-card book-main-link" href="<?php echo esc_url($book_link); ?>">

                                    <?php if (!empty($book_image)) : ?>
                                        <div class="card-image">
                                            <img
                                                src="<?php echo esc_url($book_image); ?>"
                                                alt="<?php echo esc_attr($book_title); ?>"
                                            >
                                        </div>
                                    <?php endif; ?>

                                    <div class="book-link-text">

                                        <?php if (!empty($book_author)) : ?>
                                            <h2 class="card-artists book-author"><?php echo esc_html($book_author); ?></h2>
                                        <?php endif; ?>

                                        <p class="card-title book-title"><?php echo esc_html($book_title); ?></p>

                                        <?php if (!empty($book_price)) : ?>
                                            <div class="book-price">
                                                <?php echo wp_kses_post($book_price); ?>
                                            </div>
                                        <?php endif; ?>

                                    </div>

                                </a>

								<div class="artwork-add-to-cart but-book-add-to-cart">

									<?php if ($product && $product->is_in_stock() ) : ?>

										<a
											href="<?php echo esc_url( wc_get_cart_url() . '?add-to-cart=' . $product->get_id() ); ?>"
											class="single_add_to_cart_button"
										>
											Add to cart
										</a>

									<?php else : ?>

										<div class="artwork-inquire but-book-enquire">
											<a href="<?php echo esc_url( $enquiry_url ); ?>" class="inquire-button">Enquire</a>
										</div>

									<?php endif; ?>

								</div>
								</div>

                            <?php endforeach; ?>

                        </div>

                        <!-- SEE MORE BOOKS -->
                        <div class="see-more">
                            <a href="/art-books/books/">See more books</a>
                        </div>

                    <?php endif; ?>

                </div>

			</section>

		</section>

	</article>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>