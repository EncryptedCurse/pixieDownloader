// extension is triggered by a message from background.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.run == 'true') init();
	}
);

let zipFile;

function init() {
	let compatCheck = (document.getElementById('meta_og_site_name').content.toUpperCase() == 'PIXIESET');

	if (!compatCheck) {
		alert("This doesn't look like a PixieSet website.");
	} else {
		// scroll to the bottom to load all images in the current album
		var lastScrollHeight = 0;
		function autoScroll() {
			var scrollHeight = document.documentElement.scrollHeight;
			if (scrollHeight != lastScrollHeight) {
				lastScrollHeight = scrollHeight;
				document.documentElement.scrollTop = scrollHeight;
			}
		}
		window.setInterval(autoScroll, 50);

		// continue to constructing the ZIP
		zipFile = new JSZip();
		// give it some time to finish completely loading first
		setTimeout(() => { zip() }, 2000);
	}
}


function zip() {
	// locate all relevant <img> elements
	let container = document.getElementById('gamma-container');
	let imgElements = container.getElementsByTagName('img');

	let imgUrl = /(.*images.pixieset.*-)(.*)(.jpg)/;

	// JSON data structure to store URL + filename + base64 encoding of each image
	let imgObjects = [];

	for (let i = 0; i < imgElements.length; i++) {
		// obtain the largest image size available to us ('xxlarge')
		let newUrl = imgElements[i].currentSrc.replace(imgUrl, '$1xxlarge$3');
		// obtain the image's original filename
		let origName = imgElements[i].alt;
		imgObjects.push({ url: newUrl, name: origName });
	}

	let albumName = window.location.pathname.split('/');
	albumName = albumName.pop() || albumName.pop();
	let zipName = document.title + ' - ' + albumName;

	chrome.runtime.sendMessage(
		{ array: imgObjects },
		array => {
			// add all images to  ZIP
			array.forEach((obj) => zipFile.file(
				obj.name,
				obj.base64,
				{ base64: true }
			));
			// download ZIP
			save(zipFile, zipName);
		}
	);
}


// download ZIP using FileSaver.js library
function save(zip, name) {
	zip.generateAsync({ type:'blob' }).then((blob) => {
		saveAs(blob, name + '.zip');
	});
}