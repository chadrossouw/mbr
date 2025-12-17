<?php
header('Content-Type: application/rss+xml; charset=' . get_option('blog_charset'), true);
echo '<?xml version="1.0" encoding="' . get_option('blog_charset') . '"?>';
?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title><?php bloginfo_rss('name'); ?> - News Feed</title>
  <link><?php bloginfo_rss('url'); ?>/news/</link>
  <description>Latest news from <?php bloginfo_rss('name'); ?></description>
  <language><?php bloginfo_rss('language'); ?></language>
  <lastBuildDate><?php echo mysql2date('r', get_lastpostmodified('GMT'), false); ?></lastBuildDate>
  <atom:link href="<?php self_link(); ?>" rel="self" type="application/rss+xml" />

  <?php
  $news_query = new WP_Query(array(
    'post_type' => 'news',
    'posts_per_page' => 10
  ));
  while ($news_query->have_posts()) : $news_query->the_post();
  ?>
    <item>
      <title><?php the_title_rss(); ?></title>
      <link><?php the_permalink_rss(); ?></link>
      <pubDate><?php echo get_post_time('r', true); ?></pubDate>
      <guid isPermaLink="false"><?php the_guid(); ?></guid>
      <description><![CDATA[<?php the_excerpt_rss(); ?>]]></description>
      <content:encoded><![CDATA[<?php the_content_feed('rss2'); ?>]]></content:encoded>
    </item>
  <?php endwhile; wp_reset_postdata(); ?>

</channel>
</rss>
