import { useState, useEffect } from 'react';
// import { FaGoogle } from 'react-icons/fa'; // Importa o ícone do Google
import './login.css'; 
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom'; // importantando useNavigate para trocar de tela
import api from '../../services/api';

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    // Preenche o email do localStorage
    useEffect(() => {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        Navigate('/perfil');
      }
    }, [Navigate]);
  

  async function loginUsuario(email, senha, e) {
    e.preventDefault();
    try {
      let body = {
        email: email,
        senha: senha
      }

      const resposta = await api.post('usuario/login', body);
      console.log(resposta.data);
      localStorage.setItem('usuario', JSON.stringify(resposta.data));

      const respostaEndereco = await api.get(`endereco/obter?Id=${resposta.data.idcli}`);
      console.log(respostaEndereco.data);
      localStorage.setItem('endereco', JSON.stringify(respostaEndereco.data));

      // Redireciona para a página de perfil
      Navigate('/perfil');

      return resposta.data;
    } catch (erro) {
      console.log('Erro ao fazer login:', erro.response ? erro.response.data : erro.message);
    }
  }
  
    return (
        <div>
            <Header></Header>
            <div className="login-container">
                <form className="login-form">
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
                <button type="submit" className="btn-login" onClick={(e)=> { window.scrollTo(0, 0);loginUsuario(email, password, e)}}>Entrar</button>
                {/* <button type="button" className="btn-google">
                    <FaGoogle className="google-icon" /> Continuar com Google
                </button> */}
                <button type="button" className="btn-create-account" onClick={() => Navigate("/cadastrar")}>
                    Criar conta
                </button>

                </form>
            </div>
            <Footer></Footer>
      </div>
    );
}
  
export default Login;
