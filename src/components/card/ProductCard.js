import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import "./ProductCard.css";
import api from '../../services/api';

function ProductCard({ produto }) {
  const navigate = useNavigate(); // Hook para navegação
  const [isFavorited, setIsFavorited] = useState(false);
  const img = process.env.PUBLIC_URL + produto.imagem;

  // Função para alternar o estado de favorito
  const toggleFavorite = async () => {
    const updatedFavoriteStatus = !isFavorited;
    setIsFavorited(updatedFavoriteStatus);
    
    const favorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
    
    if (updatedFavoriteStatus) {
      favorites.itensfav.push(produto);
    } else {
      const index = favorites.itensfav.findIndex(fav => fav.idprod === produto.idprod);
      if (index > -1) favorites.itensfav.splice(index, 1);
    }

    localStorage.setItem('favoritos', JSON.stringify(favorites));

    try {
      await api.post('favoritos/atualizar', favorites);
    } catch (erro) {
      console.log('Erro atualizar favoritos:', erro.response ? erro.response.data : erro.message);
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if(favorites && favorites.itensfav){
      setIsFavorited(favorites.itensfav.some(fav => fav.idprod === produto.idprod));
    }
  }, [produto.idprod]);

  return (
    <div 
      className="card w-100" 
      style={{ cursor: "pointer" }} 
      onClick={() => {
        window.scrollTo(0, 0);
        console.log("produto clicado: ", produto);
        navigate(`/produto/${produto.idprod}`);
      }}
    > 
      {/* Balão de Desconto */}
      {produto.desconto > 0 && (
        <div className="discount-badge">
          -{Math.round(produto.desconto * 100)}% {/* Exibe o valor do desconto em porcentagem */}
        </div>
      )}

      <img 
        src={img} 
        alt="planta" 
        className="card-img-top object-fit-cover" 
        height={240} 
      />

      {/* Botão do ícone de coração */}
      <button 
        className="btn btn-link position-absolute" 
        style={{ top: '10px', right: '10px', color: isFavorited ? 'red' : '#331800', zIndex: 10 }}
        onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
      >
        <FaHeart size={24} />
      </button>

      <div className="card-body p-2">
        <h5 className="card-title text-truncate">{produto.nome}</h5>
        <p className="card-text">R${produto.valor.toFixed(2).replace(".", ",")}</p>

        {/* Exibe o preço com desconto */}
        {produto.desconto > 0 && (
          <p className="desc">
            R$ {(produto.valor * (1 - produto.desconto)).toFixed(2).replace(".", ",")}
          </p>
        )}

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
