function changeLanguage(e) {
	document.querySelector("#language-label").innerText = e.target.dataset.value;
}

const heroSection = document.querySelector(".hero");
const imageSpread = document.querySelector(".image-spread-out");
const carouselWrapper = document.querySelector(".carousel-wrapper");
const pagination = document.querySelector(".pagination");

const widthCard = carouselWrapper.children[1].getBoundingClientRect().width + 10 * 2;

[...carouselWrapper.children].forEach((card) => {
	card.style.backgroundImage = `url(${card.dataset.src})`;
});

function clearActive() {
	[...carouselWrapper.children].forEach((card) => {
		card.classList.remove("active");
	});
	[...pagination.children].forEach((page) => {
		page.classList.remove("active");
	});
}

carouselWrapper.addEventListener("click", (e) => {
	const transitionTime = 500;
	if (e.target && e.target.classList.contains("image")) {
		const children = [...carouselWrapper.children];

		const index = children.indexOf(e.target);
		if (index === 0) {
			return;
		}
		const pageNumber = e.target.dataset.page;
		// reset active card and pagination
		clearActive();
		carouselWrapper.children[index].classList.add("active");
		pagination.children[pageNumber].classList.add("active");
		// start transition
		carouselWrapper.classList.add("moving");
		carouselWrapper.style.transform = `translateX(-${widthCard * index}px)`;
		// start spread effect
		imageSpread.classList.add("spread");
		imageSpread.style.backgroundImage = `url(${e.target.dataset.src})`;

		setTimeout(() => {
			// update new bg image for hero section
			heroSection.style.backgroundImage = `url(${e.target.dataset.src})`;
			// reset spread effect, prepare for the next click
			imageSpread.classList.remove("spread");
			carouselWrapper.classList.remove("moving");
			// change position of previous card after transition done
			for (let i = 0; i < index; i++) {
				carouselWrapper.appendChild(carouselWrapper.firstElementChild);
			}
			// reset parent position
			carouselWrapper.style.transform = `translateX(0px)`;
		}, transitionTime);
	}
});

const sliderParter = document.querySelector(".slider");
const clone = [...sliderParter.children];

clone.forEach((node) => {
	const clonedNode = node.cloneNode(true);
	sliderParter.appendChild(clonedNode);
});

// obser countup in about us section
const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log("Phần tử đang hiển thị trong viewport");
				startCount(entry.target, +entry.target.dataset.value);
				observer.unobserve(entry.target);
			} else {
				console.log("Phần tử ra khỏi viewport");
			}
		});
	},
	{
		root: null,
		rootMargin: "0px 0px -5%", //cách đáy viewport 5% mới gọi callback
		threshold: 1,
	}
);
function startCount(element, finalValue) {
	let currentValue = 0; // Bắt đầu từ 0
	const duration = 3000; // Thời gian tổng cộng (3 giây)
	const frameRate = 60; // Số khung hình mỗi giây (FPS)
	const totalFrames = Math.round((duration / 1000) * frameRate); // Tổng số bước
	const increment = finalValue / totalFrames; // Giá trị tăng mỗi bước

	function updateCount(frame) {
		if (frame <= totalFrames) {
			// Tính giá trị hiện tại theo easing để chậm dần
			const easedValue = easeOutQuad(frame / totalFrames) * finalValue;
			element.innerText = Math.round(easedValue);

			// Gọi lại sau mỗi khung hình
			setTimeout(() => updateCount(frame + 1), 1000 / frameRate);
		} else {
			// Đảm bảo giá trị cuối cùng chính xác
			element.innerText = finalValue;
		}
	}

	// Hàm easing để làm mượt và chậm dần
	function easeOutQuad(t) {
		return t * (2 - t);
	}

	updateCount(0); // Bắt đầu từ frame 0
}

const countUps = document.querySelectorAll(".count-up");
countUps.forEach((count) => {
	observer.observe(count);
});

const imageSupportReason = document.querySelector(".image-support");
function handleSwitchImgSupport() {
	imageSupportReason.appendChild(imageSupportReason.firstElementChild);
}

const listImage = [
	{
		label: "Cung cấp giải pháp về hậu cần",
		srcImg: "./assets/images/service_01.png",
	},
	{
		label: "Giải pháp hàng hóa quốc tế",
		srcImg: "./assets/images/hero_04.jpg",
	},
	{
		label: "Outsourcing hàng hóa",
		srcImg: "./assets/images/hero_05.png",
	},
];
let currentImg = 0;
const service = document.querySelector(".service");
const imgService = service.querySelector("img");
const labelService = service.querySelector(".label-service");
const btnNext = document.querySelector(".next");

btnNext.addEventListener("click", () => {
	currentImg = currentImg >= listImage.length - 1 ? 0 : currentImg + 1;
	service.style.backgroundImage = `url(${listImage[currentImg].srcImg})`;
	labelService.innerText = listImage[currentImg].label;
	imgService.src = listImage[currentImg].srcImg;
});

// scroll event
let lastScrollTop = 0; // Lưu vị trí cuộn trước đó
const mobileHeader = document.querySelector(".mobile-header");
window.addEventListener("scroll", function () {
	const currentScrollTop = window.scrollY;

	if (currentScrollTop > lastScrollTop) {
		// cuộn lên
		mobileHeader.style.translate = "0 -100%";
	} else if (currentScrollTop - lastScrollTop <= -10) {
		// cuộn xuống
		mobileHeader.style.translate = "0 0";
	}

	// Cập nhật vị trí cuộn trước đó
	lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});
