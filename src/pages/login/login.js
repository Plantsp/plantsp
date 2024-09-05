import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Importa o ícone do Google
import './login.css'; 
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica para processar o login
      console.log('Email:', email);
      console.log('Senha:', password);
    };
  
    return (
        <div>
            <Header></Header>
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                <h1>SEJA BEM VINDO</h1>
                <p>Cadastre-se para criar uma conta e explorar muitas coisas</p>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Digite seu email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Digite sua senha"
                    />
                </div>
                <button type="submit" className="btn-login">Entrar</button>
                <button type="button" className="btn-google">
                    <FaGoogle className="google-icon" /> Continuar com Google
                </button>
                <button type="button" className="btn-create-account">
                    Criar conta
                </button>

                </form>
            </div>
            <Footer></Footer>
      </div>
    );
}
  
export default Login;
