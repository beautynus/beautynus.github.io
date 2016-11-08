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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzM4MzM0N2NjZTc2OGJlM2Q3ZGE/ZWNiMiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcG9seWZpbGwuanMiXSwibmFtZXMiOlsiT2JqZWN0Iiwia2V5cyIsImhhc093blByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzRG9udEVudW1CdWciLCJ0b1N0cmluZyIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiZG9udEVudW1zIiwiZG9udEVudW1zTGVuZ3RoIiwibGVuZ3RoIiwib2JqIiwiVHlwZUVycm9yIiwicmVzdWx0IiwicHJvcCIsImNhbGwiLCJwdXNoIiwiaSIsInciLCJ1bmRlZmluZWQiLCJkb2MiLCJkb2N1bWVudCIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc3RleHQiLCJjYW5CZUZpbGxlZFdpdGhQb2x5Iiwib3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyIsInN0eWxlIiwic2NyZWVuIiwid2lkdGgiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIndlYmtpdCIsIm1hdGNoIiwid2t2ZXJzaW9uIiwid2tMdGU1MzQiLCJSZWdFeHAiLCIkMSIsImJsYWNrYmVycnkiLCJpbmRleE9mIiwicGFyc2VGbG9hdCIsImRlZmF1bHRFYXNpbmciLCJ0IiwiYiIsImMiLCJkIiwiZW5hYmxlZCIsInRpbWVLZWVwZXIiLCJ0b3NzIiwiZWxlbSIsIm9wdGlvbnMiLCJzTGVmdCIsInNjcm9sbExlZnQiLCJzVG9wIiwic2Nyb2xsVG9wIiwibyIsInRvcCIsImxlZnQiLCJkdXJhdGlvbiIsImVhc2luZyIsIm92ZXJ0aHJvdyIsImVuZExlZnQiLCJlbmRUb3AiLCJqIiwic2V0SW50ZXJ2YWwiLCJpbnRlcmNlcHQiLCJjbG9zZXN0IiwidGFyZ2V0IiwiYXNjZW5kIiwiY2xhc3NOYW1lIiwicGFyZW50Tm9kZSIsImNsZWFySW50ZXJ2YWwiLCJlbmFibGUiLCJmb3JnZXQiLCJyZXBsYWNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInN0YXJ0IiwibGFzdFRvcHMiLCJsYXN0TGVmdHMiLCJsYXN0RG93biIsImxhc3RSaWdodCIsInJlc2V0VmVydFRyYWNraW5nIiwicmVzZXRIb3JUcmFja2luZyIsImZpbmlzaFNjcm9sbCIsIk1hdGgiLCJtYXgiLCJhYnMiLCJpc05hTiIsImlucHV0cyIsInNldFBvaW50ZXJzIiwidmFsIiwicXVlcnlTZWxlY3RvckFsbCIsImlsIiwicG9pbnRlckV2ZW50cyIsImNoYW5nZVNjcm9sbFRhcmdldCIsInN0YXJ0RXZlbnQiLCJjcmVhdGVFdmVudCIsIm5ld1RhcmdldCIsInRvdWNoY2hpbGQiLCJ0RW5kIiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImUiLCJ0b3VjaGVzIiwidG91Y2hTdGFydEUiLCJzY3JvbGxUIiwic2Nyb2xsTCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwic3RhcnRZIiwicGFnZVkiLCJzdGFydFgiLCJwYWdlWCIsInNjcm9sbEhlaWdodCIsInNjcm9sbFdpZHRoIiwibW92ZSIsInR5IiwidHgiLCJkb3duIiwicmlnaHQiLCJwcmV2ZW50RGVmYXVsdCIsInVuc2hpZnQiLCJwb3AiLCJlbmQiLCJzZXRUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldCIsInN1cHBvcnQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ3RDQTs7Ozs7QUFLQSxLQUFJLENBQUNBLE9BQU9DLElBQVosRUFBa0I7QUFDaEJELFlBQU9DLElBQVAsR0FBZSxZQUFZO0FBQ3pCLGFBQUlDLGlCQUFpQkYsT0FBT0csU0FBUCxDQUFpQkQsY0FB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OztBQW9LQTtBQUNBekcsYUFBSTJHLGdCQUFKLENBQXNCLFlBQXRCLEVBQW9DbEQsS0FBcEMsRUFBMkMsS0FBM0M7QUFDSCxNQTFWTDs7QUE0VkE7QUFDQTNELE9BQUUyQyxTQUFGLEdBQWM7QUFDVm1FLGNBQUt2RCxNQURLO0FBRVZDLGlCQUFRLGtCQUFVLENBQUUsQ0FGVjtBQUdWZCxpQkFBUWxCLGFBSEU7QUFJVk8sZUFBTUEsSUFKSTtBQUtWaUIsb0JBQVdBLFNBTEQ7QUFNVkMsa0JBQVNBLE9BTkM7QUFPVjhELGtCQUFTdkcsK0JBQStCLFFBQS9CLEdBQTBDRCx1QkFBdUIsWUFBdkIsSUFBdUM7QUFQaEYsTUFBZDs7QUFVQTtBQUNBZ0Q7QUFFSCxFQTVXRCxFQTRXSXlELE1BNVdKLEUiLCJmaWxlIjoicG9seWZpbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3MzgzMzQ3Y2NlNzY4YmUzZDdkYVxuICoqLyIsIi8qKlxuICogUG9seWZpbGwgZm9yIE9iamVjdC5rZXlzXG4gKlxuICogQHNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3Qva2V5c1xuICovXG5pZiAoIU9iamVjdC5rZXlzKSB7XG4gIE9iamVjdC5rZXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuICAgICAgICBoYXNEb250RW51bUJ1ZyA9ICEoe3RvU3RyaW5nOiBudWxsfSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyksXG4gICAgICAgIGRvbnRFbnVtcyA9IFtcbiAgICAgICAgICAndG9TdHJpbmcnLFxuICAgICAgICAgICd0b0xvY2FsZVN0cmluZycsXG4gICAgICAgICAgJ3ZhbHVlT2YnLFxuICAgICAgICAgICdoYXNPd25Qcm9wZXJ0eScsXG4gICAgICAgICAgJ2lzUHJvdG90eXBlT2YnLFxuICAgICAgICAgICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICAgICAgICAgJ2NvbnN0cnVjdG9yJ1xuICAgICAgICBdLFxuICAgICAgICBkb250RW51bXNMZW5ndGggPSBkb250RW51bXMubGVuZ3RoO1xuIFxuICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJyB8fCBvYmogPT09IG51bGwpIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBub24tb2JqZWN0Jyk7XG4gXG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gXG4gICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgIH1cbiBcbiAgICAgIGlmIChoYXNEb250RW51bUJ1Zykge1xuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBkb250RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZG9udEVudW1zW2ldKSkgcmVzdWx0LnB1c2goZG9udEVudW1zW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pKClcbn07XG5cblxuLyohIE92ZXJ0aHJvdyB2LjAuMS4wLiBBbiBvdmVyZmxvdzphdXRvIHBvbHlmaWxsIGZvciByZXNwb25zaXZlIGRlc2lnbi4gKGMpIDIwMTI6IFNjb3R0IEplaGwsIEZpbGFtZW50IEdyb3VwLCBJbmMuIGh0dHA6Ly9maWxhbWVudGdyb3VwLmdpdGh1Yi5jb20vT3ZlcnRocm93L2xpY2Vuc2UudHh0ICovXG4oZnVuY3Rpb24oIHcsIHVuZGVmaW5lZCApe1xuICAgICBcbiAgICB2YXIgZG9jID0gdy5kb2N1bWVudCxcbiAgICAgICAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIGNsYXNzdGV4dCA9IFwib3ZlcnRocm93LWVuYWJsZWRcIixcbiAgICAgXG4gICAgICAgIC8vIFRvdWNoIGV2ZW50cyBhcmUgdXNlZCBpbiB0aGUgcG9seWZpbGwsIGFuZCB0aHVzIGFyZSBhIHByZXJlcXVpc2l0ZVxuICAgICAgICBjYW5CZUZpbGxlZFdpdGhQb2x5ID0gXCJvbnRvdWNobW92ZVwiIGluIGRvYyxcbiAgICAgICAgIFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGF0dGVtcHRzIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBicm93c2VyIGhhcyBuYXRpdmUgb3ZlcmZsb3cgc3VwcG9ydFxuICAgICAgICAvLyBzbyB3ZSBjYW4gZW5hYmxlIGl0IGJ1dCBub3QgcG9seWZpbGxcbiAgICAgICAgb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyA9IFxuICAgICAgICAgICAgLy8gRmVhdHVyZXMtZmlyc3QuIGlPUzUgb3ZlcmZsb3cgc2Nyb2xsaW5nIHByb3BlcnR5IGNoZWNrIC0gbm8gVUEgbmVlZGVkIGhlcmUuIHRoYW5rcyBBcHBsZSA6KVxuICAgICAgICAgICAgXCJXZWJraXRPdmVyZmxvd1Njcm9sbGluZ1wiIGluIGRvY0VsZW0uc3R5bGUgfHxcbiAgICAgICAgICAgIC8vIFRvdWNoIGV2ZW50cyBhcmVuJ3Qgc3VwcG9ydGVkIGFuZCBzY3JlZW4gd2lkdGggaXMgZ3JlYXRlciB0aGFuIFhcbiAgICAgICAgICAgIC8vIC4uLmJhc2ljYWxseSwgdGhpcyBpcyBhIGxvb3NlIFwiZGVza3RvcCBicm93c2VyXCIgY2hlY2suIFxuICAgICAgICAgICAgLy8gSXQgbWF5IHdyb25nbHkgb3B0LWluIHZlcnkgbGFyZ2UgdGFibGV0cyB3aXRoIG5vIHRvdWNoIHN1cHBvcnQuXG4gICAgICAgICAgICAoICFjYW5CZUZpbGxlZFdpdGhQb2x5ICYmIHcuc2NyZWVuLndpZHRoID4gMTIwMCApIHx8XG4gICAgICAgICAgICAvLyBIYW5nIG9uIHRvIHlvdXIgaGF0cy5cbiAgICAgICAgICAgIC8vIFdoaXRlbGlzdCBzb21lIHBvcHVsYXIsIG92ZXJmbG93LXN1cHBvcnRpbmcgbW9iaWxlIGJyb3dzZXJzIGZvciBub3cgYW5kIHRoZSBmdXR1cmVcbiAgICAgICAgICAgIC8vIFRoZXNlIGJyb3dzZXJzIGFyZSBrbm93biB0byBnZXQgb3ZlcmxvdyBzdXBwb3J0IHJpZ2h0LCBidXQgZ2l2ZSB1cyBubyB3YXkgb2YgZGV0ZWN0aW5nIGl0LlxuICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHVhID0gdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgICAgICAgICAgICAvLyBXZWJraXQgY3Jvc3NlcyBwbGF0Zm9ybXMsIGFuZCB0aGUgYnJvd3NlcnMgb24gb3VyIGxpc3QgcnVuIGF0IGxlYXN0IHZlcnNpb24gNTM0XG4gICAgICAgICAgICAgICAgICAgIHdlYmtpdCA9IHVhLm1hdGNoKCAvQXBwbGVXZWJLaXRcXC8oWzAtOV0rKS8gKSxcbiAgICAgICAgICAgICAgICAgICAgd2t2ZXJzaW9uID0gd2Via2l0ICYmIHdlYmtpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgd2tMdGU1MzQgPSB3ZWJraXQgJiYgd2t2ZXJzaW9uID49IDUzNDtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIC8qIEFuZHJvaWQgMysgd2l0aCB3ZWJraXQgZ3RlIDUzNFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoTGludXg7IFU7IEFuZHJvaWQgMy4wOyBlbi11czsgWG9vbSBCdWlsZC9IUkkzOSkgQXBwbGVXZWJLaXQvNTM0LjEzIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi80LjAgU2FmYXJpLzUzNC4xMyAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggL0FuZHJvaWQgKFswLTldKykvICkgJiYgUmVnRXhwLiQxID49IDMgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogQmxhY2tiZXJyeSA3KyB3aXRoIHdlYmtpdCBndGUgNTM0XG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChCbGFja0JlcnJ5OyBVOyBCbGFja0JlcnJ5IDk5MDA7IGVuLVVTKSBBcHBsZVdlYktpdC81MzQuMTErIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi83LjAuMCBNb2JpbGUgU2FmYXJpLzUzNC4xMSsgKi9cbiAgICAgICAgICAgICAgICAgICAgdWEubWF0Y2goIC8gVmVyc2lvblxcLyhbMC05XSspLyApICYmIFJlZ0V4cC4kMSA+PSAwICYmIHcuYmxhY2tiZXJyeSAmJiB3a0x0ZTUzNCB8fFxuICAgICAgICAgICAgICAgICAgICAvKiBCbGFja2JlcnJ5IFBsYXlib29rIHdpdGggd2Via2l0IGd0ZSA1MzRcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKFBsYXlCb29rOyBVOyBSSU0gVGFibGV0IE9TIDEuMC4wOyBlbi1VUykgQXBwbGVXZWJLaXQvNTM0LjgrIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi8wLjAuMSBTYWZhcmkvNTM0LjgrICovICBcbiAgICAgICAgICAgICAgICAgICAgdWEuaW5kZXhPZiggL1BsYXlCb29rLyApID4gLTEgJiYgUmVnRXhwLiQxID49IDAgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogRmlyZWZveCBNb2JpbGUgKEZlbm5lYykgNCBhbmQgdXBcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTAuNzsgcnY6Mi4xLjEpIEdlY2tvLyBGaXJlZm94LzQuMC4ycHJlIEZlbm5lYy80LjAuICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvRmVubmVjXFwvKFswLTldKykvICkgJiYgUmVnRXhwLiQxID49IDQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogV2ViT1MgMyBhbmQgdXAgKFRvdWNoUGFkIHRvbylcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKGhwLXRhYmxldDsgTGludXg7IGhwd09TLzMuMC4wOyBVOyBlbi1VUykgQXBwbGVXZWJLaXQvNTM0LjYgKEtIVE1MLCBsaWtlIEdlY2tvKSB3T1NCcm93c2VyLzIzMy40OCBTYWZhcmkvNTM0LjYgVG91Y2hQYWQvMS4wICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvd09TQnJvd3NlclxcLyhbMC05XSspLyApICYmIFJlZ0V4cC4kMSA+PSAyMzMgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogTm9raWEgQnJvd3NlciBOOFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoU3ltYmlhbi8zOyBTZXJpZXM2MC81LjIgTm9raWFOOC0wMC8wMTIuMDAyOyBQcm9maWxlL01JRFAtMi4xIENvbmZpZ3VyYXRpb24vQ0xEQy0xLjEgKSBBcHBsZVdlYktpdC81MzMuNCAoS0hUTUwsIGxpa2UgR2Vja28pIE5va2lhQnJvd3Nlci83LjMuMCBNb2JpbGUgU2FmYXJpLzUzMy40IDNncHAtZ2JhIFxuICAgICAgICAgICAgICAgICAgICB+OiBOb3RlOiB0aGUgTjkgZG9lc24ndCBoYXZlIG5hdGl2ZSBvdmVyZmxvdyB3aXRoIG9uZS1maW5nZXIgdG91Y2guIHd0ZiAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggL05va2lhQnJvd3NlclxcLyhbMC05XFwuXSspLyApICYmIHBhcnNlRmxvYXQoUmVnRXhwLiQxKSA9PT0gNy4zICYmIHdlYmtpdCAmJiB3a3ZlcnNpb24gPj0gNTMzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICAgXG4gICAgICAgIC8vIEVhc2luZyBjYW4gdXNlIGFueSBvZiBSb2JlcnQgUGVubmVyJ3MgZXF1YXRpb25zIChodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vZWFzaW5nX3Rlcm1zX29mX3VzZS5odG1sKS4gQnkgZGVmYXVsdCwgb3ZlcnRocm93IGluY2x1ZGVzIGVhc2Utb3V0LWN1YmljXG4gICAgICAgIC8vIGFyZ3VtZW50czogdCA9IGN1cnJlbnQgaXRlcmF0aW9uLCBiID0gaW5pdGlhbCB2YWx1ZSwgYyA9IGVuZCB2YWx1ZSwgZCA9IHRvdGFsIGl0ZXJhdGlvbnNcbiAgICAgICAgLy8gdXNlIHcub3ZlcnRocm93LmVhc2luZyB0byBwcm92aWRlIGEgY3VzdG9tIGZ1bmN0aW9uIGV4dGVybmFsbHksIG9yIHBhc3MgYW4gZWFzaW5nIGZ1bmN0aW9uIGFzIGEgY2FsbGJhY2sgdG8gdGhlIHRvc3MgbWV0aG9kXG4gICAgICAgIGRlZmF1bHRFYXNpbmcgPSBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMqKCh0PXQvZC0xKSp0KnQgKyAxKSArIGI7XG4gICAgICAgIH0sICBcbiAgICAgICAgICAgICBcbiAgICAgICAgZW5hYmxlZCA9IGZhbHNlLFxuICAgICAgICAgXG4gICAgICAgIC8vIEtlZXBlciBvZiBpbnRlcnZhbHNcbiAgICAgICAgdGltZUtlZXBlcixcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8qIHRvc3Mgc2Nyb2xscyBhbmQgZWxlbWVudCB3aXRoIGVhc2luZ1xuICAgICAgICAgXG4gICAgICAgIC8vIGVsZW0gaXMgdGhlIGVsZW1lbnQgdG8gc2Nyb2xsXG4gICAgICAgIC8vIG9wdGlvbnMgaGFzaDpcbiAgICAgICAgICAgICogbGVmdCBpcyB0aGUgZGVzaXJlZCBob3Jpem9udGFsIHNjcm9sbC4gRGVmYXVsdCBpcyBcIiswXCIuIEZvciByZWxhdGl2ZSBkaXN0YW5jZXMsIHBhc3MgYSBzdHJpbmcgd2l0aCBcIitcIiBvciBcIi1cIiBpbiBmcm9udC5cbiAgICAgICAgICAgICogdG9wIGlzIHRoZSBkZXNpcmVkIHZlcnRpY2FsIHNjcm9sbC4gRGVmYXVsdCBpcyBcIiswXCIuIEZvciByZWxhdGl2ZSBkaXN0YW5jZXMsIHBhc3MgYSBzdHJpbmcgd2l0aCBcIitcIiBvciBcIi1cIiBpbiBmcm9udC5cbiAgICAgICAgICAgICogZHVyYXRpb24gaXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIHRocm93IHdpbGwgdGFrZS4gRGVmYXVsdCBpcyAxMDAuXG4gICAgICAgICAgICAqIGVhc2luZyBpcyBhbiBvcHRpb25hbCBjdXN0b20gZWFzaW5nIGZ1bmN0aW9uLiBEZWZhdWx0IGlzIHcub3ZlcnRocm93LmVhc2luZy4gTXVzdCBmb2xsb3cgdGhlIGVhc2luZyBmdW5jdGlvbiBzaWduYXR1cmUgXG4gICAgICAgICovXG4gICAgICAgIHRvc3MgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucyApe1xuICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgIHNMZWZ0ID0gZWxlbS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHNUb3AgPSBlbGVtLnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAvLyBUb3NzIGRlZmF1bHRzXG4gICAgICAgICAgICAgICAgbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIiswXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiKzBcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiB3Lm92ZXJ0aHJvdy5lYXNpbmdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZExlZnQsIGVuZFRvcDtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE1peGluIGJhc2VkIG9uIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgICAgICAgIGlmKCBvcHRpb25zICl7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaiBpbiBvICl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvcHRpb25zWyBqIF0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb1sgaiBdID0gb3B0aW9uc1sgaiBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ29udmVydCByZWxhdGl2ZSB2YWx1ZXMgdG8gaW50c1xuICAgICAgICAgICAgLy8gRmlyc3QgdGhlIGxlZnQgdmFsXG4gICAgICAgICAgICBpZiggdHlwZW9mIG8ubGVmdCA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgICAgICAgICAgIG8ubGVmdCA9IHBhcnNlRmxvYXQoIG8ubGVmdCApO1xuICAgICAgICAgICAgICAgIGVuZExlZnQgPSBvLmxlZnQgKyBzTGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuZExlZnQgPSBvLmxlZnQ7XG4gICAgICAgICAgICAgICAgby5sZWZ0ID0gby5sZWZ0IC0gc0xlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIHRoZSB0b3AgdmFsXG4gICAgICAgICAgICBpZiggdHlwZW9mIG8udG9wID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgICAgICAgICAgby50b3AgPSBwYXJzZUZsb2F0KCBvLnRvcCApO1xuICAgICAgICAgICAgICAgIGVuZFRvcCA9IG8udG9wICsgc1RvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuZFRvcCA9IG8udG9wO1xuICAgICAgICAgICAgICAgIG8udG9wID0gby50b3AgLSBzVG9wO1xuICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgdGltZUtlZXBlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggaSsrIDwgby5kdXJhdGlvbiApe1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgPSBvLmVhc2luZyggaSwgc0xlZnQsIG8ubGVmdCwgby5kdXJhdGlvbiApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IG8uZWFzaW5nKCBpLCBzVG9wLCBvLnRvcCwgby5kdXJhdGlvbiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZiggZW5kTGVmdCAhPT0gZWxlbS5zY3JvbGxMZWZ0ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgPSBlbmRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKCBlbmRUb3AgIT09IGVsZW0uc2Nyb2xsVG9wICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IGVuZFRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxICk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHZhbHVlcywgcG9zdC1taXhpbiwgd2l0aCBlbmQgdmFsdWVzIHNwZWNpZmllZFxuICAgICAgICAgICAgcmV0dXJuIHsgdG9wOiBlbmRUb3AsIGxlZnQ6IGVuZExlZnQsIGR1cmF0aW9uOiBvLmR1cmF0aW9uLCBlYXNpbmc6IG8uZWFzaW5nIH07XG4gICAgICAgIH0sXG4gICAgICAgICBcbiAgICAgICAgLy8gZmluZCBjbG9zZXN0IG92ZXJ0aHJvdyAoZWxlbSBvciBhIHBhcmVudClcbiAgICAgICAgY2xvc2VzdCA9IGZ1bmN0aW9uKCB0YXJnZXQsIGFzY2VuZCApe1xuICAgICAgICAgICAgcmV0dXJuICFhc2NlbmQgJiYgdGFyZ2V0LmNsYXNzTmFtZSAmJiB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoIFwib3ZlcnRocm93XCIgKSA+IC0xICYmIHRhcmdldCB8fCBjbG9zZXN0KCB0YXJnZXQucGFyZW50Tm9kZSApO1xuICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gSW50ZXJjZXB0IGFueSB0aHJvdyBpbiBwcm9ncmVzc1xuICAgICAgICBpbnRlcmNlcHQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCggdGltZUtlZXBlciApO1xuICAgICAgICB9LFxuICAgICAgICAgICAgIFxuICAgICAgICAvLyBFbmFibGUgYW5kIHBvdGVudGlhbGx5IHBvbHlmaWxsIG92ZXJmbG93XG4gICAgICAgIGVuYWJsZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgaXQncyBvbiwgXG4gICAgICAgICAgICBpZiggZW5hYmxlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEl0J3Mgb24uXG4gICAgICAgICAgICBlbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzIG9yIGF0IGxlYXN0IHRoZSBlbGVtZW50IGNhbkJlRmlsbGVkV2l0aFBvbHksIGFkZCBhIGNsYXNzIHRvIGN1ZSBDU1MgdGhhdCBhc3N1bWVzIG92ZXJmbG93IHNjcm9sbGluZyB3aWxsIHdvcmsgKHNldHRpbmcgaGVpZ2h0IG9uIGVsZW1lbnRzIGFuZCBzdWNoKVxuICAgICAgICAgICAgaWYoIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MgfHwgY2FuQmVGaWxsZWRXaXRoUG9seSApe1xuICAgICAgICAgICAgICAgIGRvY0VsZW0uY2xhc3NOYW1lICs9IFwiIFwiICsgY2xhc3N0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIERlc3Ryb3kgZXZlcnl0aGluZyBsYXRlci4gSWYgeW91IHdhbnQgdG8uXG4gICAgICAgICAgICB3Lm92ZXJ0aHJvdy5mb3JnZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vIFN0cmlwIHRoZSBjbGFzcyBuYW1lIGZyb20gZG9jRWxlbVxuICAgICAgICAgICAgICAgIGRvY0VsZW0uY2xhc3NOYW1lID0gZG9jRWxlbS5jbGFzc05hbWUucmVwbGFjZSggY2xhc3N0ZXh0LCBcIlwiICk7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRvdWNoIGJpbmRpbmcgKGNoZWNrIGZvciBtZXRob2Qgc3VwcG9ydCBzaW5jZSB0aGlzIHBhcnQgaXNuJ3QgcXVhbGlmaWVkIGJ5IHRvdWNoIHN1cHBvcnQgbGlrZSB0aGUgcmVzdClcbiAgICAgICAgICAgICAgICBpZiggZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIgKXtcbiAgICAgICAgICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBzdGFydCwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgZWFzaW5nIHRvIGRlZmF1bHRcbiAgICAgICAgICAgICAgICB3Lm92ZXJ0aHJvdy5lYXNpbmcgPSBkZWZhdWx0RWFzaW5nO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBMZXQgJ2VtIGtub3dcbiAgICAgICAgICAgICAgICBlbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICBcbiAgICAgICAgICAgIC8vIElmIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3Mgb3IgaXQgZG9lc24ndCBsb29rIGxpa2UgdGhlIGJyb3dzZXIgY2FuQmVGaWxsZWRXaXRoUG9seSwgb3VyIGpvYiBpcyBkb25lIGhlcmUuIEV4aXQgdmlld3BvcnQgbGVmdC5cbiAgICAgICAgICAgIGlmKCBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzIHx8ICFjYW5CZUZpbGxlZFdpdGhQb2x5ICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgLy8gRmlsbCAnZXIgdXAhXG4gICAgICAgICAgICAvLyBGcm9tIGhlcmUgZG93biwgYWxsIGxvZ2ljIGlzIGFzc29jaWF0ZWQgd2l0aCB0b3VjaCBzY3JvbGwgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICAvLyBlbGVtIHJlZmVyZW5jZXMgdGhlIG92ZXJ0aHJvdyBlbGVtZW50IGluIHVzZVxuICAgICAgICAgICAgdmFyIGVsZW0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRoZSBsYXN0IHNldmVyYWwgWSB2YWx1ZXMgYXJlIGtlcHQgaGVyZVxuICAgICAgICAgICAgICAgIGxhc3RUb3BzID0gW10sXG4gICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUaGUgbGFzdCBzZXZlcmFsIFggdmFsdWVzIGFyZSBrZXB0IGhlcmVcbiAgICAgICAgICAgICAgICBsYXN0TGVmdHMgPSBbXSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gbGFzdERvd24gd2lsbCBiZSB0cnVlIGlmIHRoZSBsYXN0IHNjcm9sbCBkaXJlY3Rpb24gd2FzIGRvd24sIGZhbHNlIGlmIGl0IHdhcyB1cFxuICAgICAgICAgICAgICAgIGxhc3REb3duLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBsYXN0UmlnaHQgd2lsbCBiZSB0cnVlIGlmIHRoZSBsYXN0IHNjcm9sbCBkaXJlY3Rpb24gd2FzIHJpZ2h0LCBmYWxzZSBpZiBpdCB3YXMgbGVmdFxuICAgICAgICAgICAgICAgIGxhc3RSaWdodCxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRm9yIGEgbmV3IGdlc3R1cmUsIG9yIGNoYW5nZSBpbiBkaXJlY3Rpb24sIHJlc2V0IHRoZSB2YWx1ZXMgZnJvbSBsYXN0IHNjcm9sbFxuICAgICAgICAgICAgICAgIHJlc2V0VmVydFRyYWNraW5nID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRvcHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdERvd24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc2V0SG9yVHJhY2tpbmcgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0TGVmdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBZnRlciByZWxlYXNpbmcgdG91Y2hlbmQsIHRocm93IHRoZSBvdmVydGhyb3cgZWxlbWVudCwgZGVwZW5kaW5nIG9uIG1vbWVudHVtXG4gICAgICAgICAgICAgICAgZmluaXNoU2Nyb2xsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tZSB1cCB3aXRoIGEgZGlzdGFuY2UgYW5kIGR1cmF0aW9uIGJhc2VkIG9uIGhvdyBcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGllcnMgYXJlIHR3ZWFrZWQgdG8gYSBjb21mb3J0YWJsZSBiYWxhbmNlIGFjcm9zcyBwbGF0Zm9ybXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9ICggbGFzdFRvcHNbIDAgXSAtIGxhc3RUb3BzWyBsYXN0VG9wcy5sZW5ndGggLTEgXSApICogOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoIGxhc3RMZWZ0c1sgMCBdIC0gbGFzdExlZnRzWyBsYXN0TGVmdHMubGVuZ3RoIC0xIF0gKSAqIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IE1hdGgubWF4KCBNYXRoLmFicyggbGVmdCApLCBNYXRoLmFicyggdG9wICkgKSAvIDg7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0b3AgYW5kIGxlZnQgcmVsYXRpdmUtc3R5bGUgc3RyaW5ncyAocG9zaXRpdmUgdmFscyBuZWVkIFwiK1wiIHByZWZpeClcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gKCB0b3AgPiAwID8gXCIrXCIgOiBcIlwiICkgKyB0b3A7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoIGxlZnQgPiAwID8gXCIrXCIgOiBcIlwiICkgKyBsZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSdzIGEgc2lnbmlmaWNhbnQgYW1vdW50IG9mIHRocm93IGludm9sdmVkLCBvdGhlcndpc2UsIGp1c3Qgc3RheSBzdGlsbFxuICAgICAgICAgICAgICAgICAgICBpZiggIWlzTmFOKCBkdXJhdGlvbiApICYmIGR1cmF0aW9uID4gMCAmJiAoIE1hdGguYWJzKCBsZWZ0ICkgPiA4MCB8fCBNYXRoLmFicyggdG9wICkgPiA4MCApICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3NzKCBlbGVtLCB7IGxlZnQ6IGxlZnQsIHRvcDogdG9wLCBkdXJhdGlvbjogZHVyYXRpb24gfSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBPbiB3ZWJraXQsIHRvdWNoIGV2ZW50cyBoYXJkbHkgdHJpY2tsZSB0aHJvdWdoIHRleHRhcmVhcyBhbmQgaW5wdXRzXG4gICAgICAgICAgICAgICAgLy8gRGlzYWJsaW5nIENTUyBwb2ludGVyIGV2ZW50cyBtYWtlcyBzdXJlIHRoZXkgZG8sIGJ1dCBpdCBhbHNvIG1ha2VzIHRoZSBjb250cm9scyBpbm5hY2Nlc3NpYmxlXG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xpbmcgcG9pbnRlciBldmVudHMgYXQgdGhlIHJpZ2h0IG1vbWVudHMgc2VlbXMgdG8gZG8gdGhlIHRyaWNrXG4gICAgICAgICAgICAgICAgLy8gVGhhbmtzIFRob21hcyBCYWNoZW0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTc5ODY4MSBmb3IgdGhlIGZvbGxvd2luZ1xuICAgICAgICAgICAgICAgIGlucHV0cyxcbiAgICAgICAgICAgICAgICBzZXRQb2ludGVycyA9IGZ1bmN0aW9uKCB2YWwgKXtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBcInRleHRhcmVhLCBpbnB1dFwiICk7XG4gICAgICAgICAgICAgICAgICAgIGZvciggdmFyIGkgPSAwLCBpbCA9IGlucHV0cy5sZW5ndGg7IGkgPCBpbDsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzWyBpIF0uc3R5bGUucG9pbnRlckV2ZW50cyA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEZvciBuZXN0ZWQgb3ZlcnRocm93cywgY2hhbmdlU2Nyb2xsVGFyZ2V0IHJlc3RhcnRzIGEgdG91Y2ggZXZlbnQgY3ljbGUgb24gYSBwYXJlbnQgb3IgY2hpbGQgb3ZlcnRocm93XG4gICAgICAgICAgICAgICAgY2hhbmdlU2Nyb2xsVGFyZ2V0ID0gZnVuY3Rpb24oIHN0YXJ0RXZlbnQsIGFzY2VuZCApe1xuICAgICAgICAgICAgICAgICAgICBpZiggZG9jLmNyZWF0ZUV2ZW50ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VGFyZ2V0ID0gKCAhYXNjZW5kIHx8IGFzY2VuZCA9PT0gdW5kZWZpbmVkICkgJiYgZWxlbS5wYXJlbnROb2RlIHx8IGVsZW0udG91Y2hjaGlsZCB8fCBlbGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBuZXdUYXJnZXQgIT09IGVsZW0gKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0RW5kID0gZG9jLmNyZWF0ZUV2ZW50KCBcIkhUTUxFdmVudHNcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRFbmQuaW5pdEV2ZW50KCBcInRvdWNoZW5kXCIsIHRydWUsIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmRpc3BhdGNoRXZlbnQoIHRFbmQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYXJnZXQudG91Y2hjaGlsZCA9IGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IG5ld1RhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYXJnZXQuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVG91Y2hzdGFydCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgLy8gT24gdG91Y2hzdGFydCwgdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBhcmUgZnJlc2hseSBib3VuZCwgYW5kIGFsbCB0aHJlZSBzaGFyZSBhIGJ1bmNoIG9mIHZhcnMgc2V0IGJ5IHRvdWNoc3RhcnRcbiAgICAgICAgICAgICAgICAvLyBUb3VjaGVuZCB1bmJpbmRzIHRoZW0gYWdhaW4sIHVudGlsIG5leHQgdGltZVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIGFueSB0aHJvdyBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHQoKTtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvbiB0cmFja2luZ1xuICAgICAgICAgICAgICAgICAgICByZXNldFZlcnRUcmFja2luZygpO1xuICAgICAgICAgICAgICAgICAgICByZXNldEhvclRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBjbG9zZXN0KCBlLnRhcmdldCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiggIWVsZW0gfHwgZWxlbSA9PT0gZG9jRWxlbSB8fCBlLnRvdWNoZXMubGVuZ3RoID4gMSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMoIFwibm9uZVwiICk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaFN0YXJ0RSA9IGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUID0gZWxlbS5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxMID0gZWxlbS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFkgPSBlLnRvdWNoZXNbIDAgXS5wYWdlWSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WCA9IGUudG91Y2hlc1sgMCBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gZWxlbS5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxXaWR0aCA9IGVsZW0uc2Nyb2xsV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvdWNobW92ZSBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHkgPSBzY3JvbGxUICsgc3RhcnRZIC0gZS50b3VjaGVzWyAwIF0ucGFnZVksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gc2Nyb2xsTCArIHN0YXJ0WCAtIGUudG91Y2hlc1sgMCBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3duID0gdHkgPj0gKCBsYXN0VG9wcy5sZW5ndGggPyBsYXN0VG9wc1sgMCBdIDogMCApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCA9IHR4ID49ICggbGFzdExlZnRzLmxlbmd0aCA/IGxhc3RMZWZ0c1sgMCBdIDogMCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyByb29tIHRvIHNjcm9sbCB0aGUgY3VycmVudCBjb250YWluZXIsIHByZXZlbnQgdGhlIGRlZmF1bHQgd2luZG93IHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAoIHR5ID4gMCAmJiB0eSA8IHNjcm9sbEhlaWdodCAtIGhlaWdodCApIHx8ICggdHggPiAwICYmIHR4IDwgc2Nyb2xsV2lkdGggLSB3aWR0aCApICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBidWJibGluZyBpcyBkdW1iLiBOZWVkcyBhIHJldGhpbmsuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVNjcm9sbFRhcmdldCggdG91Y2hTdGFydEUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGRvd24gYW5kIGxhc3REb3duIGFyZSBpbmVxdWFsLCB0aGUgeSBzY3JvbGwgaGFzIGNoYW5nZWQgZGlyZWN0aW9uLiBSZXNldCB0cmFja2luZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggbGFzdERvd24gJiYgZG93biAhPT0gbGFzdERvd24gKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRWZXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHJpZ2h0IGFuZCBsYXN0UmlnaHQgYXJlIGluZXF1YWwsIHRoZSB4IHNjcm9sbCBoYXMgY2hhbmdlZCBkaXJlY3Rpb24uIFJlc2V0IHRyYWNraW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsYXN0UmlnaHQgJiYgcmlnaHQgIT09IGxhc3RSaWdodCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldEhvclRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciB0aGUgbGFzdCBkaXJlY3Rpb24gaW4gd2hpY2ggd2Ugd2VyZSBoZWFkZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RG93biA9IGRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJpZ2h0ID0gcmlnaHQ7ICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBjb250YWluZXIncyBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IHR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCA9IHR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUb3BzLnVuc2hpZnQoIHR5ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdExlZnRzLnVuc2hpZnQoIHR4ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGxhc3RUb3BzLmxlbmd0aCA+IDMgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRvcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsYXN0TGVmdHMubGVuZ3RoID4gMyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVmdHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG91Y2hlbmQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBtb21lbnR1bSBiYXNlZCBlYXNpbmcgZm9yIGEgZ3JhY2VmdWwgZmluaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoU2Nyb2xsKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJyaW5nIHRoZSBwb2ludGVycyBiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMoIFwiYXV0b1wiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMoIFwibm9uZVwiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDUwICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcInRvdWNobW92ZVwiLCBtb3ZlLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ0b3VjaGVuZFwiLCBlbmQsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaG1vdmVcIiwgbW92ZSwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNoZW5kXCIsIGVuZCwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEJpbmQgdG8gdG91Y2gsIGhhbmRsZSBtb3ZlIGFuZCBlbmQgd2l0aGluXG4gICAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaHN0YXJ0XCIsIHN0YXJ0LCBmYWxzZSApO1xuICAgICAgICB9O1xuICAgICAgICAgXG4gICAgLy8gRXhwb3NlIG92ZXJ0aHJvdyBBUElcbiAgICB3Lm92ZXJ0aHJvdyA9IHtcbiAgICAgICAgc2V0OiBlbmFibGUsXG4gICAgICAgIGZvcmdldDogZnVuY3Rpb24oKXt9LFxuICAgICAgICBlYXNpbmc6IGRlZmF1bHRFYXNpbmcsXG4gICAgICAgIHRvc3M6IHRvc3MsXG4gICAgICAgIGludGVyY2VwdDogaW50ZXJjZXB0LFxuICAgICAgICBjbG9zZXN0OiBjbG9zZXN0LFxuICAgICAgICBzdXBwb3J0OiBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzID8gXCJuYXRpdmVcIiA6IGNhbkJlRmlsbGVkV2l0aFBvbHkgJiYgXCJwb2x5ZmlsbGVkXCIgfHwgXCJub25lXCJcbiAgICB9O1xuICAgICBcbiAgICAvLyBBdXRvLWluaXRcbiAgICBlbmFibGUoKTtcbiAgICAgICAgIFxufSkoIHdpbmRvdyApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3BvbHlmaWxsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==