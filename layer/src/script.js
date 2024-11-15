

$(function(){

	// 해더 레이어 팝업 열기/닫기
	$(".ul .after").click(function(){
		var idx = $(this).index();
		console.log(idx);
		var submenu = $(".headerLayer");
		submenu.eq(idx).toggleClass('layerOpen').siblings('.headerLayer').removeClass('layerOpen');
	});

	$(".layerCloseBtn").click(function(){
		$(".headerLayer").removeClass('layerOpen');
	});
});
