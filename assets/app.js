/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (() => {

$(document).ready(function () {
  var imgAssets = $('.img-asset');
  var navigation = $('.navigation');
  var sidebarCart = $('.sidebar-cart');
  var cartItems = $('.cart-items');
  var cartCount = $('.cart-count');
  var total = $('.total');
  var isFetching = false;
  $(window).resize(function () {
    imgAssets.each(function (index, item) {
      var desktopImg = $(item).attr('desktop-img');
      var mobileImg = $(item).attr('mobile-img');
      var src = $(window).width() < 767 ? mobileImg : desktopImg;
      $(item).attr('src', src);
    });
  }).resize();
  $('.burger').on('click', function (e) {
    e.preventDefault();
    var isActive = $('.burger').hasClass('active');
    if (!isActive) {
      $('.burger').addClass('active');
      $('body').addClass('disabled-scroll');
      navigation.addClass('active');
      gsap.to(navigation, {
        duration: 0.7,
        x: 0,
        ease: Expo.easeOut
      });
    } else {
      $('body').removeClass('disabled-scroll');
      $('.burger').removeClass('active');
      gsap.to(navigation, {
        duration: 0.3,
        x: '100%',
        ease: Expo.easeIn
      });
    }
  });
  $('.cards-carousel').slick({
    dots: false,
    infinite: false,
    draggable: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [{
      breakpoint: 1380,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: false
      }
    }, {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: false
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        stagePadding: 100,
        variableWidth: true
      }
    }]
  });
  var productsCarousel = $('.products-carousel').slick({
    dots: false,
    infinite: true,
    draggable: true,
    arrows: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true
  });
  $('.btn-arrow-left').on('click', function (e) {
    e.preventDefault();
    productsCarousel.slick('slickPrev');
  });
  $('.btn-arrow-right').on('click', function (e) {
    e.preventDefault();
    productsCarousel.slick('slickNext');
  });
  $('.btn-product').on('click', function (e) {
    e.preventDefault();
    var variantId = $(this).attr('data-variant-id');
    addToCart({
      id: variantId,
      quantity: 1
    });
  });
  $('.btn-cart').on('click', function (e) {
    e.preventDefault();
    openCart();
  });
  $('.btn-close').on('click', function (e) {
    e.preventDefault();
    sidebarCart.removeClass('active');
    gsap.to(sidebarCart, {
      duration: 0.3,
      x: sidebarCart.width(),
      ease: Expo.easeIn,
      onComplete: function onComplete() {
        sidebarCart.removeClass('active');
      }
    });
  });
  function openCart() {
    if (sidebarCart.hasClass('active')) return;
    sidebarCart.addClass('active');
    gsap.to(sidebarCart, {
      duration: 0.3,
      x: 0,
      ease: Expo.easeOut,
      onComplete: function onComplete() {
        getCartItems();
      }
    });
  }
  function addToCart(data) {
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function success(res) {
        console.log("add to cart", res);
        openCart();
      }
    });
  }
  function getCartItems() {
    if (isFetching) return;
    isFetching = true;
    $.ajax({
      type: 'GET',
      url: '/cart.js',
      cache: false,
      dataType: 'json',
      success: function success(cart) {
        console.log('fetch cart', cart);
        isFetching = false;
        var items = cart.items;
        cartItems.html("\n            <div class=\"spinner\">\n              <span class=\"loader\"></span>\n            </div>\n          ");
        var html = '';
        if (cart.items.length > 0) {
          cart.items.map(function (item) {
            html += "\n                <div class=\"cart-item\">\n                  <div class=\"img-wrap\">\n                    <img src=\"".concat(item.featured_image.url, "\">\n                  </div>\n                  <div class=\"content\">\n                    <h4>").concat(item.title, "</h4>\n                    <p>").concat(item.quantity, "</p>\n                    <p>").concat(formatMoney(item.price, cart.currency), "</p>\n                  </div>\n                </div>\n              ");
          });
          cartItems.html(html);
          cartCount.addClass('active').html(cart.item_count);
        } else {
          html = '<p>No cart items...</p>';
          cartItems.html(html);
          cartCount.removeClass('active').html('');
        }
        total.html(formatMoney(cart.total_price, cart.currency));
      }
    });
  }
  getCartItems();
  function formatMoney(price, currency) {
    var convertedPrice = (price / 100).toFixed(2);
    var currencyType = getCurrencySymbol(getLang(), currency);
    return currencyType + convertedPrice;
  }
  function getCurrencySymbol(locale, currency) {
    return 0 .toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).replace(/\d/g, '').trim();
  }
  function getLang() {
    if (navigator.languages != undefined) return navigator.languages[0];
    return navigator.language;
  }
  $(window).on('scroll', function () {
    var st = $(window).scrollTop();
    if (st > 0) {
      $('header').addClass('condensed');
      $('.banner').addClass('condensed');
    } else {
      $('header').removeClass('condensed');
      $('.banner').removeClass('condensed');
    }
  });
});
$(window).on('load', function () {
  // Code to run after window has loaded
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/app": 0,
/******/ 			"assets/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdev_test_ian"] = self["webpackChunkdev_test_ian"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/app"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/app"], () => (__webpack_require__("./src/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;