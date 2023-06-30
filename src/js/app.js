$(document).ready(() => {
    const imgAssets = $('.img-asset');
    const navigation = $('.navigation-menu');
    const sidebarCart = $('.sidebar-cart');
    const cartItems = $('.cart-items');
    const cartCount = $('.cart-count');
    const total = $('.total');
    let isFetching = false;
  
    $(window).resize(() => {
      imgAssets.each((index, item) => {
        const desktopImg = $(item).attr('desktop-img');
        const mobileImg = $(item).attr('mobile-img');
        const src = $(window).width() < 767 ? mobileImg : desktopImg;
        $(item).attr('src', src);
      });
    }).resize();
  
    $('.burger').on('click', (e) => {
      e.preventDefault();
      const isActive = $('.burger').hasClass('active');
  
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
      responsive: [
        {
          breakpoint: 1380,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: false,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            variableWidth: false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            stagePadding: 100,
            variableWidth: true
          }
        }
      ]
    });
  
    const productsCarousel = $('.products-carousel').slick({
      dots: false,
      infinite: true,
      draggable: true,
      arrows: false,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: true,
    });
  
    $('.btn-arrow-left').on('click', (e) => {
      e.preventDefault();
      productsCarousel.slick('slickPrev');
    });
  
    $('.btn-arrow-right').on('click', (e) => {
      e.preventDefault();
      productsCarousel.slick('slickNext');
    });
  
    $('.btn-product').on('click', function (e) {
      e.preventDefault();
      const variantId = $(this).attr('data-variant-id');
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
        onComplete: function () {
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
        onComplete: function () {
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
        success: function (res) {
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
        success: function (cart) {
          console.log('fetch cart', cart);
          isFetching = false;
          const items = cart.items;
          cartItems.html(`
            <div class="spinner">
              <span class="loader"></span>
            </div>
          `);
  
          let html = '';
          if (cart.items.length > 0) {
            cart.items.map((item) => {
              html += `
                <div class="cart-item">
                  <div class="img-wrap">
                    <img src="${item.featured_image.url}">
                  </div>
                  <div class="content">
                    <h4>${item.title}</h4>
                    <p>${item.quantity}</p>
                    <p>${formatMoney(item.price, cart.currency)}</p>
                  </div>
                </div>
              `;
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
      const convertedPrice = (price / 100).toFixed(2);
      const currencyType = getCurrencySymbol(getLang(), currency);
      return currencyType + convertedPrice;
    }
  
    function getCurrencySymbol(locale, currency) {
      return (0).toLocaleString(
        locale, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      ).replace(/\d/g, '').trim();
    }
  
    function getLang() {
      if (navigator.languages != undefined)
        return navigator.languages[0];
      return navigator.language;
    }
  
    $(window).on('scroll', function () {
      const st = $(window).scrollTop();
      if (st > 0) {
        $('header').addClass('condensed');
        $('.banner').addClass('condensed');
      } else {
        $('header').removeClass('condensed');
        $('.banner').removeClass('condensed');
      }
      stickyNavigation(st)
    });

    function stickyNavigation(st) {
        const nav = '.sticky-navigation';
        if(st >= $('header').height() + 100) {
            gsap.to(nav, {
                duration:0.3,
                y:0,
                ease:Expo.out
            })
        } else {
            gsap.to(nav, {
                duration:0.7,
                y:-100,
                ease:Expo.in
            })
        }
    }
  });
  
  $(window).on('load', () => {
    // Code to run after window has loaded
  });