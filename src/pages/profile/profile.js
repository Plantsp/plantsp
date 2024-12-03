import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask'; // Biblioteca para máscaras de entrada
import './profile.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import api from '../../services/api';

function Profile() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null); // Imagem de perfil
  const profileInputRef = useRef(null);

  // Função para lidar com o upload da imagem
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para abrir o seletor de arquivos ao clicar na foto de perfil
  const handleProfileClick = (e) => {
    e.stopPropagation(); // Impede a propagação do evento de clique
    profileInputRef.current.click();
  };
  
  const [usuarioData, setUsuarioData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    datanasc: '',
  });

  const [enderecoData, setEnderecoData] = useState({
    cep: '',
    cidade: '',
    uf: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
  });

  // Preenche o email do localStorage
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioDados = JSON.parse(usuario);
      setUsuarioData((prevData) => ({
        ...prevData,
        idcli: usuarioDados.idcli,
        email: usuarioDados.email || '',
        nome: usuarioDados.nome || '',
        telefone: usuarioDados.telefone || '',
        senha: usuarioDados.senha,
        cpf: usuarioDados.cpf || '',
        datanasc: usuarioDados.datanasc || '',
      }));
    }

    const endereco = localStorage.getItem('endereco');
    if (endereco) {
      const enderecoDados = JSON.parse(endereco);
      setEnderecoData((prevData) => ({
        ...prevData,
        idcli: enderecoDados.idcli,
        cep: enderecoDados.cep || '',
        cidade: enderecoDados.cidade || '',
        uf: enderecoDados.uf || '',
        logradouro: enderecoDados.logradouro || '',
        numero: enderecoDados.numero || '',
        complemento: enderecoDados.complemento || '',
        bairro: enderecoDados.bairro || '',
      }));
    }
  }, []);


  const handleUsuarioInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioData({ ...usuarioData, [name]: value });
  };
  
  // Função de validação para CPF e telefone
  const validateCPF = (cpf) => {
    return cpf.length === 14; // Formato 000.000.000-00
  };

  const validatetelefone = (telefone) => {
    return telefone.length === 15; // Formato (00) 00000-0000
  };

  async function atualizaUsuario() {
    try {
      console.log('usuariodata:', usuarioData);
      await api.post('usuario/atualizar', usuarioData);
      localStorage.setItem('usuario', JSON.stringify(usuarioData));

      // Redireciona para a página de perfil
      navigate('/perfil');
    } catch (erro) {
      console.log('Erro ao fazer login:', erro.response ? erro.response.data : erro.message);
    }
  }

  const handleEnderecoInputChange = (e) => {
    const { name, value } = e.target;
    setEnderecoData({ ...enderecoData, [name]: value });
  };

  const fetchGeolocation = async () => {
    if (enderecoData.cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${enderecoData.cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setEnderecoData((prevData) => ({
            ...prevData,
            logradouro: data.logradouro || prevData.logradouro,
            bairro: data.bairro || prevData.bairro,
            cidade: data.localidade || prevData.cidade,
            uf: data.uf || prevData.uf,
          }));
        } else {
          alert('CEP inválido! Por favor, insira um CEP correto.');
          setEnderecoData((prevData) => ({
            ...prevData,
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
          }));
        }
      } catch (error) {
        alert('Erro ao buscar o CEP. Tente novamente.');
      }
    }
  };

  async function atualizaEndereco() {
    try {
      const endereco = localStorage.getItem('endereco');
      console.log('enderecoData:', enderecoData);

      if (endereco) {
        await api.post('endereco/atualizar', enderecoData);
        localStorage.setItem('endereco', JSON.stringify(enderecoData));
      } else {
        let endData = enderecoData;
        endData.idcli = usuarioData.idcli;

        const resposta = await api.post('endereco/cadastrar', endData);
        localStorage.setItem('endereco', JSON.stringify(resposta.data));
      }

      navigate('/perfil');
    } catch (erro) {
      console.log('Erro atualizar/cadastrar endereco:', erro.response ? erro.response.data : erro.message);
    }
  }

  const Sair = () => {
    localStorage.removeItem('usuario'); // Remove o item do localStorage
    localStorage.removeItem('endereco');
    navigate('/');
    window.scrollTo(0, 0);
  };


  return (
  <div>
    <Header></Header>
    <div className="profile-container">
      {/* Banner Azul */}
      <div className="banner-container">
        {/* Banner fixo */}
        <img src="/assets/img/bannerverde.jpeg" alt="Banner" className="banner-image" />
        <div
          className="profile-image-container"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        >
          {profileImage ? (
            <img src={profileImage} alt="Perfil" className="profile-image" />
          ) : (
            <div className="profile-image">Clique para adicionar foto de perfil</div>
          )}
        </div>
      </div>

      {/* Input invisível para upload da foto de perfil */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'profile')}
        ref={profileInputRef}
        style={{ display: 'none' }}
      />

      {/* Card 1: Informações do Usuário */}
      <h2 className='title-top pt-3'>Informações Pessoais</h2>
      <div style={{ position: 'relative', height: '12vh', width: '100%' }}>
      <button className="out-button" onClick={() => Sair()}>
        Sair
      </button>
    </div>
      <form className="info-card">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={usuarioData.nome}
          onChange={handleUsuarioInputChange}
          className="info-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={usuarioData.email}
          onChange={handleUsuarioInputChange}
          className="info-input"
        />
        <InputMask
          mask="(99) 99999-9999"
          value={usuarioData.telefone}
          onChange={handleUsuarioInputChange}
        >
          {() => (
            <input
              type="text"
              name="telefone"
              placeholder="Celular"
              className={`info-input ${!validatetelefone(usuarioData.telefone) ? 'invalid' : ''}`}
            />
          )}
        </InputMask>
        <InputMask
          mask="999.999.999-99"
          value={usuarioData.cpf}
          onChange={handleUsuarioInputChange}
        >
          {() => (
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              className={`info-input ${!validateCPF(usuarioData.cpf) ? 'invalid' : ''}`}
            />
          )}
        </InputMask>
        <InputMask
          mask="99/99/9999"
          value={usuarioData.datanasc}
          onChange={handleUsuarioInputChange}
        >
          {() => (
            <input
              type="text"
              name="datanasc"
              placeholder="Data de Nascimento"
              className="info-input"
            />
          )}
        </InputMask>
        <button
          className="save-button"
          onClick={(e) => {
            e.preventDefault();
            atualizaUsuario();
          }}
        >
          Salvar Alterações
        </button>
      </form>

      {/* Card 2: Endereço */}
      <h2 className='title-top pt-3'>Seu Endereço</h2>
      <form className="info-card ">
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={enderecoData.cep}
          onChange={handleEnderecoInputChange}
          onBlur={fetchGeolocation}
          className="info-input"
        />
        <input
          type="text"
          name="logradouro"
          placeholder="Rua"
          value={enderecoData.logradouro}
          onChange={handleEnderecoInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="numero"
          placeholder="Número"
          value={enderecoData.numero}
          onChange={handleEnderecoInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="complemento"
          placeholder="Complemento (opcional)"
          value={enderecoData.complemento}
          onChange={handleEnderecoInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={enderecoData.bairro}
          onChange={handleEnderecoInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={enderecoData.cidade}
          onChange={handleEnderecoInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="uf"
          placeholder="Estado"
          value={enderecoData.uf}
          onChange={handleEnderecoInputChange}
          className="info-input"
        />
        <button
          className="save-buttonend ml-3"
          onClick={(e) => {
            e.preventDefault();
            atualizaEndereco();
          }}
        >
          Salvar Endereço
        </button>
      </form>

      
    </div>
    <Footer />
  </div>
);

}

export default Profile;
