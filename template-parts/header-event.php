<?php $id = get_the_ID();

$background_color = get_field('background_colour', $id)?:'bg_teal';
$featured_description = get_field('header_line', $id);
$sold_out = get_field('ticket_sold_out', $id);
$iframe = get_field('ticket_iframe_code', $id);
$ticket_link = get_field('ticketing_link', $id);
$event = $id;
include get_template_directory() . '/template-parts/partials/event_variables.php';
?>
<header class="page-header header-simple grid grid_content padding <?php echo $background_color ?>">
    <article class="event_content">
        <p class="uc small"><?php echo __('Event', 'soul') ?></p>
        <h1 class="bold"><?php echo $title ?></h1>
        <h3><?php echo $date_str ?> | <?php echo $time_str; ?></h3>
        <p><?php echo $featured_description ?></p>
    </article>
    <aside>
        <?php if (!$sold_out):
            if($ticket_link): ?>
                <a href="<?php echo $ticket_link['url'] ?>" class="button" target="_blank"><?php echo $ticket_link['title'] ? $ticket_link['title'] : 'Book tickets'  ?></a>
            <?php elseif ($iframe): ?>
                <a href="#ticketing" class="button">Book tickets</a>
            <?php endif; ?>
        <?php endif; ?>
    </aside>
</header>
<div class="margins body center">
    <?php echo get_breadcrumb($id); ?>
</div>