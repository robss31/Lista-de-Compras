
import React, { useState, useEffect, useRef } from "react";
import './ListaComp.css';




function ListaComp() {

    const listaStorage = localStorage.getItem('Lista');


    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [name, setName] = useState('');
    const [venci, setVenci] = useState('');
    const [valor, setValor] = useState('');
    const [spanValue, setSpanValue] = useState(0);
    const [result, setResult] = useState(0);
    const spanRef = useRef(null);




    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])


    function adicionaItem(e) {
        e.preventDefault();

        if (name === '' || venci === '' || valor === '') {
            alert("Preencha todos os campos");
            return;
        }

        setLista([...lista, { text: name, data: venci, custo: valor,  isCompleted: false }])
        setName("");
        setVenci("");
        setValor("");
       
        document.getElementById('inputconta');
        document.getElementById('inputconta1');
        document.getElementById('inputconta2');
     
    }


  /*
    //Captura o valor inicial da <span> após a renderização
    useEffect(() => {
        const initialSpanValue = parseInt(spanRef.current.innerText, 0);
        setSpanValue(initialSpanValue);
    }, []);

    // Função para somar o valor com o input e atualizar o resultado
  const handleSum = () => {
        const parsedInputConta2 = parseInt(inputConta2, 10);

        if (!isNaN(parsedInputConta2)) {
            setResult(parsedInputConta - valor);
            setInputValue(parsedInputValue - valor);
            // setInputValue('');



        } else{
            //setInputValue(setResult);
            //setResult(inputValue - valor)


        }


    };
*/

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletatudo() {
        setLista([]);
    }



    return (
        // restante do código permanece inalterado...
        <div className="container2">

            <h1>Lista de Compras</h1>


            <form className="form" onSubmit={adicionaItem}>


                <input id="inputconta" type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="  Nome do Produto" />
                <input id="inputconta1" type="text" value={venci} onChange={(e) => { setVenci(e.target.value) }} placeholder=" Quantidade" />
                <input id="inputconta2" type="number" value={valor} onChange={(e) => { setValor(e.target.value) }} placeholder="  Valor" />

                <button type="submit" id="btn1">add</button>



               
            </form>

            <div className="listaContas">

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
                                <span onClick={() => { clicou(index) }}>{item.data}</span>
                                <span onClick={() => { clicou(index) }}>{item.custo}</span>
                                



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
