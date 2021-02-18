// run sender: extension executes its toolbar icon is clicked — sends a message to content.js
chrome.action.onClicked.addListener(
	tab => {
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, { run: 'true' }, {});
		});
	}
);


async function addB64(array) {
	// https://gist.github.com/HaNdTriX/bdffd11761701fbeba27f23e9a69515f
	const toDataURL = url => fetch(url)
		.then(response => response.blob())
		.then(blob => new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject();
			reader.readAsDataURL(blob);
		}));

	let i = 1;
	// populate base64 fields in the JSON
	for (let obj of array) {
		console.log(`(${i++}/${array.length}) downloading ${obj.url} as ${obj.name}`);
		await toDataURL(obj.url).then(encoding => {
			obj.base64 = encoding.split(',')[1];
		});
	}

	return array;
}


// respond to message from zip() in content.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		addB64(request.array).then(updatedArray => sendResponse(updatedArray));
		return true;
	}
);