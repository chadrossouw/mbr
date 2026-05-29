<?php
/*
Template Name: Books Page
*/
get_header();
?>

<main id="primary" class="site-main books-page">

<?php while ( have_posts() ) : the_post(); ?>

	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

		<section class="page-content">

			<h1><?php the_title(); ?></h1>

			<section class="three-col-no-form books-listing">

				<?php
				$parent_page = get_page_by_path('art-books');

                $selected_books = get_field('selected_books', $parent_page->ID);
				?>

				<?php if ( ! empty( $selected_books ) ) : ?>

					<div class="three-col-grid">

						<?php foreach ( $selected_books as $book ) :

							$product_id      = is_object( $book ) ? $book->ID : $book;
							$featured_image  = get_the_post_thumbnail_url( $product_id, 'large' );
							$title           = get_the_title($product_id);
							$link            = get_permalink($product_id);

							$product         = wc_get_product( $product_id );
							$book_author     = get_field( 'book_author_name', $product_id );
							$book_price      = $product ? $product->get_price_html() : '';
						?>
                            <div class="book-card-wrapper">
                                <a class="three-col-card book-card" href="<?php echo esc_url( $link ); ?>">
                                    <div class="inner-book-card-wrapper">
                                        <?php if ( ! empty( $featured_image ) ) : ?>

                                            <div class="card-image">
                                                <img
                                                    src="<?php echo esc_url( $featured_image ); ?>"
                                                    alt="<?php echo esc_attr( $title ); ?>"
                                                >
                                            </div>

                                        <?php endif; ?>

                                        <div class="card-text">

                                            <?php if ( ! empty( $book_author ) ) : ?>

                                                <h2 class="card-artists book-author">
                                                    <?php echo esc_html( $book_author ); ?>
                                                </h2>

                                            <?php endif; ?>

                                            <p class="card-title book-title">
                                                <?php echo esc_html( $title ); ?>
                                            </p>

                                            <?php if ( ! empty( $book_price ) ) : ?>

                                                <div class="book-price">
                                                    <?php echo wp_kses_post( $book_price ); ?>
                                                </div>

                                            <?php endif; ?>

                                        </div>
                                    </div>
                                </a>

                                <?php
                                $enquiry_url = add_query_arg(
                                    [
                                        'book'   => rawurlencode( $title ),
                                        'author' => rawurlencode( $book_author ),
                                    ],
                                    get_permalink( get_page_by_path( 'enquire-product' ) )
                                );
                                ?>

                                <div class="artwork-add-to-cart but-book-add-to-cart">

                                    <?php if ( $product && $product->is_in_stock() ) : ?>

                                        <form class="cart" method="post" enctype="multipart/form-data">

                                            <button
                                                type="submit"
                                                name="add-to-cart"
                                                value="<?php echo esc_attr( $product->get_id() ); ?>"
                                                class="single_add_to_cart_button"
                                            >
                                                Add to cart
                                            </button>

                                        </form>

                                    <?php else : ?>

                                        <div class="artwork-inquire but-book-enquire">

                                            <a
                                                href="<?php echo esc_url( $enquiry_url ); ?>"
                                                class="inquire-button"
                                            >
                                                Enquire
                                            </a>

                                        </div>

                                    <?php endif; ?>

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