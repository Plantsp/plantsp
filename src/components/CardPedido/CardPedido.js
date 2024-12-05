import React from "react";
import "./CardPedido.css";
import { format } from "date-fns";
import { toZonedTime } from 'date-fns-tz';


const CardPedido = ({ pedido }) => {
  const formatarValor = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function formatarDataBr(dataPedido){
    const utcDate = new Date(dataPedido);
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(utcDate, timeZone);
    return format(zonedDate, 'dd/MM/yyyy HH:mm:ss');
  }
  
  return (
    <div className="card-pedido w-100">
      <h3 className="pedido">Pedido #{pedido.idped}</h3>

      <div className="detalhes-produto py-3">
        {pedido.itenspedido.map((item, index) => (
          <p className="det" key={index}>
            {item.nomeprod} - {item.quantidade} unid. - {formatarValor(item.subtotal)}
          </p>
        ))}
      </div>

      <p className="det">Comprado em: {formatarDataBr(pedido.datapedido)}</p>
      <p className="det">Forma de pagamento: {pedido.formapagamento}</p>
      <p className="det">Total da compra: {formatarValor(pedido.totalcompra)}</p>
    </div>
  );
};

export default CardPedido;
