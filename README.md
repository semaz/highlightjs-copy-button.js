# highlightjs-copy-button.js [![version](http://img.shields.io/badge/release-v1.0.5-brightgreen.svg?style=flat)](https://github.com/DevCreel/highlightjs-copy-button.js/archive/master.zip)

Highlight.js copy button plugin.

[DEMO](https://devcreel.github.io/highlightjs-copy-button.js/)

## Usage

Download plugin and include file after highlight.js:
```html
<script src="path/to/highlight.min.js"></script>

<script src="path/to/highlightjs-copy-button.min.js"></script>
```

Initialize plugin after highlight.js:
```js
hljs.initHighlightingOnLoad();

hljs.initCopyButtonOnLoad();
```

Here’s an equivalent way to calling `initCopyButtonOnLoad` using jQuery:
```js
$(document).ready(function() {
	$('code.hljs').each(function(i, block) {
		hljs.addCopyButton(block);
	});
});
```

If your needs cool style, add styles by taste:
```css
/* for block of button */
td.hljs-button {
	/* your custom style here */
}
```

---
&copy; 2017 Sergey Mazurak | MIT License