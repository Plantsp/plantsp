import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';
import { Autoplay } from 'swiper/modules';

function ImgCarousel({products}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div>
            <Swiper 
                pagination={{ clickable: true}}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                className="mySwiper"
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                autoplay={{
                    delay: 5000,
                }}
            >

                <SwiperSlide style={{height:"720px"}}> <img className='object-fit-cover' src="/assets/img/i1.jpg" alt="planta"/> </SwiperSlide>
                <SwiperSlide style={{height:"720px"}}><img className='object-fit-cover' src="/assets/img/i4.jpg" alt="planta"/></SwiperSlide>
                <SwiperSlide style={{height:"720px"}}><img className='object-fit-cover h-100' src="/assets/img/i2.jpg" alt="planta"/></SwiperSlide>
                <SwiperSlide style={{height:"720px"}}><img className='object-fit-cover h-100' src="/assets/img/i3.jpg" alt="planta"/></SwiperSlide>
            </Swiper>

        </div>
    );
}
  
export default ImgCarousel;