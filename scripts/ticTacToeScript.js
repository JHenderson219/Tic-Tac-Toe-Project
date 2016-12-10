document.addEventListener("DOMContentLoaded", function(event) {
	var playerSide, computerSide;
	function reset(){

	}
	function hideSelector(){

	}
	function showSelector(){

	}
	function playerSelectsSide(side){
		$("#playerX").attr("disabled","disabled");
		$("#playerO").attr("disabled","disabled");
		$("#playerSelector").addClass("animated fadeOut");
		$("#selectorText").addClass("animated fadeOut");
	var selectorTimeout = window.setTimeout(function(){
			$("#selectorArea").append("<button class = 'animated fadeIn btn btn-secondary btn-lg center-block' id='resetButton'>Reset Game</button>");
			$("#selectorText").css("visibility","hidden");	
			$("#playerSelector").hide();
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
});