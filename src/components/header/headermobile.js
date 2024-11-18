import { useState } from 'react';
import { FaBars, FaSearch, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const logo = process.env.PUBLIC_URL + '/assets/img/logo.png';

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <header className="headerm d-flex justify-content-between align-items-center px-3">
        <div className="menu-icon" onClick={toggleMenu}>
            <FaBars className="icon" />
        </div>

        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src={logo} alt="logo" className="imglogo mx-auto" />
        </div>

        <div className="icon-container">
            <button className="btn-iconuser" onClick={() => navigate("/login")}>
                <FaUser className="icon" />
            </button>
        </div>
      </header>

      <div className="search-bar-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Procure por produto, nome, marca..."
            className="search-input"
          />
        </div>
      </div>
      

      <div className={`overlay-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="navigation">
            <ul className="nav-list">
            <li><Link to="/" onClick={() => navigate("/")}>Home</Link></li>
                <li><Link to="">Meus pedidos</Link></li>
                <li><Link to="" onClick={handleModalOpen}>Atendimento</Link></li>
                <li><Link to="/sobrenos" onClick={() => navigate("/sobrenos")}>Sobre nós</Link></li>
                <li><Link to="/promocoes"onClick={() => navigate("/promocoes")}>Promoções</Link></li>
                <li><Link to="/faq"onClick={() => navigate("/faq")}>FAQ</Link></li>
                <li><Link to="/carrinho"onClick={() => navigate("/carrinho")}>Carrinho</Link></li>
                <li><Link to="/favoritos" onClick={() => navigate("/favoritos")}>Favoritos</Link></li>
            </ul>
        </nav>
    </div>
    

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
                <p>Segunda à Sexta-feira, das 9:00h às 18:00 hrs</p>
                <p>Sábado das 9:00 às 16:00 hrs</p>
                <p>Telefone: 00000-0000</p>
                <p>Whatsapp: 00000-0000</p>
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

export default HeaderMobile;
