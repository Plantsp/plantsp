import React, { useState } from 'react';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import "./faq.css";
import '../../styles/global.css';

function Faq() {
    
    // Lista de perguntas e respostas
    const perguntasRespostas = [
        { pergunta: "Qual é o horário de atendimento ao cliente?", resposta: "Nosso atendimento ao cliente está disponível de segunda a sexta-feira, das 9h às 18h, através do e-mail. Fora desse horário, você pode deixar uma mensagem e responderemos no próximo dia útil." },
        { pergunta: "Como posso acompanhar meu pedido?", resposta: "Você pode acompanhar seu pedido no painel de usuário, acessando a seção de pedidos." },
        { pergunta: "Quais são as formas de pagamento?", resposta: "Aceitamos cartões de crédito, débito e pagamentos via PIX." },
        { pergunta: "Vocês entregam em todas as regiões?", resposta: "Sim, fazemos entregas em todo o Brasil. As taxas de frete variam conforme a região." },
        { pergunta: "Como sei se uma planta é adequada para o meu jardim?", resposta: "Cada produto possui uma descrição detalhada sobre as condições ideais de cultivo. Caso tenha dúvidas, nossa equipe de atendimento está à disposição para ajudar!" },
        { pergunta: "Posso trocar ou devolver um produto?", resposta: "Sim, aceitamos trocas e devoluções dentro de 7 dias após o recebimento, conforme a política de trocas disponível no site." },
        { pergunta: "Como posso cuidar das minhas plantas?", resposta: "Em cada produto, fornecemos informações sobre os cuidados necessários. Também temos um blog com dicas e tutoriais de jardinagem que podem te ajudar a manter suas plantas saudáveis!" }
    ];

    // Estado para controlar a pergunta atualmente ativa
    const [ativaIndex, setAtivaIndex] = useState(null);

    // Função para alternar a exibição da resposta
    const toggleResposta = (index) => {
        setAtivaIndex(ativaIndex === index ? null : index);
    };

    return (
        <div>
            <Header />
            <h2 className="title-top pt-4">Perguntas Frequentes</h2>
            <div className="faq-container">
                {perguntasRespostas.map((item, index) => (
                    <div key={index} className="faq-card" onClick={() => toggleResposta(index)}>
                        <div className="faq-card-header">
                            <h3>{item.pergunta}</h3>
                            <span className={`faq-icon ${ativaIndex === index ? 'active' : ''}`}>&#x25BC;</span> {/* Setinha V */}
                        </div>
                        {ativaIndex === index && <p className="faq-resposta">{item.resposta}</p>}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Faq;
