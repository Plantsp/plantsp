import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

function ImgCarousel() {

    return (
        <div>
            <Swiper 
                pagination={{ clickable: true}}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                className="mySwiper"
                autoplay={{
                    delay: 5000,
                }}
            >

                <SwiperSlide style={{height:"680px"}}> <img className='object-fit-cover' src="/assets/img/i1.jpg" alt="planta"/> </SwiperSlide>
                <SwiperSlide style={{height:"680px"}}><img className='object-fit-cover' src="/assets/img/i4.jpg" alt="planta"/></SwiperSlide>
                <SwiperSlide style={{height:"680px"}}><img className='object-fit-cover h-100' src="/assets/img/i2.jpg" alt="planta"/></SwiperSlide>
                <SwiperSlide style={{height:"680px"}}><img className='object-fit-cover h-100' src="/assets/img/i3.jpg" alt="planta"/></SwiperSlide>
            </Swiper>

        </div>
    );
}
  
export default ImgCarousel;