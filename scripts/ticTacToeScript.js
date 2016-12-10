document.addEventListener("DOMContentLoaded", function(event) {
	var playerSide, computerSide; 
	var selectorVisible=true;
	function reset(){
		$("#resetButton").attr("disabled","disabled");
		$("#resetButton").addClass("animated fadeOut");
		var resetTimeout = window.setTimeout(function(){
			$("#resetButton").hide();
		},1000);
		if(selectorVisible){

		}else{

		}
	}
	function hideSelector(){
		selectorVisible=false;
		$("#playerX").attr("disabled","disabled");
		$("#playerO").attr("disabled","disabled");
		$("#playerSelector").addClass("animated fadeOut");
		$("#selectorText").addClass("animated fadeOut");
		var selectorTimeout = window.setTimeout(function(){
			$("#selectorArea").append("<button class = 'animated fadeIn btn btn-secondary btn-lg center-block' id='resetButton'>Reset Game</button>");
			$("#selectorText").css("visibility","hidden");
			$("#playerSelector").css("visibility","hidden");	
			$("#playerSelector").hide();
		},1000);
	}
	function showSelector(){
		selectorVisible=true;

	}
	function playerSelectsSide(side){
		hideSelector();
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
});