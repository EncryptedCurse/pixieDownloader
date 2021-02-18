# pixieDownloader
Chrome extension to download all the images from a Pixieset album into a convenient ZIP. Though the `Pixieset downloader` extension exists on the [Chrome Web Store](https://chrome.google.com/webstore/detail/pixieset-downloader/bcipfhjikcfgalkfhocogafoebfbenle), it appears to be crippled by CORS (as was my original Greasemonkey script) and doesn't support custom domains (i.e. ones that aren't `*.pixieset.com`).

Uses the [JSZip](https://github.com/Stuk/jszip) and [FileSaver.js](https://github.com/eligrey/FileSaver.js/) libraries.


## Installation
1. Download this repo (and unzip if necessary)
2. Enable developer mode in `chrome://extensions`
3. Click `Load unpacked` and select the `pixiesetDownloader` directory


## Usage
Just click the icon from the extensions menu on any Pixieset website.


## Limitations
* The downloaded images are watermarked and not original quality—support your photographers
* If an album is particularly long, images will be hidden behind JavaScript; this extension will try to scroll to the end of the page, but you should do it manually if you want to be absolutely sure
* JPEG metadata is lost due to the way the `base64`-encoded strings are generated (Chrome's [`sendMessage/onMessage`](https://developer.chrome.com/docs/extensions/mv2/messaging/) can only pass strings)


## Todo
* Add visual indicator of download progress
* Remove `FileSaver.js` dependency
* Possibly switch to a [`GET` API request to obtain image URLs](https://gitlab.com/wolkoman/pixieset-downloader/-/blob/master/index.js) instead of manually scraping
* Update to Manifest V3
* Improve icon and add more sizes
* Submit to Chrome Web Store