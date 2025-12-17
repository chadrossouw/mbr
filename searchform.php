<?php
/**
 * The searchform.php template.
 *
 * Used any time that get_search_form() is called.
 *
 * @link https://developer.wordpress.org/reference/functions/wp_unique_id/
 * @link https://developer.wordpress.org/reference/functions/get_search_form/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

/*
 * Generate a unique ID for each form and a string containing an aria-label
 * if one was passed to get_search_form() in the args array.
 */
if(isset($_GET['s'])){
	$search_query = $_GET['s'];
}
else{
	$search_query = '';
}
?>
<form id="search_form" role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<?php if($search_query): ?>
		<p><label class="semibold" for="general_search">Search results for</label></p>
	<?php else: ?>
		<label class="screen-reader-text" for="general_search">Search</label>
	<?php endif; ?>
	<div class="search_group flex">
		<input type="search" id="search-form-input" class="search-field" placeholder="Type search here" value="<?php echo $search_query; ?>" name="s"/>
		<input type="submit" value="Search" class="bg_pure_black white">
	</div>
</form>


