<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v22.0"></script>
<?php $id = get_the_ID(); ?>
<header class="page-header margins">
    <h1 class="page-title center">Thank you <?php echo isset($_GET['dname'])?$_GET['dname']:'';?> </h1>
    <?php $fb_link = get_site_url().'/support-us/donate/'; ?>
    <div class="fb-share-button" data-href="<?php echo $fb_link; ?>" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode($fb_link); ?>&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share your donation to Facebook</a></div>
</header>
<div class="margins body center">
    <?php echo get_breadcrumb(get_the_ID()); ?>
</div>