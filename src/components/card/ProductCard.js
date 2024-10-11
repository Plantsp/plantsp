import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { FaHeart } from 'react-icons/fa'; // Importando o icone de coração


function ProductCard({produto}) {
  const [isFavorited, setIsFavorited] = useState(false); // Estado para controlar se o produto é favorito
  const img = process.env.PUBLIC_URL + produto.imagem;

    // Função para alternar o estado de favorito
    const toggleFavorite = () => {
      setIsFavorited(prevState => !prevState);
    };

  return (
    <div className="card w-100" style={{ cursor: "pointer" }} onClick={() => console.log("produto clicado: ", produto)}>
        <img src={img} alt='planta' className="card-img-top object-fit-cover" height={240} />

        {/* Botão do ícone de coração */}
      <button className="btn btn-link position-absolute" style={{ top: '10px', right: '10px', color: isFavorited ? 'red' : '#331800', zIndex: 10 }} onClick={toggleFavorite}>
        <FaHeart size={24} />
      </button>

        <div className="card-body p-2">
            <h5 className="card-title text-truncate">{produto.nome}</h5>
            <p className="card-text">R${produto.preco.toString().replace(".", ",")}</p>
            <ReactStars
              count={5}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              isHalf={true}
              edit={false}
              size={24}
              value={produto.avaliacao}
              activeColor="#ffd700"
            />
        </div>
    </div>
  );
}

export default ProductCard;