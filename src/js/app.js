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
    
})

$(window).on('load', () => {
    console.log("Load");
})