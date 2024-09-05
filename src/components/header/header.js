import './header.css';

import { FaPercent, FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
const logo = process.env.PUBLIC_URL + '/assets/img/logo.png';


function Header() {
  return (
      <header className="header">
        <div className='align-self-center'>
            <img src={logo} alt='logo' className='imglogo'></img>
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
              <li><a href="#atendimento">Atendimento</a></li>
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
          <a href={`/login`}> 
            <FaUser className="icon" />
          </a>
        </div>
      </header>
  );
}

export default Header;