const INTERVAL_BETWEEN_IMAGES = 5000;//interval in miliseconds
const SCREEN_SAVER_IDLE = 10000;//delay in miliseconds
const app = document.querySelector('#app');
const linksToImages = [
	"https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
	"https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
	"https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
	"https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
	"https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
	"https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
	"https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];
const getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomImage = links => links[getRandomIntInclusive(0, 6)];

const getImagesFromSource = link => {
	app.innerHTML = "";
	const imageFromSource = document.createElement('img');
	imageFromSource.setAttribute('class', 'random__images fade');
	imageFromSource.setAttribute('alt', 'Random image');
	imageFromSource.setAttribute('src', `${randomImage(link)}`);
	imageFromSource.setAttribute('id', 'random-image');
	app.appendChild(imageFromSource);
	const element = document.getElementById('random-image');
	let start;

	function step(timestamp) {
		if (start === undefined) {
			start = timestamp;
		}
		const elapsed = timestamp - start;
		const FADE_IN_TIME = INTERVAL_BETWEEN_IMAGES * 0.33;
		const FADE_OUT_TIME = INTERVAL_BETWEEN_IMAGES * 0.66;


		if (elapsed < FADE_IN_TIME) { // Stop the animation after 1 seconds
			element.style.opacity = elapsed * 0.001;
			window.requestAnimationFrame(step);
		}
		if (elapsed > FADE_IN_TIME && elapsed < FADE_OUT_TIME) {
			window.requestAnimationFrame(step);
		}
		if (elapsed > FADE_OUT_TIME) {
			element.style.opacity = (1 - (elapsed - FADE_OUT_TIME) * 0.001);
			window.requestAnimationFrame(step);
		}
	}

	window.requestAnimationFrame(step);
}


const activityEvents = [
	'mousedown', 'mousemove', 'keydown',
	'scroll', 'touchstart'
];

window.onload = () => {
	let showScreensaver;
	let showScreensaverTimeout;
	setTimeout(() => {
		getImagesFromSource(linksToImages);
		showScreensaver = setInterval(() => {
			getImagesFromSource(linksToImages);
		}, INTERVAL_BETWEEN_IMAGES);
	}
		, SCREEN_SAVER_IDLE);

	activityEvents.forEach(eventName => {
		document.addEventListener(eventName, () => {
			app.innerHTML = "";
			clearInterval(showScreensaver);
			clearTimeout(showScreensaverTimeout);
			showScreensaverTimeout = setTimeout(() => {
				getImagesFromSource(linksToImages);
				showScreensaver = setInterval(() => {
					getImagesFromSource(linksToImages);
				}, INTERVAL_BETWEEN_IMAGES)
			}, SCREEN_SAVER_IDLE)
		});
	});
}





