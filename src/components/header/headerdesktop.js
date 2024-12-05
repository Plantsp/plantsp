import './header.css';
import HeaderMobile from './headermobile';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
import { listaProdutos } from "../../data/produtos"; // Ajuste o caminho conforme necessário.

const logo = process.env.PUBLIC_URL + '/assets/img/logo.png';

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProdutos([]);
    } else {
      const resultados = listaProdutos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (produto.marca && produto.marca.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProdutos(resultados);
    }
  }, [searchTerm]);

  function checarLogin(irPara) {
    if (!usuario) {
      navigate('/login');
    } else{
      navigate(irPara);
    }
  }

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      {isMobile ? (
        <HeaderMobile />
      ) : (
        <header className="header">
          <div className='align-self-center' onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src={logo} alt='logo' className='imglogo' />
          </div>

          {/* BARRA DE PESQUISA */}
          <div className='d-flex flex-column px-2 justify-content-end'>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Procure por produto, nome, marca..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && (
              <div className="search-results">
                {filteredProdutos.length > 0 ? (
                  filteredProdutos.map((produto) => (
                    <div
                    key={produto.id}
                    className="search-item"
                    onClick={() => {
                      setSearchTerm(''); // Limpa o campo de busca
                      setFilteredProdutos([]); // Limpa os resultados
                      navigate(`/produto/${produto.id}`); // Navega para a página do produto
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {produto.nome} - {produto.categoria || ''}
                    </div>
                  ))
                ) : (
                  <div className="search-item">Nenhum produto encontrado</div>
                )}
              </div>
            )}

            {/* NAVEGAÇÃO DO HEADER */}
            <nav className="navigation pt-1">
              <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to={!usuario ? "/login" : "/meuspedidos"}>Meus pedidos</Link></li>
                <li><Link to="" onClick={handleModalOpen}>Atendimento</Link></li>
                <li><Link to="/sobrenos">Sobre nós</Link></li>
                <li><Link to="/promocoes">Promoções</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </nav>
          </div>

          {/* ICONES */}
          <div className="icon-container align-self-center">
            <FaShoppingCart className="icon" onClick={() => checarLogin("/carrinho")} />
            <FaHeart className="icon" onClick={() => checarLogin("/favoritos")} />
            <button className='btn-iconuser' onClick={() => navigate("/login")}>
              <FaUser className="icon" />
            </button>
          </div>
        </header>
      )}

      {/* MODAL DO ATENDIMENTO */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Atendimento</h5>
                <button type="button" className="close" onClick={handleModalClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Telefone: (11) 2575-1652</p>
                <p>Whatsapp: (11) 98274-2236</p>
                <p>Email: nome@exemplo.com</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
