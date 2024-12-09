import React from 'react';
import './SpecialOffer.css';
import { useNavigate } from 'react-router-dom';
const plantalddireito = process.env.PUBLIC_URL + '/assets/img/plantalddireito.png';

function SpecialOffer() {
  const navigate = useNavigate();
  return (
    
    <div className="offer-container d-none d-sm-none d-md-none d-lg-flex d-lg-block">
      {/* Lado esquerdo com as informações */}
      <div className="offer-text">
        <h1>Oferta <br/><span className="especial">ESPECIAL</span></h1>
        <p>Vaso Jardineira Luxo - Grande Floreira em <br></br>Polietileno com Acabamento Grafiato</p>
        <div className="price-container">
          <span className="price-original">De R$ 120,00</span>
          <span className="price-discount">Por R$ 90,00</span>
        </div>
        <button className="btn-ver-mais" onClick={() =>{ window.scrollTo(0, 0);navigate("/promocoes")}}>Ver mais</button>
      </div>

      {/* Lado direito com a imagem e fundo verde */}
      <div className="offer-image-container">
      <img src={plantalddireito} alt='planta' className='offer-image'></img>
      </div>
    </div>
  );
}

export default SpecialOffer;
