$(document).ready(() => {
    $(window).resize(()=>{
        $('.img-asset').each((index, item)=>{
            const desktopImg = $(item).attr('desktop-img');
            const mobileImg = $(item).attr('mobile-img');
            if($(window).width() < 767) {
                $(item).attr('src', mobileImg)
            } else {
                $(item).attr('src', desktopImg)
            }
        })
    }).resize()

    $('.burger').on('click', (e) => {
        e.preventDefault();
        $('.burger').toggleClass('active');
        $('.navigation').toggleClass('active');
    })


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
                    variableWidth:true
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
        centerMode:true,
      });
      $('.btn-arrow-left').on('click', (e) => {
        e.preventDefault();
        productsCarousel.slick('slickPrev');
      })

      $('.btn-arrow-right').on('click', (e) => {
        e.preventDefault();
        productsCarousel.slick('slickNext')
      })


      $('.btn-product').on('click', function(e) {
        e.preventDefault();
        const variantId = $(this).attr('data-variant-id');
        addToCart({
            id: variantId,
            quantity: 1
        });
      })

    
      let isFetching = false;
      $('.btn-cart').on('click', function(e) {
        e.preventDefault();
        gsap.to('.sidebar-cart', {
            duration:0.3,
            x:0,
            ease:Expo.easeOut,
            onComplete:function() {
                getCartItems();
            }
        })
      })

      $('.btn-close').on('click', function(e) {
        e.preventDefault();
        gsap.to('.sidebar-cart', {
            duration:0.3,
            x:$('.sidebar-cart').width(),
            ease:Expo.easeIn,
        })
      })

      function addToCart(data) {
        console.log(data)
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: data,
            dataType: 'json',
            success: function(res) { 
              console.log("add to cart", res);
              getCartItems();
            }
        });
      }

      function getCartItems() {
        if(isFetching) return;
        $.ajax({
            type: 'GET',
            url: '/cart.js',
            cache: false,
            dataType: 'json',
            success: function(cart) {
                console.log('fetch cart', cart);
                isFetching = false
                const items = cart.items
                let html = '';
                if(cart.items.length) {
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
                        
                        `
                    })

                    $('.cart-items').html(html);
                } else {
                    html = '<p>No cart items...</p>'
                }
                $('.total').html(formatMoney(cart.total_price, cart.currency))
            }
        });
        isFetching = true;
      }

      function formatMoney(price, currency) {
        const convertedPrice = (price / 100).toFixed(2);
        const currencyType = getCurrencySymbol(getLang(), currency);
        return currencyType+convertedPrice;
      }

      function getCurrencySymbol (locale, currency) {
        return (0).toLocaleString(
          locale,
          {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }
        ).replace(/\d/g, '').trim()
      }

      function getLang() {
        if (navigator.languages != undefined) 
          return navigator.languages[0]; 
        return navigator.language;
      }
    
})

$(window).on('load', () => {
    console.log("Load");
})