// Quicker startup
$(function () {

    // Global Constants/Vars go here:
    const cityInput = $("#city");
    const stateInput = $("#state");
    const searchbtn = $('#search');

    var city = '';
    var state = '';


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
            state = stateInput.val().trim();

            localStorage.setItem('city', city);
            localStorage.setItem('state', state);

            // Lets also create a button on the side:



            // GeoLocate();
        }
    });


    // Event Listener for button press on sidebar.


    // Fetch APIS here:


    // Misc functions



})