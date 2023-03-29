// Quicker startup
$(function () {

    // Global Constants/Vars go here:
    const cityInput = $("#city");
    const stateInput = $("#state");
    var searchbtn = $('#search');


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

    











})