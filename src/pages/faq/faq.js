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
                            <button class="perbtn" id="deletar">Deletar</button>
                            <button class="perbtn" id="enviar">Enviar</button>
                        </div>
                    </div>

                    <label>Perguntas Frequêntes</label>

                    <div id="pergunta_rep">

                        <div class="caixa_pr">
                            <h2 id="perguntaT">Pergunta:</h2>
                            <p id="caixa_da_pergunta">Vocês vendem pão também?</p>

                            <div id="sep">
                                <h2 id="RespostT">Resposta:</h2>
                                <p id="caixa_de_resposta">Claro que não krl kskskskks</p>
                            </div>
                        </div>

                         <div class="caixa_pr"></div>
                        
                        <div class="caixa_pr"></div>

                         <div class="caixa_pr"></div>
                    </div>  
                    
                </div>

                
            <Footer></Footer>
      </div>
    );
}
  
export default Faq;
