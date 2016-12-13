document.addEventListener("DOMContentLoaded", function(event) {
	/*SECTOR GUIDE
		Sectors are zero-indexed, and start from the top-left.
		|  |  |		<-- This top row is (from left to right) sectors 0, 1, and 2
		|  |  |		<-- This middle row is (from left to right) sectors 3, 4, and 5
		|  |  |		<-- This bottom row is (from left to right) sectors 6, 7, and 8
		*/
	var playerSide, computerSide;
	var isPlayerTurn = false; 
	var selectorVisible=true;
	var playerSpots = [];
	var computerSpots = [];
	var takenSpots = [];
	var openingSectors = [0,2,6,8]
	var victoryArr= [
		[0,1,2] //0
		[3,4,5] //1
		[6,7,8] //2
		[0,3,6] //3
		[1,4,7] //4
		[2,5,8] //5
		[0,4,8] //6
		[2,4,6] //7
	];
	var potentialVictArr=[0,1,4,8]
	//Thanks to MDN for this function! Gets a random number between min and max, inclusive.
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function checkForVictory(spotsArr, vicArr){

	}

	/*checkForVictory(playerSpots,victoryArr[7]){
		var victCount=0;
		for(var i=0;i<playerSpots.length;i++){
			for(var j=0;j<victoryArr[7].length;j++){
				if(victoryArr[7][j]==playerSpots[i]){
					victCount++;
				}
			}
		}
	}*/
	//Logs arrays of currently occupied sectors.
	function sectorReport(){
		console.log("Player now has sectors "+playerSpots.join(", "));
		console.log("Computer has sectors "+computerSpots.join(", "));
		console.log("All taken spots are "+takenSpots.join(", "));
	}
	//Update variable that tracks occupied sectors, takenSpots
	function updateTakenSpots(){
		takenSpots= playerSpots.concat(computerSpots).sort(function(a,b){
			return a-b;
		});
	}
	//clears the visable board back to vertical pipes (|)
	function clearBoard(){
		for(var i=0;i<9;i++){
		$("#"+i).empty().append("<h1 class='text-center'>|</h1>").addClass("animated fadeIn");
		}
	}
	//Resets all variables to their initial settings
	function initialVariableSettings(){
		isPlayerTurn=false;
		selectorVisible=true;
		playerSide=undefined;
		computerSide=undefined;
		playerSpots=[];
		computerSpots=[];
	}
	//Enables buttons that allows player to choose X or O.
	function enableSideButtons(){
		$("#playerX").prop("disabled",false);
		$("#playerO").prop("disabled",false);
	}
	//Reveals buttons and text that allow player to choose X or O.
	function showSideButtonsAndText(){
		$("#playerSelector").removeClass("animated fadeOut");
		$("#selectorText").removeClass("animated fadeOut");
		$("#playerSelector").css("visibility","visible");
		$("#selectorText").css("visibility","visible");
		$("#playerSelector").addClass("animated fadeIn");
		$("#selectorText").addClass("animated fadeIn");
	}
	//Disables buttons that allows player to choose X or O.
	function disableSideButtons(){
		$("#playerX").prop("disabled","disabled");
		$("#playerO").prop("disabled","disabled");
	}
	//Hides buttons and text that allow player to choose X or O.
	function hideSideButtonsAndText(){
		$("#playerSelector").addClass("animated fadeOut");
		$("#selectorText").addClass("animated fadeOut");
		var selectorTimeout = window.setTimeout(function(){
			$("#selectorText").css("visibility","hidden");
			$("#playerSelector").css("visibility","hidden");	
		},1000);
	}
	//Resets the whole game.
	function reset(){
		selectorVisible=true;
		initialVariableSettings();
		updateTakenSpots();
		clearBoard();
		sectorReport();
		enableSideButtons();
		showSideButtonsAndText();
	}
	//Hides the selector section (side-choosing button and text above it)
	function hideSelector(){
		selectorVisible=false;
		disableSideButtons();
		hideSideButtonsAndText();
	}
	//Defines player and computer sides
	function playerSelectsSide(side){
		hideSelector();
		playerSide = side;
		if (side==="X"){
			computerSide="O";
		} else{
			computerSide="X";
		}
		startGame();
	}
	//Starts the game and has computer perform initial move
	function startGame(){
		console.log("Game Started! Player side is "+playerSide+" and computer side is "+computerSide);
		var openingMove = openingSectors[getRandomIntInclusive(0,3)]; 
		var startTimeout = window.setTimeout(function(){
		$("#"+openingMove).removeClass("animated fadeOut");
		$("#"+openingMove).empty().append("<h1 class='text-center animated fadeIn'>"+computerSide+"</h1>")
		},1000);
		computerSpots.push(openingMove);
		console.log("Initial Move! Computer now has quadrant "+computerSpots.join(", "));
		updateTakenSpots();
		isPlayerTurn=true;
	}
	function checkVictory(spotsArr,victoryArr){

	}
	function showVictory(){

	}
	//Performs player's turn on a sector, the has computer go.
	function takeTurn(sector, side, user){
		console.log("Sector "+sector+" selected! It is "+user+"'s turn!");
		$("#"+sector).empty().append("<h1 class='text-center animated zoomIn'>"+side+"</h1>");
		if (user=="player"){
			playerSpots.push(sector);
			updateTakenSpots();
			sectorReport();
			isPlayerTurn = false;
			computerTurn();
		} else if(user=="computer"){
			computerSpots.push(sector);
			updateTakenSpots();
			sectorReport();
			isPlayerTurn=true;
		}
	}
	function playerTurn(sector){
		console.log("Sector "+sector+" clicked! Is playerTurn? "+isPlayerTurn);
		$("#"+sector).empty().removeClass("animated fadeOut").append("<h1 class='text-center animated zoomIn'>"+playerSide+"</h1>");
		playerSpots.push(sector);
		updateTakenSpots();
		sectorReport();
		isPlayerTurn=false;
		var computerTurnTimeout = window.setTimeout(function(){
			computerTurn();
		},1500);
	}	
	//Performs computer's turn, then allows player to go.
	function computerTurn(){
		var chosenSector = getRandomIntInclusive(0,8);
		if(isValidMove(chosenSector)){
			takeTurn(chosenSector,computerSide,"computer");
		} else{
			console.log("Didn't select a legal move. Trying again.")
			computerTurn();
		}
	}
	//Checks if a sector has already been claimed.
	function isValidMove(sector){
		console.log("Current taken spots are "+takenSpots);
		for(var k=0;k<takenSpots.length;k++){
			if (takenSpots[k]==sector){
				return false;
			}
		}
		return true;
	}
	//Performs the player's turn on a clicked sector.
	function sectorClicked(sector){
		var moveValid = isValidMove(sector);
		if (isPlayerTurn && moveValid){
			playerTurn(sector);
		}
	}

	$("#playerX").on("click",function(){
		console.log("player X clicked!")
		playerSelectsSide("X");
	});
	$("#playerO").on("click",function(){
		console.log ("player O clicked!")
		playerSelectsSide("O");
	});
	$("#resetButton").on("click",function(){
		console.log("reset button clicked!");
		reset();
	});

	$("#0").on("click",function(){
		sectorClicked(0);
	});
	$("#1").on("click",function(){
		sectorClicked(1);
	});
	$("#2").on("click",function(){
		sectorClicked(2);
	});
	$("#3").on("click",function(){
		sectorClicked(3);
	});
	$("#4").on("click",function(){
		sectorClicked(4);
	});
	$("#5").on("click",function(){
		sectorClicked(5);
	});
	$("#6").on("click",function(){
		sectorClicked(6);
	});
	$("#7").on("click",function(){
		sectorClicked(7);
	});
	$("#8").on("click",function(){
		sectorClicked(8);
	});
	$("#9").on("click",function(){
		sectorClicked(9);
	});
});
