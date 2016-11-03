/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Polyfill for Object.keys
	 *
	 * @see: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
	 */
	if (!Object.keys) {
	    Object.keys = function () {
	        var hasOwnProperty = Object.prototype.hasOwnProperty,
	            hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
	            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
	            dontEnumsLength = dontEnums.length;
	
	        return function (obj) {
	            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
	
	            var result = [];
	
	            for (var prop in obj) {
	                if (hasOwnProperty.call(obj, prop)) result.push(prop);
	            }
	
	            if (hasDontEnumBug) {
	                for (var i = 0; i < dontEnumsLength; i++) {
	                    if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
	                }
	            }
	            return result;
	        };
	    }();
	};
	
	/*! Overthrow v.0.1.0. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
	(function (w, undefined) {
	
	    var doc = w.document,
	        docElem = doc.documentElement,
	        classtext = "overthrow-enabled",
	
	
	    // Touch events are used in the polyfill, and thus are a prerequisite
	    canBeFilledWithPoly = "ontouchmove" in doc,
	
	
	    // The following attempts to determine whether the browser has native overflow support
	    // so we can enable it but not polyfill
	    overflowProbablyAlreadyWorks =
	    // Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
	    "WebkitOverflowScrolling" in docElem.style ||
	    // Touch events aren't supported and screen width is greater than X
	    // ...basically, this is a loose "desktop browser" check. 
	    // It may wrongly opt-in very large tablets with no touch support.
	    !canBeFilledWithPoly && w.screen.width > 1200 ||
	    // Hang on to your hats.
	    // Whitelist some popular, overflow-supporting mobile browsers for now and the future
	    // These browsers are known to get overlow support right, but give us no way of detecting it.
	    function () {
	        var ua = w.navigator.userAgent,
	
	        // Webkit crosses platforms, and the browsers on our list run at least version 534
	        webkit = ua.match(/AppleWebKit\/([0-9]+)/),
	            wkversion = webkit && webkit[1],
	            wkLte534 = webkit && wkversion >= 534;
	
	        return (
	            /* Android 3+ with webkit gte 534
	            ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
	            ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 ||
	            /* Blackberry 7+ with webkit gte 534
	            ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
	            ua.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
	            /* Blackberry Playbook with webkit gte 534
	            ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */
	            ua.indexOf(/PlayBook/) > -1 && RegExp.$1 >= 0 && wkLte534 ||
	            /* Firefox Mobile (Fennec) 4 and up
	            ~: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:2.1.1) Gecko/ Firefox/4.0.2pre Fennec/4.0. */
	            ua.match(/Fennec\/([0-9]+)/) && RegExp.$1 >= 4 ||
	            /* WebOS 3 and up (TouchPad too)
	            ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
	            ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 ||
	            /* Nokia Browser N8
	            ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba 
	            ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
	            ua.match(/NokiaBrowser\/([0-9\.]+)/) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
	        );
	    }(),
	
	
	    // Easing can use any of Robert Penner's equations (http://www.robertpenner.com/easing_terms_of_use.html). By default, overthrow includes ease-out-cubic
	    // arguments: t = current iteration, b = initial value, c = end value, d = total iterations
	    // use w.overthrow.easing to provide a custom function externally, or pass an easing function as a callback to the toss method
	    defaultEasing = function defaultEasing(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    },
	        enabled = false,
	
	
	    // Keeper of intervals
	    timeKeeper,
	
	
	    /* toss scrolls and element with easing
	     
	    // elem is the element to scroll
	    // options hash:
	        * left is the desired horizontal scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
	        * top is the desired vertical scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
	        * duration is the number of milliseconds the throw will take. Default is 100.
	        * easing is an optional custom easing function. Default is w.overthrow.easing. Must follow the easing function signature 
	    */
	    toss = function toss(elem, options) {
	        var i = 0,
	            sLeft = elem.scrollLeft,
	            sTop = elem.scrollTop,
	
	        // Toss defaults
	        o = {
	            top: "+0",
	            left: "+0",
	            duration: 100,
	            easing: w.overthrow.easing
	        },
	            endLeft,
	            endTop;
	
	        // Mixin based on predefined defaults
	        if (options) {
	            for (var j in o) {
	                if (options[j] !== undefined) {
	                    o[j] = options[j];
	                }
	            }
	        }
	
	        // Convert relative values to ints
	        // First the left val
	        if (typeof o.left === "string") {
	            o.left = parseFloat(o.left);
	            endLeft = o.left + sLeft;
	        } else {
	            endLeft = o.left;
	            o.left = o.left - sLeft;
	        }
	        // Then the top val
	        if (typeof o.top === "string") {
	            o.top = parseFloat(o.top);
	            endTop = o.top + sTop;
	        } else {
	            endTop = o.top;
	            o.top = o.top - sTop;
	        }
	
	        timeKeeper = setInterval(function () {
	            if (i++ < o.duration) {
	                elem.scrollLeft = o.easing(i, sLeft, o.left, o.duration);
	                elem.scrollTop = o.easing(i, sTop, o.top, o.duration);
	            } else {
	                if (endLeft !== elem.scrollLeft) {
	                    elem.scrollLeft = endLeft;
	                }
	                if (endTop !== elem.scrollTop) {
	                    elem.scrollTop = endTop;
	                }
	                intercept();
	            }
	        }, 1);
	
	        // Return the values, post-mixin, with end values specified
	        return { top: endTop, left: endLeft, duration: o.duration, easing: o.easing };
	    },
	
	
	    // find closest overthrow (elem or a parent)
	    closest = function closest(target, ascend) {
	        return !ascend && target.className && target.className.indexOf("overthrow") > -1 && target || closest(target.parentNode);
	    },
	
	
	    // Intercept any throw in progress
	    intercept = function intercept() {
	        clearInterval(timeKeeper);
	    },
	
	
	    // Enable and potentially polyfill overflow
	    enable = function enable() {
	
	        // If it's on, 
	        if (enabled) {
	            return;
	        }
	        // It's on.
	        enabled = true;
	
	        // If overflowProbablyAlreadyWorks or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
	        if (overflowProbablyAlreadyWorks || canBeFilledWithPoly) {
	            docElem.className += " " + classtext;
	        }
	
	        // Destroy everything later. If you want to.
	        w.overthrow.forget = function () {
	            // Strip the class name from docElem
	            docElem.className = docElem.className.replace(classtext, "");
	            // Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
	            if (doc.removeEventListener) {
	                doc.removeEventListener("touchstart", start, false);
	            }
	            // reset easing to default
	            w.overthrow.easing = defaultEasing;
	
	            // Let 'em know
	            enabled = false;
	        };
	
	        // If overflowProbablyAlreadyWorks or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
	        if (overflowProbablyAlreadyWorks || !canBeFilledWithPoly) {
	            return;
	        }
	
	        // Fill 'er up!
	        // From here down, all logic is associated with touch scroll handling
	        // elem references the overthrow element in use
	        var elem,
	
	
	        // The last several Y values are kept here
	        lastTops = [],
	
	
	        // The last several X values are kept here
	        lastLefts = [],
	
	
	        // lastDown will be true if the last scroll direction was down, false if it was up
	        lastDown,
	
	
	        // lastRight will be true if the last scroll direction was right, false if it was left
	        lastRight,
	
	
	        // For a new gesture, or change in direction, reset the values from last scroll
	        resetVertTracking = function resetVertTracking() {
	            lastTops = [];
	            lastDown = null;
	        },
	            resetHorTracking = function resetHorTracking() {
	            lastLefts = [];
	            lastRight = null;
	        },
	
	
	        // After releasing touchend, throw the overthrow element, depending on momentum
	        finishScroll = function finishScroll() {
	            // Come up with a distance and duration based on how 
	            // Multipliers are tweaked to a comfortable balance across platforms
	            var top = (lastTops[0] - lastTops[lastTops.length - 1]) * 8,
	                left = (lastLefts[0] - lastLefts[lastLefts.length - 1]) * 8,
	                duration = Math.max(Math.abs(left), Math.abs(top)) / 8;
	
	            // Make top and left relative-style strings (positive vals need "+" prefix)
	            top = (top > 0 ? "+" : "") + top;
	            left = (left > 0 ? "+" : "") + left;
	
	            // Make sure there's a significant amount of throw involved, otherwise, just stay still
	            if (!isNaN(duration) && duration > 0 && (Math.abs(left) > 80 || Math.abs(top) > 80)) {
	                toss(elem, { left: left, top: top, duration: duration });
	            }
	        },
	
	
	        // On webkit, touch events hardly trickle through textareas and inputs
	        // Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
	        // Toggling pointer events at the right moments seems to do the trick
	        // Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
	        inputs,
	            setPointers = function setPointers(val) {
	            inputs = elem.querySelectorAll("textarea, input");
	            for (var i = 0, il = inputs.length; i < il; i++) {
	                inputs[i].style.pointerEvents = val;
	            }
	        },
	
	
	        // For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
	        changeScrollTarget = function changeScrollTarget(startEvent, ascend) {
	            if (doc.createEvent) {
	                var newTarget = (!ascend || ascend === undefined) && elem.parentNode || elem.touchchild || elem,
	                    tEnd;
	
	                if (newTarget !== elem) {
	                    tEnd = doc.createEvent("HTMLEvents");
	                    tEnd.initEvent("touchend", true, true);
	                    elem.dispatchEvent(tEnd);
	                    newTarget.touchchild = elem;
	                    elem = newTarget;
	                    newTarget.dispatchEvent(startEvent);
	                }
	            }
	        },
	
	
	        // Touchstart handler
	        // On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
	        // Touchend unbinds them again, until next time
	        start = function start(e) {
	
	            // Stop any throw in progress
	            intercept();
	
	            // Reset the distance and direction tracking
	            resetVertTracking();
	            resetHorTracking();
	
	            elem = closest(e.target);
	
	            if (!elem || elem === docElem || e.touches.length > 1) {
	                return;
	            }
	
	            setPointers("none");
	            var touchStartE = e,
	                scrollT = elem.scrollTop,
	                scrollL = elem.scrollLeft,
	                height = elem.offsetHeight,
	                width = elem.offsetWidth,
	                startY = e.touches[0].pageY,
	                startX = e.touches[0].pageX,
	                scrollHeight = elem.scrollHeight,
	                scrollWidth = elem.scrollWidth,
	
	
	            // Touchmove handler
	            move = function move(e) {
	
	                var ty = scrollT + startY - e.touches[0].pageY,
	                    tx = scrollL + startX - e.touches[0].pageX,
	                    down = ty >= (lastTops.length ? lastTops[0] : 0),
	                    right = tx >= (lastLefts.length ? lastLefts[0] : 0);
	
	                // If there's room to scroll the current container, prevent the default window scroll
	                if (ty > 0 && ty < scrollHeight - height || tx > 0 && tx < scrollWidth - width) {
	                    e.preventDefault();
	                }
	                // This bubbling is dumb. Needs a rethink.
	                else {
	                        changeScrollTarget(touchStartE);
	                    }
	
	                // If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
	                if (lastDown && down !== lastDown) {
	                    resetVertTracking();
	                }
	
	                // If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
	                if (lastRight && right !== lastRight) {
	                    resetHorTracking();
	                }
	
	                // remember the last direction in which we were headed
	                lastDown = down;
	                lastRight = right;
	
	                // set the container's scroll
	                elem.scrollTop = ty;
	                elem.scrollLeft = tx;
	
	                lastTops.unshift(ty);
	                lastLefts.unshift(tx);
	
	                if (lastTops.length > 3) {
	                    lastTops.pop();
	                }
	                if (lastLefts.length > 3) {
	                    lastLefts.pop();
	                }
	            },
	
	
	            // Touchend handler
	            end = function end(e) {
	                // Apply momentum based easing for a graceful finish
	                finishScroll();
	                // Bring the pointers back
	                setPointers("auto");
	                setTimeout(function () {
	                    setPointers("none");
	                }, 450);
	                elem.removeEventListener("touchmove", move, false);
	                elem.removeEventListener("touchend", end, false);
	            };
	
	            elem.addEventListener("touchmove", move, false);
	            elem.addEventListener("touchend", end, false);
	        };
	
	        // Bind to touch, handle move and end within
	        doc.addEventListener("touchstart", start, false);
	    };
	
	    // Expose overthrow API
	    w.overthrow = {
	        set: enable,
	        forget: function forget() {},
	        easing: defaultEasing,
	        toss: toss,
	        intercept: intercept,
	        closest: closest,
	        support: overflowProbablyAlreadyWorks ? "native" : canBeFilledWithPoly && "polyfilled" || "none"
	    };
	
	    // Auto-init
	    enable();
	})(undefined);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWU0MzA1MjVkOGJiN2ZjZjBlOWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BvbHlmaWxsLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImtleXMiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc0RvbnRFbnVtQnVnIiwidG9TdHJpbmciLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImRvbnRFbnVtcyIsImRvbnRFbnVtc0xlbmd0aCIsImxlbmd0aCIsIm9iaiIsIlR5cGVFcnJvciIsInJlc3VsdCIsInByb3AiLCJjYWxsIiwicHVzaCIsImkiLCJ3IiwidW5kZWZpbmVkIiwiZG9jIiwiZG9jdW1lbnQiLCJkb2NFbGVtIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3N0ZXh0IiwiY2FuQmVGaWxsZWRXaXRoUG9seSIsIm92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MiLCJzdHlsZSIsInNjcmVlbiIsIndpZHRoIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ3ZWJraXQiLCJtYXRjaCIsIndrdmVyc2lvbiIsIndrTHRlNTM0IiwiUmVnRXhwIiwiJDEiLCJibGFja2JlcnJ5IiwiaW5kZXhPZiIsInBhcnNlRmxvYXQiLCJkZWZhdWx0RWFzaW5nIiwidCIsImIiLCJjIiwiZCIsImVuYWJsZWQiLCJ0aW1lS2VlcGVyIiwidG9zcyIsImVsZW0iLCJvcHRpb25zIiwic0xlZnQiLCJzY3JvbGxMZWZ0Iiwic1RvcCIsInNjcm9sbFRvcCIsIm8iLCJ0b3AiLCJsZWZ0IiwiZHVyYXRpb24iLCJlYXNpbmciLCJvdmVydGhyb3ciLCJlbmRMZWZ0IiwiZW5kVG9wIiwiaiIsInNldEludGVydmFsIiwiaW50ZXJjZXB0IiwiY2xvc2VzdCIsInRhcmdldCIsImFzY2VuZCIsImNsYXNzTmFtZSIsInBhcmVudE5vZGUiLCJjbGVhckludGVydmFsIiwiZW5hYmxlIiwiZm9yZ2V0IiwicmVwbGFjZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdGFydCIsImxhc3RUb3BzIiwibGFzdExlZnRzIiwibGFzdERvd24iLCJsYXN0UmlnaHQiLCJyZXNldFZlcnRUcmFja2luZyIsInJlc2V0SG9yVHJhY2tpbmciLCJmaW5pc2hTY3JvbGwiLCJNYXRoIiwibWF4IiwiYWJzIiwiaXNOYU4iLCJpbnB1dHMiLCJzZXRQb2ludGVycyIsInZhbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbCIsInBvaW50ZXJFdmVudHMiLCJjaGFuZ2VTY3JvbGxUYXJnZXQiLCJzdGFydEV2ZW50IiwiY3JlYXRlRXZlbnQiLCJuZXdUYXJnZXQiLCJ0b3VjaGNoaWxkIiwidEVuZCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJlIiwidG91Y2hlcyIsInRvdWNoU3RhcnRFIiwic2Nyb2xsVCIsInNjcm9sbEwiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsInN0YXJ0WSIsInBhZ2VZIiwic3RhcnRYIiwicGFnZVgiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxXaWR0aCIsIm1vdmUiLCJ0eSIsInR4IiwiZG93biIsInJpZ2h0IiwicHJldmVudERlZmF1bHQiLCJ1bnNoaWZ0IiwicG9wIiwiZW5kIiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXQiLCJzdXBwb3J0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7O0FBS0EsS0FBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2hCRCxZQUFPQyxJQUFQLEdBQWUsWUFBWTtBQUN6QixhQUFJQyxpQkFBaUJGLE9BQU9HLFNBQVAsQ0FBaUJELGNBQXRDO0FBQUEsYUFDSUUs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LGFBQUkyRyxnQkFBSixDQUFzQixZQUF0QixFQUFvQ2xELEtBQXBDLEVBQTJDLEtBQTNDO0FBQ0gsTUExVkw7O0FBNFZBO0FBQ0EzRCxPQUFFMkMsU0FBRixHQUFjO0FBQ1ZtRSxjQUFLdkQsTUFESztBQUVWQyxpQkFBUSxrQkFBVSxDQUFFLENBRlY7QUFHVmQsaUJBQVFsQixhQUhFO0FBSVZPLGVBQU1BLElBSkk7QUFLVmlCLG9CQUFXQSxTQUxEO0FBTVZDLGtCQUFTQSxPQU5DO0FBT1Y4RCxrQkFBU3ZHLCtCQUErQixRQUEvQixHQUEwQ0QsdUJBQXVCLFlBQXZCLElBQXVDO0FBUGhGLE1BQWQ7O0FBVUE7QUFDQWdEO0FBRUgsRUE1V0QsYSIsImZpbGUiOiJwb2x5ZmlsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGVlNDMwNTI1ZDhiYjdmY2YwZTlhXG4gKiovIiwiLyoqXG4gKiBQb2x5ZmlsbCBmb3IgT2JqZWN0LmtleXNcbiAqXG4gKiBAc2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9rZXlzXG4gKi9cbmlmICghT2JqZWN0LmtleXMpIHtcbiAgT2JqZWN0LmtleXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICAgIGhhc0RvbnRFbnVtQnVnID0gISh7dG9TdHJpbmc6IG51bGx9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKSxcbiAgICAgICAgZG9udEVudW1zID0gW1xuICAgICAgICAgICd0b1N0cmluZycsXG4gICAgICAgICAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgICAgICAgICAndmFsdWVPZicsXG4gICAgICAgICAgJ2hhc093blByb3BlcnR5JyxcbiAgICAgICAgICAnaXNQcm90b3R5cGVPZicsXG4gICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgICAgICAgICAnY29uc3RydWN0b3InXG4gICAgICAgIF0sXG4gICAgICAgIGRvbnRFbnVtc0xlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7XG4gXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nIHx8IG9iaiA9PT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3QnKTtcbiBcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiBcbiAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHJlc3VsdC5wdXNoKHByb3ApO1xuICAgICAgfVxuIFxuICAgICAgaWYgKGhhc0RvbnRFbnVtQnVnKSB7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaSA8IGRvbnRFbnVtc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb250RW51bXNbaV0pKSByZXN1bHQucHVzaChkb250RW51bXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSkoKVxufTtcblxuXG4vKiEgT3ZlcnRocm93IHYuMC4xLjAuIEFuIG92ZXJmbG93OmF1dG8gcG9seWZpbGwgZm9yIHJlc3BvbnNpdmUgZGVzaWduLiAoYykgMjAxMjogU2NvdHQgSmVobCwgRmlsYW1lbnQgR3JvdXAsIEluYy4gaHR0cDovL2ZpbGFtZW50Z3JvdXAuZ2l0aHViLmNvbS9PdmVydGhyb3cvbGljZW5zZS50eHQgKi9cbihmdW5jdGlvbiggdywgdW5kZWZpbmVkICl7XG4gICAgIFxuICAgIHZhciBkb2MgPSB3LmRvY3VtZW50LFxuICAgICAgICBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgY2xhc3N0ZXh0ID0gXCJvdmVydGhyb3ctZW5hYmxlZFwiLFxuICAgICBcbiAgICAgICAgLy8gVG91Y2ggZXZlbnRzIGFyZSB1c2VkIGluIHRoZSBwb2x5ZmlsbCwgYW5kIHRodXMgYXJlIGEgcHJlcmVxdWlzaXRlXG4gICAgICAgIGNhbkJlRmlsbGVkV2l0aFBvbHkgPSBcIm9udG91Y2htb3ZlXCIgaW4gZG9jLFxuICAgICAgICAgXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXR0ZW1wdHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGJyb3dzZXIgaGFzIG5hdGl2ZSBvdmVyZmxvdyBzdXBwb3J0XG4gICAgICAgIC8vIHNvIHdlIGNhbiBlbmFibGUgaXQgYnV0IG5vdCBwb2x5ZmlsbFxuICAgICAgICBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzID0gXG4gICAgICAgICAgICAvLyBGZWF0dXJlcy1maXJzdC4gaU9TNSBvdmVyZmxvdyBzY3JvbGxpbmcgcHJvcGVydHkgY2hlY2sgLSBubyBVQSBuZWVkZWQgaGVyZS4gdGhhbmtzIEFwcGxlIDopXG4gICAgICAgICAgICBcIldlYmtpdE92ZXJmbG93U2Nyb2xsaW5nXCIgaW4gZG9jRWxlbS5zdHlsZSB8fFxuICAgICAgICAgICAgLy8gVG91Y2ggZXZlbnRzIGFyZW4ndCBzdXBwb3J0ZWQgYW5kIHNjcmVlbiB3aWR0aCBpcyBncmVhdGVyIHRoYW4gWFxuICAgICAgICAgICAgLy8gLi4uYmFzaWNhbGx5LCB0aGlzIGlzIGEgbG9vc2UgXCJkZXNrdG9wIGJyb3dzZXJcIiBjaGVjay4gXG4gICAgICAgICAgICAvLyBJdCBtYXkgd3JvbmdseSBvcHQtaW4gdmVyeSBsYXJnZSB0YWJsZXRzIHdpdGggbm8gdG91Y2ggc3VwcG9ydC5cbiAgICAgICAgICAgICggIWNhbkJlRmlsbGVkV2l0aFBvbHkgJiYgdy5zY3JlZW4ud2lkdGggPiAxMjAwICkgfHxcbiAgICAgICAgICAgIC8vIEhhbmcgb24gdG8geW91ciBoYXRzLlxuICAgICAgICAgICAgLy8gV2hpdGVsaXN0IHNvbWUgcG9wdWxhciwgb3ZlcmZsb3ctc3VwcG9ydGluZyBtb2JpbGUgYnJvd3NlcnMgZm9yIG5vdyBhbmQgdGhlIGZ1dHVyZVxuICAgICAgICAgICAgLy8gVGhlc2UgYnJvd3NlcnMgYXJlIGtub3duIHRvIGdldCBvdmVybG93IHN1cHBvcnQgcmlnaHQsIGJ1dCBnaXZlIHVzIG5vIHdheSBvZiBkZXRlY3RpbmcgaXQuXG4gICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgdWEgPSB3Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlYmtpdCBjcm9zc2VzIHBsYXRmb3JtcywgYW5kIHRoZSBicm93c2VycyBvbiBvdXIgbGlzdCBydW4gYXQgbGVhc3QgdmVyc2lvbiA1MzRcbiAgICAgICAgICAgICAgICAgICAgd2Via2l0ID0gdWEubWF0Y2goIC9BcHBsZVdlYktpdFxcLyhbMC05XSspLyApLFxuICAgICAgICAgICAgICAgICAgICB3a3ZlcnNpb24gPSB3ZWJraXQgJiYgd2Via2l0WzFdLFxuICAgICAgICAgICAgICAgICAgICB3a0x0ZTUzNCA9IHdlYmtpdCAmJiB3a3ZlcnNpb24gPj0gNTM0O1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgLyogQW5kcm9pZCAzKyB3aXRoIHdlYmtpdCBndGUgNTM0XG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChMaW51eDsgVTsgQW5kcm9pZCAzLjA7IGVuLXVzOyBYb29tIEJ1aWxkL0hSSTM5KSBBcHBsZVdlYktpdC81MzQuMTMgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzQuMCBTYWZhcmkvNTM0LjEzICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvQW5kcm9pZCAoWzAtOV0rKS8gKSAmJiBSZWdFeHAuJDEgPj0gMyAmJiB3a0x0ZTUzNCB8fFxuICAgICAgICAgICAgICAgICAgICAvKiBCbGFja2JlcnJ5IDcrIHdpdGggd2Via2l0IGd0ZSA1MzRcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKEJsYWNrQmVycnk7IFU7IEJsYWNrQmVycnkgOTkwMDsgZW4tVVMpIEFwcGxlV2ViS2l0LzUzNC4xMSsgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzcuMC4wIE1vYmlsZSBTYWZhcmkvNTM0LjExKyAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggLyBWZXJzaW9uXFwvKFswLTldKykvICkgJiYgUmVnRXhwLiQxID49IDAgJiYgdy5ibGFja2JlcnJ5ICYmIHdrTHRlNTM0IHx8XG4gICAgICAgICAgICAgICAgICAgIC8qIEJsYWNrYmVycnkgUGxheWJvb2sgd2l0aCB3ZWJraXQgZ3RlIDUzNFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoUGxheUJvb2s7IFU7IFJJTSBUYWJsZXQgT1MgMS4wLjA7IGVuLVVTKSBBcHBsZVdlYktpdC81MzQuOCsgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzAuMC4xIFNhZmFyaS81MzQuOCsgKi8gIFxuICAgICAgICAgICAgICAgICAgICB1YS5pbmRleE9mKCAvUGxheUJvb2svICkgPiAtMSAmJiBSZWdFeHAuJDEgPj0gMCAmJiB3a0x0ZTUzNCB8fFxuICAgICAgICAgICAgICAgICAgICAvKiBGaXJlZm94IE1vYmlsZSAoRmVubmVjKSA0IGFuZCB1cFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMC43OyBydjoyLjEuMSkgR2Vja28vIEZpcmVmb3gvNC4wLjJwcmUgRmVubmVjLzQuMC4gKi9cbiAgICAgICAgICAgICAgICAgICAgdWEubWF0Y2goIC9GZW5uZWNcXC8oWzAtOV0rKS8gKSAmJiBSZWdFeHAuJDEgPj0gNCB8fFxuICAgICAgICAgICAgICAgICAgICAvKiBXZWJPUyAzIGFuZCB1cCAoVG91Y2hQYWQgdG9vKVxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoaHAtdGFibGV0OyBMaW51eDsgaHB3T1MvMy4wLjA7IFU7IGVuLVVTKSBBcHBsZVdlYktpdC81MzQuNiAoS0hUTUwsIGxpa2UgR2Vja28pIHdPU0Jyb3dzZXIvMjMzLjQ4IFNhZmFyaS81MzQuNiBUb3VjaFBhZC8xLjAgKi9cbiAgICAgICAgICAgICAgICAgICAgdWEubWF0Y2goIC93T1NCcm93c2VyXFwvKFswLTldKykvICkgJiYgUmVnRXhwLiQxID49IDIzMyAmJiB3a0x0ZTUzNCB8fFxuICAgICAgICAgICAgICAgICAgICAvKiBOb2tpYSBCcm93c2VyIE44XG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChTeW1iaWFuLzM7IFNlcmllczYwLzUuMiBOb2tpYU44LTAwLzAxMi4wMDI7IFByb2ZpbGUvTUlEUC0yLjEgQ29uZmlndXJhdGlvbi9DTERDLTEuMSApIEFwcGxlV2ViS2l0LzUzMy40IChLSFRNTCwgbGlrZSBHZWNrbykgTm9raWFCcm93c2VyLzcuMy4wIE1vYmlsZSBTYWZhcmkvNTMzLjQgM2dwcC1nYmEgXG4gICAgICAgICAgICAgICAgICAgIH46IE5vdGU6IHRoZSBOOSBkb2Vzbid0IGhhdmUgbmF0aXZlIG92ZXJmbG93IHdpdGggb25lLWZpbmdlciB0b3VjaC4gd3RmICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvTm9raWFCcm93c2VyXFwvKFswLTlcXC5dKykvICkgJiYgcGFyc2VGbG9hdChSZWdFeHAuJDEpID09PSA3LjMgJiYgd2Via2l0ICYmIHdrdmVyc2lvbiA+PSA1MzNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkoKSxcbiAgICAgICAgICAgICBcbiAgICAgICAgLy8gRWFzaW5nIGNhbiB1c2UgYW55IG9mIFJvYmVydCBQZW5uZXIncyBlcXVhdGlvbnMgKGh0dHA6Ly93d3cucm9iZXJ0cGVubmVyLmNvbS9lYXNpbmdfdGVybXNfb2ZfdXNlLmh0bWwpLiBCeSBkZWZhdWx0LCBvdmVydGhyb3cgaW5jbHVkZXMgZWFzZS1vdXQtY3ViaWNcbiAgICAgICAgLy8gYXJndW1lbnRzOiB0ID0gY3VycmVudCBpdGVyYXRpb24sIGIgPSBpbml0aWFsIHZhbHVlLCBjID0gZW5kIHZhbHVlLCBkID0gdG90YWwgaXRlcmF0aW9uc1xuICAgICAgICAvLyB1c2Ugdy5vdmVydGhyb3cuZWFzaW5nIHRvIHByb3ZpZGUgYSBjdXN0b20gZnVuY3Rpb24gZXh0ZXJuYWxseSwgb3IgcGFzcyBhbiBlYXNpbmcgZnVuY3Rpb24gYXMgYSBjYWxsYmFjayB0byB0aGUgdG9zcyBtZXRob2RcbiAgICAgICAgZGVmYXVsdEVhc2luZyA9IGZ1bmN0aW9uICh0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyooKHQ9dC9kLTEpKnQqdCArIDEpICsgYjtcbiAgICAgICAgfSwgIFxuICAgICAgICAgICAgIFxuICAgICAgICBlbmFibGVkID0gZmFsc2UsXG4gICAgICAgICBcbiAgICAgICAgLy8gS2VlcGVyIG9mIGludGVydmFsc1xuICAgICAgICB0aW1lS2VlcGVyLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgLyogdG9zcyBzY3JvbGxzIGFuZCBlbGVtZW50IHdpdGggZWFzaW5nXG4gICAgICAgICBcbiAgICAgICAgLy8gZWxlbSBpcyB0aGUgZWxlbWVudCB0byBzY3JvbGxcbiAgICAgICAgLy8gb3B0aW9ucyBoYXNoOlxuICAgICAgICAgICAgKiBsZWZ0IGlzIHRoZSBkZXNpcmVkIGhvcml6b250YWwgc2Nyb2xsLiBEZWZhdWx0IGlzIFwiKzBcIi4gRm9yIHJlbGF0aXZlIGRpc3RhbmNlcywgcGFzcyBhIHN0cmluZyB3aXRoIFwiK1wiIG9yIFwiLVwiIGluIGZyb250LlxuICAgICAgICAgICAgKiB0b3AgaXMgdGhlIGRlc2lyZWQgdmVydGljYWwgc2Nyb2xsLiBEZWZhdWx0IGlzIFwiKzBcIi4gRm9yIHJlbGF0aXZlIGRpc3RhbmNlcywgcGFzcyBhIHN0cmluZyB3aXRoIFwiK1wiIG9yIFwiLVwiIGluIGZyb250LlxuICAgICAgICAgICAgKiBkdXJhdGlvbiBpcyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGUgdGhyb3cgd2lsbCB0YWtlLiBEZWZhdWx0IGlzIDEwMC5cbiAgICAgICAgICAgICogZWFzaW5nIGlzIGFuIG9wdGlvbmFsIGN1c3RvbSBlYXNpbmcgZnVuY3Rpb24uIERlZmF1bHQgaXMgdy5vdmVydGhyb3cuZWFzaW5nLiBNdXN0IGZvbGxvdyB0aGUgZWFzaW5nIGZ1bmN0aW9uIHNpZ25hdHVyZSBcbiAgICAgICAgKi9cbiAgICAgICAgdG9zcyA9IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zICl7XG4gICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgc0xlZnQgPSBlbGVtLnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgc1RvcCA9IGVsZW0uc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIC8vIFRvc3MgZGVmYXVsdHNcbiAgICAgICAgICAgICAgICBvID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IFwiKzBcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIrMFwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxuICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IHcub3ZlcnRocm93LmVhc2luZ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kTGVmdCwgZW5kVG9wO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gTWl4aW4gYmFzZWQgb24gcHJlZGVmaW5lZCBkZWZhdWx0c1xuICAgICAgICAgICAgaWYoIG9wdGlvbnMgKXtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBqIGluIG8gKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIG9wdGlvbnNbIGogXSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvWyBqIF0gPSBvcHRpb25zWyBqIF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHJlbGF0aXZlIHZhbHVlcyB0byBpbnRzXG4gICAgICAgICAgICAvLyBGaXJzdCB0aGUgbGVmdCB2YWxcbiAgICAgICAgICAgIGlmKCB0eXBlb2Ygby5sZWZ0ID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgICAgICAgICAgby5sZWZ0ID0gcGFyc2VGbG9hdCggby5sZWZ0ICk7XG4gICAgICAgICAgICAgICAgZW5kTGVmdCA9IG8ubGVmdCArIHNMZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZW5kTGVmdCA9IG8ubGVmdDtcbiAgICAgICAgICAgICAgICBvLmxlZnQgPSBvLmxlZnQgLSBzTGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gdGhlIHRvcCB2YWxcbiAgICAgICAgICAgIGlmKCB0eXBlb2Ygby50b3AgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgICAgICAgICAgICBvLnRvcCA9IHBhcnNlRmxvYXQoIG8udG9wICk7XG4gICAgICAgICAgICAgICAgZW5kVG9wID0gby50b3AgKyBzVG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZW5kVG9wID0gby50b3A7XG4gICAgICAgICAgICAgICAgby50b3AgPSBvLnRvcCAtIHNUb3A7XG4gICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICB0aW1lS2VlcGVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCBpKysgPCBvLmR1cmF0aW9uICl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCA9IG8uZWFzaW5nKCBpLCBzTGVmdCwgby5sZWZ0LCBvLmR1cmF0aW9uICk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gby5lYXNpbmcoIGksIHNUb3AsIG8udG9wLCBvLmR1cmF0aW9uICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBlbmRMZWZ0ICE9PSBlbGVtLnNjcm9sbExlZnQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCA9IGVuZExlZnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoIGVuZFRvcCAhPT0gZWxlbS5zY3JvbGxUb3AgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gZW5kVG9wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGludGVyY2VwdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEgKTtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgdmFsdWVzLCBwb3N0LW1peGluLCB3aXRoIGVuZCB2YWx1ZXMgc3BlY2lmaWVkXG4gICAgICAgICAgICByZXR1cm4geyB0b3A6IGVuZFRvcCwgbGVmdDogZW5kTGVmdCwgZHVyYXRpb246IG8uZHVyYXRpb24sIGVhc2luZzogby5lYXNpbmcgfTtcbiAgICAgICAgfSxcbiAgICAgICAgIFxuICAgICAgICAvLyBmaW5kIGNsb3Nlc3Qgb3ZlcnRocm93IChlbGVtIG9yIGEgcGFyZW50KVxuICAgICAgICBjbG9zZXN0ID0gZnVuY3Rpb24oIHRhcmdldCwgYXNjZW5kICl7XG4gICAgICAgICAgICByZXR1cm4gIWFzY2VuZCAmJiB0YXJnZXQuY2xhc3NOYW1lICYmIHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZiggXCJvdmVydGhyb3dcIiApID4gLTEgJiYgdGFyZ2V0IHx8IGNsb3Nlc3QoIHRhcmdldC5wYXJlbnROb2RlICk7XG4gICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBJbnRlcmNlcHQgYW55IHRocm93IGluIHByb2dyZXNzXG4gICAgICAgIGludGVyY2VwdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKCB0aW1lS2VlcGVyICk7XG4gICAgICAgIH0sXG4gICAgICAgICAgICAgXG4gICAgICAgIC8vIEVuYWJsZSBhbmQgcG90ZW50aWFsbHkgcG9seWZpbGwgb3ZlcmZsb3dcbiAgICAgICAgZW5hYmxlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiBpdCdzIG9uLCBcbiAgICAgICAgICAgIGlmKCBlbmFibGVkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSXQncyBvbi5cbiAgICAgICAgICAgIGVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3Mgb3IgYXQgbGVhc3QgdGhlIGVsZW1lbnQgY2FuQmVGaWxsZWRXaXRoUG9seSwgYWRkIGEgY2xhc3MgdG8gY3VlIENTUyB0aGF0IGFzc3VtZXMgb3ZlcmZsb3cgc2Nyb2xsaW5nIHdpbGwgd29yayAoc2V0dGluZyBoZWlnaHQgb24gZWxlbWVudHMgYW5kIHN1Y2gpXG4gICAgICAgICAgICBpZiggb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyB8fCBjYW5CZUZpbGxlZFdpdGhQb2x5ICl7XG4gICAgICAgICAgICAgICAgZG9jRWxlbS5jbGFzc05hbWUgKz0gXCIgXCIgKyBjbGFzc3RleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGVzdHJveSBldmVyeXRoaW5nIGxhdGVyLiBJZiB5b3Ugd2FudCB0by5cbiAgICAgICAgICAgIHcub3ZlcnRocm93LmZvcmdldCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy8gU3RyaXAgdGhlIGNsYXNzIG5hbWUgZnJvbSBkb2NFbGVtXG4gICAgICAgICAgICAgICAgZG9jRWxlbS5jbGFzc05hbWUgPSBkb2NFbGVtLmNsYXNzTmFtZS5yZXBsYWNlKCBjbGFzc3RleHQsIFwiXCIgKTtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdG91Y2ggYmluZGluZyAoY2hlY2sgZm9yIG1ldGhvZCBzdXBwb3J0IHNpbmNlIHRoaXMgcGFydCBpc24ndCBxdWFsaWZpZWQgYnkgdG91Y2ggc3VwcG9ydCBsaWtlIHRoZSByZXN0KVxuICAgICAgICAgICAgICAgIGlmKCBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciApe1xuICAgICAgICAgICAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ0b3VjaHN0YXJ0XCIsIHN0YXJ0LCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXNldCBlYXNpbmcgdG8gZGVmYXVsdFxuICAgICAgICAgICAgICAgIHcub3ZlcnRocm93LmVhc2luZyA9IGRlZmF1bHRFYXNpbmc7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIExldCAnZW0ga25vd1xuICAgICAgICAgICAgICAgIGVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgIFxuICAgICAgICAgICAgLy8gSWYgb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyBvciBpdCBkb2Vzbid0IGxvb2sgbGlrZSB0aGUgYnJvd3NlciBjYW5CZUZpbGxlZFdpdGhQb2x5LCBvdXIgam9iIGlzIGRvbmUgaGVyZS4gRXhpdCB2aWV3cG9ydCBsZWZ0LlxuICAgICAgICAgICAgaWYoIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MgfHwgIWNhbkJlRmlsbGVkV2l0aFBvbHkgKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gXG4gICAgICAgICAgICAvLyBGaWxsICdlciB1cCFcbiAgICAgICAgICAgIC8vIEZyb20gaGVyZSBkb3duLCBhbGwgbG9naWMgaXMgYXNzb2NpYXRlZCB3aXRoIHRvdWNoIHNjcm9sbCBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIC8vIGVsZW0gcmVmZXJlbmNlcyB0aGUgb3ZlcnRocm93IGVsZW1lbnQgaW4gdXNlXG4gICAgICAgICAgICB2YXIgZWxlbSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVGhlIGxhc3Qgc2V2ZXJhbCBZIHZhbHVlcyBhcmUga2VwdCBoZXJlXG4gICAgICAgICAgICAgICAgbGFzdFRvcHMgPSBbXSxcbiAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRoZSBsYXN0IHNldmVyYWwgWCB2YWx1ZXMgYXJlIGtlcHQgaGVyZVxuICAgICAgICAgICAgICAgIGxhc3RMZWZ0cyA9IFtdLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBsYXN0RG93biB3aWxsIGJlIHRydWUgaWYgdGhlIGxhc3Qgc2Nyb2xsIGRpcmVjdGlvbiB3YXMgZG93biwgZmFsc2UgaWYgaXQgd2FzIHVwXG4gICAgICAgICAgICAgICAgbGFzdERvd24sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGxhc3RSaWdodCB3aWxsIGJlIHRydWUgaWYgdGhlIGxhc3Qgc2Nyb2xsIGRpcmVjdGlvbiB3YXMgcmlnaHQsIGZhbHNlIGlmIGl0IHdhcyBsZWZ0XG4gICAgICAgICAgICAgICAgbGFzdFJpZ2h0LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBGb3IgYSBuZXcgZ2VzdHVyZSwgb3IgY2hhbmdlIGluIGRpcmVjdGlvbiwgcmVzZXQgdGhlIHZhbHVlcyBmcm9tIGxhc3Qgc2Nyb2xsXG4gICAgICAgICAgICAgICAgcmVzZXRWZXJ0VHJhY2tpbmcgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0VG9wcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsYXN0RG93biA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVzZXRIb3JUcmFja2luZyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RMZWZ0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsYXN0UmlnaHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFmdGVyIHJlbGVhc2luZyB0b3VjaGVuZCwgdGhyb3cgdGhlIG92ZXJ0aHJvdyBlbGVtZW50LCBkZXBlbmRpbmcgb24gbW9tZW50dW1cbiAgICAgICAgICAgICAgICBmaW5pc2hTY3JvbGwgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAvLyBDb21lIHVwIHdpdGggYSBkaXN0YW5jZSBhbmQgZHVyYXRpb24gYmFzZWQgb24gaG93IFxuICAgICAgICAgICAgICAgICAgICAvLyBNdWx0aXBsaWVycyBhcmUgdHdlYWtlZCB0byBhIGNvbWZvcnRhYmxlIGJhbGFuY2UgYWNyb3NzIHBsYXRmb3Jtc1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wID0gKCBsYXN0VG9wc1sgMCBdIC0gbGFzdFRvcHNbIGxhc3RUb3BzLmxlbmd0aCAtMSBdICkgKiA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9ICggbGFzdExlZnRzWyAwIF0gLSBsYXN0TGVmdHNbIGxhc3RMZWZ0cy5sZW5ndGggLTEgXSApICogOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5tYXgoIE1hdGguYWJzKCBsZWZ0ICksIE1hdGguYWJzKCB0b3AgKSApIC8gODtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHRvcCBhbmQgbGVmdCByZWxhdGl2ZS1zdHlsZSBzdHJpbmdzIChwb3NpdGl2ZSB2YWxzIG5lZWQgXCIrXCIgcHJlZml4KVxuICAgICAgICAgICAgICAgICAgICB0b3AgPSAoIHRvcCA+IDAgPyBcIitcIiA6IFwiXCIgKSArIHRvcDtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9ICggbGVmdCA+IDAgPyBcIitcIiA6IFwiXCIgKSArIGxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlJ3MgYSBzaWduaWZpY2FudCBhbW91bnQgb2YgdGhyb3cgaW52b2x2ZWQsIG90aGVyd2lzZSwganVzdCBzdGF5IHN0aWxsXG4gICAgICAgICAgICAgICAgICAgIGlmKCAhaXNOYU4oIGR1cmF0aW9uICkgJiYgZHVyYXRpb24gPiAwICYmICggTWF0aC5hYnMoIGxlZnQgKSA+IDgwIHx8IE1hdGguYWJzKCB0b3AgKSA+IDgwICkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvc3MoIGVsZW0sIHsgbGVmdDogbGVmdCwgdG9wOiB0b3AsIGR1cmF0aW9uOiBkdXJhdGlvbiB9ICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIE9uIHdlYmtpdCwgdG91Y2ggZXZlbnRzIGhhcmRseSB0cmlja2xlIHRocm91Z2ggdGV4dGFyZWFzIGFuZCBpbnB1dHNcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxpbmcgQ1NTIHBvaW50ZXIgZXZlbnRzIG1ha2VzIHN1cmUgdGhleSBkbywgYnV0IGl0IGFsc28gbWFrZXMgdGhlIGNvbnRyb2xzIGlubmFjY2Vzc2libGVcbiAgICAgICAgICAgICAgICAvLyBUb2dnbGluZyBwb2ludGVyIGV2ZW50cyBhdCB0aGUgcmlnaHQgbW9tZW50cyBzZWVtcyB0byBkbyB0aGUgdHJpY2tcbiAgICAgICAgICAgICAgICAvLyBUaGFua3MgVGhvbWFzIEJhY2hlbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81Nzk4NjgxIGZvciB0aGUgZm9sbG93aW5nXG4gICAgICAgICAgICAgICAgaW5wdXRzLFxuICAgICAgICAgICAgICAgIHNldFBvaW50ZXJzID0gZnVuY3Rpb24oIHZhbCApe1xuICAgICAgICAgICAgICAgICAgICBpbnB1dHMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIFwidGV4dGFyZWEsIGlucHV0XCIgKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKCB2YXIgaSA9IDAsIGlsID0gaW5wdXRzLmxlbmd0aDsgaSA8IGlsOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dHNbIGkgXS5zdHlsZS5wb2ludGVyRXZlbnRzID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRm9yIG5lc3RlZCBvdmVydGhyb3dzLCBjaGFuZ2VTY3JvbGxUYXJnZXQgcmVzdGFydHMgYSB0b3VjaCBldmVudCBjeWNsZSBvbiBhIHBhcmVudCBvciBjaGlsZCBvdmVydGhyb3dcbiAgICAgICAgICAgICAgICBjaGFuZ2VTY3JvbGxUYXJnZXQgPSBmdW5jdGlvbiggc3RhcnRFdmVudCwgYXNjZW5kICl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBkb2MuY3JlYXRlRXZlbnQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdUYXJnZXQgPSAoICFhc2NlbmQgfHwgYXNjZW5kID09PSB1bmRlZmluZWQgKSAmJiBlbGVtLnBhcmVudE5vZGUgfHwgZWxlbS50b3VjaGNoaWxkIHx8IGVsZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdEVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIG5ld1RhcmdldCAhPT0gZWxlbSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRFbmQgPSBkb2MuY3JlYXRlRXZlbnQoIFwiSFRNTEV2ZW50c1wiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdEVuZC5pbml0RXZlbnQoIFwidG91Y2hlbmRcIiwgdHJ1ZSwgdHJ1ZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudCggdEVuZCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhcmdldC50b3VjaGNoaWxkID0gZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtID0gbmV3VGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhcmdldC5kaXNwYXRjaEV2ZW50KCBzdGFydEV2ZW50ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUb3VjaHN0YXJ0IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAvLyBPbiB0b3VjaHN0YXJ0LCB0b3VjaG1vdmUgYW5kIHRvdWNoZW5kIGFyZSBmcmVzaGx5IGJvdW5kLCBhbmQgYWxsIHRocmVlIHNoYXJlIGEgYnVuY2ggb2YgdmFycyBzZXQgYnkgdG91Y2hzdGFydFxuICAgICAgICAgICAgICAgIC8vIFRvdWNoZW5kIHVuYmluZHMgdGhlbSBhZ2FpbiwgdW50aWwgbmV4dCB0aW1lXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBmdW5jdGlvbiggZSApe1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3AgYW55IHRocm93IGluIHByb2dyZXNzXG4gICAgICAgICAgICAgICAgICAgIGludGVyY2VwdCgpO1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBkaXN0YW5jZSBhbmQgZGlyZWN0aW9uIHRyYWNraW5nXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0VmVydFRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0SG9yVHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGNsb3Nlc3QoIGUudGFyZ2V0ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKCAhZWxlbSB8fCBlbGVtID09PSBkb2NFbGVtIHx8IGUudG91Y2hlcy5sZW5ndGggPiAxICl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgIFxuIFxuICAgICAgICAgICAgICAgICAgICBzZXRQb2ludGVycyggXCJub25lXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoU3RhcnRFID0gZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFQgPSBlbGVtLnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEwgPSBlbGVtLnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gZWxlbS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IGUudG91Y2hlc1sgMCBdLnBhZ2VZLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRYID0gZS50b3VjaGVzWyAwIF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxIZWlnaHQgPSBlbGVtLnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFdpZHRoID0gZWxlbS5zY3JvbGxXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG91Y2htb3ZlIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUgPSBmdW5jdGlvbiggZSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eSA9IHNjcm9sbFQgKyBzdGFydFkgLSBlLnRvdWNoZXNbIDAgXS5wYWdlWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSBzY3JvbGxMICsgc3RhcnRYIC0gZS50b3VjaGVzWyAwIF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd24gPSB0eSA+PSAoIGxhc3RUb3BzLmxlbmd0aCA/IGxhc3RUb3BzWyAwIF0gOiAwICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gdHggPj0gKCBsYXN0TGVmdHMubGVuZ3RoID8gbGFzdExlZnRzWyAwIF0gOiAwICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIHJvb20gdG8gc2Nyb2xsIHRoZSBjdXJyZW50IGNvbnRhaW5lciwgcHJldmVudCB0aGUgZGVmYXVsdCB3aW5kb3cgc2Nyb2xsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoICggdHkgPiAwICYmIHR5IDwgc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0ICkgfHwgKCB0eCA+IDAgJiYgdHggPCBzY3JvbGxXaWR0aCAtIHdpZHRoICkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGJ1YmJsaW5nIGlzIGR1bWIuIE5lZWRzIGEgcmV0aGluay5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlU2Nyb2xsVGFyZ2V0KCB0b3VjaFN0YXJ0RSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgZG93biBhbmQgbGFzdERvd24gYXJlIGluZXF1YWwsIHRoZSB5IHNjcm9sbCBoYXMgY2hhbmdlZCBkaXJlY3Rpb24uIFJlc2V0IHRyYWNraW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsYXN0RG93biAmJiBkb3duICE9PSBsYXN0RG93biApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldFZlcnRUcmFja2luZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcmlnaHQgYW5kIGxhc3RSaWdodCBhcmUgaW5lcXVhbCwgdGhlIHggc2Nyb2xsIGhhcyBjaGFuZ2VkIGRpcmVjdGlvbi4gUmVzZXQgdHJhY2tpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGxhc3RSaWdodCAmJiByaWdodCAhPT0gbGFzdFJpZ2h0ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0SG9yVHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbWVtYmVyIHRoZSBsYXN0IGRpcmVjdGlvbiBpbiB3aGljaCB3ZSB3ZXJlIGhlYWRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REb3duID0gZG93bjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmlnaHQgPSByaWdodDsgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGNvbnRhaW5lcidzIHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsVG9wID0gdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxMZWZ0ID0gdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRvcHMudW5zaGlmdCggdHkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVmdHMudW5zaGlmdCggdHggKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggbGFzdFRvcHMubGVuZ3RoID4gMyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VG9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGxhc3RMZWZ0cy5sZW5ndGggPiAzICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMZWZ0cy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb3VjaGVuZCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSBmdW5jdGlvbiggZSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IG1vbWVudHVtIGJhc2VkIGVhc2luZyBmb3IgYSBncmFjZWZ1bCBmaW5pc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5pc2hTY3JvbGwoKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnJpbmcgdGhlIHBvaW50ZXJzIGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQb2ludGVycyggXCJhdXRvXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQb2ludGVycyggXCJub25lXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA0NTAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwidG91Y2htb3ZlXCIsIG1vdmUsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcInRvdWNoZW5kXCIsIGVuZCwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNobW92ZVwiLCBtb3ZlLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hlbmRcIiwgZW5kLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQmluZCB0byB0b3VjaCwgaGFuZGxlIG1vdmUgYW5kIGVuZCB3aXRoaW5cbiAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNoc3RhcnRcIiwgc3RhcnQsIGZhbHNlICk7XG4gICAgICAgIH07XG4gICAgICAgICBcbiAgICAvLyBFeHBvc2Ugb3ZlcnRocm93IEFQSVxuICAgIHcub3ZlcnRocm93ID0ge1xuICAgICAgICBzZXQ6IGVuYWJsZSxcbiAgICAgICAgZm9yZ2V0OiBmdW5jdGlvbigpe30sXG4gICAgICAgIGVhc2luZzogZGVmYXVsdEVhc2luZyxcbiAgICAgICAgdG9zczogdG9zcyxcbiAgICAgICAgaW50ZXJjZXB0OiBpbnRlcmNlcHQsXG4gICAgICAgIGNsb3Nlc3Q6IGNsb3Nlc3QsXG4gICAgICAgIHN1cHBvcnQ6IG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MgPyBcIm5hdGl2ZVwiIDogY2FuQmVGaWxsZWRXaXRoUG9seSAmJiBcInBvbHlmaWxsZWRcIiB8fCBcIm5vbmVcIlxuICAgIH07XG4gICAgIFxuICAgIC8vIEF1dG8taW5pdFxuICAgIGVuYWJsZSgpO1xuICAgICAgICAgXG59KSggdGhpcyApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3BvbHlmaWxsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==