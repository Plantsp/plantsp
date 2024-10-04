import './header.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaPercent, FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
const logo = process.env.PUBLIC_URL + '/assets/img/logo.png';


function Header() {
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <header className="header">
        <div className='align-self-center' onClick={() => Navigate("/")} style={{cursor:"pointer"}}>
            <img src={logo} alt='logo' className='imglogo' ></img>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className='d-flex flex-column px-2 justify-content-end'>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Procure por produto, nome, marca..." 
              className="search-input"
            />
          </div>

          {/* NAVEGAÇÃO DO HEADER */}
          <nav className="navigation">
            <ul className="nav-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#meuspedidos">Meus pedidos</a></li>
              <li><a href="#atendimento" onClick={handleModalOpen}>Atendimento</a></li>
              <li><a href="#sobrenos">Sobre nós</a></li>
              <li><a href="#plantasnativas">Plantas nativas</a></li>
            </ul>
          </nav>

        </div>

        {/* ICONES */}
        <div className="icon-container align-self-center">
          <FaPercent className="icon" />
          <FaShoppingCart className="icon" />
          <FaHeart className="icon" /> 
          <button className='btn-iconuser' onClick={() => Navigate("/login")}> 
            <FaUser className="icon" />
          </button>
        </div>
      </header>

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

export default Header;