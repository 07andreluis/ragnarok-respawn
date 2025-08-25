// Mapeamento de monstros para suas imagens
const imagensMonstros = {
    ifrit: '../back-end/public/imagens/ifrit.gif',
    valk: '../back-end/public/imagens/valk.gif',
    wsm: '../back-end/public/imagens/wsm.gif'
};

const form = document.getElementById('respawnForm');
const resultadoContainer = document.getElementById('resultado-container');
const horaMorteInput = document.getElementById('horaMorte');

// Funções para formatar e calcular a data (mantenha a mesma)
// ... (seu código de formatação e cálculo) ...
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
// ... (seu código de formatação e cálculo) ...

// Função para renderizar um card no HTML
const renderizarCard = (respawn) => {
    const monstro = respawn.monstro;
    const nomeMonstro = monstro.toUpperCase();
    const imagemMonstro = imagensMonstros[monstro];
    const respawnFormatado = new Date(respawn.horarioRespawn).toLocaleString(undefined, opcoesDeFormato);

    const cardExistente = document.querySelector(`.respawn-card[data-monstro="${monstro}"]`);

    if (cardExistente) {
        cardExistente.querySelector('p').textContent = `Respawn: ${respawnFormatado}`;
    } else {
        const novoCard = document.createElement('div');
        novoCard.classList.add('respawn-card');
        novoCard.setAttribute('data-monstro', monstro);

        novoCard.innerHTML = `
            <img src="${imagemMonstro}" alt="Imagem do monstro ${nomeMonstro}">
            <h3>${nomeMonstro}</h3>
            <p>Respawn: ${respawnFormatado}</p>
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
        console.error("Erro ao carregar os respawns:", error);
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