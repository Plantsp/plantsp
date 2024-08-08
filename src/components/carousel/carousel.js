import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";



import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import ProductCard from '../card/ProductCard';

function Carousel({products}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <FaChevronLeft className='btn-prev ' size={48} style={{cursor:"pointer", opacity: currentIndex > 0 ? 1 : 0.3 }} color={"var(--verde-escuro)"}/>

            <Swiper 
                navigation={{
                    nextEl: ".btn-next",
                    prevEl: ".btn-prev"
                }} 
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                className="mySwiper px-5"
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
                {
                    products.map((produto, index) => {
                        return (
                            <SwiperSlide className="d-flex align-items-stretch">
                                <ProductCard produto={produto} key={index}/>
                            </SwiperSlide>
                        )
                    })
                }    
            </Swiper>

            <FaChevronRight className='btn-next' size={48} style={{cursor:"pointer", opacity: currentIndex < 6 ? 1 : 0.3 }} color={"var(--verde-escuro)"}/>
        </div>
      
    );
}
  
export default Carousel;