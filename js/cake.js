$(document).ready(function() {

	$("ul.nav li").on("click", function() {

		if (!$(this).hasClass("active")) {

			$("ul.nav li[class='active']").removeClass('active');

			$(this).addClass("active");
		}
	});


	$("ul.nav li a").on("click", function() {

		var a_elm = $(this);
		var target_id = a_elm.attr("href");

		var topTo = 0;

		if (target_id != "#") {

			topTo = $(target_id).position().top;
		}
		$("html, body").animate({
			scrollTop : topTo
		}, 600, function() {
			$("ul.nav li[class='active']").removeClass('active');
			a_elm.parent().addClass('active');
		});
		return false;
	});


	var window_last_scroll_top = $(window).scrollTop();
	//宣告一個變數，作為儲存目前捲動的方向
	var scroll_direction = '';
	//宣告一個空陣列變數
	var bg_y = [];
	$("div.fix_bg").each(function(i) {
		bg_y[i] = 50;

	});
	$(window).on("scroll", function() {

		var window_top = $(this).scrollTop();

		var window_height = $(this).height();
		var window_bottom = window_top + window_height;


		var current_top = $(this).scrollTop();

		if (current_top > window_last_scroll_top) {
			scroll_direction = 'down';
		} else {
			scroll_direction = 'up';
		}
		window_last_scroll_top = current_top;
		$("div.fix_bg").each(function(i) {
			var bg_top = $(this).position().top;

			//自己的高度
			var bg_height = $(this).height();
			//自己的範圍
			var bg_bottom = bg_top + bg_height;

			var is_out = (window_top > bg_bottom) || (window_bottom < bg_top);

			if (!is_out) {
				if (scroll_direction == 'down') {
					$(this).css("background-position", "50% " + (bg_y[i] += 1) + "%");
				} else if (scroll_direction == 'up') {
					$(this).css("background-position", "50% " + (bg_y[i] -= 1) + "%");
				}
			}
		});
	});
});
