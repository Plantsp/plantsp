import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/global.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import api from '../../services/api';
import CardPedido from "../../components/CardPedido/CardPedido";

// import './meuspedidos.css';

const MeusPedidos = () => {
//   const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {
    todosPedidos();
  }, []);

  async function todosPedidos() {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const resposta = await api.get(`pedido/obter/cliente?idCli=${usuario.idcli}`);
      setPedidos(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar todos os pedidos do cliente:', erro.response ? erro.response.data : erro.message);
    }
  }

  return (
    <div>
      <Header />
      <h2 className="title-top pt-4 pb-3">Meus Pedidos</h2>

      <div className="container pb-5">
        {pedidos.length > 0 ? pedidos.map((pedido, index) => (
          <CardPedido key={index} pedido={pedido}/>    
        )) : (
          <p className="text-center">Você ainda não tem pedidos.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MeusPedidos;
