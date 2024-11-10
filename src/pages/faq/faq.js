import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import "./faq.css";

function Faq() {

    return (
        <div>
            <Header></Header>
                <div id="G">

                    <div id="pergunta">
                        <h2 id="cliente_pergunta">Faça sua pergunta e tire sua dúvida</h2>
                        <input type="text" placeholder="Digite aqui..." id="arera_pergunta"></input>
                        <div id="btns">
                            <button className="perbtn" id="deletar" type='reset'>Deletar</button>
                            <button className="perbtn" id="enviar" type='submit'>Enviar</button>
                        </div>
                    </div>

                    <label>Perguntas Frequêntes</label>

                    <div id="pergunta_rep">

                        <div className="caixa_pr">
                            <h2 className="perguntaT">Pergunta:</h2>
                            <p className="caixa_da_pergunta">Vocês vendem pão também?</p>

                            <div className="sep">
                                <h2 className="RespostT">Resposta:</h2>
                                <p className="caixa_de_resposta">Claro que não krl kskskskks</p>
                            </div>
                        </div>

                        <div className="caixa_pr">
                            <h2 className="perguntaT">Pergunta:</h2>
                            <p className="caixa_da_pergunta">Vocês vendem pão também?</p>

                            <div className="sep">
                                <h2 className="RespostT">Resposta:</h2>
                                <p className="caixa_de_resposta">Claro que não krl kskskskks</p>
                            </div>
                        </div>

                        <div className="caixa_pr">
                            <h2 className="perguntaT">Pergunta:</h2>
                            <p className="caixa_da_pergunta">Vocês vendem pão também?</p>

                            <div className="sep">
                                <h2 className="RespostT">Resposta:</h2>
                                <p className="caixa_de_resposta">Claro que não krl kskskskks</p>
                            </div>
                        </div>
                    </div>  
                    
                </div>

                
            <Footer></Footer>
      </div>
    );
}

  
export default Faq;
