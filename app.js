//Initial array 
$(document).ready(function () {

    var topics = ["CAT", "GERMAN SHEPHERD", "PUPPY", "WOLF", "OTTER", "HIPPO", "DOG", "TIGER", "LION", "MONKEY"];

    //  create topics array buttons
    function renderButtons() {
        $('#buttons-view').empty();

        for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('ANIMAL');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
        }
    }
    renderButtons();

    //on button click
    $(document).on('click', '.ANIMAL', function () {

        //log the text data from each button
        var ANIMAL = $(this).html();
        // console.log(ANIMAL);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ANIMAL + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL);

        // AJAX call for the specific GIF button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;
            //console.log(results);
            //empties the div before adding more gifs
            $('#movies-view').empty();
            for (var j = 0; j < results.length; j++) {
                var imageDiv = $('<div>');
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                // console.log(imageView);  

                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                $('#movies-view').prepend(gifImage);
                gifImage.on('click', playGif);

                // Pulls ratings for each gif
                var rating = results[j].rating;
                // console.log(rating);
                var displayRated = $('<p>').text("Rating: " + rating);
                $('#movies-view').prepend(displayRated);
            }

        });

        //function to stop and animate
        function playGif() {
            var state = $(this).attr('data-state');
            // console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        }

    });

    //adding new button to array
    $(document).on('click', '#add-movie', function () {
        if ($('#movie-input').val().trim() == '') {
            alert('Input can not be left blank');
        }
        else {
            var movies = $('#movie-input').val().trim();
            topics.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

        }

    });


}); 
