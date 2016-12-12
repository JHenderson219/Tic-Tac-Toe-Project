document.addEventListener("DOMContentLoaded", function(event) {
	var playerSide, computerSide;
	var playerTurn = false; 
	var selectorVisible=true;
	
	function reset(){
		playerTurn=false;
		selectorVisible=true;
		playerSide=undefined;
		computerSide=undefined;
		$("#playerX").prop("disabled",false);
		$("#playerO").prop("disabled",false);
		$("#playerSelector").removeClass("animated fadeOut");
		$("#selectorText").removeClass("animated fadeOut");
		$("#playerSelector").css("visibility","visible");
		$("#selectorText").css("visibility","visible");
		$("#playerSelector").addClass("animated fadeIn");
		$("#selectorText").addClass("animated fadeIn");
		if(selectorVisible){

		}else{

		}
	}

	function hideSelector(){
		selectorVisible=false;
		$("#playerX").prop("disabled","disabled");
		$("#playerO").prop("disabled","disabled");
		$("#playerSelector").addClass("animated fadeOut");
		$("#selectorText").addClass("animated fadeOut");
		var selectorTimeout = window.setTimeout(function(){
			$("#selectorText").css("visibility","hidden");
			$("#playerSelector").css("visibility","hidden");	
		},1000);
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
		console.log("Game Started! Player side is "+playerSide+" and computer side is "+computerSide)
		for(var i=0;i<10;i++){
		$("#"+i).addClass("animated fadeOut");
		}
		var startTimeout = window.setTimeout(function(){
		$("#3").removeClass("animated fadeOut");
		$("#3").empty().append("<h1 class='text-center animated fadeIn'>"+computerSide+"</h1>")
		},1000);
	}

	$("#playerX").on("click",function(){
		console.log("player x clicked!")
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

	$("#1").on("click",function(){
		console.log("Quadrant 1 clicked!");
	});

});