import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './FinalizaCompra.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';

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

  const [compraConcluida, setCompraConcluida] = useState(false);
  const [tempoDeCompra, setTempoDeCompra] = useState(7); // 7 segundos de progresso
  const [produtosCarrinho, setProdutosCarrinho] = useState([]);
  const navigate = useNavigate();

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

    // Recupera os produtos do carrinho
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    setProdutosCarrinho(carrinho);
  }, []);

  // Função de validação para CPF e telefone
  const validateCPF = (cpf) => {
    return cpf.length === 14; // Formato 000.000.000-00
  };

  const salvarAlteracao = () => {
    // Salva os dados atualizados no localStorage
    localStorage.setItem('usuario', JSON.stringify(formData));
    alert('Alterações salvas com sucesso!');
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exibe o selo verde de compra
    setCompraConcluida(true);
    // Barra de progresso de 7 segundos
    let tempo = 7;
    const interval = setInterval(() => {
      if (tempo > 0) {
        setTempoDeCompra(tempo);
        tempo--;
      } else {
        clearInterval(interval);
        // Redireciona para a tela de Meus Pedidos após o tempo
        localStorage.removeItem('carrinho');
        navigate('/meuspedidos');
      }
    }, 1000);
  };

  const calcularTotal = () => {
    return produtosCarrinho.reduce((acc, produto) => {
      const precoComDesconto = produto.preco * (1 - produto.desconto);
      return acc + precoComDesconto * produto.quantidade;
    }, 0);
  };

  return (
    <div>
      <Header />
      <h2 className="title-top pt-4 pb-3">Finalizar compra</h2>
      
      <div className="checkout-container">


        <div className="row">
          {/* Card Informações Pessoais */}
          <div className="col-md-4 mb-4">
            <div className="card p-3 ">
              <h4 className='text-center'>Informações Pessoais</h4>
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
                    className={`info-inputt ${!validateCPF(formData.cpf) ? 'invalid' : ''}`}
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
              className="info-inputt"
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
          className="info-inputt"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Rua"
          value={formData.endereco}
          onChange={handleInputChange}
          className="info-inputt"
        />
        <input
          type="text"
          name="numeroRua"
          placeholder="Número"
          value={formData.numeroRua}
          onChange={handleInputChange}
          className="info-inputt"
        />
        <input
          type="text"
          name="complemento"
          placeholder="Complemento (opcional)"
          value={formData.complemento}
          onChange={handleInputChange}
          className="info-inputt"
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleInputChange}
          className="info-inputt"
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleInputChange}
          className="info-inputt"
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleInputChange}
          className="info-inputt"
        />

        <button className="save-button mt-3"onClick={(e) => {e.preventDefault();salvarAlteracao();}}>Salvar Alterações</button>
              </form>
            </div>
          </div>

          {/* Card Forma de Pagamento */}
          <div className="col-md-4 mb-4">
            <div className="card p-3">
              <h4 className='text-center'>Forma de Pagamento</h4>
              <select name="pagamento" className="form-input" required>
                <option value="cartao">Cartão de Crédito</option>
                <option value="boleto">Boleto Bancário</option>
                <option value="pix">Pix</option>
              </select>
            </div>
          </div>

          {/* Card Produtos */}
          <div className="col-md-4">
            <div className="card p-3">
              <h4 className='text-center'>Produtos</h4>
              <div className="cart-item">
                {produtosCarrinho.map((produto, index) => (
                  <div key={index} className="product-info">
                    <p>{produto.nome}</p>
                    <p>R$ {produto.preco}</p>
                    <p>Quantidade: {produto.quantidade}</p>
                  </div>
                ))}
                <h5>Total: R$ {calcularTotal().toFixed(2).replace('.', ',')}</h5>
              </div>
              <button type="submit" className="submit-button mt-3">Concluir Compra</button>
            </div>
          </div>
        </div>

        {compraConcluida && (
          <div className="compra-concluida">
            <div className="selo-compra">
              <p>Compra realizada com sucesso!</p>
              <button onClick={() => setCompraConcluida(false)}>Ok</button>
            </div>
            <div className="barra-progresso">
              <div className="barra" style={{ width: `${(7 - tempoDeCompra) * 14.2857}%` }}></div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Finalizar;
