// run sender: extension executes its toolbar icon is clicked — sends a message to content.js
chrome.browserAction.onClicked.addListener(
	tab => {
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { run: 'true' }, {});
		});
	}
);


async function addB64(array) {
	let img = new Image();
	img.crossOrigin = 'anonymous';
	let canvas = document.createElement('canvas');
	let context = canvas.getContext('2d');

	// encode image at the given URL into base64
	function encode(url) {
		return new Promise(resolve => {
			img.onload = () => {
				canvas.height = img.height;
				canvas.width = img.width;
				context.drawImage(img, 0, 0);
				resolve(canvas.toDataURL('image/jpeg'));
			}
			img.src = url;
		});
	}

	let i = 0;
	// populate base64 fields in the JSON
	for (let obj of array) {
		console.log(`(${i++}/${array.length}) downloading ${obj.url} as ${obj.name}`);

		let encoding = await encode(obj.url);
		// strip type from base64 string for JSZip
		obj.base64 = encoding.split(',')[1];
	}

	// cleanup
	canvas = null;

	return array;
}


// respond to message from zip() in content.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		addB64(request.array).then(updatedArray => sendResponse(updatedArray));
		return true;
	}
);