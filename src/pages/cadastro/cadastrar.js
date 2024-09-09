import { useState } from 'react';
import './cadastrar.css'; 
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Cadastrar() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
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
            <button type="submit" className="btn-cadastrar">Cadastrar</button>
            </form>
        </div>
        <Footer />
      </div>
    );
}

export default Cadastrar;
