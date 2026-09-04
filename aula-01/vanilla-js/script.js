let transacoes = [];

const form = document.getElementById("formTransacao");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoInput = document.getElementById("tipo");

const saldoElement = document.getElementById("saldo");
const totalEntradasElement = document.getElementById("totalEntradas");
const totalSaidasElement = document.getElementById("totalSaidas");

const listaTransacoes = document.getElementById("listaTransacoes");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const descricao = descricaoInput.value.trim();
    const valor = Number(valorInput.value);
    const tipo = tipoInput.value;

    if (descricao === "" || valor <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    const transacao = {
        id: Date.now(),
        descricao: descricao,
        valor: valor,
        tipo: tipo
    };

    transacoes.push(transacao);

    atualizarTela();

    form.reset();

    descricaoInput.focus();
});


function atualizarTela() {

    calcularResumo();

    mostrarTransacoes();
}


function calcularResumo() {

    let entradas = 0;
    let saidas = 0;

    transacoes.forEach(function (transacao) {

        if (transacao.tipo === "entrada") {
            entradas += transacao.valor;
        } else {
            saidas += transacao.valor;
        }

    });

    const saldo = entradas - saidas;

    saldoElement.textContent = formatarMoeda(saldo);
    totalEntradasElement.textContent = formatarMoeda(entradas);
    totalSaidasElement.textContent = formatarMoeda(saidas);
}


function mostrarTransacoes() {

    listaTransacoes.innerHTML = "";

    if (transacoes.length === 0) {

        listaTransacoes.innerHTML = `
            <p class="mensagem-vazia">
                Nenhuma movimentação cadastrada.
            </p>
        `;

        return;
    }

    transacoes.forEach(function (transacao) {

        const div = document.createElement("div");

        div.classList.add("transacao");

        const classeValor =
            transacao.tipo === "entrada"
                ? "valor-entrada"
                : "valor-saida";

        const sinal =
            transacao.tipo === "entrada"
                ? "+"
                : "-";

        div.innerHTML = `
            <div class="transacao-info">
                <h3>${transacao.descricao}</h3>
                <span>
                    ${transacao.tipo === "entrada" ? "Entrada" : "Saída"}
                </span>
            </div>

            <div class="transacao-valor">

                <span class="${classeValor}">
                    ${sinal} ${formatarMoeda(transacao.valor)}
                </span>

                <button
                    class="botao-excluir"
                    onclick="excluirTransacao(${transacao.id})"
                >
                    Excluir
                </button>

            </div>
        `;

        listaTransacoes.appendChild(div);
    });
}


function excluirTransacao(id) {

    transacoes = transacoes.filter(function (transacao) {
        return transacao.id !== id;
    });

    atualizarTela();
}


function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


atualizarTela();