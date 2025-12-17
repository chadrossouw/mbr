<?php

function date_to_maybe_range($open, $close, $day = "l, j", $day_month = "l, j F", $day_month_year = "l, j F Y")
{


	if (!is_int($open)) {
		$open = strtotime($open);
	}
	if (!is_int($close)) {
		$close = strtotime($close);
	}

	if (!$close || $open == $close) {
		$event_startYear = date("Y", $open);
		if ($event_startYear == date('Y')) {
			$day_month_year = "l, j F";
		}
		return date($day_month_year, $open);
	}


	$event_startMonth = date("m", $open);
	$event_endMonth = date("m", $close);
	$event_startYear = date("Y", $open);
	$event_endYear = date("Y", $close);
	/* if ($event_startYear == $event_endYear && $event_startYear == date('Y')) {
		$day_month_year = "j F";
	} */
	if ($event_startMonth == $event_endMonth && $event_startYear == $event_endYear) {
		return  date($day, $open) . "<span class ='date_span'>-</span>" . date($day_month_year, $close);
	} elseif (($event_startYear == $event_endYear)) {
		return date($day_month, $open) . "<span class ='date_span'>-</span>" . date($day_month_year, $close);
	} else {
		return date($day_month_year, $open) . "<span class ='date_span'>-</span>" . date($day_month_year, $close);
	}
}

function process_time_to_gia($time)
{
	$time = strtotime($time);
	$time_hours = date('g', $time);
	$time_minutes = date('i', $time);
	$time_meridiem = date('a', $time);
	if ($time_hours == 12 && $time_meridiem == 'pm') {
		$time_meridiem = ' noon';
	}
	if ($time_hours == 12 && $time_meridiem == 'am') {
		$time_meridiem = ' midnight';
	}
	return $time_hours . ':' . $time_minutes . $time_meridiem;
}



function get_event_dates($open, $close, $multi_day)
{
	$open_date = null;

	if ($open) {
		$open_date_obj = DateTime::createFromFormat('d/m/Y', $open);

		if ($open_date_obj !== false) {
			$open_date = $open_date_obj->format("j F Y");
		}
	}

	$close_date_obj = DateTime::createFromFormat('d/m/Y', $close);
	$close_date = $close_date_obj->format("j F Y");

	if ($multi_day == true) {
		if ($open_date === null) {
			echo 'Until ' . $close_date;
		} else {
			echo $open_date . ' - ' . $close_date;
		}
	} else {
		echo $open_date ?? $close_date;
	}
}

function get_open_today()
{
	$today = date('Ymd');
	$day = date('l');
	$days = get_field('days', 'option');
	$exceptions = get_field('exception', 'option');
	if ($exceptions) {
		$exceptions = array_map(function ($date) {
			return $date['date'];
		}, $exceptions);
	} else {
		$exceptions = [];
	}

	$overwrite_message = get_field('overwrite_message', 'option');
	if ($overwrite_message) {
		return $overwrite_message;
	} else {
		if (in_array($today, $exceptions)) {
			return __('Closed', 'soul');
		}
		if ($days) {
			$filtered_day = array_filter($days, function ($date) use ($day) {
				return $date['day'] == $day;
			});
			if ($filtered_day) {
				$filtered_day = array_values($filtered_day);
				$filtered_day = $filtered_day[0];
				$time_open = $filtered_day['time_open'];
				$time_closed = $filtered_day['time_close'];
				return 'Open today ' . date('G:i', strtotime($time_open)) . ' - ' . date('G:i', strtotime($time_closed));
			}
		}
		return __('Closed', 'soul');
	}
}

function get_times()
{
	$today = date('l j F');
	echo '<strong>' . $today . '</strong><br>' . get_open_today() . '';
}
function get_times_footer()
{
	$today = date('l j F');
	echo $today . '<br>' . get_open_today() . '';
}

function get_event_date_string($event)
{
	$free_text = get_field('date_free_text', $event);
	if ($free_text) {
		return $free_text;
	}
	$start_date = get_field('start_date', $event);
	$end_date = get_field('end_date', $event);
	return date_to_maybe_range($start_date, $end_date);
}

function get_event_time_string($event)
{
	$free_text = get_field('time_free_text', $event);
	if ($free_text) {
		return $free_text;
	}
	$start = [];
	$end = [];
	$dates = get_field('dates', $event);
	if ($dates) {
		foreach ($dates as $date) {
			$start[] = date('H:i', strtotime($date['start']));
			$end[] = date('H:i', strtotime($date['end']));
		}
	} else {
		return '';
	}
	$start = array_unique($start);
	$end = array_unique($end);
	if (count($start) > 1) {
		return 'Various times';
	} else {
		if ($start) {
			$start = process_time_to_gia($start[0]);
		} else {
			$start = '';
		}
		if ($end) {
			$end = process_time_to_gia($end[0]);
		} else {
			$end = '';
		}
	}
	if ($start && $end) {
		return $start . ' - ' . $end;
	} elseif ($start) {
		return $start;
	} else {
		return '';
	}
}
