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
	})(window);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmY4MDQ0MDdkMDgzMzRjZWM3MzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BvbHlmaWxsLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImtleXMiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc0RvbnRFbnVtQnVnIiwidG9TdHJpbmciLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImRvbnRFbnVtcyIsImRvbnRFbnVtc0xlbmd0aCIsImxlbmd0aCIsIm9iaiIsIlR5cGVFcnJvciIsInJlc3VsdCIsInByb3AiLCJjYWxsIiwicHVzaCIsImkiLCJ3IiwidW5kZWZpbmVkIiwiZG9jIiwiZG9jdW1lbnQiLCJkb2NFbGVtIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3N0ZXh0IiwiY2FuQmVGaWxsZWRXaXRoUG9seSIsIm92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MiLCJzdHlsZSIsInNjcmVlbiIsIndpZHRoIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ3ZWJraXQiLCJtYXRjaCIsIndrdmVyc2lvbiIsIndrTHRlNTM0IiwiUmVnRXhwIiwiJDEiLCJibGFja2JlcnJ5IiwiaW5kZXhPZiIsInBhcnNlRmxvYXQiLCJkZWZhdWx0RWFzaW5nIiwidCIsImIiLCJjIiwiZCIsImVuYWJsZWQiLCJ0aW1lS2VlcGVyIiwidG9zcyIsImVsZW0iLCJvcHRpb25zIiwic0xlZnQiLCJzY3JvbGxMZWZ0Iiwic1RvcCIsInNjcm9sbFRvcCIsIm8iLCJ0b3AiLCJsZWZ0IiwiZHVyYXRpb24iLCJlYXNpbmciLCJvdmVydGhyb3ciLCJlbmRMZWZ0IiwiZW5kVG9wIiwiaiIsInNldEludGVydmFsIiwiaW50ZXJjZXB0IiwiY2xvc2VzdCIsInRhcmdldCIsImFzY2VuZCIsImNsYXNzTmFtZSIsInBhcmVudE5vZGUiLCJjbGVhckludGVydmFsIiwiZW5hYmxlIiwiZm9yZ2V0IiwicmVwbGFjZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdGFydCIsImxhc3RUb3BzIiwibGFzdExlZnRzIiwibGFzdERvd24iLCJsYXN0UmlnaHQiLCJyZXNldFZlcnRUcmFja2luZyIsInJlc2V0SG9yVHJhY2tpbmciLCJmaW5pc2hTY3JvbGwiLCJNYXRoIiwibWF4IiwiYWJzIiwiaXNOYU4iLCJpbnB1dHMiLCJzZXRQb2ludGVycyIsInZhbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbCIsInBvaW50ZXJFdmVudHMiLCJjaGFuZ2VTY3JvbGxUYXJnZXQiLCJzdGFydEV2ZW50IiwiY3JlYXRlRXZlbnQiLCJuZXdUYXJnZXQiLCJ0b3VjaGNoaWxkIiwidEVuZCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJlIiwidG91Y2hlcyIsInRvdWNoU3RhcnRFIiwic2Nyb2xsVCIsInNjcm9sbEwiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsInN0YXJ0WSIsInBhZ2VZIiwic3RhcnRYIiwicGFnZVgiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxXaWR0aCIsIm1vdmUiLCJ0eSIsInR4IiwiZG93biIsInJpZ2h0IiwicHJldmVudERlZmF1bHQiLCJ1bnNoaWZ0IiwicG9wIiwiZW5kIiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXQiLCJzdXBwb3J0Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7O0FBS0EsS0FBSSxDQUFDQSxPQUFPQyxJQUFaLEVBQWtCO0FBQ2hCRCxZQUFPQyxJQUFQLEdBQWUsWUFBWTtBQUN6QixhQUFJQyxpQkFBaUJGLE9BQU9HLFNBQVAsQ0FBaUJELGNBQXRDO0FB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S0E7QUFDQXpHLGFBQUkyRyxnQkFBSixDQUFzQixZQUF0QixFQUFvQ2xELEtBQXBDLEVBQTJDLEtBQTNDO0FBQ0gsTUExVkw7O0FBNFZBO0FBQ0EzRCxPQUFFMkMsU0FBRixHQUFjO0FBQ1ZtRSxjQUFLdkQsTUFESztBQUVWQyxpQkFBUSxrQkFBVSxDQUFFLENBRlY7QUFHVmQsaUJBQVFsQixhQUhFO0FBSVZPLGVBQU1BLElBSkk7QUFLVmlCLG9CQUFXQSxTQUxEO0FBTVZDLGtCQUFTQSxPQU5DO0FBT1Y4RCxrQkFBU3ZHLCtCQUErQixRQUEvQixHQUEwQ0QsdUJBQXVCLFlBQXZCLElBQXVDO0FBUGhGLE1BQWQ7O0FBVUE7QUFDQWdEO0FBRUgsRUE1V0QsRUE0V0l5RCxNQTVXSixFIiwiZmlsZSI6InBvbHlmaWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmY4MDQ0MDdkMDgzMzRjZWM3MzlcbiAqKi8iLCIvKipcbiAqIFBvbHlmaWxsIGZvciBPYmplY3Qua2V5c1xuICpcbiAqIEBzZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2tleXNcbiAqL1xuaWYgKCFPYmplY3Qua2V5cykge1xuICBPYmplY3Qua2V5cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgaGFzRG9udEVudW1CdWcgPSAhKHt0b1N0cmluZzogbnVsbH0pLnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpLFxuICAgICAgICBkb250RW51bXMgPSBbXG4gICAgICAgICAgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcnLFxuICAgICAgICAgICd2YWx1ZU9mJyxcbiAgICAgICAgICAnaGFzT3duUHJvcGVydHknLFxuICAgICAgICAgICdpc1Byb3RvdHlwZU9mJyxcbiAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAgICAgICAgICdjb25zdHJ1Y3RvcidcbiAgICAgICAgXSxcbiAgICAgICAgZG9udEVudW1zTGVuZ3RoID0gZG9udEVudW1zLmxlbmd0aDtcbiBcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgfHwgb2JqID09PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdCcpO1xuIFxuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuIFxuICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkgcmVzdWx0LnB1c2gocHJvcCk7XG4gICAgICB9XG4gXG4gICAgICBpZiAoaGFzRG9udEVudW1CdWcpIHtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgZG9udEVudW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGRvbnRFbnVtc1tpXSkpIHJlc3VsdC5wdXNoKGRvbnRFbnVtc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9KSgpXG59O1xuXG5cbi8qISBPdmVydGhyb3cgdi4wLjEuMC4gQW4gb3ZlcmZsb3c6YXV0byBwb2x5ZmlsbCBmb3IgcmVzcG9uc2l2ZSBkZXNpZ24uIChjKSAyMDEyOiBTY290dCBKZWhsLCBGaWxhbWVudCBHcm91cCwgSW5jLiBodHRwOi8vZmlsYW1lbnRncm91cC5naXRodWIuY29tL092ZXJ0aHJvdy9saWNlbnNlLnR4dCAqL1xuKGZ1bmN0aW9uKCB3LCB1bmRlZmluZWQgKXtcbiAgICAgXG4gICAgdmFyIGRvYyA9IHcuZG9jdW1lbnQsXG4gICAgICAgIGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBjbGFzc3RleHQgPSBcIm92ZXJ0aHJvdy1lbmFibGVkXCIsXG4gICAgIFxuICAgICAgICAvLyBUb3VjaCBldmVudHMgYXJlIHVzZWQgaW4gdGhlIHBvbHlmaWxsLCBhbmQgdGh1cyBhcmUgYSBwcmVyZXF1aXNpdGVcbiAgICAgICAgY2FuQmVGaWxsZWRXaXRoUG9seSA9IFwib250b3VjaG1vdmVcIiBpbiBkb2MsXG4gICAgICAgICBcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBhdHRlbXB0cyB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgYnJvd3NlciBoYXMgbmF0aXZlIG92ZXJmbG93IHN1cHBvcnRcbiAgICAgICAgLy8gc28gd2UgY2FuIGVuYWJsZSBpdCBidXQgbm90IHBvbHlmaWxsXG4gICAgICAgIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MgPSBcbiAgICAgICAgICAgIC8vIEZlYXR1cmVzLWZpcnN0LiBpT1M1IG92ZXJmbG93IHNjcm9sbGluZyBwcm9wZXJ0eSBjaGVjayAtIG5vIFVBIG5lZWRlZCBoZXJlLiB0aGFua3MgQXBwbGUgOilcbiAgICAgICAgICAgIFwiV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmdcIiBpbiBkb2NFbGVtLnN0eWxlIHx8XG4gICAgICAgICAgICAvLyBUb3VjaCBldmVudHMgYXJlbid0IHN1cHBvcnRlZCBhbmQgc2NyZWVuIHdpZHRoIGlzIGdyZWF0ZXIgdGhhbiBYXG4gICAgICAgICAgICAvLyAuLi5iYXNpY2FsbHksIHRoaXMgaXMgYSBsb29zZSBcImRlc2t0b3AgYnJvd3NlclwiIGNoZWNrLiBcbiAgICAgICAgICAgIC8vIEl0IG1heSB3cm9uZ2x5IG9wdC1pbiB2ZXJ5IGxhcmdlIHRhYmxldHMgd2l0aCBubyB0b3VjaCBzdXBwb3J0LlxuICAgICAgICAgICAgKCAhY2FuQmVGaWxsZWRXaXRoUG9seSAmJiB3LnNjcmVlbi53aWR0aCA+IDEyMDAgKSB8fFxuICAgICAgICAgICAgLy8gSGFuZyBvbiB0byB5b3VyIGhhdHMuXG4gICAgICAgICAgICAvLyBXaGl0ZWxpc3Qgc29tZSBwb3B1bGFyLCBvdmVyZmxvdy1zdXBwb3J0aW5nIG1vYmlsZSBicm93c2VycyBmb3Igbm93IGFuZCB0aGUgZnV0dXJlXG4gICAgICAgICAgICAvLyBUaGVzZSBicm93c2VycyBhcmUga25vd24gdG8gZ2V0IG92ZXJsb3cgc3VwcG9ydCByaWdodCwgYnV0IGdpdmUgdXMgbm8gd2F5IG9mIGRldGVjdGluZyBpdC5cbiAgICAgICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB1YSA9IHcubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAgICAgICAgICAgLy8gV2Via2l0IGNyb3NzZXMgcGxhdGZvcm1zLCBhbmQgdGhlIGJyb3dzZXJzIG9uIG91ciBsaXN0IHJ1biBhdCBsZWFzdCB2ZXJzaW9uIDUzNFxuICAgICAgICAgICAgICAgICAgICB3ZWJraXQgPSB1YS5tYXRjaCggL0FwcGxlV2ViS2l0XFwvKFswLTldKykvICksXG4gICAgICAgICAgICAgICAgICAgIHdrdmVyc2lvbiA9IHdlYmtpdCAmJiB3ZWJraXRbMV0sXG4gICAgICAgICAgICAgICAgICAgIHdrTHRlNTM0ID0gd2Via2l0ICYmIHdrdmVyc2lvbiA+PSA1MzQ7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAvKiBBbmRyb2lkIDMrIHdpdGggd2Via2l0IGd0ZSA1MzRcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKExpbnV4OyBVOyBBbmRyb2lkIDMuMDsgZW4tdXM7IFhvb20gQnVpbGQvSFJJMzkpIEFwcGxlV2ViS2l0LzUzNC4xMyAoS0hUTUwsIGxpa2UgR2Vja28pIFZlcnNpb24vNC4wIFNhZmFyaS81MzQuMTMgKi9cbiAgICAgICAgICAgICAgICAgICAgdWEubWF0Y2goIC9BbmRyb2lkIChbMC05XSspLyApICYmIFJlZ0V4cC4kMSA+PSAzICYmIHdrTHRlNTM0IHx8XG4gICAgICAgICAgICAgICAgICAgIC8qIEJsYWNrYmVycnkgNysgd2l0aCB3ZWJraXQgZ3RlIDUzNFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoQmxhY2tCZXJyeTsgVTsgQmxhY2tCZXJyeSA5OTAwOyBlbi1VUykgQXBwbGVXZWJLaXQvNTM0LjExKyAoS0hUTUwsIGxpa2UgR2Vja28pIFZlcnNpb24vNy4wLjAgTW9iaWxlIFNhZmFyaS81MzQuMTErICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvIFZlcnNpb25cXC8oWzAtOV0rKS8gKSAmJiBSZWdFeHAuJDEgPj0gMCAmJiB3LmJsYWNrYmVycnkgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogQmxhY2tiZXJyeSBQbGF5Ym9vayB3aXRoIHdlYmtpdCBndGUgNTM0XG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChQbGF5Qm9vazsgVTsgUklNIFRhYmxldCBPUyAxLjAuMDsgZW4tVVMpIEFwcGxlV2ViS2l0LzUzNC44KyAoS0hUTUwsIGxpa2UgR2Vja28pIFZlcnNpb24vMC4wLjEgU2FmYXJpLzUzNC44KyAqLyAgXG4gICAgICAgICAgICAgICAgICAgIHVhLmluZGV4T2YoIC9QbGF5Qm9vay8gKSA+IC0xICYmIFJlZ0V4cC4kMSA+PSAwICYmIHdrTHRlNTM0IHx8XG4gICAgICAgICAgICAgICAgICAgIC8qIEZpcmVmb3ggTW9iaWxlIChGZW5uZWMpIDQgYW5kIHVwXG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwLjc7IHJ2OjIuMS4xKSBHZWNrby8gRmlyZWZveC80LjAuMnByZSBGZW5uZWMvNC4wLiAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggL0Zlbm5lY1xcLyhbMC05XSspLyApICYmIFJlZ0V4cC4kMSA+PSA0IHx8XG4gICAgICAgICAgICAgICAgICAgIC8qIFdlYk9TIDMgYW5kIHVwIChUb3VjaFBhZCB0b28pXG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChocC10YWJsZXQ7IExpbnV4OyBocHdPUy8zLjAuMDsgVTsgZW4tVVMpIEFwcGxlV2ViS2l0LzUzNC42IChLSFRNTCwgbGlrZSBHZWNrbykgd09TQnJvd3Nlci8yMzMuNDggU2FmYXJpLzUzNC42IFRvdWNoUGFkLzEuMCAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggL3dPU0Jyb3dzZXJcXC8oWzAtOV0rKS8gKSAmJiBSZWdFeHAuJDEgPj0gMjMzICYmIHdrTHRlNTM0IHx8XG4gICAgICAgICAgICAgICAgICAgIC8qIE5va2lhIEJyb3dzZXIgTjhcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKFN5bWJpYW4vMzsgU2VyaWVzNjAvNS4yIE5va2lhTjgtMDAvMDEyLjAwMjsgUHJvZmlsZS9NSURQLTIuMSBDb25maWd1cmF0aW9uL0NMREMtMS4xICkgQXBwbGVXZWJLaXQvNTMzLjQgKEtIVE1MLCBsaWtlIEdlY2tvKSBOb2tpYUJyb3dzZXIvNy4zLjAgTW9iaWxlIFNhZmFyaS81MzMuNCAzZ3BwLWdiYSBcbiAgICAgICAgICAgICAgICAgICAgfjogTm90ZTogdGhlIE45IGRvZXNuJ3QgaGF2ZSBuYXRpdmUgb3ZlcmZsb3cgd2l0aCBvbmUtZmluZ2VyIHRvdWNoLiB3dGYgKi9cbiAgICAgICAgICAgICAgICAgICAgdWEubWF0Y2goIC9Ob2tpYUJyb3dzZXJcXC8oWzAtOVxcLl0rKS8gKSAmJiBwYXJzZUZsb2F0KFJlZ0V4cC4kMSkgPT09IDcuMyAmJiB3ZWJraXQgJiYgd2t2ZXJzaW9uID49IDUzM1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgIFxuICAgICAgICAvLyBFYXNpbmcgY2FuIHVzZSBhbnkgb2YgUm9iZXJ0IFBlbm5lcidzIGVxdWF0aW9ucyAoaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZ190ZXJtc19vZl91c2UuaHRtbCkuIEJ5IGRlZmF1bHQsIG92ZXJ0aHJvdyBpbmNsdWRlcyBlYXNlLW91dC1jdWJpY1xuICAgICAgICAvLyBhcmd1bWVudHM6IHQgPSBjdXJyZW50IGl0ZXJhdGlvbiwgYiA9IGluaXRpYWwgdmFsdWUsIGMgPSBlbmQgdmFsdWUsIGQgPSB0b3RhbCBpdGVyYXRpb25zXG4gICAgICAgIC8vIHVzZSB3Lm92ZXJ0aHJvdy5lYXNpbmcgdG8gcHJvdmlkZSBhIGN1c3RvbSBmdW5jdGlvbiBleHRlcm5hbGx5LCBvciBwYXNzIGFuIGVhc2luZyBmdW5jdGlvbiBhcyBhIGNhbGxiYWNrIHRvIHRoZSB0b3NzIG1ldGhvZFxuICAgICAgICBkZWZhdWx0RWFzaW5nID0gZnVuY3Rpb24gKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjKigodD10L2QtMSkqdCp0ICsgMSkgKyBiO1xuICAgICAgICB9LCAgXG4gICAgICAgICAgICAgXG4gICAgICAgIGVuYWJsZWQgPSBmYWxzZSxcbiAgICAgICAgIFxuICAgICAgICAvLyBLZWVwZXIgb2YgaW50ZXJ2YWxzXG4gICAgICAgIHRpbWVLZWVwZXIsXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAvKiB0b3NzIHNjcm9sbHMgYW5kIGVsZW1lbnQgd2l0aCBlYXNpbmdcbiAgICAgICAgIFxuICAgICAgICAvLyBlbGVtIGlzIHRoZSBlbGVtZW50IHRvIHNjcm9sbFxuICAgICAgICAvLyBvcHRpb25zIGhhc2g6XG4gICAgICAgICAgICAqIGxlZnQgaXMgdGhlIGRlc2lyZWQgaG9yaXpvbnRhbCBzY3JvbGwuIERlZmF1bHQgaXMgXCIrMFwiLiBGb3IgcmVsYXRpdmUgZGlzdGFuY2VzLCBwYXNzIGEgc3RyaW5nIHdpdGggXCIrXCIgb3IgXCItXCIgaW4gZnJvbnQuXG4gICAgICAgICAgICAqIHRvcCBpcyB0aGUgZGVzaXJlZCB2ZXJ0aWNhbCBzY3JvbGwuIERlZmF1bHQgaXMgXCIrMFwiLiBGb3IgcmVsYXRpdmUgZGlzdGFuY2VzLCBwYXNzIGEgc3RyaW5nIHdpdGggXCIrXCIgb3IgXCItXCIgaW4gZnJvbnQuXG4gICAgICAgICAgICAqIGR1cmF0aW9uIGlzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoZSB0aHJvdyB3aWxsIHRha2UuIERlZmF1bHQgaXMgMTAwLlxuICAgICAgICAgICAgKiBlYXNpbmcgaXMgYW4gb3B0aW9uYWwgY3VzdG9tIGVhc2luZyBmdW5jdGlvbi4gRGVmYXVsdCBpcyB3Lm92ZXJ0aHJvdy5lYXNpbmcuIE11c3QgZm9sbG93IHRoZSBlYXNpbmcgZnVuY3Rpb24gc2lnbmF0dXJlIFxuICAgICAgICAqL1xuICAgICAgICB0b3NzID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMgKXtcbiAgICAgICAgICAgIHZhciBpID0gMCxcbiAgICAgICAgICAgICAgICBzTGVmdCA9IGVsZW0uc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICBzVG9wID0gZWxlbS5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgLy8gVG9zcyBkZWZhdWx0c1xuICAgICAgICAgICAgICAgIG8gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIrMFwiLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIiswXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIGVhc2luZzogdy5vdmVydGhyb3cuZWFzaW5nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmRMZWZ0LCBlbmRUb3A7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBNaXhpbiBiYXNlZCBvbiBwcmVkZWZpbmVkIGRlZmF1bHRzXG4gICAgICAgICAgICBpZiggb3B0aW9ucyApe1xuICAgICAgICAgICAgICAgIGZvciggdmFyIGogaW4gbyApe1xuICAgICAgICAgICAgICAgICAgICBpZiggb3B0aW9uc1sgaiBdICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9bIGogXSA9IG9wdGlvbnNbIGogXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENvbnZlcnQgcmVsYXRpdmUgdmFsdWVzIHRvIGludHNcbiAgICAgICAgICAgIC8vIEZpcnN0IHRoZSBsZWZ0IHZhbFxuICAgICAgICAgICAgaWYoIHR5cGVvZiBvLmxlZnQgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgICAgICAgICAgICBvLmxlZnQgPSBwYXJzZUZsb2F0KCBvLmxlZnQgKTtcbiAgICAgICAgICAgICAgICBlbmRMZWZ0ID0gby5sZWZ0ICsgc0xlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbmRMZWZ0ID0gby5sZWZ0O1xuICAgICAgICAgICAgICAgIG8ubGVmdCA9IG8ubGVmdCAtIHNMZWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlbiB0aGUgdG9wIHZhbFxuICAgICAgICAgICAgaWYoIHR5cGVvZiBvLnRvcCA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgICAgICAgICAgIG8udG9wID0gcGFyc2VGbG9hdCggby50b3AgKTtcbiAgICAgICAgICAgICAgICBlbmRUb3AgPSBvLnRvcCArIHNUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbmRUb3AgPSBvLnRvcDtcbiAgICAgICAgICAgICAgICBvLnRvcCA9IG8udG9wIC0gc1RvcDtcbiAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgIHRpbWVLZWVwZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpeyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIGkrKyA8IG8uZHVyYXRpb24gKXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxMZWZ0ID0gby5lYXNpbmcoIGksIHNMZWZ0LCBvLmxlZnQsIG8uZHVyYXRpb24gKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSBvLmVhc2luZyggaSwgc1RvcCwgby50b3AsIG8uZHVyYXRpb24gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGVuZExlZnQgIT09IGVsZW0uc2Nyb2xsTGVmdCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxMZWZ0ID0gZW5kTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiggZW5kVG9wICE9PSBlbGVtLnNjcm9sbFRvcCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSBlbmRUb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW50ZXJjZXB0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMSApO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSB2YWx1ZXMsIHBvc3QtbWl4aW4sIHdpdGggZW5kIHZhbHVlcyBzcGVjaWZpZWRcbiAgICAgICAgICAgIHJldHVybiB7IHRvcDogZW5kVG9wLCBsZWZ0OiBlbmRMZWZ0LCBkdXJhdGlvbjogby5kdXJhdGlvbiwgZWFzaW5nOiBvLmVhc2luZyB9O1xuICAgICAgICB9LFxuICAgICAgICAgXG4gICAgICAgIC8vIGZpbmQgY2xvc2VzdCBvdmVydGhyb3cgKGVsZW0gb3IgYSBwYXJlbnQpXG4gICAgICAgIGNsb3Nlc3QgPSBmdW5jdGlvbiggdGFyZ2V0LCBhc2NlbmQgKXtcbiAgICAgICAgICAgIHJldHVybiAhYXNjZW5kICYmIHRhcmdldC5jbGFzc05hbWUgJiYgdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCBcIm92ZXJ0aHJvd1wiICkgPiAtMSAmJiB0YXJnZXQgfHwgY2xvc2VzdCggdGFyZ2V0LnBhcmVudE5vZGUgKTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vIEludGVyY2VwdCBhbnkgdGhyb3cgaW4gcHJvZ3Jlc3NcbiAgICAgICAgaW50ZXJjZXB0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoIHRpbWVLZWVwZXIgKTtcbiAgICAgICAgfSxcbiAgICAgICAgICAgICBcbiAgICAgICAgLy8gRW5hYmxlIGFuZCBwb3RlbnRpYWxseSBwb2x5ZmlsbCBvdmVyZmxvd1xuICAgICAgICBlbmFibGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIGl0J3Mgb24sIFxuICAgICAgICAgICAgaWYoIGVuYWJsZWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJdCdzIG9uLlxuICAgICAgICAgICAgZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyBvciBhdCBsZWFzdCB0aGUgZWxlbWVudCBjYW5CZUZpbGxlZFdpdGhQb2x5LCBhZGQgYSBjbGFzcyB0byBjdWUgQ1NTIHRoYXQgYXNzdW1lcyBvdmVyZmxvdyBzY3JvbGxpbmcgd2lsbCB3b3JrIChzZXR0aW5nIGhlaWdodCBvbiBlbGVtZW50cyBhbmQgc3VjaClcbiAgICAgICAgICAgIGlmKCBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzIHx8IGNhbkJlRmlsbGVkV2l0aFBvbHkgKXtcbiAgICAgICAgICAgICAgICBkb2NFbGVtLmNsYXNzTmFtZSArPSBcIiBcIiArIGNsYXNzdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBEZXN0cm95IGV2ZXJ5dGhpbmcgbGF0ZXIuIElmIHlvdSB3YW50IHRvLlxuICAgICAgICAgICAgdy5vdmVydGhyb3cuZm9yZ2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAvLyBTdHJpcCB0aGUgY2xhc3MgbmFtZSBmcm9tIGRvY0VsZW1cbiAgICAgICAgICAgICAgICBkb2NFbGVtLmNsYXNzTmFtZSA9IGRvY0VsZW0uY2xhc3NOYW1lLnJlcGxhY2UoIGNsYXNzdGV4dCwgXCJcIiApO1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0b3VjaCBiaW5kaW5nIChjaGVjayBmb3IgbWV0aG9kIHN1cHBvcnQgc2luY2UgdGhpcyBwYXJ0IGlzbid0IHF1YWxpZmllZCBieSB0b3VjaCBzdXBwb3J0IGxpa2UgdGhlIHJlc3QpXG4gICAgICAgICAgICAgICAgaWYoIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyICl7XG4gICAgICAgICAgICAgICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCBcInRvdWNoc3RhcnRcIiwgc3RhcnQsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IGVhc2luZyB0byBkZWZhdWx0XG4gICAgICAgICAgICAgICAgdy5vdmVydGhyb3cuZWFzaW5nID0gZGVmYXVsdEVhc2luZztcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gTGV0ICdlbSBrbm93XG4gICAgICAgICAgICAgICAgZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgXG4gICAgICAgICAgICAvLyBJZiBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzIG9yIGl0IGRvZXNuJ3QgbG9vayBsaWtlIHRoZSBicm93c2VyIGNhbkJlRmlsbGVkV2l0aFBvbHksIG91ciBqb2IgaXMgZG9uZSBoZXJlLiBFeGl0IHZpZXdwb3J0IGxlZnQuXG4gICAgICAgICAgICBpZiggb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyB8fCAhY2FuQmVGaWxsZWRXaXRoUG9seSApe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiBcbiAgICAgICAgICAgIC8vIEZpbGwgJ2VyIHVwIVxuICAgICAgICAgICAgLy8gRnJvbSBoZXJlIGRvd24sIGFsbCBsb2dpYyBpcyBhc3NvY2lhdGVkIHdpdGggdG91Y2ggc2Nyb2xsIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgLy8gZWxlbSByZWZlcmVuY2VzIHRoZSBvdmVydGhyb3cgZWxlbWVudCBpbiB1c2VcbiAgICAgICAgICAgIHZhciBlbGVtLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUaGUgbGFzdCBzZXZlcmFsIFkgdmFsdWVzIGFyZSBrZXB0IGhlcmVcbiAgICAgICAgICAgICAgICBsYXN0VG9wcyA9IFtdLFxuICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVGhlIGxhc3Qgc2V2ZXJhbCBYIHZhbHVlcyBhcmUga2VwdCBoZXJlXG4gICAgICAgICAgICAgICAgbGFzdExlZnRzID0gW10sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGxhc3REb3duIHdpbGwgYmUgdHJ1ZSBpZiB0aGUgbGFzdCBzY3JvbGwgZGlyZWN0aW9uIHdhcyBkb3duLCBmYWxzZSBpZiBpdCB3YXMgdXBcbiAgICAgICAgICAgICAgICBsYXN0RG93bixcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gbGFzdFJpZ2h0IHdpbGwgYmUgdHJ1ZSBpZiB0aGUgbGFzdCBzY3JvbGwgZGlyZWN0aW9uIHdhcyByaWdodCwgZmFsc2UgaWYgaXQgd2FzIGxlZnRcbiAgICAgICAgICAgICAgICBsYXN0UmlnaHQsXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEZvciBhIG5ldyBnZXN0dXJlLCBvciBjaGFuZ2UgaW4gZGlyZWN0aW9uLCByZXNldCB0aGUgdmFsdWVzIGZyb20gbGFzdCBzY3JvbGxcbiAgICAgICAgICAgICAgICByZXNldFZlcnRUcmFja2luZyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RUb3BzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxhc3REb3duID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXNldEhvclRyYWNraW5nID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdExlZnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxhc3RSaWdodCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcmVsZWFzaW5nIHRvdWNoZW5kLCB0aHJvdyB0aGUgb3ZlcnRocm93IGVsZW1lbnQsIGRlcGVuZGluZyBvbiBtb21lbnR1bVxuICAgICAgICAgICAgICAgIGZpbmlzaFNjcm9sbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvbWUgdXAgd2l0aCBhIGRpc3RhbmNlIGFuZCBkdXJhdGlvbiBiYXNlZCBvbiBob3cgXG4gICAgICAgICAgICAgICAgICAgIC8vIE11bHRpcGxpZXJzIGFyZSB0d2Vha2VkIHRvIGEgY29tZm9ydGFibGUgYmFsYW5jZSBhY3Jvc3MgcGxhdGZvcm1zXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSAoIGxhc3RUb3BzWyAwIF0gLSBsYXN0VG9wc1sgbGFzdFRvcHMubGVuZ3RoIC0xIF0gKSAqIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gKCBsYXN0TGVmdHNbIDAgXSAtIGxhc3RMZWZ0c1sgbGFzdExlZnRzLmxlbmd0aCAtMSBdICkgKiA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gPSBNYXRoLm1heCggTWF0aC5hYnMoIGxlZnQgKSwgTWF0aC5hYnMoIHRvcCApICkgLyA4O1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgdG9wIGFuZCBsZWZ0IHJlbGF0aXZlLXN0eWxlIHN0cmluZ3MgKHBvc2l0aXZlIHZhbHMgbmVlZCBcIitcIiBwcmVmaXgpXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9ICggdG9wID4gMCA/IFwiK1wiIDogXCJcIiApICsgdG9wO1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gKCBsZWZ0ID4gMCA/IFwiK1wiIDogXCJcIiApICsgbGVmdDtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlcmUncyBhIHNpZ25pZmljYW50IGFtb3VudCBvZiB0aHJvdyBpbnZvbHZlZCwgb3RoZXJ3aXNlLCBqdXN0IHN0YXkgc3RpbGxcbiAgICAgICAgICAgICAgICAgICAgaWYoICFpc05hTiggZHVyYXRpb24gKSAmJiBkdXJhdGlvbiA+IDAgJiYgKCBNYXRoLmFicyggbGVmdCApID4gODAgfHwgTWF0aC5hYnMoIHRvcCApID4gODAgKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9zcyggZWxlbSwgeyBsZWZ0OiBsZWZ0LCB0b3A6IHRvcCwgZHVyYXRpb246IGR1cmF0aW9uIH0gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gT24gd2Via2l0LCB0b3VjaCBldmVudHMgaGFyZGx5IHRyaWNrbGUgdGhyb3VnaCB0ZXh0YXJlYXMgYW5kIGlucHV0c1xuICAgICAgICAgICAgICAgIC8vIERpc2FibGluZyBDU1MgcG9pbnRlciBldmVudHMgbWFrZXMgc3VyZSB0aGV5IGRvLCBidXQgaXQgYWxzbyBtYWtlcyB0aGUgY29udHJvbHMgaW5uYWNjZXNzaWJsZVxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsaW5nIHBvaW50ZXIgZXZlbnRzIGF0IHRoZSByaWdodCBtb21lbnRzIHNlZW1zIHRvIGRvIHRoZSB0cmlja1xuICAgICAgICAgICAgICAgIC8vIFRoYW5rcyBUaG9tYXMgQmFjaGVtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzU3OTg2ODEgZm9yIHRoZSBmb2xsb3dpbmdcbiAgICAgICAgICAgICAgICBpbnB1dHMsXG4gICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMgPSBmdW5jdGlvbiggdmFsICl7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0cyA9IGVsZW0ucXVlcnlTZWxlY3RvckFsbCggXCJ0ZXh0YXJlYSwgaW5wdXRcIiApO1xuICAgICAgICAgICAgICAgICAgICBmb3IoIHZhciBpID0gMCwgaWwgPSBpbnB1dHMubGVuZ3RoOyBpIDwgaWw7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0c1sgaSBdLnN0eWxlLnBvaW50ZXJFdmVudHMgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBGb3IgbmVzdGVkIG92ZXJ0aHJvd3MsIGNoYW5nZVNjcm9sbFRhcmdldCByZXN0YXJ0cyBhIHRvdWNoIGV2ZW50IGN5Y2xlIG9uIGEgcGFyZW50IG9yIGNoaWxkIG92ZXJ0aHJvd1xuICAgICAgICAgICAgICAgIGNoYW5nZVNjcm9sbFRhcmdldCA9IGZ1bmN0aW9uKCBzdGFydEV2ZW50LCBhc2NlbmQgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGRvYy5jcmVhdGVFdmVudCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1RhcmdldCA9ICggIWFzY2VuZCB8fCBhc2NlbmQgPT09IHVuZGVmaW5lZCApICYmIGVsZW0ucGFyZW50Tm9kZSB8fCBlbGVtLnRvdWNoY2hpbGQgfHwgZWxlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0RW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggbmV3VGFyZ2V0ICE9PSBlbGVtICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdEVuZCA9IGRvYy5jcmVhdGVFdmVudCggXCJIVE1MRXZlbnRzXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0RW5kLmluaXRFdmVudCggXCJ0b3VjaGVuZFwiLCB0cnVlLCB0cnVlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KCB0RW5kICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFyZ2V0LnRvdWNoY2hpbGQgPSBlbGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBuZXdUYXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFyZ2V0LmRpc3BhdGNoRXZlbnQoIHN0YXJ0RXZlbnQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRvdWNoc3RhcnQgaGFuZGxlclxuICAgICAgICAgICAgICAgIC8vIE9uIHRvdWNoc3RhcnQsIHRvdWNobW92ZSBhbmQgdG91Y2hlbmQgYXJlIGZyZXNobHkgYm91bmQsIGFuZCBhbGwgdGhyZWUgc2hhcmUgYSBidW5jaCBvZiB2YXJzIHNldCBieSB0b3VjaHN0YXJ0XG4gICAgICAgICAgICAgICAgLy8gVG91Y2hlbmQgdW5iaW5kcyB0aGVtIGFnYWluLCB1bnRpbCBuZXh0IHRpbWVcbiAgICAgICAgICAgICAgICBzdGFydCA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RvcCBhbnkgdGhyb3cgaW4gcHJvZ3Jlc3NcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJjZXB0KCk7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIGRpc3RhbmNlIGFuZCBkaXJlY3Rpb24gdHJhY2tpbmdcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRWZXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRIb3JUcmFja2luZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gY2xvc2VzdCggZS50YXJnZXQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoICFlbGVtIHx8IGVsZW0gPT09IGRvY0VsZW0gfHwgZS50b3VjaGVzLmxlbmd0aCA+IDEgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgXG4gXG4gICAgICAgICAgICAgICAgICAgIHNldFBvaW50ZXJzKCBcIm5vbmVcIiApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hTdGFydEUgPSBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVCA9IGVsZW0uc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTCA9IGVsZW0uc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGVsZW0ub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBlbGVtLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRZID0gZS50b3VjaGVzWyAwIF0ucGFnZVksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFggPSBlLnRvdWNoZXNbIDAgXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IGVsZW0uc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsV2lkdGggPSBlbGVtLnNjcm9sbFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb3VjaG1vdmUgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZSA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5ID0gc2Nyb2xsVCArIHN0YXJ0WSAtIGUudG91Y2hlc1sgMCBdLnBhZ2VZLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IHNjcm9sbEwgKyBzdGFydFggLSBlLnRvdWNoZXNbIDAgXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93biA9IHR5ID49ICggbGFzdFRvcHMubGVuZ3RoID8gbGFzdFRvcHNbIDAgXSA6IDAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSB0eCA+PSAoIGxhc3RMZWZ0cy5sZW5ndGggPyBsYXN0TGVmdHNbIDAgXSA6IDAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgcm9vbSB0byBzY3JvbGwgdGhlIGN1cnJlbnQgY29udGFpbmVyLCBwcmV2ZW50IHRoZSBkZWZhdWx0IHdpbmRvdyBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggKCB0eSA+IDAgJiYgdHkgPCBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgKSB8fCAoIHR4ID4gMCAmJiB0eCA8IHNjcm9sbFdpZHRoIC0gd2lkdGggKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgYnViYmxpbmcgaXMgZHVtYi4gTmVlZHMgYSByZXRoaW5rLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTY3JvbGxUYXJnZXQoIHRvdWNoU3RhcnRFICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBkb3duIGFuZCBsYXN0RG93biBhcmUgaW5lcXVhbCwgdGhlIHkgc2Nyb2xsIGhhcyBjaGFuZ2VkIGRpcmVjdGlvbi4gUmVzZXQgdHJhY2tpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGxhc3REb3duICYmIGRvd24gIT09IGxhc3REb3duICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0VmVydFRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiByaWdodCBhbmQgbGFzdFJpZ2h0IGFyZSBpbmVxdWFsLCB0aGUgeCBzY3JvbGwgaGFzIGNoYW5nZWQgZGlyZWN0aW9uLiBSZXNldCB0cmFja2luZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggbGFzdFJpZ2h0ICYmIHJpZ2h0ICE9PSBsYXN0UmlnaHQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRIb3JUcmFja2luZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtZW1iZXIgdGhlIGxhc3QgZGlyZWN0aW9uIGluIHdoaWNoIHdlIHdlcmUgaGVhZGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdERvd24gPSBkb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSaWdodCA9IHJpZ2h0OyAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgY29udGFpbmVyJ3Mgc2Nyb2xsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSB0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgPSB0eDtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VG9wcy51bnNoaWZ0KCB0eSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RMZWZ0cy51bnNoaWZ0KCB0eCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsYXN0VG9wcy5sZW5ndGggPiAzICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUb3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggbGFzdExlZnRzLmxlbmd0aCA+IDMgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdExlZnRzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvdWNoZW5kIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgbW9tZW50dW0gYmFzZWQgZWFzaW5nIGZvciBhIGdyYWNlZnVsIGZpbmlzaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmlzaFNjcm9sbCgpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCcmluZyB0aGUgcG9pbnRlcnMgYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBvaW50ZXJzKCBcImF1dG9cIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBvaW50ZXJzKCBcIm5vbmVcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDQ1MCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ0b3VjaG1vdmVcIiwgbW92ZSwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwidG91Y2hlbmRcIiwgZW5kLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2htb3ZlXCIsIG1vdmUsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaGVuZFwiLCBlbmQsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBCaW5kIHRvIHRvdWNoLCBoYW5kbGUgbW92ZSBhbmQgZW5kIHdpdGhpblxuICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBzdGFydCwgZmFsc2UgKTtcbiAgICAgICAgfTtcbiAgICAgICAgIFxuICAgIC8vIEV4cG9zZSBvdmVydGhyb3cgQVBJXG4gICAgdy5vdmVydGhyb3cgPSB7XG4gICAgICAgIHNldDogZW5hYmxlLFxuICAgICAgICBmb3JnZXQ6IGZ1bmN0aW9uKCl7fSxcbiAgICAgICAgZWFzaW5nOiBkZWZhdWx0RWFzaW5nLFxuICAgICAgICB0b3NzOiB0b3NzLFxuICAgICAgICBpbnRlcmNlcHQ6IGludGVyY2VwdCxcbiAgICAgICAgY2xvc2VzdDogY2xvc2VzdCxcbiAgICAgICAgc3VwcG9ydDogb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyA/IFwibmF0aXZlXCIgOiBjYW5CZUZpbGxlZFdpdGhQb2x5ICYmIFwicG9seWZpbGxlZFwiIHx8IFwibm9uZVwiXG4gICAgfTtcbiAgICAgXG4gICAgLy8gQXV0by1pbml0XG4gICAgZW5hYmxlKCk7XG4gICAgICAgICBcbn0pKCB3aW5kb3cgKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9wb2x5ZmlsbC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=