import { useState } from 'react';
import './cadastrar.css'; 
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom'; // importantando useNavigate para trocar de tela
import api from '../../services/api';


function Cadastrar() {
  const Navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function cadastrarUsuario(e) {
      e.preventDefault();
      try {
        let body = {
          nome: nome,
          email: email,
          senha: password
        }
  
        const resposta = await api.post('usuario/cadastrar', body);
        console.log(resposta.data);
        localStorage.setItem('usuario', JSON.stringify(resposta.data));

        let bodyFav = {
          idcli: resposta.data.idcli,
          itensfav: []
        }
        const respFav = await api.post('favoritos/cadastrar', bodyFav);
        console.log(respFav.data);
        localStorage.setItem('favoritos', JSON.stringify(respFav.data));
        
        // Redireciona para a página de perfil
        Navigate('/perfil');
  
        return resposta.data;
      } catch (erro) {
        console.log('Erro ao fazer cadastro:', erro.response ? erro.response.data : erro.message);
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', password);
      
    };
  
    return (
      <div>
        <Header />
        <div className="cadastrar-container">
            <form onSubmit={handleSubmit} className="cadastrar-form">
            <h1>CRIAR CONTA</h1>
            <p>Preencha os campos abaixo para criar sua conta</p>
            <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Digite seu nome"
                />
            </div>
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
            <button type="submit" className="btn-cadastrar"  onClick={(e) => { window.scrollTo(0, 0); cadastrarUsuario(e);}}>Cadastrar</button>
            </form>
        </div>
        <Footer />
      </div>
    );
}

export default Cadastrar;
