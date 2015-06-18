// @Author Giovani Barcelos - November 28 - 2013



// Inicia as variáveis necessárias para o funcionamento do jogo
function start(){

	//Canvas related 
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	var joga = true;
	var paddle1,paddle2;

	var tamanhoBola = 10;
	var velocidadeBola = tamanhoBola;
	var velocidadePaddle = 6;

	//Direções são os quadrantes. 1 = superior esquerdo, 2 = superior direito, 3 = inferior direito, 4 = inferior esquerdo. No começo, a bola não está em nenhuma direção.
	var dir1 = false, dir2 = false, dir3 = false, dir4 = false;
	
	var pontosJogador1 = 0, pontosJogador2 = 0;

	var up1 = false, down1 = false, up2 = false, down2 = false;

	var bola;
	var vel = 60;
	
	var pontuacao = document.getElementById('pontos');
	
	restartGame();
	//Se o jogo estiver correndo, atualiza a posição dos Paddles e da Bola Quadrada
	if(joga) {
		setInterval(moveBola,vel);
		setInterval(atualizaPads, 25);
	}

	//Associa ações aos botões de pause, unpause e start.
		document.getElementById("pause").onclick = function(){ joga = false; };
		document.getElementById("unPause").onclick = function(){ joga = true; };
		document.getElementById("start").onclick = function(){ pontua(0); };


	//Adiciona um listener para o pressionamento de tecla.
	window.addEventListener('keydown', function(e) {
		//Cima Player 1
		if (e.keyCode === 87) {  
			up1 = true;
		}
		//Baixo Player 1
		else if (e.keyCode === 83) {  
			down1 = true;
		}
		//Cima Player 2
		if (e.keyCode === 38) {  
			up2 = true;
			
		//Baixo Player 2
		} else if (e.keyCode === 40) { 
			down2 = true;
		}   
	});

	//Adiciona um listener para o (des)pressionamento de tecla.
	window.addEventListener('keyup', function(e) {
		//Cima Player 1
		if (e.keyCode === 87) {  
			up1 = false;		
		}
		//Baixo Player 1
		else if (e.keyCode === 83) {  
			down1 = false;
		}
		//Cima Player 2
		if (e.keyCode === 38) { 
			up2 = false;
		} 
		//Baixo Player 2
		else if (e.keyCode === 40) {  
			down2 = false;
		}
	});

	//Reinicia o jogo
	function restartGame(){
		setaDirecaoInicialBola();
		ctx.clearRect(0,0,500,500);
		
		//Inicia os objetos
		paddle1 = {x: 10, y:200,width: 15,height:100};
		paddle2 = {x: 475, y:200,width: 15,height:100};
		bola = {x:250, y:100, width: 10, height: 10};
		
		//Renderiza os objetos
		renderBola();
		renderPaddle1();
		renderPaddle2();
	}

	//Função "randomica" que seta a direção inicial da bola
	function setaDirecaoInicialBola(){
		switch(Math.floor(Math.random()*4)){   // 0-3
			case 0:
			dir1 = true;
			dir2 = dir3 = dir4 = false;
			break;

			case 1:
			dir2 = true;
			dir1 = dir3 = dir4 = false;
			break;

			case 2:
			dir3 = true;
			dir2 = dir1 = dir4 = false;
			break;

			case 3:
			dir4 = true;
			dir2 = dir3 = dir1 = false;
			break;
		}	
	}

	function pontua(player) {		
		// 0 : Zera a pontuação dos dois jogadores
		// 1-2 : Adiciona um ponto para o jogador 1-2, e caso ele faça 10 pontos, reinicia o jogo com o alert que ele foi o vencedor
		switch(player) {
			case 0:
				pontosJogador1 = pontosJogador2 = 0;
				restartGame();
			break;

			case 1:
				pontosJogador1++;
				if(pontosJogador1 == 10) {
					window.alert("Jogador 1 venceu");
					pontua(0);
				} else
					restartGame();			
			break;

			case 2:
				pontosJogador2++;
				if(pontosJogador2 == 10) {
					window.alert("Jogador 2 venceu");
					pontua(0);
				} else
					restartGame();					
			break;
		}
		//Atualiza o placar
		pontuacao.innerHTML = pontosJogador1+":"+pontosJogador2;

	}
	function moveBola(){
		if(joga) {
			//Apaga a bola desenhada
			ctx.clearRect(bola.x,bola.y,bola.width,bola.height);
			
			
			//Move a posição da bola baseado em sua direção atual. Checa também por colisões.
			if(dir1) {
				bola.y -= velocidadeBola;
				bola.x -= velocidadeBola;
				if((bola.x - tamanhoBola) <= (paddle1.x+paddle1.width) && bola.y-tamanhoBola >= (paddle1.y+tamanhoBola) && bola.y-tamanhoBola <  (paddle1.y+paddle1.height)){
					if(bola-tamanhoBola.y < (paddle1.y + 25 )){
						dir1 = false;
						dir3 = true;
					} else {
						dir1 = false;
						dir2 = true;
					}

					if(vel>=25)
						vel-=5;
				}
				if(bola.y+ velocidadeBola <= 0){
					dir1 = false;
					dir4 = true;
					bola.y += velocidadeBola;
					bola.x += velocidadeBola;
				}
			} else if(dir2) {
				bola.y -= velocidadeBola;
				bola.x += velocidadeBola;
				if((bola.x+(2*tamanhoBola)) >= paddle2.x && bola.y-tamanhoBola >= paddle2.y && bola.y-tamanhoBola < (paddle2.y+paddle2.height)){
					if(bola.y-tamanhoBola < (paddle2.y + 25)){
						dir2 = false;
						dir4 = true;

					} else {
						dir2 = false;
						dir1 = true;
					}
					if(vel>=25)
						vel-=5;
				}
				if(bola.y + velocidadeBola <= 0){
					dir2 = false;
					dir3 = true;
					bola.y += velocidadeBola;
					bola.x += velocidadeBola;
				}
			} else if(dir3) {
				bola.y += velocidadeBola;
				bola.x += velocidadeBola;
				if((bola.x+(2*tamanhoBola)) >= paddle2.x && bola.y+tamanhoBola >= paddle2.y && bola.y+tamanhoBola < (paddle2.y+paddle2.height)){
					if(bola.y+tamanhoBola > (paddle2.y + 75)){
						dir3 = false;
						dir1 = true;

					} else {
						dir3 = false;
						dir4 = true;
					}				
					if(vel>=25)
						vel-=5;
				}
				if(bola.y+tamanhoBola >= 500){
					dir2 = true;
					dir3 = false;
				}
			} else if(dir4) {
				bola.y += velocidadeBola;
				bola.x -= velocidadeBola;
				if(bola.x-tamanhoBola <= (paddle1.x+paddle1.width) && bola.y+tamanhoBola >= paddle1.y && bola.y+tamanhoBola < (paddle1.y+paddle1.height)){
					if(bola.y+tamanhoBola > (paddle1.y + 75)){
						dir4 = false;
						dir2 = true;

					} else {
						dir4 = false;
						dir3 = true;
					}
					if(vel>=25)
						vel-=5;
				}
				if((bola.y+tamanhoBola) >= 500){
					dir4 = false;
					dir1 = true;
				}
			}

			
			if (bola.x < 18) { //Caso a bola tenha passado do paddle 1
				pontua(1);
			} else if(bola.x > 482) { //Caso a bola tenha passado do paddle 2
				pontua(2);
			} else { //Caso não tenha passado de nenhum paddle, apenas renderiza a bola em sua nova posição
				renderBola();
			}
		}
	}

	
	//Função que atualiza paddle 1
	function renderPaddle1() {
		ctx.fillStyle = 'blue';
		ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
	}

	//Função que atualiza paddle 2
	function renderPaddle2() {
		ctx.fillStyle = 'red';
		ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
	}

	//Função que atualiza a bola
	function renderBola() {
		ctx.fillStyle = 'black';
		ctx.fillRect(bola.x,bola.y,bola.width,bola.height);
		ctx.strokeRect(0,0,500,500);

	}

	function atualizaPads(){
		if(up1 == true){
			movePaddle1('up');
		}
		if(down1 == true){
			movePaddle1('down');
		}
		if(up2 == true){
			movePaddle2('up');
		}
		if(down2 == true){
			movePaddle2('down');
		}

	}

	function movePaddle1(direcao){
		if(joga) {
			ctx.fillStyle = 'red';
			if(direcao == 'up'){
				if(paddle1.y>2){
				ctx.clearRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
				paddle1.y -= velocidadePaddle;
				ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
				}
			} else if(direcao == 'down'){
				if(paddle1.y<398){
					ctx.clearRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
					paddle1.y += velocidadePaddle;
					ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
				}
			}
		}
	}

	function movePaddle2(direcao){
		if(joga) {
			ctx.fillStyle = 'blue';
			if(direcao == 'up'){
				if(paddle2.y>2){
					ctx.clearRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
					paddle2.y -= velocidadePaddle;
					ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
				}
			} else if(direcao == 'down'){
				if(paddle2.y<398){
					ctx.clearRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
					paddle2.y += velocidadePaddle;
					ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
				}
			}
		}
	}   

}