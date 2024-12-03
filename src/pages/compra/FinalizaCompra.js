import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './FinalizaCompra.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import api from '../../services/api';

function Finalizar() {

  const [usuarioData, setUsuarioData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    datanasc: '',
  });

  const handleUsuarioInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioData({ ...usuarioData, [name]: value });
  };

  const [enderecoData, setEnderecoData] = useState({
    cep: '',
    cidade: '',
    uf: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
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
     // Recupera os produtos do carrinho
     const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
     setProdutosCarrinho(carrinho);
  }, []);

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

    } catch (erro) {
      console.log('Erro atualizar/cadastrar endereco:', erro.response ? erro.response.data : erro.message);
    }
  }

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
              <form className="checkout-form">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={usuarioData.nome}
                  onChange={handleUsuarioInputChange}
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={usuarioData.email}
                  onChange={handleUsuarioInputChange}
                  className="form-input"
                  required
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
                      placeholder="Telefone"
                      className={`form-input ${!validatetelefone(usuarioData.telefone) ? 'invalid' : ''}`}
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
                      className={`info-inputt ${!validateCPF(usuarioData.cpf) ? 'invalid' : ''}`}
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
                      className="info-inputt"
                    />
                  )}
                </InputMask>
                <input
                  type="text"
                  name="cep"
                  placeholder="CEP"
                  value={enderecoData.cep}
                  onChange={handleEnderecoInputChange}
                  onBlur={fetchGeolocation}
                  className="info-inputt"
                />
                <input
                  type="text"
                  name="logradouro"
                  placeholder="Rua"
                  value={enderecoData.logradouro}
                  onChange={handleEnderecoInputChange}
                  className="info-inputt"
                />
                <input
                  type="text"
                  name="numero"
                  placeholder="Número"
                  value={enderecoData.numero}
                  onChange={handleEnderecoInputChange}
                  className="info-inputt"
                />
                <input
                  type="text"
                  name="complemento"
                  placeholder="Complemento (opcional)"
                  value={enderecoData.complemento}
                  onChange={handleEnderecoInputChange}
                  className="info-inputt"
                />
                <input
                  type="text"
                  name="bairro"
                  placeholder="Bairro"
                  value={enderecoData.bairro}
                  onChange={handleEnderecoInputChange}
                  className="info-inputt"
                />
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  value={enderecoData.cidade}
                  onChange={handleEnderecoInputChange}
                  className="info-inputt"
                />
                <input
                  type="text"
                  name="uf"
                  placeholder="Estado"
                  value={enderecoData.uf}
                  onChange={handleEnderecoInputChange}
                  className="info-inputt"
                />
                <button className="save-button mt-3"
                  onClick={(e) => {
                    e.preventDefault();
                    atualizaUsuario();
                    atualizaEndereco();
                  }}
                  >
                  Salvar Alterações
                </button>
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
              <button className="submit-button mt-3" onClick={handleSubmit}>Concluir Compra</button>
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
