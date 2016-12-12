document.addEventListener("DOMContentLoaded", function(event) {
	var playerSide, computerSide;
	var isPlayerTurn = false; 
	var selectorVisible=true;
	var playerSpots = [];
	var computerSpots = [];
	var takenSpots = [];

	function quadrantReport(){
		console.log("Player now has quadrants "+playerSpots.join(", "));
		console.log("Computer has quadrants "+computerSpots.join(", "));
		console.log("All taken spots are "+takenSpots);
	}
	function updateTakenSpots(){
		takenSpots= playerSpots.concat(computerSpots).sort(function(a,b){
			return a-b;
		});
	}
	function clearBoard(){
		for(var i=0;i<9;i++){
		$("#"+i).empty().append("<h1 class='text-center'>|</h1>").addClass("animated fadeIn");
		}
	}
	function initialVariableSettings(){
		isPlayerTurn=false;
		selectorVisible=true;
		playerSide=undefined;
		computerSide=undefined;
		playerSpots=[];
		computerSpots=[];
	}
	function enableSideButtons(){
		$("#playerX").prop("disabled",false);
		$("#playerO").prop("disabled",false);
	}
	function showSideButtonsAndText(){
		$("#playerSelector").removeClass("animated fadeOut");
		$("#selectorText").removeClass("animated fadeOut");
		$("#playerSelector").css("visibility","visible");
		$("#selectorText").css("visibility","visible");
		$("#playerSelector").addClass("animated fadeIn");
		$("#selectorText").addClass("animated fadeIn");
	}
	function disableSideButtons(){
		$("#playerX").prop("disabled","disabled");
		$("#playerO").prop("disabled","disabled");
	}
	function hideSideButtonsAndText(){
		$("#playerSelector").addClass("animated fadeOut");
		$("#selectorText").addClass("animated fadeOut");
		var selectorTimeout = window.setTimeout(function(){
			$("#selectorText").css("visibility","hidden");
			$("#playerSelector").css("visibility","hidden");	
		},1000);
	}
	function reset(){
		selectorVisible=true;
		initialVariableSettings();
		updateTakenSpots();
		clearBoard();
		quadrantReport();
		enableSideButtons();
		showSideButtonsAndText();
	}

	function hideSelector(){
		selectorVisible=false;
		disableSideButtons();
		hideSideButtonsAndText();
	}

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
	function startGame(){
		console.log("Game Started! Player side is "+playerSide+" and computer side is "+computerSide);
		var startTimeout = window.setTimeout(function(){ //TODO: Change this to randomly select a corner.
		$("#2").removeClass("animated fadeOut");
		$("#2").empty().append("<h1 class='text-center animated fadeIn'>"+computerSide+"</h1>")
		},1000);
		computerSpots.push(2);
		console.log("Initial Move! Computer now has quadrant "+computerSpots.join(", "));
		updateTakenSpots();
		isPlayerTurn=true;
	}
	function playerTurn(quadrant){
		console.log("Quadrant "+quadrant+" clicked! Is playerTurn? "+isPlayerTurn);
		$("#"+quadrant).empty().removeClass("animated fadeOut").append("<h1 class='text-center animated zoomIn'>"+playerSide+"</h1>");
		playerSpots.push(quadrant);
		updateTakenSpots();
		quadrantReport();
		isPlayerTurn=false;
		computerTurn();
	}	
	function computerTurn(){

	}
	function isValidMove(quadrant){
		for(var k=0;k<takenSpots.length;k++){
			if (takenSpots[k]==quadrant){
				return false;
			}
		}
		return true;
	}

	function quadrantClicked(quadrant){
		var moveValid = isValidMove(quadrant);
		if (isPlayerTurn && moveValid){
			playerTurn(quadrant);
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
		quadrantClicked(0);
	});
	$("#1").on("click",function(){
		quadrantClicked(1);
	});
	$("#2").on("click",function(){
		quadrantClicked(2);
	});
	$("#3").on("click",function(){
		quadrantClicked(3);
	});
	$("#4").on("click",function(){
		quadrantClicked(4);
	});
	$("#5").on("click",function(){
		quadrantClicked(5);
	});
	$("#6").on("click",function(){
		quadrantClicked(6);
	});
	$("#7").on("click",function(){
		quadrantClicked(7);
	});
	$("#8").on("click",function(){
		quadrantClicked(8);
	});
	$("#9").on("click",function(){
		quadrantClicked(9);
	});
});
