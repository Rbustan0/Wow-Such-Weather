// Quicker startup
$(function () {


    // Global Constants/Vars go here:
    const cityInput = $("#city");
    const stateInput = $("#state");
    const searchbtn = $('#search');
    const buttonsContainer = $('#buttons-container');
    const topHalf = $('#topHalf');
    const bottomHalf = $('#bottomHalf');
    



    // this will appear dynamically:
    var todayBox;

    var city = '';
    var state = '';
    var lat = '';
    var lon = '';

    // dayjs stuff
    var date;
    var formattedDate;


    // these are for the weather details later
    var icon = '';
    var iconLink = '';
    var temp = '';
    var wind = '';
    var hum = '';



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


            // deletes first side button if amount of buttons is greater than 13
            if (buttonsContainer.children().length >= 13) {
                buttonsContainer.children().first().remove();
            }

            // Create a new button element with the desired class and text
            // NOTE: using data-state as another placeholder for information later.
            let newButton = $('<button>').addClass('button is-light is-medium is-fullwidth mb-2').text(city).attr('id', city).attr('data-state', state);

            // Append the new button to the buttons container
            buttonsContainer.append(newButton);

            // Calls the first fetch to get lat and long units.
            geoLocate();


        }
    });


    // Fetch APIS here + Other Misc functions used:

    function geoLocate() {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},&limit=1&appid=7355009108da9226df5bd810ec2a29ae`)
            .then(response => response.json())
            .then(function (data) {

                
                // Left here incase user wants to see data
                // console.log(data);

                // Store them in lat and lon data
                lat = data[0].lat.toString().trim();
                lon = data[0].lon.toString().trim();

                //This runs the next api call with the information needed.
                today();

            })
            .catch(err => console.error(err));
    }

    // Make units imperial and used string interpolation


    function today() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=7355009108da9226df5bd810ec2a29ae`)
            .then(response => response.json())
            .then(function (data) {

                
                // Left incase user wants to see API data
                // console.log(data);


                // This will check if it exists and create a box if it doesnt
                if (todayBox === undefined) {
                    todayBox = $('<div>').attr('id', 'todayBox row').addClass("box mt-4");
                    topHalf.append(todayBox);
                }

                // INFORMATION to pass and populate box

                // emojis for weather conditions
                icon = data.weather[0].icon;
                iconLink = `https://openweathermap.org/img/w/${icon}.png`;

                // information from the fetch itself
                temp = data.main.temp;
                wind = data.wind.speed;
                hum = data.main.humidity;

                // Using unix features from dayjs to give me the date I want
                date = dayjs.unix(parseInt(data.dt));
                formattedDate = date.format('DD/MM/YYYY');



                // Clears information when user enters new city
                if (todayBox.children().length !== 0) {
                    todayBox.empty();
                }



                // A way to quickly append multiple classes
                todayBox.append(`<h2 class="subtitle is-2 mb-4">
                            <b>${city} (${formattedDate}) </b> 
                            <span class="icon is-large">
                                <img src = ${iconLink}>
                            </span>
                        </h2>
                        <h4 class="subtitle is-4">Temp: ${temp}°F</h4>
                        <h4 class="subtitle is-4">Wind: ${wind}MPH</h4>
                        <h4 class="subtitle is-4">Humidity: ${hum}%</h4>`);


                //calls 5 days fetch function
                fiveDay();



            })
            .catch(err => console.error(err));
    }

   

    function fiveDay() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=7355009108da9226df5bd810ec2a29ae`)
            .then(response => response.json())
            .then(function (data) {

                // Left here incase user wants to look at 5 day data
                // console.log(data);

             
                // creates parent divs incase it doesnt exist yet
                if (bottomHalf.children().length === 0) {
                    bottomHalf.append(`<h3 class="subtitle is-2 mt-5" id="bottomTitle">5-Day Forecast (at 12PM):</h3>
            <div class="level is-mobile is-multiline is-justify-content-space-between " id='cardSpace'></div>`);

                }

                // decided to create this here to avoid confusion instead of global
                var cardSpace = $('#cardSpace');

                // clears cards.
                if (cardSpace.children().length !== 0) {
                    cardSpace.empty();
                }

                // need to index starting at 2 and adding 8 for each time card at 12pm
                for (let i = 2; i < 35; i += 8) {

                    // Need info before card appends:

                    temp = data.list[i].main.temp;
                    wind = data.list[i].wind.speed;
                    hum = data.list[i].main.humidity;

                    // Using unix features from dayjs to format and present date
                    date = dayjs.unix(parseInt(data.list[i].dt));
                    formattedDate = date.format('DD/MM/YY');

                    icon = data.list[i].weather[0].icon;
                    iconLink = `https://openweathermap.org/img/w/${icon}.png`;

                    


                    cardSpace.append(`<div class="column is-2" id="weatherCards">
                            <div class="card has-background-grey-light">
                                <div class="card-content">
                                    <div class="header-with-icon">
                                        <h2 class="title is-4">${formattedDate}</h2>
                                    </div>
                                    <span class=" is-large">
                                            <img src= ${iconLink}></img>
                                    </span>
                                    <p class="content is-medium">Temp: ${temp}°F</p>
                                    <p class="content is-medium">Wind: ${wind}MPH</p>
                                    <p class="content is-medium">Humidity: ${hum}%</p>
                                </div>
                            </div>`)
                }





            })
            .catch(err => console.error(err));
    }

   
    // Event Listener for side button press
    $('#buttons-container').on('click', 'button', function () {

        // again used an extra data-state. An alternative is string split and indexing.
        city = $(this).attr('id');
        state = $(this).data('state');

        // should recall everything again nicely from the top
        geoLocate();
    });





})