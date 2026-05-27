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
$featured_image  = get_the_post_thumbnail_url( $product_id, 'large' );

// ACF Fields
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

if ( count( $artist_names ) > 1 ) {

	$last_artist = array_pop( $artist_names );

	$artist_output = strtoupper(
		implode( ', ', $artist_names ) . ' & ' . $last_artist
	);

} else {

	$artist_output = strtoupper( $artist_names[0] ?? '' );
}

$subject = 'Enquiry on ' . get_the_title($product_id);

if ($artist_output) {
	$subject .= ' by ' . $artist_output;
}

$enquiry_url = add_query_arg(
	['subject' => $subject],
	get_permalink(get_page_by_path('enquire-product'))
);
?>

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

					<?php if ( ! empty( $year ) ) : ?>

						<p class="artwork-year artwork-meta-item">
							<?php echo esc_html( $year ); ?>
					</p>

					<?php endif; ?>

					<?php if ( ! empty( $dimensions ) ) : ?>
						<p class="artwork-dimensions artwork-meta-item"><?php echo nl2br( esc_html( $dimensions ) ); ?></p>
					<?php endif; ?>

					<?php if ( ! empty( $work_note ) ) : ?>
						<p class="artwork-note artwork-meta-item"><?php echo esc_html( $work_note ); ?></p>
					<?php endif; ?>

					<div class="artwork-inquire">
						<a href="<?php echo esc_url( $enquiry_url ); ?>" class="inquire-button">
							Enquire
						</a>
					</div>

				</div>

			</div>


			<!-- RIGHT 2 COLUMNS -->
			<div class="artwork-image exhibition-image two-column-span">

				<?php if ( ! empty( $featured_image ) ) : ?>

					<img
						src="<?php echo esc_url( $featured_image ); ?>"
						alt="<?php echo esc_attr( get_the_title() ); ?>"
					>

				<?php endif; ?>

			</div>

		</section>


		<!-- FORM / DESCRIPTION SECTION -->
		<section class="single-artwork-description single-exhibition-description three-col-grid">

			<div class="empty-column three-col-card"></div>

			<div class="description-content artwork-form-content two-column-span">

				<?php the_content(); ?>
				<h3>Form Place Holder</h3>

			</div>

		</section>

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

<?php do_action( 'woocommerce_after_single_product' ); ?>
