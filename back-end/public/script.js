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

// Mapeamento de monstros para suas imagens e mapas
const imagensMonstros = {
    ifrit: 'images/ifrit.gif',
    valk: 'images/valk.gif',
    wsm: 'images/wsm.gif',
    corrupted: 'images/corrup.gif',
    amdarais: 'images/amda.gif',
    thanatos: 'images/thana.gif',
    valkzinha1: 'images/valk.gif',
    valkzinha2: 'images/valk.gif',
    valkzinha3: 'images/valk.gif',
    angeling1: 'images/angeling.gif',
    angeling2: 'images/angeling.gif',
    angeling3: 'images/angeling.gif',
    deviling1: 'images/deviling.gif',
    deviling2: 'images/deviling.gif',
    ghostring1: 'images/ghostring.gif',
    ghostring2: 'images/ghostring.gif',
    ghostring3: 'images/ghostring.gif'
};
const mapasMonstros = {
    'ifrit': 'thor_v03',
    'valk': 'odin_tem03',
    'wsm': 'moc_fild22',
    'corrupted': 'old_gh01',
    'amdarais': 'old_gh02',
    'thanatos': 'thana_boss',
    'valkzinha1': 'odin_tem02',
    'valkzinha2': 'odin_tem03',
    'valkzinha3': 'odin_tem03',
    'angeling1': 'pay_fild04',
    'angeling2': 'yuno_fild03',
    'angeling3': 'xmas_dun01',
    'deviling1': 'pay_fild04',
    'deviling2': 'yuno_fild03',
    'ghostring1': 'pay_fild04',
    'ghostring2': 'prt_maze03',
    'ghostring3': 'treasure02'
};

const form = document.getElementById('respawnForm');
const resultadoContainer = document.getElementById('resultado-container');
const horaMorteInput = document.getElementById('horaMorte');
const statusMessage = document.getElementById('status-message');

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
    const nomeMapa = mapasMonstros[monstro] || 'Mapa Desconhecido'
    const temposIncerteza = {
        'ifrit': 10 * 60 * 1000, // 10 minutos
        'valk': 10 * 60 * 1000,  // 10 minutos
        'wsm': 60 * 60 * 1000,   // 1 hora
        'corrupted': 60 * 60 * 1000, // 1 hora
        'amdarais': 60 * 60 * 1000, // 1 hora
        'thanatos': 0, // sem incerteza
        'valkzinha1': 30 * 60 * 1000, // 30 minutos
        'valkzinha2': 20 * 60 * 1000, // 20 minutos
        'valkzinha3': 20 * 60 * 1000, // 20 minutos
        'angeling1': 30 * 60 * 1000, // 30 minutos
        'angeling2': 30 * 60 * 1000, // 30 minutos
        'angeling3': 30 * 60 * 1000, // 30 minutos
        'deviling1': 60 * 60 * 1000, // 60 minutos
        'deviling2': 30 * 60 * 1000, // 30 minutos
        'ghostring1': 30 * 60 * 1000, // 30 minutos
        'ghostring2': 57 * 60 * 1000, // 57 minutos
        'ghostring3': 20 * 60 * 1000 // 20 minutos
    };

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
    const agora = new Date();

    // Calcula o horário do fim da incerteza
    const horarioFimIncerteza = new Date(horarioRespawn.getTime() + temposIncerteza[monstro]);

    let estiloRespawn = '';
    // Verifica os três estados: futuro, incerteza ou passado
    if (agora < horarioRespawn) {
        estiloRespawn = 'respawn-futuro'; // Opcional, mas boa prática
    } else if (agora < horarioFimIncerteza) {
        estiloRespawn = 'respawn-incerteza';
    } else {
        estiloRespawn = 'respawn-passado';
    }

    const cardExistente = document.querySelector(`.respawn-card[data-monstro="${monstro}"]`);
    
    if (cardExistente) {
        // Atualiza o horário
        const pElement = cardExistente.querySelector('p');
        pElement.textContent = `Respawn: ${respawnFormatado}`;
        
        // Remove as classes antigas e adiciona a nova
        pElement.classList.remove('respawn-futuro', 'respawn-incerteza', 'respawn-passado');
        pElement.classList.add(estiloRespawn);
        
    } else {
        const novoCard = document.createElement('div');
        novoCard.classList.add('respawn-card');
        novoCard.setAttribute('data-monstro', monstro);

        novoCard.innerHTML = `
            <button class="delete-btn" data-id="${respawn._id}"><i class="fas fa-trash-alt"></i></button>
            <img src="${imagemMonstro}" alt="Imagem do monstro ${nomeMonstro}">
            <h3>${nomeFormatado}</h3>
            <h4>${nomeMapa}</h4>
            <p class="${estiloRespawn}">Respawn: ${respawnFormatado}</p>
        `;
        resultadoContainer.appendChild(novoCard);
    }
};

// Adiciona um listener para a exclusão de cards
resultadoContainer.addEventListener('click', async (event) => {
    // Usa closest para encontrar o botão, mesmo se o clique for no ícone da lixeira
    const deleteBtn = event.target.closest('.delete-btn');
    
    if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        
        try {
            await fetch(`https://ragnarok-respawn.vercel.app/api/respawns/${id}`, {
                method: 'DELETE'
            });

            // Exibe um alerta visual de sucesso
            statusMessage.textContent = 'Respawn excluído com sucesso!';
            statusMessage.classList.add('message');

            setTimeout(() => {
                statusMessage.style.display = 'none';
                statusMessage.classList.remove('message');
            }, 3000);
            
            // Recarrega os cards após a exclusão
            carregarRespawns();

        } catch (error) {
            console.error("Erro ao excluir o respawn:", error);
        }
    }
});

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
        case 'thanatos':
            tempoRespawnHoras = 2;
            break;
        case 'valkzinha1':
            tempoRespawnHoras = 1.5;
            break;
        case 'valkzinha2':
            tempoRespawnHoras = 0.5;
            break;
        case 'valkzinha3':
            tempoRespawnHoras = 0.5;
            break;
        case 'angeling1':
            tempoRespawnHoras = 1;
            break;
        case 'angeling2':
            tempoRespawnHoras = 1;
            break;
        case 'angeling3':
            tempoRespawnHoras = 1;
            break;
        case 'deviling1':
            tempoRespawnHoras = 2;
            break;
        case 'deviling2':
            tempoRespawnHoras = 1;
            break;
        case 'ghostring1':
            tempoRespawnHoras = 1;
            break;
        case 'ghostring2':
            tempoRespawnHoras = 1.95;
            break;
        case 'ghostring3':
            tempoRespawnHoras = 0.55;
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

setInterval(carregarRespawns, 15000); // Recarrega a cada 15 segundos