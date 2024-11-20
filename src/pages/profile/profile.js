import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask'; // Biblioteca para máscaras de entrada
import './profile.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/headerdesktop';

function Profile() {
  const navigate = useNavigate(); // Hook para navegação
  const [formData, setFormData] = useState({
    nome: '',
    // username: '',
    email: '',
    telefone: '',
    cpf: '',
    numeroRua: '',
    endereco: '',
    complemento: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    datanasc: '',
  });

  // Preenche o email do localStorage
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioDados = JSON.parse(usuario);
      setFormData((prevData) => ({
        ...prevData,
        email: usuarioDados.email || '',
        nome: usuarioDados.nome || '',
        telefone: usuarioDados.telefone || '',
        cpf: usuarioDados.cpf || '',
        numeroRua: usuarioDados.numeroRua || '',
        endereco: usuarioDados.endereco || '',
        complemento: usuarioDados.complemento || '',
        cep: usuarioDados.cep || '',
        bairro: usuarioDados.bairro || '',
        cidade: usuarioDados.cidade || '',
        estado: usuarioDados.estado || '',
        datanasc: usuarioDados.datanasc || '',
        
      }));
    }
  }, []);

  const Sair = () => {
    localStorage.removeItem('usuario'); // Remove o item do localStorage
    navigate('/'); // Redireciona para a página inicial
    window.scrollTo(0, 0);
  };


  const [profileImage, setProfileImage] = useState(null); // Imagem de perfil
  const [bannerImage, setBannerImage] = useState(null); // Imagem do banner

  // Criar referência para o input de arquivo do banner
  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null); // Adiciona a referência para a foto de perfil

  // Função de auto-salvamento
  useEffect(() => {
    const autoSave = setTimeout(() => {
      console.log('Dados salvos automaticamente:', formData);
    }, 3000); // Salva automaticamente após 3 segundos de inatividade

    return () => clearTimeout(autoSave);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchGeolocation = async () => {
    if (formData.cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            endereco: data.logradouro || prevData.endereco,
            bairro: data.bairro || prevData.bairro,
            cidade: data.localidade || prevData.cidade,
            estado: data.uf || prevData.estado,
          }));
        } else {
          alert('CEP inválido! Por favor, insira um CEP correto.');
          setFormData((prevData) => ({
            ...prevData,
            endereco: '',
            bairro: '',
            cidade: '',
            estado: '',
          }));
        }
      } catch (error) {
        alert('Erro ao buscar o CEP. Tente novamente.');
      }
    }
  };

  // Função de validação para CPF e telefone
  const validateCPF = (cpf) => {
    return cpf.length === 14; // Formato 000.000.000-00
  };

  const validatetelefone = (telefone) => {
    return telefone.length === 15; // Formato (00) 00000-0000
  };

  // Função para lidar com o upload da imagem
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result);
        } else if (type === 'banner') {
          setBannerImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para abrir o seletor de arquivos ao clicar no banner
  const handleBannerClick = () => {
    bannerInputRef.current.click();
  };

  // Função para abrir o seletor de arquivos ao clicar na foto de perfil
  const handleProfileClick = (e) => {
    e.stopPropagation(); // Impede a propagação do evento de clique
    profileInputRef.current.click();
  };

  return (
    <div>
      <Header></Header>
    <div className="profile-container">
      {/* Banner Azul */}
      <div className="banner-container" onClick={handleBannerClick} style={{ cursor: 'pointer' }}>
        {bannerImage ? (
          <img src={bannerImage} alt="Banner" className="banner-image" />
        ) : (
          <div className="banner-image">Clique para adicionar banner</div>
        )}
        <div className="profile-image-container" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          {profileImage ? (
            <img src={profileImage} alt="Perfil" className="profile-image" />
          ) : (
            <div className="profile-image">Clique para adicionar foto de perfil</div>
          )}
        </div>
      </div>

      {/* Input invisível para upload do banner */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'banner')}
        ref={bannerInputRef}
        style={{ display: 'none' }} // Input escondido
      />

      {/* Input invisível para upload da foto de perfil */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, 'profile')}
        ref={profileInputRef}
        style={{ display: 'none' }} // Input escondido
      />

      {/* Informações */}
      <div className="info-card">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
          className="info-input"
        />
        {/* <input
          type="text"
          name="username"
          placeholder="Nome de Usuário"
          value={formData.username}
          onChange={handleInputChange}
          className="info-input"
        /> */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="info-input"
        />
        <InputMask
          mask="(99) 99999-9999"
          value={formData.telefone}
          onChange={handleInputChange}
        >
          {() => (
            <input
              type="text"
              name="telefone"
              placeholder="Celular"
              className={`info-input ${!validatetelefone(formData.telefone) ? 'invalid' : ''}`}
            />
          )}
        </InputMask>
        <InputMask
          mask="999.999.999-99"
          value={formData.cpf}
          onChange={handleInputChange}
        >
          {() => (
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              className={`info-input ${!validateCPF(formData.cpf) ? 'invalid' : ''}`}
            />
          )}
        </InputMask>
        <InputMask
          mask="99/99/9999"
          value={formData.datanasc}
          onChange={handleInputChange}
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
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleInputChange}
          onBlur={fetchGeolocation}
          className="info-input"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Rua"
          value={formData.endereco}
          onChange={handleInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="numeroRua"
          placeholder="Número"
          value={formData.numeroRua}
          onChange={handleInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="complemento"
          placeholder="Complemento (opcional)"
          value={formData.complemento}
          onChange={handleInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleInputChange}
          className="info-input"
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleInputChange}
          className="info-input"
        />

        <button className="save-button mb-3">Salvar Alterações</button>
        <button className="out-button"onClick={() =>{Sair()}}>Sair</button>
      </div>
    </div>
    </div>
  );
}

export default Profile;
