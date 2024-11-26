import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import './FinalizaCompra.css';
import Header from '../../components/header/headerdesktop';

function Finalizar() {
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
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

  // Preenche o formulário com os dados do localStorage
  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioDados = JSON.parse(usuario);
      setFormData({
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
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do formulário para o servidor
    alert('Checkout concluído com sucesso!');
  };

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <h2 className="checkout-title">Finalizar Compra</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
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
                placeholder="Telefone"
                className="form-input"
                required
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
                className="form-input"
                required
              />
            )}
          </InputMask>
          <input
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="numeroRua"
            placeholder="Número"
            value={formData.numeroRua}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="complemento"
            placeholder="Complemento (opcional)"
            value={formData.complemento}
            onChange={handleInputChange}
            className="form-input"
          />
          <InputMask
            mask="99999-999"
            value={formData.cep}
            onChange={handleInputChange}
            onBlur={async () => {
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
                    alert('CEP inválido!');
                  }
                } catch (error) {
                  alert('Erro ao buscar o CEP. Tente novamente.');
                }
              }
            }}
          >
            {() => (
              <input
                type="text"
                name="cep"
                placeholder="CEP"
                className="form-input"
                required
              />
            )}
          </InputMask>
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            value={formData.estado}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <button type="submit" className="submit-button">Concluir Compra</button>
        </form>
      </div>
    </div>
  );
}

export default Finalizar;
