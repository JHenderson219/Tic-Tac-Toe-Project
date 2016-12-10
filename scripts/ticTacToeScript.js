document.addEventListener("DOMContentLoaded", function(event) {
	function hideSelector(){

	}
	function showSelector(){

	}
	function playerSelectsX(){
		$("#playerSelector").addClass("animated fadeOut");
		setTimeout(function(){
			$("#playerSelector").hide();
		},1000); 
	}

	function playerSelectsO(){

	}

	$("#playerX").on("click",function(){
		playerSelectsX();
	});
	$("#playerO").on("click",function(){
		playerSelectsO();
	});
});