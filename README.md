# lzwFlossRedux.js

**Author**: Austin K. Smith

**Website**: [Github](https://github.com/austinksmith/lzwFlossRedux.js)

**Description**: 100% Vanilla Javascript Multithreaded LZW Compression Library

**License**: Artistic License 2.0

# About

Lempel–Ziv–Welch (LZW) is a universal lossless data compression algorithm created by Abraham Lempel, Jacob Ziv, and Terry Welch. It was published by Welch in 1984 as an improved implementation of the LZ78 algorithm published by Lempel and Ziv in 1978.

lzwFlossRedux is a multithreaded javascript implementation using the Hamsters.js multithreading library, rewritten from the original lzwFloss package I wrote to be cleaner, in compliance with the latest Hamsters.js version and make use of promises.

# Benefits

  * Compress data before sending through xhr/json requests on the fly using WebWorker threads
  * Uncompress data recieved on the fly using WebWorker threads
  * Reduce bandwidth use and costs without interupting user experience
  * Compress data before saving to local storage & session storage increasing how much you can store
  * Non-blocking, all compression / decompression is done using a Hamsters.js thread
  * Written specifically for use with Hamsters.js allowing you to compress and decompress many items concurrently
  * Async compression & decompression using promises
  * Node.js & Web support allowing you to compress / decompress E2E (end to end)

# Examples

You can find a view examples of the library in action using the links below.



# How to use lzwFlossRedux.js

  * Add [Hamsters.js](https://www.hamsters.io) to your project and ensure it's initialized, lzwFlossRedux relies on Hamsters.js

  * Add lzwFlossRedux to your project using the instructions below

  ### HTML

  * Download a copy of the library and add it to your webserver public directory
  * Add script tag to your html page

  ```html
	<!-- HTML4 and (x)HTML -->
	<script type="text/javascript" src="path/to/lzwFlossRedux.web.min.js">

	<!-- HTML5 -->
	<script src="path/to/lzwFlossRedux.web.min.js"></script>
  ```

  ### Node

  * Use npm install to add the project to your dependencies `npm install --save lzwflossredux.js`
  * Require the npm module in your app.js file

  ```js
 	  const lzwFlossRedux = require('lzwFlossRedux.js');
  ```

  * Once you've installed Hamsters.js & LzwFlossRedux.js you should now be able to run the following methods.

  ### Encode a string

  ```js
  	lzwFlossRedux.encode("This is my string, there are many like it but this one is mine.").then(function(encodedString) {
  		// encodedString will now look like "This Ă my string, there aĕĆanĈlikĖit buģĒąonġămče."
  		// Do something with your encoded string
  	});
  ```
  ### Decode an already encoded string

  ```js
  	lzwFlossRedux.decode("This Ă my string, there aĕĆanĈlikĖit buģĒąonġămče.").then(function(decodedString) {
  		// decodedString will now look like "This is my string, there are many like it but this one is mine."
  		// Do something with your decoded string
  	});
  ```

# Support lzwFlossRedux.js

Please consider becoming a subscriber so I can continue to develop innovative open source projects. [ASMITHDEV SUBSCRIBESTAR](https://www.subscribestar.com/asmithdev) Thank you, your support makes projects like this possible.
