import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function ProductCard({ produto }) {
  const navigate = useNavigate(); // Hook para navegação
  const [isFavorited, setIsFavorited] = useState(false);
  const img = process.env.PUBLIC_URL + produto.imagem;

  // Função para alternar o estado de favorito
  const toggleFavorite = () => {
    const updatedFavoriteStatus = !isFavorited;
    setIsFavorited(updatedFavoriteStatus);
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (updatedFavoriteStatus) {
      favorites.push(produto);
    } else {
      const index = favorites.findIndex(fav => fav.id === produto.id);
      if (index > -1) favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.some(fav => fav.id === produto.id));
  }, [produto.id]);

/*
  function openPage(){
    const url = 'http://localhost:3000/produto'; //url da tela de produto
    window.open(url, '_blank');
    console.log("produto clicado: ", produto);
  }*/

  return (
    <div className="card w-100" style={{ cursor: "pointer" }} onClick={() => navigate("/produto")}>
        <img src={img} alt='planta' className="card-img-top object-fit-cover" height={240} />

        {/* Botão do ícone de coração */}
      <button className="btn btn-link position-absolute" 
        style={{ top: '10px', right: '10px', color: isFavorited ? 'red' : '#331800', zIndex: 10 }}
        onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}>
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
