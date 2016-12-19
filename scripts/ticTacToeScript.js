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
	var openingSectors = [0,2,6,8];
	var completeBoard=[0,1,2,3,4,5,6,7,8];
	var victoryArr= [
		[0,1,2], //0
		[3,4,5], //1
		[6,7,8], //2
		[0,3,6], //3
		[1,4,7], //4
		[2,5,8], //5
		[0,4,8], //6
		[2,4,6] //7
	];
	var vicRegArr = [
		"[012]", //0
		"[345]", //1
		"[678]", //2
		"[036]", //3
		"[147]", //4
		"[258]", //5
		"[048]", //6
		"[246]" //7
	];

	//Thanks to MDN for this function!
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	//Gets a random number between min and max, inclusive.
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//Logs arrays of currently occupied sectors to the console.
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

	//Clears the visable board back to vertical pipes (|)
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
		window.setTimeout(function(){
			$("#selectorText").css("visibility","hidden");
			$("#playerSelector").css("visibility","hidden");	
		},1000);
	}

	//Resets the whole game and all variables
	function reset(){
		selectorVisible=true;
		initialVariableSettings();
		updateTakenSpots();
		clearBoard();
		sectorReport();
		enableSideButtons();
		showSideButtonsAndText();
	}

	//Hides the selector section (side-choosing buttons and text above them)
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

	//Starts the game
	//Selects an initial sector which the computer claims
	//Adds the sector to the computerSpots
	//Updates the takenSpots array, then lets the player take their turn.
	function startGame(){
		var openingMove = openingSectors[getRandomIntInclusive(0,3)]; 
		window.setTimeout(function(){
			$("#"+openingMove).removeClass("animated fadeOut");
			$("#"+openingMove).empty().append("<h1 class='text-center animated fadeIn'>"+computerSide+"</h1>");
		},1000);
		computerSpots.push(openingMove);
		updateTakenSpots();
		isPlayerTurn=true;
	}

	//Checks to see if player or computer have a winning set of sectors
	//Iterates through an array of regexp patterns in string form
	//Converts each pattern from a string to a regexp.
	//Attempts to match each regexp to a given array of sectors(either computer or player)
	//If the regexp matches, compares it to the matching potential victory array.
	//If that mactches, returns true, otherwise returns false.
	function checkForVictory(spotsArr){
		for(var m=0;m<vicRegArr.length;m++){
			var victReg = new RegExp (vicRegArr[m],"g");
			var victQuery = spotsArr.sort(function(a,b){return a-b;}).join("").match(victReg);
			if(victQuery){
				if (victQuery.join("")==victoryArr[m].join("")){
					return true;
				}
			}
		}
		return false;
	}

	//Displays an alert, then resets the game.
	function showVictory(user){
		alert(user+" has won!");
		reset();
	}

	//Checks to see if any legal moves remain; if there are none, game is a draw and returns true.
	//Otherwise, returns false
	function checkForDraw(completeBoardArr){
		if (completeBoard.join("")===takenSpots.join("")){
			return true;
		}
		return false;
	}

	//Displays an alert if no legal moves remain.
	function showDraw(){
		alert("This game is a draw!");
		reset();
	}

	//Performs turn on a sector. Then, opposite party gets to go
	//Adds the side's token (X or O) to the selected sector.
	//Then, adds the sector to that side's array and checks for victory or draws
	//If neither victory or draw, allows other side to take their turn.

	function takeTurn(sector, side, user){
		$("#"+sector).empty().append("<h1 class='text-center animated zoomIn'>"+side+"</h1>");
		if (user=="player"){
			playerSpots.push(sector);
			updateTakenSpots();
			sectorReport();
			if (checkForVictory(playerSpots)){
				window.setTimeout(function(){
					showVictory("player");
				},10);
			} else if (checkForDraw(completeBoard)){
				showDraw();
			}else{
				isPlayerTurn = false;
				window.setTimeout(function(){
					computerTurn();
				},500);
			}
		} else if(user=="computer"){
			computerSpots.push(sector);
			updateTakenSpots();
			sectorReport();
			isPlayerTurn=true;
			if(checkForVictory(computerSpots)){
				isPlayerTurn=false;
				showVictory("computer");
			} else if (checkForDraw(completeBoard)){
				isPlayerTurn=false;
				showDraw();
			}
			
		}
	}

	//Performs computer's turn on a random sector, then allows player to go.
	function computerTurn(){
		var chosenSector = getRandomIntInclusive(0,8);
		if(isValidMove(chosenSector)){
			takeTurn(chosenSector,computerSide,"computer");
		} else{
			console.log("Didn't select a legal move. Trying again.");
			computerTurn();
		}
	}

	//Checks if a sector has already been claimed, returns false if it has, true if not.
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
			takeTurn(sector,playerSide,"player");
		}
	}


	//Click events for all buttons
	$("#playerX").on("click",function(){
		console.log("player X clicked!");
		playerSelectsSide("X");
	});
	$("#playerO").on("click",function(){
		console.log ("player O clicked!");
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


	//Tap events for all buttons
	$("#playerX").on("tap",function(){
		console.log("player X clicked!");
		playerSelectsSide("X");
	});
	$("#playerO").on("tap",function(){
		console.log ("player O clicked!");
		playerSelectsSide("O");
	});
	$("#resetButton").on("tap",function(){
		console.log("reset button clicked!");
		reset();
	});
	$("#0").on("tap",function(){
		sectorClicked(0);
	});
	$("#1").on("tap",function(){
		sectorClicked(1);
	});
	$("#2").on("tap",function(){
		sectorClicked(2);
	});
	$("#3").on("tap",function(){
		sectorClicked(3);
	});
	$("#4").on("tap",function(){
		sectorClicked(4);
	});
	$("#5").on("tap",function(){
		sectorClicked(5);
	});
	$("#6").on("tap",function(){
		sectorClicked(6);
	});
	$("#7").on("tap",function(){
		sectorClicked(7);
	});
	$("#8").on("tap",function(){
		sectorClicked(8);
	});
	$("#9").on("tap",function(){
		sectorClicked(9);
	});
});
