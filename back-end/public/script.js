// Função para atualizar os relógios (Local e Servidor)
function atualizarRelogio() {
    const agora = new Date();
    
    // Relógio Local
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    
    const relogioElemento = document.getElementById('relogio-digital');
    if (relogioElemento) {
        relogioElemento.textContent = `${horas}:${minutos}:${segundos}`;
    }

    // Relógio Servidor (GMT+0)
    const horasGMT = agora.getUTCHours().toString().padStart(2, '0');
    const minutosGMT = agora.getUTCMinutes().toString().padStart(2, '0');
    const segundosGMT = agora.getUTCSeconds().toString().padStart(2, '0');
    
    const relogioServerElemento = document.getElementById('relogio-server');
    if (relogioServerElemento) {
        relogioServerElemento.textContent = `${horasGMT}:${minutosGMT}:${segundosGMT}`;
    }
}

// Atualiza o relógio a cada 1 segundo (1000 milissegundos)
setInterval(atualizarRelogio, 1000);

// Chama a função uma vez para exibir a hora imediatamente
atualizarRelogio();

// Mapeamento de monstros para suas imagens e mapas
const imagensMonstros = {
    // Existentes
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
    ghostring3: 'images/ghostring.gif',
    // Novos
    amonra: 'images/amonra.gif',
    eremes: 'images/eremes.gif',
    atroce1: 'images/atroce.gif',
    atroce2: 'images/atroce.gif',
    atroce3: 'images/atroce.gif',
    atroce4: 'images/atroce.gif',
    atroce5: 'images/atroce.gif',
    whitelady: 'images/whitelady.gif',
    baphomet: 'images/baphomet.gif',
    beelzebub: 'images/beelzebub.gif',
    boitata: 'images/boitata.gif',
    darklord: 'images/darklord.gif',
    detardeurus: 'images/detardeurus.gif',
    doppelganger: 'images/doppelganger.gif',
    dracula: 'images/dracula.gif',
    drake: 'images/drake.gif',
    eddga: 'images/eddga.gif',
    evilsnakelord: 'images/evilsnakelord.gif',
    fallenbishop: 'images/fallenbishop.gif',
    hatii: 'images/hatii.gif',
    gloomundernight: 'images/gloomundernight.gif',
    gtb: 'images/gtb.gif',
    gopinich: 'images/gopinich.gif',
    margaretha: 'images/margaretha.gif',
    kathryne: 'images/kathryne.gif',
    incantation: 'images/incantation.gif',
    kiel: 'images/kiel.gif',
    stormyknight: 'images/stormyknight.gif',
    ladytanee: 'images/ladytanee.gif',
    seyren: 'images/seyren.gif',
    lordofdeath: 'images/lordofdeath.gif',
    maya: 'images/maya.gif',
    mistress: 'images/mistress.gif',
    moonlight: 'images/moonlight.gif',
    orchero: 'images/orchero.gif',
    orclord: 'images/orclord.gif',
    osiris: 'images/osiris.gif',
    pharaoh: 'images/pharaoh.gif',
    phreeoni: 'images/phreeoni.gif',
    rsx: 'images/rsx.gif',
    cecil: 'images/cecil.gif',
    taogunka: 'images/taogunka.gif',
    turtlegeneral: 'images/turtlegeneral.gif',
    vesper: 'images/vesper.gif',
    howard: 'images/howard.gif',
    cenia: 'images/cenia.gif',
    gryphon1: 'images/gryphon.gif',
    gryphon2: 'images/gryphon.gif',
    gryphon3: 'images/gryphon.gif',
    gryphon4: 'images/gryphon.gif',
    gryphon5: 'images/gryphon.gif',
    mayapurple: 'images/mayapurple.gif'
};

const mapasMonstros = {
    // Existentes
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
    'ghostring3': 'treasure02',
    // Novos
    'amonra': 'moc_pryd06',
    'eremes': 'lhz_dun03',
    'atroce1': 'ra_fild02',
    'atroce2': 'ra_fild03',
    'atroce3': 'ra_fild04',
    'atroce4': 've_fild01',
    'atroce5': 've_fild02',
    'whitelady': 'lou_dun03',
    'baphomet': 'prt_maze03',
    'beelzebub': 'abbey03',
    'boitata': 'bra_dun02',
    'darklord': 'gl_chyard',
    'detardeurus': 'abyss_03',
    'doppelganger': 'gef_dun02',
    'dracula': 'gef_dun01',
    'drake': 'treasure02',
    'eddga': 'pay_fild11',
    'evilsnakelord': 'gon_dun03',
    'fallenbishop': 'abbey02',
    'hatii': 'xmas_fild01',
    'gloomundernight': 'ra_san05',
    'gtb': 'prt_sewb4',
    'gopinich': 'mosk_dun03',
    'margaretha': 'lhz_dun03',
    'kathryne': 'lhz_dun03',
    'incantation': 'ama_dun03',
    'kiel': 'kh_dun02',
    'stormyknight': 'xmas_dun02',
    'ladytanee': 'ayo_dun02',
    'seyren': 'lhz_dun03',
    'lordofdeath': 'niflheim',
    'maya': 'anthell02',
    'mistress': 'mjolnir_04',
    'moonlight': 'pay_dun04',
    'orchero': 'gef_fild14',
    'orclord': 'gef_fild10',
    'osiris': 'moc_pryd04',
    'pharaoh': 'in_sphinx5',
    'phreeoni': 'moc_fild17',
    'rsx': 'ein_dun02',
    'cecil': 'lhz_dun03',
    'taogunka': 'beach_dun',
    'turtlegeneral': 'tur_dun04',
    'vesper': 'jupe_core',
    'howard': 'lhz_dun03',
    'cenia': 'lhz_dun02',
    'gryphon1': 'cmd_fild08',
    'gryphon2': 'ra_fild01',
    'gryphon3': 'ra_fild01',
    'gryphon4': 'ra_fild01',
    'gryphon5': 'um_fild03',
    'mayapurple': 'anthell01'
};

// Tempos de incerteza em milissegundos
const temposIncerteza = {
    // Existentes
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
    'ghostring3': 20 * 60 * 1000,
    // Novos
    'amonra': 10 * 60 * 1000,
    'eremes': 30 * 60 * 1000,
    'atroce1': 10 * 60 * 1000,
    'atroce2': 10 * 60 * 1000,
    'atroce3': 10 * 60 * 1000,
    'atroce4': 10 * 60 * 1000,
    'atroce5': 10 * 60 * 1000,
    'whitelady': 10 * 60 * 1000,
    'baphomet': 10 * 60 * 1000,
    'beelzebub': 10 * 60 * 1000,
    'boitata': 10 * 60 * 1000,
    'darklord': 10 * 60 * 1000,
    'detardeurus': 10 * 60 * 1000,
    'doppelganger': 10 * 60 * 1000,
    'dracula': 10 * 60 * 1000,
    'drake': 10 * 60 * 1000,
    'eddga': 10 * 60 * 1000,
    'evilsnakelord': 10 * 60 * 1000,
    'fallenbishop': 10 * 60 * 1000,
    'hatii': 10 * 60 * 1000,
    'gloomundernight': 10 * 60 * 1000,
    'gtb': 10 * 60 * 1000,
    'gopinich': 10 * 60 * 1000,
    'margaretha': 30 * 60 * 1000,
    'kathryne': 30 * 60 * 1000,
    'incantation': 10 * 60 * 1000,
    'kiel': 60 * 60 * 1000,
    'stormyknight': 10 * 60 * 1000,
    'ladytanee': 10 * 60 * 1000,
    'seyren': 30 * 60 * 1000,
    'lordofdeath': 0,
    'maya': 10 * 60 * 1000,
    'mistress': 10 * 60 * 1000,
    'moonlight': 10 * 60 * 1000,
    'orchero': 10 * 60 * 1000,
    'orclord': 10 * 60 * 1000,
    'osiris': 10 * 60 * 1000,
    'pharaoh': 10 * 60 * 1000,
    'phreeoni': 10 * 60 * 1000,
    'rsx': 10 * 60 * 1000,
    'cecil': 30 * 60 * 1000,
    'taogunka': 10 * 60 * 1000,
    'turtlegeneral': 10 * 60 * 1000,
    'vesper': 10 * 60 * 1000,
    'howard': 30 * 60 * 1000,
    'cenia': 10 * 60 * 1000,
    'gryphon1': 30 * 60 * 1000,
    'gryphon2': 0,
    'gryphon3': 0,
    'gryphon4': 0,
    'gryphon5': 32 * 60 * 1000,
    'mayapurple': 60 * 60 * 1000
};

// Dicionário Limpo Substituto do Switch/Case
const temposIniciaisRespawn = {
    // Existentes (convertidos para minutos para evitar bugs decimais)
    'ifrit': 660,
    'valk': 480,
    'wsm': 720,
    'corrupted': 960,
    'amdarais': 960,
    'thanatos': 120,
    'valkzinha1': 90,
    'valkzinha2': 30,
    'valkzinha3': 30,
    'angeling1': 60,
    'angeling2': 60,
    'angeling3': 60,
    'deviling1': 120,
    'deviling2': 60,
    'ghostring1': 60,
    'ghostring2': 117,
    'ghostring3': 33,
    // Novos
    'amonra': 60,
    'eremes': 100,
    'atroce1': 240,
    'atroce2': 180,
    'atroce3': 300,
    'atroce4': 180,
    'atroce5': 360,
    'whitelady': 117,
    'baphomet': 120,
    'beelzebub': 720,
    'boitata': 120,
    'darklord': 60,
    'detardeurus': 180,
    'doppelganger': 120,
    'dracula': 60,
    'drake': 120,
    'eddga': 120,
    'evilsnakelord': 94,
    'fallenbishop': 120,
    'hatii': 120,
    'gloomundernight': 300,
    'gtb': 60,
    'gopinich': 120,
    'margaretha': 100,
    'kathryne': 100,
    'incantation': 91,
    'kiel': 120,
    'stormyknight': 60,
    'ladytanee': 420,
    'seyren': 100,
    'lordofdeath': 133,
    'maya': 120,
    'mistress': 120,
    'moonlight': 60,
    'orchero': 60,
    'orclord': 120,
    'osiris': 60,
    'pharaoh': 60,
    'phreeoni': 120,
    'rsx': 125,
    'cecil': 100,
    'taogunka': 300,
    'turtlegeneral': 60,
    'vesper': 120,
    'howard': 100,
    'cenia': 120,
    'gryphon1': 60,
    'gryphon2': 60,
    'gryphon3': 60,
    'gryphon4': 60,
    'gryphon5': 58,
    'mayapurple': 120
};

const form = document.getElementById('respawnForm');
const wrapperCategorias = document.getElementById('wrapper-categorias'); // Usaremos o wrapper completo para os cliques
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

// Carrega preferência de fuso horário
const timezonePreferida = localStorage.getItem('timezone_pref') || 'local';
const radioTimezone = document.querySelector(`input[name="timezone"][value="${timezonePreferida}"]`);
if (radioTimezone) radioTimezone.checked = true;

// Salva preferência ao mudar
document.querySelectorAll('input[name="timezone"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        localStorage.setItem('timezone_pref', e.target.value);
    });
});

// Opcionalmente, define o valor inicial para a data e hora atuais
horaMorteInput.value = formatarData(dataAtual);

// Função para renderizar um card no HTML
const renderizarCard = (respawn) => {
    const monstro = respawn.monstro;
    const nomeMonstro = monstro.toUpperCase();
    const imagemMonstro = imagensMonstros[monstro];
    const nomeMapa = mapasMonstros[monstro] || 'Mapa Desconhecido';
    
    // Imagem do mapa local
    let urlMapaImg;
    if (monstro === 'corrupted') {
        urlMapaImg = 'maps/1@gl_k.gif';
    } else if (monstro === 'amdarais') {
        urlMapaImg = 'maps/2@gl_k.gif';
    } else {
        urlMapaImg = `maps/${nomeMapa}.gif`;
    }

    // Dicionário de nomes de exibição (igual ao formulário)
    const nomesExibicao = {
        ifrit: 'Ifrit', valk: 'Valkyrie Randgris', wsm: 'WSM',
        corrupted: 'Corrupted Soul', amdarais: 'Amdarais', thanatos: 'Thanatos',
        valkzinha1: 'Valkzinha (odin_tem02)', valkzinha2: 'Valkzinha (odin_tem03)',
        valkzinha3: 'Valkzinha (odin_tem03)', angeling1: 'Angeling (pay_fild04)',
        angeling2: 'Angeling (yuno_fild03)', angeling3: 'Angeling (xmas_dun01)',
        deviling1: 'Deviling (pay_fild04)', deviling2: 'Deviling (yuno_fild03)',
        ghostring1: 'Ghostring (pay_fild04)', ghostring2: 'Ghostring (prt_maze03)',
        ghostring3: 'Ghostring (treasure02)', amonra: 'Amon Ra',
        eremes: 'Assassin Cross Eremes', atroce1: 'Atroce (ra_fild02)',
        atroce2: 'Atroce (ra_fild03)', atroce3: 'Atroce (ra_fild04)',
        atroce4: 'Atroce (ve_fild01)', atroce5: 'Atroce (ve_fild02)',
        whitelady: 'White Lady', baphomet: 'Baphomet', beelzebub: 'Beelzebub',
        boitata: 'Boitata', darklord: 'Dark Lord', detardeurus: 'Detardeurus',
        doppelganger: 'Doppelganger', dracula: 'Dracula', drake: 'Drake',
        eddga: 'Eddga', evilsnakelord: 'Evil Snake Lord', fallenbishop: 'Fallen Bishop',
        hatii: 'Hatii', gloomundernight: 'Gloom Under Night',
        gtb: 'Golden Thief Bug', gopinich: 'Gopinich',
        margaretha: 'High Priest Margaretha', kathryne: 'High Wizard Kathryne',
        incantation: 'Incantation Samurai', kiel: 'Kiel D-01',
        stormyknight: 'Stormy Knight', ladytanee: 'Lady Tanee',
        seyren: 'Lord Knight Seyren', lordofdeath: 'Lord of Death',
        maya: 'Maya', mistress: 'Mistress', moonlight: 'Moonlight Flower',
        orchero: 'Orc Hero', orclord: 'Orc Lord', osiris: 'Osiris',
        pharaoh: 'Pharaoh', phreeoni: 'Phreeoni', rsx: 'RSX-0806',
        cecil: 'Sniper Cecil', taogunka: 'Tao Gunka', turtlegeneral: 'Turtle General',
        vesper: 'Vesper', howard: 'Whitesmith Howard', cenia: 'Egnigem Cenia',
        gryphon1: 'Gryphon (cmd_fild08)', gryphon2: 'Gryphon (ra_fild01) - 1',
        gryphon3: 'Gryphon (ra_fild01) - 2', gryphon4: 'Gryphon (ra_fild01) - 3',
        gryphon5: 'Gryphon (um_fild03)', mayapurple: 'Maya Purple'
    };
    const nomeFormatado = nomesExibicao[monstro] || (monstro.charAt(0).toUpperCase() + monstro.slice(1));

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

        // Garante que o texto de instrução esteja presente
        const h4Element = cardExistente.querySelector('h4');
        if (h4Element) h4Element.textContent = "Marque o local do túmulo no mapa";

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
            <h4>Marque o local do túmulo no mapa</h4>
            
            <div class="mapa-container">
                <img src="${urlMapaImg}" class="map-img" alt="Mapa de Respawn" data-id="${respawn._id}" title="Clique para marcar o túmulo">
                ${htmlTumba}
            </div>
            ${htmlBtnLimpar}

            <p class="${estiloRespawn}">Respawn: ${respawnFormatado}</p>
            <p class="respawn-gmt"><i class="fas fa-globe"></i> Servidor: ${horarioRespawn.getUTCHours().toString().padStart(2, '0')}:${horarioRespawn.getUTCMinutes().toString().padStart(2, '0')} (GMT+0)</p>
        `;

        // Identifica a categoria para colocar no contêiner correto
        const isMVP = [
            'ifrit', 'valk', 'wsm', 'corrupted', 'amdarais', 'thanatos',
            'amonra', 'eremes', 'atroce1', 'atroce2', 'atroce3', 'atroce4', 'atroce5',
            'whitelady', 'baphomet', 'beelzebub', 'boitata', 'darklord', 'detardeurus',
            'doppelganger', 'dracula', 'drake', 'eddga', 'evilsnakelord', 'fallenbishop',
            'hatii', 'gloomundernight', 'gtb', 'gopinich', 'margaretha', 'kathryne',
            'incantation', 'kiel', 'stormyknight', 'ladytanee', 'seyren', 'lordofdeath',
            'maya', 'mistress', 'moonlight', 'orchero', 'orclord', 'osiris', 'pharaoh',
            'phreeoni', 'rsx', 'cecil', 'taogunka', 'turtlegeneral', 'vesper', 'howard', 'cenia'
        ].includes(monstro);
        const containerAlvo = isMVP ? document.getElementById('resultado-mvps') : document.getElementById('resultado-miniboss');
        containerAlvo.appendChild(novoCard);
    }
};

// Delegação de Eventos (Delete e Marcação de Tumba)
wrapperCategorias.addEventListener('click', async (event) => {
    
    // 1. Exclusão do Card
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        if (!confirm("Tem certeza que deseja deletar este time de MVP/Miniboss?")) return;

        const id = deleteBtn.getAttribute('data-id');
        const card = deleteBtn.closest('.respawn-card');
        
        try {
            await fetch(`/api/respawns/${id}`, { method: 'DELETE' });

            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';

            setTimeout(() => { if (card.parentNode) card.remove(); }, 500);

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
            // "Limpeza inteligente": Apenas remove cards que foram excluídos por OUTROS clientes
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

    if (!confirm("Tem certeza que deseja adicionar este time de MVP/Miniboss?")) return;

    if (!horaMorteString) {
        alert("Por favor, insira a hora da morte do monstro.");
        return;
    }

    let horaMorte;
    const timezoneSelected = document.querySelector('input[name="timezone"]:checked').value;

    if (timezoneSelected === 'server') {
        // Se selecionado Servidor, interpretamos o input como UTC
        const dataLocal = new Date(horaMorteString);
        // Ajustamos para UTC usando os componentes da data local como se fossem UTC
        horaMorte = new Date(Date.UTC(
            dataLocal.getFullYear(),
            dataLocal.getMonth(),
            dataLocal.getDate(),
            dataLocal.getHours(),
            dataLocal.getMinutes()
        ));
    } else {
        horaMorte = new Date(horaMorteString);
    }

    const tempoRespawnMinutos = temposIniciaisRespawn[monstroSelecionado] || 60;
    const tempoRespawnMs = tempoRespawnMinutos * 60 * 1000;

    horaMorte.setTime(horaMorte.getTime() + tempoRespawnMs);

    const novoRespawn = {
        monstro: monstroSelecionado,
        horarioRespawn: horaMorte.toISOString() // Enviamos como ISO para garantir integridade
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