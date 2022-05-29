var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spacePressed = false;
var level = 1;
var bombnum = 0;
var bombspeed = 20;
var bombspawnfrequency = Math.floor(Math.random()*(1500-300))+300;
var score=0;
var alienCount = 1;

function startthegame() {
	score = 0;
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	var firstalien = document.getElementsByClassName('alien')[0];
	firstalien.parentNode.removeChild(firstalien);
	start.style.display ='none';
	setTimeout(alienspawn,20);
	thebombspawn = setInterval(bombSpawn,bombspawnfrequency);
	thebomb = setInterval(bombMove, bombspeed);
	checking = setInterval(checkifhit,401);
	firearrow = setInterval(arrowspawn,20);
	moveatherrows = setInterval(movearrows,20);
	var scoreboard = document.getElementsByClassName('score')[0];
	scoreboard.innerHTML = 'Your score: ' + score;
	console.log(bombspawnfrequency);
}

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	if (event.keyCode == 32) {
		spacePressed = false;
		lastPressed = 'weapon bow';
	}

	player.className = 'character stand ' + lastPressed;
}

function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop+1;
		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		}
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}}}
	if (leftPressed) {
		var newLeft = positionLeft-1;
		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}
		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}
		player.className = 'character walk right';
}}

function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
	if(event.keyCode == 32) {
		spacePressed = true;
		upPressed = false;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;
		player.className = 'character stand up fire';
	}
}

function livescounter(){
	var health = document.getElementsByClassName('health')[0];
	var lives = health.getElementsByTagName('li');
	var livesleft = lives.length;
	return livesleft;
}

function alienspawn(){
	var newalien = document.createElement('div');
	body.appendChild(newalien);
	newalien.classList.add('alien');
	newalien.style.top = 0;
	var randnum = Math.round(Math.random()*window.innerWidth)-86;
	newalien.style.left=randnum + 'px';
	leftright(newalien);
	var aliens = document.getElementsByClassName('alien');
	if(aliens.length>=alienCount){
		clearInterval(alienspawn);
	}
}

function leftright(item){
	var goleft = false;
	var goright = true;
	var randomshipspeed = Math.floor(Math.random()*(51-10)+10);
	
	setInterval(function(){
	var position = item.offsetLeft;
	if(goright){
		position++
		item.style.left=position + 'px';
	}
	if(goleft){
		position--
		item.style.left=position + 'px';
	}
	if(position==0 || position<0){
		goleft=false;
		goright=true;
	}
	if(position+86 == window.innerWidth || position>window.innerWidth){
		goleft=true;
		goright=false;
}}),randomshipspeed}

function bombSpawn(){
		var aliens = body.getElementsByClassName('alien');
		for(var i=0; i<aliens.length;i++){
			var alienposition= aliens[i].offsetLeft;
			var bomb = document.createElement('div');
			bomb.classList = 'bomb';
			bomb.style.left=alienposition + 43 + 'px';
			bomb.style.top = 90 + 'px';
			body.appendChild(bomb);
		}
}

function bombMove(){
		var bombs = document.getElementsByClassName('bomb');
		var sky = document.getElementsByClassName('sky')[0];
		var random = Math.ceil(Math.random()*(window.innerHeight-sky.offsetHeight))+sky.offsetHeight;
		
		for(var i=0;i<bombs.length;i++){
		var top = bombs[i].offsetTop;
		var newTop = top+5;
		bombs[i].style.top = newTop + 'px';

		if(newTop > random){
		bombs[i].classList = 'explosion';
		setTimeout(clearExplosion,400);}
}}

function collision(item1,item2,item1w,item1h,item2w,item2h){
	var outcome = false;

	if(item1.offsetLeft + item1w >= item2.offsetLeft &&
		item1.offsetLeft <= item2.offsetLeft + item2w &&
		item1.offsetTop + item1h >= item2.offsetTop &&
		item1.offsetTop<=item2.offsetTop + item2h){
		outcome = true;}

	else {outcome = false;}

	return outcome;
}

function checkifhit(){
	var player = document.getElementsByClassName('character')[0];

	var booms = document.getElementsByClassName('explosion');
	for(var i=0;i<booms.length;i++){
		if (collision(player,booms[i],32,64,128,160) && livescounter()>1){
		removealife();
		console.log(livescounter());
		document.removeEventListener('keydown', keydown);
		document.removeEventListener('keyup', keyup);
		upPressed = false;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;
		player.classList = 'character hit left';
			
		setTimeout(() => {
		upPressed = false;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;
		document.addEventListener('keydown', keydown);
		document.addEventListener('keyup', keyup);
		player.classList = 'character stand down';
		}, 500);}

	else if (collision(player,booms[i],32,64,128,160) && livescounter()==1){
		removealife();
		document.removeEventListener('keydown', keydown);
		document.removeEventListener('keyup', keyup);
		player.classList='character dead';
		purge('arrow');
		purge('bomb');
		purge('alien');
		purge('explosion');
		setTimeout(gameOver, 2000);	
}}}

function resetglobalvars(){
		upPressed = false;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;
		lastPressed = false;
		spacePressed = false;
		level = 1;
		bombnum = 0;
		bombspeed = 20;
		bombspawnfrequency = 1500;
		alienspawnfrequency = 5000;
		score = 0;
		var scoreboard = document.getElementsByClassName('score')[0];
		scoreboard.innerHTML = 'Your score: ' + score;
		var levelcount = document.getElementsByClassName('level')[0];
		levelcount.innerHTML = 'Level: ' + level;
}

function removealife(){
		var health = document.getElementsByClassName('health')[0];
			var lives = health.getElementsByTagName('li')[0];
			lives.parentNode.removeChild(lives);
}

function arrowspawn(){
	var player = document.getElementById('player');
	var positionL=player.offsetLeft;
	var positionT=player.offsetTop;
	if(spacePressed){
		spacePressed = false;
		document.removeEventListener('keydown', keydown);
		document.removeEventListener('keyup', keyup);
		upPressed = false;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;
	
	setTimeout(function(){
		var newarrow = document.createElement('div');
		body.appendChild(newarrow);
		newarrow.classList = 'arrow up';
		newarrow.style.top = positionT + 'px';
		newarrow.style.left = positionL + 'px';
		document.addEventListener('keydown', keydown);
		document.addEventListener('keyup', keyup);
		lastPressed;
		}, 500);
}}

function movearrows(){
	var arrows = document.getElementsByClassName('arrow');
	var bombs = document.getElementsByClassName('bomb');

		for(var b=0; b<arrows.length;b++){
			if(arrows[b].offsetTop<=0){
			arrows[b].parentNode.removeChild(arrows[b]);}

			else{
				if(arrows[b].offsetTop > 0){
				var newpos = arrows[b].offsetTop - 5;
				arrows[b].style.top = newpos + 'px';}

		for(var c=0;c<bombs.length;c++){
			var check = document.elementFromPoint(bombs[c].offsetLeft,bombs[c].offsetTop+10);
			if(check.classList.contains('sky')==true && collision(arrows[b],bombs[c],32,10,31,10)){
			arrows[b].parentNode.removeChild(arrows[b]);
			bombs[c].parentNode.removeChild(bombs[c]);
			score=score+1;
			var scoreboard = document.getElementsByClassName('score')[0];
			scoreboard.innerHTML = 'Your score: ' + score;
			setTimeout(levelcheck,500);
		}}}}}

function levelcheck(){
	if(score%5==0){
	level = level+1;
	var levelcount = document.getElementsByClassName('level')[0];
	levelcount.innerHTML = 'Level: ' + level;
	if(level%3==0){
	alienCount=alienCount+1;
	setTimeout(alienspawn, 20);}
	if(level%4==0 && bombspawnfrequency>0){
	bombspawnfrequency=bombspawnfrequency-100;}}

}

function purge(classname){
		var items = document.getElementsByClassName(classname);
		for(var i=0; i<items.length;i++){
		items[i].parentNode.removeChild(items[i]);}
}

function clearExplosion(){
		var exp = document.getElementsByClassName('explosion');
		for(var i = 0; i < exp.length; i++){
			exp[i].parentNode.removeChild(exp[i]);}
}

function gameOver(){
		upPressed = false;
		downPressed = false;
		leftPressed = false;
		rightPressed = false;		
		document.removeEventListener('keydown', keydown);
		document.removeEventListener('keyup', keyup);
		purge('explosion');
		clearInterval(timeout);
		clearInterval(thebomb);
		clearInterval(thebombspawn);
		clearInterval(checking);
		setTimeout(purge('bomb'),500);
		purge('alien');	
		purge('arrow');
		resetglobalvars();

		var onealien = document.createElement('div');
		body.appendChild(onealien);
		onealien.classList = 'alien';
		onealien.style.top = 15 + 'vh';
		onealien.style.left = 45 + '%';

		for(var a=0;a<3;a++){
		var health = document.getElementsByClassName('health')[0];
		var lives = document.createElement('li');
		health.appendChild(lives);
		}

		var player = document.getElementById('player');
		player.style.left = '200px';
		player.style.top = '88vh';
		player.classList = 'character stand down';
		
		var start = document.getElementsByClassName('start')[0];
		start.style.display = 'block';
		start.style.width = 25 + 'vw';
		start.innerHTML= 'Game Over! Play Again?';
		start.addEventListener('click',startthegame);
}	

function myLoadFunction() {
	start = document.getElementsByClassName('start')[0];
	body = document.getElementsByTagName('body')[0];
	start.addEventListener('click',startthegame);
	var scoreboard = document.getElementsByClassName('score')[0];
	scoreboard.innerHTML = 'Your score: ' + score;
	var levelcount = document.getElementsByClassName('level')[0];
	levelcount.innerHTML = 'Level: ' + level;
}

document.addEventListener('DOMContentLoaded', myLoadFunction); 