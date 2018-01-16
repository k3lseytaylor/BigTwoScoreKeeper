var flag = 0;
let nameArray = [];
let scoreFlag = false;


document.addEventListener('click',function(e){
	if(e.toElement.innerText === 'Comfirm'){
		scoreBoard();
	};
});
document.addEventListener('keydown',function(e){

	if(e.keyCode === 13){
		if(flag === 4 && scoreFlag === false){
			scoreBoard();
			return;
		}
		if(scoreFlag === true){
			inputremover();
			inputmover();
			
			return;
		}
		e.preventDefault();
		addPlayer();
	}

})



function addPlayer(){
	const item = document.getElementById('playerNames').value;
	nameArray.push(item.trim());
	console.log(nameArray);
	const currentPlayer = flag + 1;
	const text = document.createTextNode('Player '+ currentPlayer + ' ' + item)
	const newItem = document.createElement("li");
	newItem.appendChild(text);
	document.getElementById("playerList").appendChild(newItem);
	flag+=1;
	document.getElementById('playerNames').value = " ";
		if(flag === 4){
		const elemt = document.querySelector('#playerNamesForm');
		elemt.parentNode.removeChild(elemt);
		const btn = document.createElement("BUTTON");
    	const t = document.createTextNode("Comfirm");
   		btn.appendChild(t);
    	document.getElementById("nameForm").appendChild(btn);
		return;
	}
}

function scoreBoard(){
	scoreFlag = true;
	flag = 0 ;
	$( "body" ).append( "<div id='outter'></div>" );
	const el = document.getElementById( 'nameForm' );
	el.parentNode.removeChild( el );
	nameArray.forEach(function(name){
		const container = document.createElement("Div");
		container.id = 'player'+flag;
		flag += 1;
		const playernametag = document.createElement('h1');
		const scoretag = document.createElement('ul');
		playernametag.innerHTML = name;
		container.appendChild(playernametag);
		container.appendChild(scoretag);
		document.getElementById('outter').appendChild(container);
	});
	if(flag === 4){
		flag = 0;
	}
	inputmover();
}

function inputmover(numba = flag){
	if(scoreFlag === false){
		return;
	}
	const scoreInput = document.createElement('input');
	scoreInput.id = `scoreInput${flag}`;
	//scoreInput.type = 'number';
	scoreInput.max = '13';
	document.getElementById('player' + flag).appendChild(scoreInput);
	$(`#scoreInput${flag}`).focus();
	
}

function inputremover(){
	let score = document.getElementById(`scoreInput${flag}`).value.trim();
	const tempnum = parseInt(score);

	if(score === ''){
		score = 'win';
	}
	if(score === 'clear' && scoreFlag === false){
		location.reload()
		return;
	}

	if(flag!= 0 && score === 'end' || score > 13 || score ==='clear'){
		let newFlag = flag - 1 ;
		$( `#scoreInput${flag}` ).remove();
		return;
	}

	if(flag === 0 && score === 'end'){
		endGame();
		$('#outter').removeAttr('id');
		$( `#scoreInput${flag}` ).remove();
		return;
	}

	if(Number.isInteger(tempnum)===false){
		let newFlag = flag - 1 ;
		$( `#scoreInput${flag}` ).remove();
		return
	}
	
	if(score === '8' || score === '9'){
		score = tempnum * 2;
	}
	if(score === '10' ||score === '11' || score === '12'){
		score = tempnum * 3;
	}
	if(score === '13' ){
		score = tempnum * 4;
	}
	
	$(`#player${flag}>ul`).append(`<li>${score}</li>`);
	$( `#scoreInput${flag}` ).remove();

	if(flag === 3){
		flag = 0;
		calculateScore();
	}else{
		flag+=1
	}
}

function calculateScore(){
	let scoreNum = [];
	$('ul').each(function() {
     const numba = $(this).find('li:last').text();
     if(numba === 'win'){
     	return;
     }
     scoreNum.push(parseInt(numba));
    });
	var winning = scoreNum.reduce((a, b) => a + b, 0);
	console.log(winning);
	$('li:contains("win")').filter(function() {
	   return $(this).text() == "win";
	}).addClass('winning').text(`+${winning}`);
	scoreNum = [];
}


function endGame(){
	let tempArray = [];
	if(flag === 4){
		scoreFlag = false;
		return;
	}
	$(`#player${flag} li`).each(function(index) {
		let scorekey = $(this).text();
		if(scorekey[0] === '+'){
			scorekey = scorekey.replace('+','-');
		}

		tempArray.push(scorekey);
	});
	let parsedArray = tempArray.map(num => {return parseInt(num)});
	let finalScore = parsedArray.reduce( (total, num) => { return total + num});
	finalScore = finalScore.toString();
	if(finalScore[0] === '-'){
		finalScore = finalScore.replace('-','+');
	}
	$(`<h4>${nameArray[flag]}  $
		${finalScore[0] != '+'? finalScore + ' Lost' : finalScore + ' Won'}
		</h4>`).replaceAll(`#player${flag}`);
	tempArray = [];
	flag += 1;
	endGame();
}


// Todo
//Clean Code 
//Clean logic for if Statement (Check for text input)
//Styling
//Add functionalty to edit prev rounds
//Have check for PlayerName if non give Name Player *







