import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importando ícones de coração
import "./pagefavorite.css";
import Header from '../../components/header/headerdesktop';
import ReactStars from "react-rating-stars-component";
import api from '../../services/api';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesObj, setFavoritesObj] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritos') || '[]');
    setFavoritesObj(storedFavorites);
    setFavorites(storedFavorites.itensfav);
  }, []);

  const toggleFavorite = async (produto) => {
    const isFavorite = favorites.find(fav => fav.idprod === produto.idprod);

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.idprod !== produto.idprod);
      setFavorites(updatedFavorites);
      
      try {
        let body = {
          idcli: favoritesObj.idcli,
          idfav: favoritesObj.idfav,
          itensfav: updatedFavorites
        }
       
        await api.post('favoritos/atualizar', body);
        localStorage.setItem('favoritos', JSON.stringify(body));

      } catch (erro) {
        console.log('Erro atualizar favoritos:', erro.response ? erro.response.data : erro.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="favorites-page">
        <h2 className="title-top pt-3">Produtos favoritados</h2>
        <p className="favorites-count">Total de produtos favoritados: {favorites.length}</p> {/* Exibe a contagem */}
        {favorites.length > 0 ? (
          <div className="favorites-container">
            {favorites.map(produto => (
              <div key={produto.idprod} className="favorite-card">
                <img src={process.env.PUBLIC_URL + produto.imagem} alt="planta" className="favorite-card-image" />
                <div className="favorite-card-body">
                  <div className="favorite-card-header">
                    <h5 className="favorite-card-title">{produto.nome}</h5>
                    <div className="favorite-icon" onClick={() => toggleFavorite(produto)}>
                      {favorites.find(fav => fav.idprod === produto.idprod) ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </div>
                  </div>
                  <p className="favorite-card-price">R$ {produto.valor.toFixed(2).replace('.', ',')}</p>
                  <p className="favorite-card-desc">R$ {(produto.valor * (1 - produto.desconto)).toFixed(2).replace(".", ",")}</p>
                  
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
            ))}
          </div>
        ) : (
          <p className="no-favorites">Nenhum produto favorito adicionado.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
