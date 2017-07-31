
$(document).ready(function() {
	var gifsArray = ["cat", "robot", "raccoon"];


	function displayGif(){

		var gifName = $(this).attr("gifName");
		$('#gifs-appear-here').text("");
		

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


            Image.attr("src", results[i].images.fixed_height_still.url);
            Image.attr("data-still",results[i].images.fixed_height_still.url);
            Image.attr("data-animate", results[i].images.fixed_height.url)
            Image.attr("data-state", "still");
            Image.addClass('pause');



            gifDiv.prepend(p);
            gifDiv.prepend(Image);


            $("#gifs-appear-here").prepend(gifDiv);
        	}

          });
        $(document).on("click", ".pause", function(){

        	var state = $(this).attr("data-state");
        	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
     		// Then, set the image's data-state to animate
     		// Else set src to the data-still value
     		if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }

        	
        })
		
	}



	function renderButton(){

		$("#gif-input").val('');

		$("#buttons-view").empty();

		for(var i=0; i<gifsArray.length; i++){

			var gifBtn = $("<button class=gifClass>");

			gifBtn.attr('gifName', gifsArray[i])

			gifBtn.text(gifsArray[i]);
			gifBtn.addClass("a");

			

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
		
