import React from "react";
import "./CardPedido.css";
import { format } from "date-fns";

const CardPedido = ({ pedido }) => {
  const formatarValor = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="card-pedido w-100">
      <h3 className="pedido">Pedido #{pedido.idped}</h3>

      <div className="detalhes-produto py-3">
        {pedido.itenspedido.map((item, index) => (
          <p className="det" key={index}>
            {item.nome} - {item.quantidade} unid. - {formatarValor(item.subtotal)}
          </p>
        ))}
      </div>

      <p className="det">Comprado em: {format(pedido.datapedido, 'dd/MM/yyyy HH:mm:ss')}</p>
      <p className="det">Forma de pagamento: {pedido.formapagamento}</p>
      <p className="det">Total da compra: {formatarValor(pedido.totalcompra)}</p>
    </div>
  );
};

export default CardPedido;
