
$(document).ready(function() {
	var gifsArray = ["raccoon", "dog"];


	function displayGif(){
		$('gifs-appear-here').empty();
		var gifName = $(this).attr("gifName");

     	 var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        gifName + "&api_key=dc6zaTOxFJmzC&limit=10";

      	$.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          console.log(response);


          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var Image = $("<img>");
            Image.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(Image);

            $("#gifs-appear-here").prepend(gifDiv);
            console.log(gifName);
        	}

          });
		
	}



	function renderButton(){

		$("#buttons-view").empty();

		for(var i=0; i<gifsArray.length; i++){

			var gifBtn = $("<button class=gifClass>");

			gifBtn.attr('gifName', gifsArray[i])

			gifBtn.text(gifsArray[i]);

			$("#buttons-view").append(gifBtn);			

		}
	}

	$("#add-gif").on("click", function(event){
		event.preventDefault();
		var gif = $("#gif-input").val().trim();
		gifsArray.push(gif);
		renderButton();
		

	});

	$(document).on("click", ".gifClass", displayGif);

	renderButton();



});
		
