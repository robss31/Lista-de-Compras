
import React, { useState, useEffect, useRef } from "react";
import './ListaComp.css';


function ListaComp() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [name, setName] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [spanValue, setSpanValue] = useState(0);
    const [result, setResult] = useState(0);
    const spanRef = useRef(null);


    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])


    function adicionaItem(e) {
        e.preventDefault();

        if (name === '' || quantidade === '' || valor === '') {
            alert("Preencha todos os campos");
            return;
        }

        setLista([...lista, { text: name, qtde: quantidade, custo: valor, saldo: result, isCompleted: false }])
        setName("");
        setQuantidade("");
        setValor("");
        setsaldo("");

        document.getElementById('inputconta');
        document.getElementById('inputconta1');
        document.getElementById('inputconta2');
    }

    //Captura o valor inicial da <span> após a renderização
    useEffect(() => {
        const initialSpanValue = parseInt(spanRef.current.innerText, 0);
        setSpanValue(initialSpanValue);
    }, []);

    // Função para somar o valor com o input e atualizar o resultado
    const handleSum = () => {

        const parsedValor = parseFloat(valor, 10);
        const parsedQuantidade = parseFloat(quantidade, 10);

        const valTotal = (parsedValor * parsedQuantidade);
        setResult(valTotal + result);
        setInputConta2(valor += valor);

    };

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        (listaAux.splice(index, 1));
        setLista(listaAux);
    }

    function deletatudo() {
        setLista([]);
    }

    return (
        // restante do código permanece inalterado...
        <div className="container">

            <h1>Lista de Compras</h1>


            <form className="form" onSubmit={adicionaItem}>


                <input id="inputconta" type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="  Nome do Produto" />
                <input id="inputconta1" type="number" value={quantidade} onChange={(e) => { setQuantidade(e.target.value) }} placeholder=" Quantidade" />
                <input id="inputconta2" type="number" value={valor} onChange={(e) => { setValor(e.target.value) }} placeholder="  Valor Unitário " />

                <button type="submit" id="btn1" onClick={handleSum}>add</button>

                <span ref={spanRef}></span>

            </form>

            <div className="listaCompra">

                {
                    lista.length < 1
                        ?

                        <img width={300} height={300} src="./image/compra.jpg" alt="" className="img1" />
                        :
                        lista.map((item, index) => (

                            <div
                                key={index}
                                className={item.isCompleted ? "item completo " : "item "}
                            >
                                <span onClick={() => { clicou(index) }}>{item.text}</span>
                                <span onClick={() => { clicou(index) }}>{item.qtde}</span>
                                <span onClick={() => { clicou(index) }}>{item.custo}</span>
                                <span onClick={() => { clicou(index) }}>Total: {item.saldo}</span>


                                <button onClick={() => { deleta(index) }} className="deletar">deletar</button>

                            </div>

                        ))

                }

            </div>

            {
                lista.length > 0 &&
                <button onClick={() => { deletatudo() }} className="deletarTudo">Deletar Todas</button>
            }
        </div>

    );
}

export default ListaComp;
