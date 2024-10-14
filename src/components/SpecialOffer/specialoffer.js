import React from 'react';
import './SpecialOffer.css';
const plantalddireito = process.env.PUBLIC_URL + '/assets/img/plantalddireito.png';

function SpecialOffer() {
  return (
    <div className="offer-container d-none d-sm-none d-md-flex d-md-block">
      {/* Lado esquerdo com as informações */}
      <div className="offer-text">
        <h1>Oferta <br/><span className="especial">ESPECIAL</span></h1>
        <p>Procuramos criar uma ligação profunda entre o <br></br>software e o usuário.</p>
        <div className="price-container">
          <span className="price-original">De R$ 120,00</span>
          <span className="price-discount">Por R$ 90,00</span>
        </div>
        <button className="btn-ver-mais">Ver mais</button>
      </div>

      {/* Lado direito com a imagem e fundo verde */}
      <div className="offer-image-container">
      <img src={plantalddireito} alt='planta' className='offer-image'></img>
      </div>
    </div>
  );
}

export default SpecialOffer;
