// Função para atualizar o relógio digital
function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');

    const relogioElemento = document.getElementById('relogio-digital');
    if (relogioElemento) {
        relogioElemento.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

// Atualiza o relógio a cada 1 segundo (1000 milissegundos)
setInterval(atualizarRelogio, 1000);

// Chama a função uma vez para exibir a hora imediatamente
atualizarRelogio();

// Mapeamento de monstros para suas imagens
const imagensMonstros = {
    ifrit: 'images/ifrit.gif',
    valk: 'images/valk.gif',
    wsm: 'images/wsm.gif',
    corrupted: 'images/corrup.gif',
    amdarais: 'images/amda.gif'
};

const form = document.getElementById('respawnForm');
const resultadoContainer = document.getElementById('resultado-container');
const horaMorteInput = document.getElementById('horaMorte');

// Funções para formatar e calcular a data (mantenha a mesma)
const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
};
const opcoesDeFormato = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};
// Define o intervalo de 48 horas
const horasIntervalo = 48;

// Calcula a data e hora atuais
const dataAtual = new Date();

// Calcula o horário mínimo (agora - 48h)
const dataMinima = new Date(dataAtual);
dataMinima.setHours(dataMinima.getHours() - horasIntervalo);

// Calcula o horário máximo (agora + 48h)
const dataMaxima = new Date(dataAtual);
dataMaxima.setHours(dataMaxima.getHours() + horasIntervalo);

// Formata as datas e define os atributos min e max
horaMorteInput.min = formatarData(dataMinima);
horaMorteInput.max = formatarData(dataMaxima);

// Opcionalmente, define o valor inicial para a data e hora atuais
horaMorteInput.value = formatarData(dataAtual);

// Função para renderizar um card no HTML
const renderizarCard = (respawn) => {
    const monstro = respawn.monstro;
    const nomeMonstro = monstro.toUpperCase();
    const imagemMonstro = imagensMonstros[monstro];

    // Lógica para a formatação do nome
    let nomeFormatado;
    if (monstro === 'wsm') {
        nomeFormatado = monstro.toUpperCase();
    } else {
        nomeFormatado = monstro.charAt(0).toUpperCase() + monstro.slice(1);
    }

    // Converte o horário de respawn para um objeto Date
    const horarioRespawn = new Date(respawn.horarioRespawn);
    const respawnFormatado = horarioRespawn.toLocaleString(undefined, opcoesDeFormato);

    // Compara o horário de respawn com o horário atual
    const estaNoPrazo = horarioRespawn > new Date();

    const cardExistente = document.querySelector(`.respawn-card[data-monstro="${monstro}"]`);
    
    if (cardExistente) {
        // Atualiza o horário
        const pElement = cardExistente.querySelector('p');
        pElement.textContent = `Respawn: ${respawnFormatado}`;
        
        // Aplica ou remove a classe de estilo
        if (estaNoPrazo) {
            pElement.classList.remove('respawn-passado');
        } else {
            pElement.classList.add('respawn-passado');
        }
        
    } else {
        const novoCard = document.createElement('div');
        novoCard.classList.add('respawn-card');
        novoCard.setAttribute('data-monstro', monstro);

        // Aplica a classe de estilo na criação do card
        const estiloRespawn = estaNoPrazo ? '' : 'respawn-passado';

        novoCard.innerHTML = `
            <img src="${imagemMonstro}" alt="Imagem do monstro ${nomeMonstro}">
            <h3>${nomeFormatado}</h3>
            <p class="${estiloRespawn}">Respawn: ${respawnFormatado}</p>
        `;
        resultadoContainer.appendChild(novoCard);
    }
};

// Função para buscar os dados do servidor e renderizar os cards
const carregarRespawns = async () => {
    try {
        const response = await fetch('https://ragnarok-respawn.vercel.app/api/respawns');

        // Checa se a resposta foi bem-sucedida (status 200-299)
        if (!response.ok) {
            // Se a resposta for um erro, lança uma exceção
            throw new Error(`Erro do servidor: ${response.status}`);
        }

        const respawns = await response.json();

        // Garante que 'respawns' é um array antes de usar forEach
        if (Array.isArray(respawns)) {
            respawns.forEach(renderizarCard);
        } else {
            console.error("A resposta da API não é um array:", respawns);
        }

    } catch (error) {
        // Exibe uma mensagem de erro em caso de falha
        console.error("Erro ao enviar dados:", error);
    }
};

// Evento de envio do formulário
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const horaMorteString = horaMorteInput.value;
    const monstroSelecionado = document.getElementById('monstro').value;

    if (!horaMorteString) {
        alert("Por favor, insira a hora da morte do monstro.");
        return;
    }

    const horaMorte = new Date(horaMorteString);
    let tempoRespawnHoras;

    switch (monstroSelecionado) {
        case 'ifrit':
            tempoRespawnHoras = 11;
            break;
        case 'valk':
            tempoRespawnHoras = 8;
            break;
        case 'wsm':
            tempoRespawnHoras = 12;
            break;
        case 'corrupted':
            tempoRespawnHoras = 16;
            break;
        case 'amdarais':
            tempoRespawnHoras = 16;
            break;
    }

    horaMorte.setHours(horaMorte.getHours() + tempoRespawnHoras);

    // Envia o novo respawn para o servidor
    const novoRespawn = {
        monstro: monstroSelecionado,
        horarioRespawn: horaMorte
    };

    await fetch('https://ragnarok-respawn.vercel.app/api/respawns', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoRespawn)
    });

    // Recarrega os cards na tela para refletir a mudança
    carregarRespawns();

    horaMorteInput.value = '';
});

// Carrega os cards ao iniciar a página
carregarRespawns();