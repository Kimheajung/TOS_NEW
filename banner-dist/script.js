$(function () {

			//自动banner轮播
			(() => {
				const slider = $('.banner-slider'),
					banner = $('.slide-list', slider),
					dot = $('.dot-list', slider),
					second = 3,
					len = banner.children('div').length,
					dirBtn = $('.btn-direction .btn-dir'),
					cardsStore = $('.card-store');
				if (cardsStore.length > 0) {
					dot.hide();
				}
				if (len <= 1) {
					dirBtn.hide();
					return;
				}
				let timer = null,
					end = true,
					start = 0;
				banner
					.find('div:first')
					.show()
					.siblings()
					.hide();
				const animate = (i, callback, dir = 'r') => {
					const cards = $('.company-cards');

					if (end) {
						let lastIndex = parseInt(
							cards
								.find('.card')
								.last()
								.attr('data-index')
						);
						let firstIndex = parseInt(
							cards
								.find('.card')
								.first()
								.attr('data-index')
						);
						end = false;
						dot
							.find('a')
							.eq(i)
							.addClass('active')
							.siblings()
							.removeClass('active');
						banner
							.find('div')
							.eq(i)
							.siblings()
							.fadeOut(600)
							.end()
							.fadeIn(1200, function () {
								end = true;
								if (callback) callback.call(this);
							});

						
					}
				};
				const autoPlay = () => {
					if (end) {
						start++;
						if (start >= len) start = 0;
						animate(start);
						clearTimeout(timer);
						timer = setTimeout(autoPlay, second * 1000);
					}
				};
				const doTimer = () => {
					timer = setTimeout(autoPlay, second * 1000);
				};
				// change preview-btn background-image
				const getTransInfo = function (target) {
					const index = $('.slide-list div:visible').index();
					let jumpIndex = 0;
					let bgUrl = '';
					let dir = '';
					if (target.hasClass('btn-prev')) {
						dir = 'l';
						if (index !== 0) {
							jumpIndex = index - 1;
							bgUrl = $($('.slide-list div').get(jumpIndex)).css('backgroundColor');
						} else {
							jumpIndex = len - 1;
							bgUrl = $($('.slide-list div').get(jumpIndex)).css('backgroundColor');
						}
					} else if (target.hasClass('btn-next')) {
						dir = 'r';
						if (index !== len - 1) {
							jumpIndex = index + 1;
							bgUrl = $($('.slide-list div').get(jumpIndex)).css('backgroundColor');
						} else {
							jumpIndex = 0;
							bgUrl = $($('.slide-list div').get(jumpIndex)).css('backgroundColor');
						}
					}
					return {
						jumpIndex,
						bgUrl,
						dir
					};
				};
				//add dotlist
				let html = '';
				for (let i = 0; i < len; i++) {
					//map join
					html += '<a href="javascript:;"';
					if (i === 0) {
						// todo
						html += ' class="active"';
					}
					html += '></a>';
				}
				dot
					.html(html)
					.find('a')
					.click(function () {
						let index = $(this).index();
						start = index;
						clearTimeout(timer);
						animate(index, doTimer);
					});
				doTimer();
				//Hide or show prev-btn and next-btn
				const $btnGroup = $('.btn-direction');
				$btnGroup.click(function (e) {
					if ($(e.target).hasClass('btn-dir')) {
						const target = $(e.target);
						const { jumpIndex, dir } = getTransInfo(target);
						start = jumpIndex;
						animate(
							jumpIndex,
							function () {
								const { bgUrl } = getTransInfo(target);
								target.css('backgroundColor', bgUrl);
							},
							dir
						);
					} else {
						$('.slide-list div:visible')[0].click();
						$('.slide-list div:visible a')[0].click();
					}
				});
				slider.hover(
					function () {
						dirBtn.fadeIn(300);
						if (timer) {
							clearTimeout(timer);
							timer = null;
						}
						// else {
						// 	timer = setTimeout(autoPlay, second * 1000);
						// }
					},
					function () {
						dirBtn.fadeOut(300);
						// if (timer) {
						// 	clearTimeout(timer);
						// 	timer = null;
						// }
						//  else {
						timer = setTimeout(autoPlay, second * 1000);
						// }
					}
				);
				// Hide or show preview
				dirBtn.hover(
					function () {
						const target = $(this);
						const { bgUrl } = getTransInfo(target);
						target.css('backgroundColor', bgUrl);
						target.addClass('active');
					},
					function () {
						const target = $(this);
						const { bgUrl } = getTransInfo(target);
						target.css('backgroundColor', bgUrl);
						target.removeClass('active');
					}
				);
			})();

		});