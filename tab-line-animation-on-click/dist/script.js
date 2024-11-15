const tabItems = document.querySelectorAll(".tab-item");
const line = document.querySelector(".line");
tabItems.forEach(el => el.addEventListener("click", handleClickTab));
const item = tabItems[0].getBoundingClientRect();
line.style.width = `${item.width}px`;
	line.style.left = `${item.x}px`;
	line.style.top = `${item.bottom}px`;
let lastPosition = 0;
function handleClickTab(e) {
	const {width, x, bottom} = e.target.getBoundingClientRect();
	line.style.width = `${width}px`;
	line.style.left = `${x}px`;
	line.style.top = `${bottom}px`;
	if (e.pageX < lastPosition) {
		line.classList.add("left");
	} else {
		line.classList.add("right");
	}
	lastPosition = e.pageX;
	
	setTimeout(function() {
		line.classList.remove("left", "right");
	}, 500);

}