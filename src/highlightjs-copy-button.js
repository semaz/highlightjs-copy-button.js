(function (w) {
    'use strict';

    var BLOCK_NAME = 'hljs-button',
        BUTTON_CLASS = 'hljs-copy-button',
        LN_CLASS = 'hljs-ln-code',
        TEXT_COPY = 'Copy',
        TEXT_ERROR = 'Error',
        TEXT_COPIED = 'Copied';

    // https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript
    String.prototype.format = String.prototype.f = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function(m, n){
            return args[n] ? args[n] : m;
        });
    };

    if (typeof w.hljs === 'undefined') {
        console.error('highlight.js not detected!');
    } else {
        w.hljs.initCopyButtonOnLoad = onLoad;
        w.hljs.addCopyButton = addCopyButton;
        w.hljs.copyCode = copyCode;

        addStyles();
    }

    function copyCode(event) {
        var target = event.target || event.srcElement;
        if (target.className === BUTTON_CLASS) {
            event.preventDefault();

            var el = document.getElementById('post-id-target');
            if (!el) {
                el = document.createElement("textarea");
                el.style.position = "absolute";
                el.style.left = "-9999px";
                el.style.top = "0";
                el.id = 'hljs-copy-el';
                document.body.appendChild(el);
            }
            el.textContent = getTextToCopy(event.currentTarget);
            el.select();

            try {
                var successful = document.execCommand('copy');
                target.innerText = successful ? TEXT_COPIED : TEXT_ERROR;
                if (successful) {
                    setTimeout(function () {
                        target.textContent = TEXT_COPY;
                    }, 2000);
                }
            } catch (err) {
                target.innerText = TEXT_ERROR;
            }
        }
    }

    function addStyles () {
        var css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = ( [
            '.hljs{position: relative}',
            '.hljs:hover .{0}{display: block}',
            '.{0}{',
                'display: none;',
                'position: absolute;',
                'right: 0;',
                'top: 0;',
                'background-color: white;',
                'padding: 5px 10px;',
                'margin: 5px;',
                'border-radius: 5px;',
                'border: 1px solid darkgray;',
                'cursor: pointer;',
            '}'
        ].join('') ).format(BLOCK_NAME);
        document.getElementsByTagName('head')[0].appendChild(css);
    }

    function onLoad () {
        if (document.readyState === 'complete') {
            documentReady();
        } else {
            w.addEventListener('DOMContentLoaded', documentReady);
        }
    }

    function documentReady () {
        try {
            var blocks = document.querySelectorAll('code.hljs');

            for (var i in blocks) {
                if (blocks.hasOwnProperty(i)) {
                    addCopyButton(blocks[i]);
                }
            }
        } catch (e) {
            console.error('CopyButton error: ', e);
        }
    }

    function getTextToCopy(element) {
        if (document.querySelector('.' + LN_CLASS)) {
            return getTextFromNodes(element);
        }

        return element.innerText;
    }

    function getTextFromNodes(element) {
        var text = [];
        for (var i = 0, n = element.childNodes.length; i<n; i++) {
            var child = element.childNodes[i];
            if (child.className && child.className === LN_CLASS) {
                text.push(child.innerText);
            } else  {
                text.push(getTextFromNodes(child));
            }
        }

        return text.join('');
    }

    function addCopyButton (element) {
        if (typeof element !== 'object') {
            return;
        }

        element.innerHTML = element.innerHTML + ('<div class="{0}"><span class="{1}">{2}</span></div>').format(BLOCK_NAME, BUTTON_CLASS, TEXT_COPY);
        element.setAttribute('onclick', "hljs.copyCode(event)");
    }

}(window));