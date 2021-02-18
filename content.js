// run receiver: extension is triggered by a message from background.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.run == 'true') init();
	}
);

let albumZip;

function init() {
	const compatCheck = (document.getElementById('meta_og_site_name').content.toUpperCase() == 'PIXIESET');

	if (!compatCheck) {
		alert("This doesn't look like a Pixieset website.");
	} else {
		// scroll to the bottom to load all images in the current album
		let lastScrollHeight = 0;
		function autoScroll() {
			let scrollHeight = document.documentElement.scrollHeight;
			if (scrollHeight != lastScrollHeight) {
				lastScrollHeight = scrollHeight;
				document.documentElement.scrollTop = scrollHeight;
			}
		}
		window.setInterval(autoScroll, 50);

		// initialize JSZip object
		albumZip = new JSZip();

		// give it some time to finish completely scrolling/loading first
		setTimeout(() => { zip() }, 2000);
	}
}


function zip() {
	// locate all relevant <img> elements
	const container = document.getElementById('gamma-container');
	const imgElements = container.getElementsByTagName('img');

	const imgUrl = /(.*images.pixieset.*-)(.*)(.jpg)/;

	// JSON data structure to store URL + filename + base64 encoding of each image
	let imgObjects = [];

	for (let i = 0; i < imgElements.length; i++) {
		// obtain the largest image size available to us ('xxlarge')
		let newUrl = imgElements[i].currentSrc.replace(imgUrl, '$1xxlarge$3');
		// obtain the image's original filename
		let origName = imgElements[i].alt;
		imgObjects.push({ url: newUrl, name: origName, base64: '' });
	}

	// set default ZIP filename — combination of window title and current album
	let albumName = window.location.pathname.split('/');
	albumName = albumName.pop() || albumName.pop();
	const zipName = document.title + ' - ' + albumName;

	chrome.runtime.sendMessage(
		{ array: imgObjects },
		array => {
			// add all images to ZIP
			array.forEach(obj => albumZip.file(
				obj.name,
				obj.base64,
				{ base64: true }
			));
			// serve ZIP to user
			download(albumZip, zipName, false);
		}
	);
}


function download(zip, name, input) {
	zip.generateAsync({ type:'blob' }).then(blob => {
		if (input) {
			name = prompt('What should the name of the ZIP file be?', name);
			if (name === null) {
				console.log('download cancelled');
				return;
			};
		}
		// https://stackoverflow.com/a/9834261
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = url;
	    a.download = name + '.zip';
	    document.body.appendChild(a);
	    a.click();
	    window.URL.revokeObjectURL(url);
	});
}