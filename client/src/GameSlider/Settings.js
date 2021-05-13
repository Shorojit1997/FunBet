var settings = {
    dots:false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows:false,
    swipeToSlide: true,
    autoplay: true,
    vertical:true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 0,
                slidesToScroll: 0,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 0,
                slidesToScroll: 0,
                initialSlide: 0
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 0,
                slidesToScroll: 0
            }
        }
    ]
};

export default settings;