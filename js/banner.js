$(function () {

    $('.canvas').each(function() { 
        // 퍼센트를 표시할 요소 선택
        const spanpercent = $(this).siblings('.percent');
        
        // 원의 테두리 너비(px) 및 애니메이션 지속 시간(ms) 정의 
        const border = 10;
        const duration = 700; 
    
        // 캔버스 및 2D 컨텍스트 설정
        const canvas = $(this)[0]; 
        const ctx = canvas.getContext('2d');
    
        // 애니메이션에 필요한 변수 및 데이터 속성에서 목표 퍼센트 가져오기
        const targetPercent = $(this).data('percent');
        const posX = canvas.width / 2;
        const posY = canvas.height / 2;
        const onePercent = 360 / 100;
        const result = onePercent * targetPercent;
        const radius = (canvas.width / 2) - (border / 2);
        let percent = 0;
        ctx.lineCap = (targetPercent <= 0) ? 'butt' : 'round';
    
        // 원을 그리고 퍼센트 업데이트하는 함수
        function arcMove() {
            let degrees = 0;
            let startTime = null;
    
            // 애니메이션을 처리하는 함수
            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                let progress = (timestamp - startTime) / duration;
                progress = Math.min(1, progress);
                degrees = progress * result;
    
                // 캔버스 초기화 및 퍼센트 업데이트
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                percent = Math.floor(degrees / onePercent);
                spanpercent.text(percent);
    
                // 배경 선 그리기
                ctx.beginPath();
                ctx.arc(posX, posY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = '#b1b1b1';
                ctx.lineWidth = border;
                ctx.stroke();
    
                // 애니메이션 되는 선 그리기
                ctx.beginPath();
                ctx.strokeStyle = '#2D9BB2';
                ctx.lineWidth = border;
                ctx.arc(posX, posY, radius, Math.PI * -0.5, (Math.PI / 180) * degrees - (Math.PI / 2));
                ctx.stroke();
    
                // 애니메이션이 완료되지 않았다면 계속해서 프레임 요청
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            // 첫 프레임 요청
            requestAnimationFrame(animate);
        }
    
        // 애니메이션 함수 호출
        arcMove();
    });
    
    
    //slider banner
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
                $('.slide-list div:visible a')[1].click();
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