/*
	Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			offsetY: -15,
			hoverDelay: 0,
			alignment: 'center'
		});

	// Nav.

		// Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Testimonial slider logic
	$(function() {
		var $slides = $('.testimonial-slider .testimonial');
		var index = 0;
		var timer;

		function showSlide(i) {
			$slides.removeClass('active').eq(i).addClass('active');
		}

		function nextSlide() {
			index = (index + 1) % $slides.length;
			showSlide(index);
		}

		function prevSlide() {
			index = (index - 1 + $slides.length) % $slides.length;
			showSlide(index);
		}

		function resetTimer() {
			clearInterval(timer);
			timer = setInterval(nextSlide, 5000);
		}

		// start automatic cycling if there are slides
		if ($slides.length) {
			timer = setInterval(nextSlide, 5000);
		}
	});

	// Smooth scroll for on-page links
	$(function() {
		$('a[href^="#"]').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('href'));
			if (target.length) {
				$('html, body').animate({ scrollTop: target.offset().top }, 600);
			}
		});
	});

})(jQuery);

const form = document.getElementById('contactForm');

 form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the page from redirecting

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('https://api.staticforms.dev/submit', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert('Form submitted successfully!');
            form.reset(); // Clear the form fields
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});