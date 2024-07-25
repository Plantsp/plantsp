import '../../styles/global.css';
import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer py-4">
      <div className="footer-content mt-4">
        <div className="footer-text">
          <p>Convidamos você a nos seguir nas redes sociais para ficar por dentro das novidades, dicas e eventos.<br/>
          Junte-se à nossa comunidade e acompanhe nosso trabalho de perto!</p>
        </div>
        <div className="footer-social">
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
          <p className="footer-copy">&copy; 2024 Plantsp LTDA.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
