<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form();
	return;
}

// Product data
$product_id      = $product->get_id();
$product_full_image = get_field('single_product_image');
//$featured_image  = $product_full_image ?? get_the_post_thumbnail_url( $product_id, 'large' );
$featured_image  = $product_full_image ?: get_the_post_thumbnail_url( $product_id, 'large' );
// Shared Book / Artwork ACF Group 
$about_book_and_author = get_field( 'about_book_and_author', $product_id );
$about_text = $about_book_and_author['about_text'] ?? '';
$read_more_link = $about_book_and_author['read_more_link'] ?? '';
// Product details - shared between Books and Artworks 
$product_details = get_field( 'product_details', $product_id );

// Artworks ACF Fields
$artists     = get_field( 'artists', $product_id );
$year        = get_field( 'year', $product_id );
$dimensions  = get_field( 'dimensions', $product_id );
$work_note   = get_field( 'work_note', $product_id );

// Build artist names
$artist_names = [];

if ( ! empty( $artists ) ) {

	foreach ( $artists as $artist ) {

		$artist_names[] = is_object( $artist )
			? get_the_title( $artist->ID )
			: get_the_title( $artist );
	}
}

// if ( count( $artist_names ) > 1 ) {

// 	$last_artist = array_pop( $artist_names );

// 	$artist_output = strtoupper(
// 		implode( ', ', $artist_names ) . ' & ' . $last_artist
// 	);

// } else {

// 	$artist_output = strtoupper( $artist_names[0] ?? '' );
// }

if ( count( $artist_names ) > 1 ) {

	$last_artist = array_pop( $artist_names );

	// NO uppercase, NO transformation
	$artist_output = implode( ', ', $artist_names ) . ' & ' . $last_artist;

} else {

	// keep original casing exactly as stored
	$artist_output = $artist_names[0] ?? '';
}

$artwork_title = get_the_title( $product_id );

$enquiry_url = add_query_arg(
	[
		'artwork' => rawurlencode($artwork_title),
		'artist'  => rawurlencode($artist_output),
	],
	get_permalink(get_page_by_path('enquire-product'))
);
?>

<!-- Return a single artwork -->
<?php if ( has_term( 'artworks', 'product_cat', $product->get_id() ) ) : ?>
	<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

		<section class="page-content artwork-product-content">

			<!-- TOP SECTION -->
			<section class="single-artwork-top single-exhibition-top three-col-grid with-1-col-2-col">

				<!-- LEFT COLUMN -->
				<div class="artwork-meta exhibition-meta three-col-card">

					<div class="card-text">

						<?php if ( ! empty( $artist_output ) ) : ?>

							<h2 class="card-artists">
								<?php echo esc_html( $artist_output ); ?>
							</h2>

						<?php endif; ?>

						<p class="card-title">
							<?php the_title(); ?>
						</p>
						
						<?php if ( ! empty( $dimensions ) || ! empty( $work_note ) || ! empty( $year ) ) : ?>
							<div class="artwork_notes_wrapper">

								<?php if ( ! empty( $dimensions ) ) : ?>
									<p class="artwork-dimensions artwork-meta-item"><?php echo nl2br( esc_html( $dimensions ) ); ?></p>
								<?php endif; ?>

								<?php if ( ! empty( $work_note ) ) : ?>
									<p class="artwork-note artwork-meta-item"><?php echo esc_html( $work_note ); ?></p>
								<?php endif; ?>

								<?php if ( ! empty( $year ) ) : ?>
									<p class="artwork-year artwork-meta-item"><?php echo esc_html( $year ); ?></p>
								<?php endif; ?>

								<?php if ( ! empty( $product_details ) ) : ?>
									<div class="product-details-wrapper artwork-product-details"> <?php echo wp_kses_post( $product_details ); ?> </div>
								<?php endif; ?>
							</div>
						<?php endif; ?>

						<div class="artwork-inquire">
							<a href="<?php echo esc_url( $enquiry_url ); ?>" class="inquire-button">
								Enquire
							</a>
						</div>

					</div>

				</div>


				<!-- RIGHT 2 COLUMNS -->
				<div class="artwork-image exhibition-image two-column-span container container--threetwo">

					<?php if ( ! empty( $featured_image ) ) : ?>

						<img
							src="<?php echo esc_url( $featured_image ); ?>"
							alt="<?php echo esc_attr( get_the_title() ); ?>"
						>

					<?php endif; ?>

				</div>

			</section>


			<!-- FORM / DESCRIPTION SECTION -->
			 <?php if(!empty($about_text ) || ! empty( $read_more_link )) : ?>
				<section class="single-artwork-description single-exhibition-description three-col-grid">

					<div class="empty-column three-col-card"></div>

					<div class="description-content artwork-form-content two-column-span">

						<?php the_content(); ?>
						<!-- <h3>Form Place Holder</h3> -->

						<?php if ( ! empty( $about_text ) ) : ?>
							<div class="about-book-and-author artwork-about"> <?php echo wp_kses_post( $about_text ); ?> </div>
						<?php endif; ?>

						<?php if ( ! empty( $read_more_link ) ) : ?>
							<div class="book-read-more artwork-read-more"> 
								<a href="<?php echo esc_url( $read_more_link ); ?>" class="inquire-button" > Read More </a> 
							</div>
						<?php endif; ?>

					</div>

				</section>
			<?php endif; ?>

		</section>


		<?php
		/**
		 * WooCommerce default sections
		 * Commented out for custom artwork layout
		 */

		// do_action( 'woocommerce_before_single_product_summary' );
		?>

		<!--
		<div class="summary entry-summary">
			<?php // do_action( 'woocommerce_single_product_summary' ); ?>
		</div>
		-->

		<?php
		// do_action( 'woocommerce_after_single_product_summary' );
		?>

	</div>
<?php endif; ?>


<!-- Return a single book -->
<?php if ( has_term( 'books', 'product_cat', $product->get_id() ) ) : ?>
	<?php
	// Book ACF Fields
	$book_author_name = get_field( 'book_author_name', $product_id );
	$product_details    = get_field( 'product_details', $product_id );
	$about_book_author  = get_field( 'about_book_and_author', $product_id );
	$about_text         = $about_book_author['about_text'] ?? '';
	$read_more_link     = $about_book_author['read_more_link'] ?? '';

	// Building the url for book enquiry
	$book_title = get_the_title( $product_id );

	$enquiry_url = add_query_arg(
		[
			'book'   => rawurlencode( $book_title ),
			'author' => rawurlencode( $book_author_name ),
		],
		get_permalink( get_page_by_path( 'enquire-product' ) )
	);
	?>

	<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

		<section class="page-content artwork-product-content but-book-product-content">

			<!-- TOP SECTION -->
			<section class="single-artwork-top single-exhibition-top three-col-grid with-1-col-2-col but-single-book-top">

				<!-- LEFT COLUMN -->
				<div class="artwork-meta exhibition-meta three-col-card">

					<div class="card-text">

						<?php if ( ! empty( $book_author_name ) ) : ?>

							<h2 class="card-artists">
								<?php echo esc_html( strtoupper( $book_author_name ) ); ?>
							</h2>

						<?php endif; ?>

						<p class="card-title">
							<?php the_title(); ?>
						</p>

						<p class="artwork-price but-book-price artwork-meta-item">
							<?php echo $product->get_price_html(); ?>
						</p>

						<?php if ( ! empty( $product_details ) ) : ?> 
							<div class="product-details-wrapper">
								<?php echo wp_kses_post( $product_details ); ?> 
							</div>
						<?php endif; ?> 

						<div class="artwork-add-to-cart but-book-add-to-cart">

							<?php if ( $product->is_in_stock() ) : ?>

								<!-- <form class="cart" method="post" enctype="multipart/form-data">
									<button type="submit" name="add-to-cart" value="<?php echo esc_attr( $product->get_id() ); ?>" class="single_add_to_cart_button">Add to cart</button>
								</form> -->

								<!-- FOR LATER   =>  REMOVE THIS FIRST ENQUIRE BUTTON AND UNCOMMENT THE ADD TO CART ONE ABOVE ONCE CHECK OUT IS SET -->
								<div class="artwork-inquire but-book-enquire">
									<a href="<?php echo esc_url( $enquiry_url ); ?>" class="inquire-button">Enquire</a>
								</div>

							<?php else : ?>

								<div class="artwork-inquire but-book-enquire">
									<a href="<?php echo esc_url( $enquiry_url ); ?>" class="inquire-button">Enquire</a>
								</div>

							<?php endif; ?>

						</div>

					</div>

				</div>

				<!-- RIGHT 2 COLUMNS -->
				<div class="artwork-image exhibition-image two-column-span container container--threetwo">

					<?php if ( ! empty( $featured_image ) ) : ?>

						<img
							src="<?php echo esc_url( $featured_image ); ?>"
							alt="<?php echo esc_attr( get_the_title() ); ?>"
						>

					<?php endif; ?>

				</div>

			</section>

			<!-- DESCRIPTION SECTION -->
			<?php if(!empty($about_text ) || ! empty( $read_more_link )) : ?>
				<section class="single-artwork-description single-exhibition-description three-col-grid but-single-book-description">

					<!-- LEFT COLUMN -->
					<div class="three-col-card">
						<div class="card-text"></div>
					</div>

					<!-- RIGHT 2 COLUMNS -->
					
					<div class="description-content artwork-form-content two-column-span author-book-description">

						<?php if ( ! empty( $about_text ) ) : ?>

							<?php echo wp_kses_post( $about_text ); ?>

						<?php endif; ?>

						<?php if ( ! empty( $read_more_link ) ) : ?>

							<div class="book-read-more">
								<a href="<?php echo esc_url( $read_more_link ); ?>"class="inquire-button">Read More</a>
							</div>

						<?php endif; ?>

					</div>

				</section>
			<?php endif; ?>

		</section>

	</div>
<?php endif; ?>

<?php do_action( 'woocommerce_after_single_product' ); ?>
