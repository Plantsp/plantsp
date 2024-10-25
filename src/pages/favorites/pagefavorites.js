import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importando ícones de coração
import "./pagefavorite.css";
import Header from '../../components/header/headerdesktop';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (produto) => {
    const isFavorite = favorites.find(fav => fav.id === produto.id);

    if (isFavorite) {
      // Se já estiver favoritado, remove
      const updatedFavorites = favorites.filter(fav => fav.id !== produto.id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Se não estiver favoritado, adiciona
      const updatedFavorites = [...favorites, produto];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div>
      <Header />
      <div className="favorites-page">
        <h2 className="title-top pt-3">PRODUTOS FAVORITOS</h2>
        <p className="favorites-count">Total de produtos favoritados: {favorites.length}</p> {/* Exibe a contagem */}
        {favorites.length > 0 ? (
          <div className="favorites-container">
            {favorites.map(produto => (
              <div key={produto.id} className="favorite-card">
                <img src={process.env.PUBLIC_URL + produto.imagem} alt="planta" className="favorite-card-image" />
                <div className="favorite-card-body">
                  <div className="favorite-card-header">
                    <h5 className="favorite-card-title">{produto.nome}</h5>
                    <div className="favorite-icon" onClick={() => toggleFavorite(produto)}>
                      {favorites.find(fav => fav.id === produto.id) ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </div>
                  </div>
                  <p className="favorite-card-price">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
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
