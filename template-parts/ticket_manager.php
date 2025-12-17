<div class="event_ticket_manager margins grid grid_content gap_2">
    <?php 
    echo '<div id="validators" class="page-section outer shade1"><div class="inner"><h2>Ticket Validation</h2>';
    echo $_event->get_ticket_validator('edit_others_posts');
    wp_add_inline_script( 'tickets-scripts', 'const EVENTSNONCE = ' . json_encode( array(
        'nonce' => wp_create_nonce( 'wp_rest' )
    ) ), 'before' );
    echo '<div id="hdk_attendee_report" class="sbbox ticket_table"><h2 class="shade3">Redeem Tickets</h2><div class="sbbin">';
    echo $_event->get_attendee_box(get_permalink());
    echo '</div></div>';
    echo '<div class="sbbox add_ticket"><h2 class="shade3">Manually Add A Ticket</h2><div class="sbbin">';
    echo $_event->get_add_ticket_box();
    echo '</div></div>'; 
    echo '</div></div>';
    ?>
</div>