// Validação do número de cartas
let numero = parseInt(prompt("Com quantas cartas você quer jogar?"));

function verificaNumPar(numero) {
    // Verifica se o número é par e está dentro do intervalo permitido
    while (numero % 2 !== 0 || numero < 4 || numero > 14) {
        numero = parseInt(prompt("Por favor, insira um número par entre 4 e 14: "));
    }
    return numero;
}
numero = verificaNumPar(numero); // Valida a entrada e ajusta a quantidade de cartas

// Contador de jogadas
let jogadas = 0;

// Função para virar a carta
let primeiraCarta = null;
let segundaCarta = null;
let bloqueio = false; // Controla o bloqueio de cliques

function clicarCarta(elementoCarta) {
    if (bloqueio || elementoCarta.classList.contains('virada')) return;

    elementoCarta.classList.add('virada');
    jogadas++; // Incrementa o contador de jogadas

    if (!primeiraCarta) {
        primeiraCarta = elementoCarta;
    } else {
        segundaCarta = elementoCarta;
        bloqueio = true;

        // Verifica se as cartas são iguais
        if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
            // Cartas iguais, manter viradas
            setTimeout(() => {
                primeiraCarta = null;
                segundaCarta = null;
                bloqueio = false;

                // Aguarda a animação de virada antes de verificar vitória
                setTimeout(() => {
                    verificarVitoria(); // Verifica a vitória após a animação
                }, 200); // Aguarda o tempo da animação de 0.5s
            }, 200); // Espera para limpar as cartas após a animação
        } else {
            // Cartas diferentes, aguarda 1 segundo e desvira
            setTimeout(() => {
                primeiraCarta.classList.remove('virada');
                segundaCarta.classList.remove('virada');
                primeiraCarta = null;
                segundaCarta = null;
                bloqueio = false;
            }, 1000);
        }
    }
}


// Função para verificar se todas as cartas foram viradas
function verificarVitoria() {
    const todasCartas = document.querySelectorAll('.box-outside');
    const todasViradas = [...todasCartas].every(carta => carta.classList.contains('virada'));

    if (todasViradas) {
        alert(`Você ganhou em ${jogadas} jogadas!`);
    }
}

// Array com os nomes das imagens (deve corresponder aos arquivos na pasta "assets")
const imagensParrots = [
    'explodyparrot.gif',
    'bobrossparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
];

// Selecionar o número necessário de imagens (metade do número total de cartas, já que temos pares)
let imagensSelecionadas = imagensParrots.slice(0, numero / 2);

// Duplicar as imagens (para criar os pares)
let cartas = [...imagensSelecionadas, ...imagensSelecionadas];

// Função para embaralhar o array de cartas (algoritmo Fisher-Yates)
function embaralharCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
}

// Embaralha as cartas
cartas = embaralharCartas(cartas);

// Função para renderizar as cartas no HTML
function renderizarCartas() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpa o tabuleiro antes de renderizar
    cartas.forEach((imagem) => {
        // Cria o HTML de cada carta com o nome da imagem embaralhada
        const cartaHTML = `
            <div class="box-outside" onclick="clicarCarta(this)">
                <div class="card-inner">
                    <div class="card-back">
                        <div class="box-parrots">
                            <img src="assets/back.png" alt="Verso da Carta">
                        </div>
                    </div>
                    <div class="card-front">
                        <div class="box-parrots">
                            <img src="assets/${imagem}" alt="Frente da Carta">
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Adiciona a carta ao game board
        gameBoard.innerHTML += cartaHTML;
    });
}

// Chama a função para renderizar as cartas de acordo com o número que o usuário digitou
renderizarCartas();
