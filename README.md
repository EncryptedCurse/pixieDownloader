# pixieDownloader
Chrome extension to download all the images from a Pixieset album into a convenient ZIP. Though the `Pixieset downloader` extension exists on the [Chrome Web Store](https://chrome.google.com/webstore/detail/pixieset-downloader/bcipfhjikcfgalkfhocogafoebfbenle), it appears to be crippled by CORS (as was my original Greasemonkey script) and doesn't support custom domains (i.e. ones that aren't under `*.pixieset.com`).

Uses the [JSZip](https://github.com/Stuk/jszip) library.


## Installation
1. Download this repo (and unzip if necessary)
2. Enable developer mode in `chrome://extensions`
3. Click `Load unpacked` and select the `pixiesetDownloader` directory


## Usage
Just click the icon from the extensions menu on any Pixieset website.


## Limitations
* The downloaded images are watermarked and not original quality. Support your photographers!
* If an album is particularly long, images will be hidden behind JavaScript. This extension will try to scroll to the end of the page, but you should do it manually if you want to be absolutely sure.


## Todo
:white_large_square: &nbsp;&nbsp; Stop autoscrolling once it looks finished

:white_large_square: &nbsp;&nbsp; Possibly switch to a [`GET` API request to obtain image URLs](https://gitlab.com/wolkoman/pixieset-downloader/-/blob/master/index.js) instead of manually scraping

:white_large_square: &nbsp;&nbsp; Submit to Chrome Web Store

:white_check_mark:   &nbsp;&nbsp; Add visual indicator of download progress

:white_check_mark:   &nbsp;&nbsp; Remove `FileSaver.js` dependency

:white_check_mark:   &nbsp;&nbsp; Prevent starting duplicate downloads

:white_check_mark:   &nbsp;&nbsp; Update to Manifest V3

:white_check_mark:   &nbsp;&nbsp; Improve icon