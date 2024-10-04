import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import './carousel.css';

function ImgCarousel() {
    return (
        <div>
            <Swiper 
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                className="imgSwiper"
                autoplay={{
                    delay: 5000,
                }}
            >
                <SwiperSlide style={{ position: 'relative', height:"640px " }}>
                    <img className='object-fit-cover' src="/assets/img/i1.jpg" alt="planta" style={{ filter: "brightness(0.50)" }}/>
                    <div className="carousel-text">
                        Produtos por até <br/><span>50%</span> de desconto!
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ position: 'relative', height:"640px " }}>
                    <img className='object-fit-cover h-100' src="/assets/img/i4.jpg" alt="planta" style={{ filter: "brightness(0.55)" }}/>
                    <div className="carousel-text">
                    Renove seu jardim <br/>com <span>preços especiais</span>!
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ position: 'relative', height:"640px " }}>
                    <img className='object-fit-cover' src="/assets/img/i2.jpg" alt="planta" style={{ filter: "brightness(0.62)" }}/>
                    <div className="carousel-text">
                    Transforme sua casa <br/><span>com descontos</span>!
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ position: 'relative', height:"640px " }}>
                    <img className='object-fit-cover' src="/assets/img/i3.jpg" alt="planta" style={{ filter: "brightness(0.70)" }}/>
                    <div className="carousel-text">
                        <span>Frete grátis</span> nas compras<br/> acima de R$100!
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default ImgCarousel;
