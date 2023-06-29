$(document).ready(() => {
    console.log('Ready');

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
    
})

$(window).on('load', () => {
    console.log("Load");
})