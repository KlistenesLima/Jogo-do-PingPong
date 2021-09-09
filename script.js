//Elementos
var vbtIniciar//Variável para o botão iniciar.
var vbola //Variável para a bola.
var vcpu //Variável para a CPU.
var vjogador //Variável para o jogador.
var vPaineltxtPontos //Variável para o painel de pontos.

//Controle de animação
var game,frames //Variáveis do controle de animação.

//Posições
var posBolaX,posBolaY//Posição em 'X' da bola, posição da bola em 'Y'.
var posJogadorX,posJogadorY//Posição do jogador em 'X' e 'Y'.
var posCpuX,posCpuY//Posição da CPU em 'X' e 'Y'.

//Direção de acordo com a tecla.
var dirJy//Direção 'y' do jogador.

//Posições iniciais
var posJogIniY=180//Posição do jogador inicial em 'Y'.
var posCpuIniY=180//Posição inicial da CPU em 'Y'.
var posBolaIniX=475//Posição inicial da bola em 'X'.
var posBolaIniY=240//Posição inicial da bola em 'Y'.

//Tamanhos
var campoX=0//Posição 'X' do campo.
var campoY=0//Posição 'Y' do campo.
var campoW=960//Largura do campo.
var campoH=500//Altura do campo.
var barraW=20//Largura da barra.
var barraH=140//Altura da barra.
var bolaW=20//Largura da bola.
var bolaH=20//Alltura da bola.

//Direção
var bolaX//DIreção da bola em 'X'.
var bolaY//Direção da bola em 'Y'.
var cpuY=0//Direção da CPU em 'Y'.

//Velocidade
var velBola//Velocidade de bola.
var velCpu//Velocidade de CPU.
var velJogador//Velocidade do jogador.

//Controle
var pontos=0//Variável para os pontos.
var tecla//Variável que vai armazenar o código da tecla pressionada.
jogo=false


function controlajog(){
    if(jogo){//Se o jogo estiver rolando.
        posJogadorY+=velJogador*dirJy
        if(((posJogadorY+barraH)>=campoH)||((posJogadorY)<=0)){
        //Nâo deixa a barrinha do jogador sair da tela.
            posJogadorY+=(velJogador*dirJy)*(-1)
            //VelocidadedoJogador*PosiçãodoJogador.
        }
        vjogador.style.top=posJogadorY+'px'
    }
}
function controlacpu(){
    if(jogo){
        if((posBolaX > (campoW/2))&&(bolaX > 0)){
            //Movimentar CPU
            if(((posBolaY+(bolaH/2))>((posCpuY+(barraH/2)))+velCpu)){
                //Mover para baixo
                if((posCpuY+barraH) <= campoH){
                    posCpuY+=velCpu
                }
            }else if((posBolaY+(bolaH/2)) < (posCpuY+(barraH/2))-velCpu){
                //Mover para cima
                if(posCpuY >= 0){
                    posCpuY-=velCpu
                }
            }
        }else{
            //Posicionar CPU no centro
            if((posCpuY+(barraH/2))<(campoH/2)){
                    posCpuY+=velCpu
            }else if((posCpuY+(barraH/2))>(campoH/2)){
                posCpuY-=velCpu
            }            
            
        }
        vcpu.style.top=posCpuY+'px'
    }
}

function controlaBola(){
    //Controle de movimento da bola.
    posBolaX+=velBola*bolaX//VelocidadedaBola*PosiçãodaBola.
    posBolaY+=velBola*bolaY//VelocidadedaBola*PosiçãodaBola.

    //Colisão com jogador.
    if((posBolaX <= posJogadorX+barraW)&&((posBolaY+bolaH) >= posJogadorY)&&(posBolaY <= posJogadorY+barraH)){
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/16)
        bolaX*=-1
    }
    //Colisão com CPU.
    if((posBolaX >= posCpuX-barraW)&&(((posBolaY+bolaH) >= posCpuY)&&(posBolaY <= posCpuY+barraH))){
        bolaY=(((posBolaY+(bolaH/2))-(posCpuY+(barraH/2)))/16)
        bolaX*=-1
    }
    //Limites superior e inferior
    if((posBolaY >=480)||(posBolaY <= 0)){
        bolaY*=-1
    }
    //Saiu da tela pela direita e pela esquerda
    if(posBolaX >= (campoW-bolaW)){
        velBola=0
        posBolaX=posBolaIniX
        posBolaY=posBolaIniY
        posJogadorY=posJogIniY
        posCpuY=posCpuIniY
        pontos++
        vPaineltxtPontos.value=pontos
        jogo=false
        vjogador.style.top=posJogadorY+'px'
        vcpu.style.top=posCpuY+'px'
    }else if(posBolaX <= 0){
        velBola=0
        posBolaX=posBolaIniX
        posBolaY=posBolaIniY
        posJogadorY=posJogIniY
        posCpuY=posCpuIniY
        pontos--
        vPaineltxtPontos.value=pontos
        jogo=false
        vjogador.style.top=posJogadorY+'px'
        vcpu.style.top=posCpuY+'px'
    }

    vbola.style.top=posBolaY+'px'
    vbola.style.left=posBolaX+'px'//Passar as informações para a bola. 
}

function teclaDw(){//Quando a tecla for pressionada ele chama essa função.
    tecla=event.keyCode
    if(tecla==38){//CIMA.
        dirJy=-1
    }else if(tecla==40){//Baixo
        dirJy=+1
    }
}

function teclaUp(){//Quando a tecla for liberada, ela chama essa função para parar a movimentação.
    tecla=event.keyCode
    if(tecla==38){//CIMA.
        dirJy=0
    }else if(tecla==40){//Baixo
        dirJy=0
    }
}

function game(){//Se o jogo estiver rolando.Ela vai receber as funções de controle do jogo.
    if(jogo){
        controlajog()
        controlaBola()
        controlacpu()
    }
    frames=requestAnimationFrame(game)//Loop de animação.
}
function iniciaJogo(){//Função para iniciar o jogo.
    if(!jogo){//Se o jogo estiver parado.
        velBola=8
        velCpu=8
        velJogador=8
        cancelAnimationFrame(frames)//Cancela a animação, para não ter uma chamada em cima da outra.
        jogo=true
        dirJy=0
        bolaX=0
        bolaY=0
        if((Math.random()*10)<5){
            bolaX=-1
        }else{
            bolaX=1
        }
        posJogadorX=10
        posCpuX=930
        posBolaX=posBolaIniX
        posBolaY=posBolaIniY
        posJogadorY=posJogIniY
        posCpuY=posCpuIniY
        game()
    }  
}

function inicializa(){//Função para inicializar os componentes do jogo(Variáveis).
    velBola=8
    velCpu=8
    velJogador=8
    vbtIniciar=document.getElementById('btIniciar')
    vbtIniciar.addEventListener('click',iniciaJogo)
    vjogador=document.getElementById('dvJogador')
    vcpu=document.getElementById('dvCpu')
    vbola=document.getElementById('dvBola')
    vPaineltxtPontos=document.getElementById('txtPontos')
    document.addEventListener('keydown',teclaDw)//Quando a tecla for pressionada ele chama essa função.
    document.addEventListener('keyup',teclaUp)//Quando a tecla for liberada, ela chama essa função para parar a movimentação.
}
window.addEventListener('load',inicializa)//Inicia a função ao carregar da página.