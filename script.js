const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const btnStartPause = document.getElementById('start-pause')
const textoBtnStartPause = document.querySelector('#start-pause span')

const tempoFoco = 1500
const tempoCurto = 300
const tempoLongo = 900

const titulo = document.querySelector('.app__title')
const destaqueTitulo = document.querySelector('.app__title-strong')
const banner = document.querySelector('.app__image-figure .app__image')

const inputMusicaFoco = document.getElementById('alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const somTermino = new Audio('/sons/beep.mp3')

const timer = document.getElementById('timer')

let tempoDecorrido = tempoFoco
let intervalo = null

inputMusicaFoco.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
        musica.loop = true
    } else {
        musica.pause()
    }
})

btnFoco.addEventListener('click', () => {
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break;  
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        somTermino.play()
        alert("Acabou o tempo!")
        parar()
        return
    }
    tempoDecorrido -= 1
    console.log('Temporizador: ' + tempoDecorrido)
    mostrarTempo()
}

btnStartPause.addEventListener('click', iniciarOuPausarTemporizador)

function iniciarOuPausarTemporizador() {
    if (intervalo) {
        somPause.play()
        parar()
        return
    }
    somPlay.play()
    intervalo = setInterval(contagemRegressiva, 1000)
    btnStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""><span>Pausar</span>`
}

function parar() {
    clearInterval(intervalo)
    btnStartPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Começar</span>`
    intervalo = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

mostrarTempo()