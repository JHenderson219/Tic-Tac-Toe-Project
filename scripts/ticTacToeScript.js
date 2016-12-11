document.addEventListener("DOMContentLoaded", function(event) {
	var playerSide, computerSide; 
	var selectorVisible=true;
	function reset(){
		$("#resetButton").attr("disabled","disabled");
		$("#resetButton").addClass("animated fadeOut");
		$("#playerSelector").removeClass("animated fadeOut");
		$("#selectorText").removeClass("animated fadeOut");
		$("#playerSelector").css("visibility","visible");
		$("#selectorText").css("visibility","visible");
		$("#playerSelector").addClass("animated fadeIn");
		$("#selectorText").addClass("animated fadeIn");
		var resetTimeout = window.setTimeout(function(){
			$("#resetButton").css("visibility","hidden");
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
		$("resetButton").css("visibility","visible")
		$("#resetButton").addClass("animated fadeIn")
		var selectorTimeout = window.setTimeout(function(){
			$("#selectorText").css("visibility","hidden");
			$("#playerSelector").css("visibility","hidden");	
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
	$("#1").on("click",function(){
		console.log("Quadrant 1 clicked!");
	});

});