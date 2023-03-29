// Quicker startup
$(function () {

    // Global Constants/Vars go here:
    const cityInput = $("#city");
    const stateInput = $("#state");
    const searchbtn = $('#search');
    const buttonsContainer = $('#buttons-container');

    var city = '';
    var state = '';
    var lat;
    var lon;


    // Event Listener for inputs being filled and button appearing for search:

    cityInput.add(stateInput).on('input', function () {

        // check if both input fields have text in them
        if (cityInput.val().trim() !== '' && stateInput.val().trim() !== '') {
            // if both input fields have text, show the search button
            searchbtn.removeClass('is-hidden');
        } else {
            // if either input field is empty, hide the search button
            searchbtn.addClass('is-hidden');
        }
    });

    // Event Listener for button being pressed and tab-entered.
    searchbtn.on('click keydown', function (event) {


        // Need to add an if statement that clears storage if there are entries:


        if (event.type === 'click' || event.key === 'Enter') {

            // Stores info into lcl storage
            city = cityInput.val().trim();
            state = stateInput.val().trim().toUpperCase();

            localStorage.setItem('city', city);
            localStorage.setItem('state', state);


            // deletes first side button if list is getting large
            if (buttonsContainer.children().length >= 13) {
                buttonsContainer.children().first().remove();
            }

            // Create a new button element with the desired class and text
            let newButton = $('<button>').addClass('button is-light is-medium is-fullwidth mb-2').text(city).attr('id', city);

            // Append the new button to the buttons container
            buttonsContainer.append(newButton);


             geoLocate();
        }
    });


    // Event Listener for button press on sidebar.


    // Fetch APIS here:

    // This api gets us the lon and lat coordinates from a different api for the forecast api

    function geoLocate() {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},&limit=1&appid=7355009108da9226df5bd810ec2a29ae`)
            .then(response => response.json())
            .then(function (data) {
                
                console.log(data);

                // Store them in lat and lon data
                lat = data[0].lat;
                lon = data[0].lon;

                // RUN 5 DAY
                // fiveDay();

            })
            .catch(err => console.error(err));
    }

    function fiveDay () {
        
    }


    // Misc functions



})