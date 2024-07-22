import { Col,Row } from 'react-bootstrap';
import './header.css';
import '../../styles/global.css'
import { FaPercent, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
const logo = process.env.PUBLIC_URL + '/assets/img/logo.png';


function Header() {
  return (
      <header className="header">
        <div>
            <img src={logo} alt='logo' className='imglogo'></img>
        </div>

      {/* BARRA DE PESQUISA */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Procure por produto, nome, marca..." 
          className="search-input"
        />
      </div>

      {/* ICONES */}
      <div className="icon-container">
        <FaPercent className="icon" />
        <FaShoppingCart className="icon" />
        <FaUser className="icon" />
      </div>

      </header>
  );
}

export default Header;