# pixieDownloader
Chrome extension to download all the images from a Pixieset album into a convenient ZIP.

Though another `Pixieset downloader` extension exists on the [Chrome Web Store](https://chrome.google.com/webstore/detail/pixieset-downloader/bcipfhjikcfgalkfhocogafoebfbenle), it appears to be crippled by CORS and doesn't support custom domains (i.e. ones that aren't under `*.pixieset.com`).

Uses the [JSZip](https://github.com/Stuk/jszip) library.


## Installation
### Manual
1. Download this repo (and unzip if necessary).
2. Enable developer mode in `chrome://extensions`.
3. Click `Load unpacked` and select the `pixiesetDownloader` directory.

### Chrome Web Store
You can now install the extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/pixiedownloader/dlkkpllanjgdehefimepnaiceoflhbpj).


## Usage
Click the icon from the extensions menu on any Pixieset website.


## Limitations
* The downloaded images are watermarked and not original quality. Support your photographers!
* If an album is particularly long, images will be hidden behind JavaScript. This extension will try to scroll to the end of the page, but you should do it manually if you want to be absolutely sure.


## Todo
:white_large_square: &nbsp; Stop autoscrolling once it looks finished

:white_large_square: &nbsp; Possibly switch to a [`GET` API request to obtain image URLs](https://gitlab.com/wolkoman/pixieset-downloader/-/blob/master/index.js) instead of manually scraping