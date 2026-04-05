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

// Tempos de incerteza em milissegundos movido para o escopo global por ganho de performance
const temposIncerteza = {
    'ifrit': 10 * 60 * 1000, 
    'valk': 10 * 60 * 1000,
    'wsm': 60 * 60 * 1000,   
    'corrupted': 60 * 60 * 1000, 
    'amdarais': 60 * 60 * 1000, 
    'thanatos': 0, 
    'valkzinha1': 30 * 60 * 1000,
    'valkzinha2': 20 * 60 * 1000, 
    'valkzinha3': 20 * 60 * 1000, 
    'angeling1': 30 * 60 * 1000, 
    'angeling2': 30 * 60 * 1000, 
    'angeling3': 30 * 60 * 1000, 
    'deviling1': 60 * 60 * 1000, 
    'deviling2': 30 * 60 * 1000, 
    'ghostring1': 30 * 60 * 1000, 
    'ghostring2': 57 * 60 * 1000, 
    'ghostring3': 20 * 60 * 1000 
};

// Dicionário Limpo Substituto do Switch/Case
const temposIniciaisRespawn = {
    'ifrit': 11,
    'valk': 8,
    'wsm': 12,
    'corrupted': 16,
    'amdarais': 16,
    'thanatos': 2,
    'valkzinha1': 1.5,
    'valkzinha2': 0.5,
    'valkzinha3': 0.5,
    'angeling1': 1,
    'angeling2': 1,
    'angeling3': 1,
    'deviling1': 2,
    'deviling2': 1,
    'ghostring1': 1,
    'ghostring2': 1.95,
    'ghostring3': 0.55
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
    const nomeMapa = mapasMonstros[monstro] || 'Mapa Desconhecido';
    
    // Imagem do mapa vinda do RateMyServer ou DivinePride
    let urlMapaImg;
    if (monstro === 'corrupted') {
        urlMapaImg = 'https://file5s.ratemyserver.net/maps/1@gl_k.gif';
    } else if (monstro === 'amdarais') {
        urlMapaImg = 'https://file5s.ratemyserver.net/maps/2@gl_k.gif';
    } else {
        urlMapaImg = `https://www.divine-pride.net/img/map/original/${nomeMapa}`;
    }

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
        estiloRespawn = 'respawn-futuro'; 
    } else if (agora < horarioFimIncerteza) {
        estiloRespawn = 'respawn-incerteza';
    } else {
        estiloRespawn = 'respawn-passado';
    }

    const cardExistente = document.querySelector(`.respawn-card[data-monstro="${monstro}"]`);
    
    if (cardExistente) {
        // Atualiza o ID do botão de exclusão
        const deleteBtn = cardExistente.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.setAttribute('data-id', respawn._id);
        }
        
        // Atualiza o mapa ID se a div existir
        const mapImg = cardExistente.querySelector('.map-img');
        if (mapImg) {
            mapImg.setAttribute('data-id', respawn._id);
        }

        // Atualiza a lógica da Tumba DOM (apaga as antigas e adiciona nova)
        const mapaContainer = cardExistente.querySelector('.mapa-container');
        if (mapaContainer) {
            const marcadorAntigo = mapaContainer.querySelector('.tumulo-marker');
            if (marcadorAntigo) marcadorAntigo.remove();
            const btnLimparAntigo = cardExistente.querySelector('.clear-tumba-btn');
            if (btnLimparAntigo) btnLimparAntigo.remove();

            if (respawn.tumbaX != null && respawn.tumbaY != null) {
                const newMarker = document.createElement('div');
                newMarker.classList.add('tumulo-marker');
                newMarker.style.left = `${respawn.tumbaX}%`;
                newMarker.style.top = `${respawn.tumbaY}%`;
                mapaContainer.appendChild(newMarker);
                
                const btnLimpar = document.createElement('button');
                btnLimpar.classList.add('clear-tumba-btn');
                btnLimpar.setAttribute('data-id', respawn._id);
                btnLimpar.textContent = "Limpar Marcação";
                mapaContainer.after(btnLimpar);
            }
        }

        // Atualiza o horário e as classes
        const pElement = cardExistente.querySelector('p');
        pElement.textContent = `Respawn: ${respawnFormatado}`;
        pElement.classList.remove('respawn-futuro', 'respawn-incerteza', 'respawn-passado');
        pElement.classList.add(estiloRespawn);

    } else {
        const novoCard = document.createElement('div');
        novoCard.classList.add('respawn-card');
        novoCard.setAttribute('data-monstro', monstro);

        // Renderização para criação inicial do HTML do card
        let htmlTumba = '';
        let htmlBtnLimpar = '';
        if (respawn.tumbaX != null && respawn.tumbaY != null) {
            htmlTumba = `<div class="tumulo-marker" style="left: ${respawn.tumbaX}%; top: ${respawn.tumbaY}%;"></div>`;
            htmlBtnLimpar = `<button class="clear-tumba-btn" data-id="${respawn._id}">Limpar Marcação</button>`;
        }

        novoCard.innerHTML = `
            <button class="delete-btn" data-id="${respawn._id}"><i class="fas fa-trash-alt"></i></button>
            <img src="${imagemMonstro}" alt="Imagem do monstro ${nomeMonstro}">
            <h3>${nomeFormatado}</h3>
            <h4>${nomeMapa}</h4>
            
            <div class="mapa-container">
                <img src="${urlMapaImg}" class="map-img" alt="Mapa de Respawn" data-id="${respawn._id}" title="Clique para marcar o túmulo">
                ${htmlTumba}
            </div>
            ${htmlBtnLimpar}

            <p class="${estiloRespawn}">Respawn: ${respawnFormatado}</p>
        `;
        resultadoContainer.appendChild(novoCard);
    }
};

// Delegação de Eventos (Delete e Marcação de Tumba)
resultadoContainer.addEventListener('click', async (event) => {
    
    // 1. Exclusão do Card
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        if (!confirm("Tem certeza que deseja deletar este time de MVP?")) return;

        const id = deleteBtn.getAttribute('data-id');
        const card = deleteBtn.closest('.respawn-card');
        
        try {
            await fetch(`/api/respawns/${id}`, { method: 'DELETE' });

            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';

            setTimeout(() => { if (card.parentNode) card.remove(); }, 500);

            statusMessage.textContent = 'Respawn excluído com sucesso!';
            statusMessage.classList.add('message');
            setTimeout(() => {
                statusMessage.style.display = 'none';
                statusMessage.classList.remove('message');
            }, 3000);
            
            setTimeout(carregarRespawns, 500); 

        } catch (error) {
            console.error("Erro ao excluir o respawn:", error);
            alert("Erro ao excluir. Tente novamente.");
        }
    }

    // 2. Clique no Mapa para marcar Tumba ("Patch")
    const mapImg = event.target.closest('.map-img');
    if (mapImg) {
        const id = mapImg.getAttribute('data-id');
        const rect = mapImg.getBoundingClientRect();
        
        const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

        try {
            await fetch(`/api/respawns/${id}/tumba`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tumbaX: xPercent, tumbaY: yPercent })
            });

            // Feedback visual rápido
            mapImg.style.filter = "brightness(1.5)";
            setTimeout(() => { mapImg.style.filter = "none"; }, 300);

            carregarRespawns(); // Aciona atualização local
        } catch (error) {
            console.error("Erro ao registrar túmulo:", error);
        }
    }

    // 3. Clique em Limpar Marcação
    const clearBtn = event.target.closest('.clear-tumba-btn');
    if (clearBtn) {
        const id = clearBtn.getAttribute('data-id');
        try {
            await fetch(`/api/respawns/${id}/tumba`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tumbaX: null, tumbaY: null }) // Anula as Coordenadas
            });
            carregarRespawns(); 
        } catch (error) {
            console.error("Erro ao limpar túmulo:", error);
        }
    }
});

// Função para buscar os dados do servidor e renderizar os cards "Virtual DOM" Mode
const carregarRespawns = async () => {
    try {
        const response = await fetch('/api/respawns');
        if (!response.ok) throw new Error(`Erro do servidor: ${response.status}`);

        const respawns = await response.json();

        if (Array.isArray(respawns)) {
            // "Limpeza inteligente": Apenas remove cards que foram excuídos por OUTROS clientes
            const idsAtuaisBanco = respawns.map(r => r._id);
            const cardsNaTela = document.querySelectorAll('.respawn-card');

            cardsNaTela.forEach(card => {
                const btn = card.querySelector('.delete-btn');
                if (btn) {
                    const localId = btn.getAttribute('data-id');
                    if (!idsAtuaisBanco.includes(localId)) {
                        card.remove();
                    }
                }
            });

            // Adiciona/Atualiza o resto sem resetar a tela brutalmente
            respawns.forEach(renderizarCard);
        } else {
            console.error("A resposta da API não é um array:", respawns);
        }

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
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
    const tempoRespawnHoras = temposIniciaisRespawn[monstroSelecionado] || 1;

    horaMorte.setHours(horaMorte.getHours() + tempoRespawnHoras);

    const novoRespawn = {
        monstro: monstroSelecionado,
        horarioRespawn: horaMorte
    };

    await fetch('/api/respawns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoRespawn)
    });

    carregarRespawns();
    horaMorteInput.value = '';
});

// Carrega os cards ao iniciar a página
carregarRespawns();

setInterval(carregarRespawns, 10000); // Recarrega a cada 10 segundos