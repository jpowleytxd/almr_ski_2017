// --------------------------------------------------------
// --------------------------------------------------------
// ---------------------ALMR 2018 SKI----------------------
// ------------------Main Functions File-------------------
// -------------------------------------------------------- 
// -------------------------------------------------------- 

// --------------------------------------------------------
// --------------------Global Variables--------------------
// --------------------------------------------------------
var DEVICE_TYPE;
var IOS_LINK = "https://itunes.apple.com/gb/app/paradiski-yuge/id488526088?mt=8";
var ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.lumiplan.montagne.LesArcs&hl=en_GB";
var container_padding;

// --------------------------------------------------------
// --------------------Global Functions--------------------
// --------------------------------------------------------

/**
 * openNavigation()
 * @desc - Opens the navigation menu
 */
function openNavigation(){
    // Increase the height of the navigation outer
    TweenMax.to($('.navigation_outer'), 1, {
        height: '100vh'
    });

    // Stop scrolling on body
    $('body').css({"overflow" : "hidden"});
}

/**
 * closeNavigation()
 * @desc - Closes the navigation menu
 */
function closeNavigation(){
    // Decrease the height of the navigation outer
    TweenMax.to($('.navigation_outer'), 0.5, {
        height: '0vh'
    });

    // Remove open class from hamurger to be certain
    $('#nav_icon').removeClass('open');

    // Enable scrolling on body
    $('body').css({"overflow" : "initial"});
}

/**
 * openPage()
 * @desc - Loads in partial page content using AJAX
 * @param {Object} button   - Nav button that was clicked
 */
function openPage(button){
    // Get data from the button
    var target = $(button).data('target');
    var newBody = $(button).data('body');

    // Get the new body content and process
    $.get( "partials/_" + target, function(data){
        // Clear data from the current container and append new data
        $('#content_container').empty();
        $('#content_container').append(data);

        // Change body id
        $('body').attr("id", newBody);

        // Check system (for app buttons)
        defineSystem();

        // Close the Navigation
        closeNavigation();
    });

}

/**
 * defineSystem()
 * @desc - Defines the users OS on load
 */
function defineSystem(){
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        DEVICE_TYPE = "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        DEVICE_TYPE = "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        DEVICE_TYPE = "iOS";
    }

    // Check if page is paradiski and change button if required
    if($('body').attr('id') === "paradiski"){
        // Swap out link
        if(DEVICE_TYPE === "iOS"){
            // Insert iOS link
            $('#app_link').attr('href', IOS_LINK);
        } else if(DEVICE_TYPE === "Android"){
            // Insert Android link
            $('#app_link').attr('href', ANDROID_LINK);
        } else{
            // If NOT Android or iOS then change button and disable
            $('#app_link span').html('Available On iPhone And Android');
            $('#app_link').addClass('disabled');
        }
    }
}

// --------------------------------------------------------
// ------------------Attendees Functions-------------------
// --------------------------------------------------------

/**
 * searchInFocus()
 * @desc - Function called when attendees search box is focussed
 */
function searchInFocus(){
    // Store container current top padding
    container_padding = $('.container').css('padding-top');

    // Shrink header logo
    TweenMax.to($('#header_logo'), 0.5, {
        width: 'auto', 
        height: '50px'
    });

    // Raise search area
    TweenMax.to($('.container'), 0.5, {
        paddingTop: '100px'
    });
}

/**
 * searchOutFocus()
 * @desc - Function called when attendees search box goes out of focus
 */
function searchOutFocus(){
    // Grow header logo
    TweenMax.to($('#header_logo'), 0.5, {
        width: '100px', 
        height: 'auto'
    });

    // Lower search area
    // Raise search area
    TweenMax.to($('.container'), 0.5, {
        paddingTop: container_padding
    });
}

/**
 * searchFunction()
 * @desc - Removes un-needed / adds table row dependent on the search value
 */
function searchFunction(){
    // Get value from search box
    var value = $('#search').val().toUpperCase();
    var tr    = $('table tr.data');

    // First Row Fix
    var firstRow = $('table tbody tr:first-child');
    var firstRowName = $(firstRow).find('td.name').text();
    // If search does not match a name
    if (firstRowName.indexOf(value) != 0) {
        $(firstRow).hide();
    } else {
        // Show row if a matching name has been found
        $(firstRow).show();
    }

    // FOREACH table row NOT in thead
    $("table tbody tr").each(function(index) {
        // Check if rows have been returned
        if (index != 0) {
            $row = $(this);

            // Get name and room number from row
            var surname = $row.children('.name').text();
            var room = $row.children('.room_number').text();

            // Transform variables
            surname = surname.toUpperCase();
            room = room.toUpperCase();

            // If search does not match a surname
            if (surname.indexOf(value) != 0) {
                $(this).hide();
            } else {
                // Show row if a matching surname has been found
                $(this).show();
            }
        }
    });
    // $('html,body').animate({
    //         scrollTop: $('body').offset().top
    // }, 500);
}

// --------------------------------------------------------
// -------------------Main Process Here--------------------
// --------------------------------------------------------
$(document).ready(function(){
    // --------------------------------------------------------
    // ---------------------On Load Events---------------------
    // --------------------------------------------------------
    defineSystem();

    // --------------------------------------------------------
    // -------------------Navigation Events--------------------
    // --------------------------------------------------------

    // Detect click on ALMR logo
    $('#almr_logo').on('click', function(event){
        event.preventDefault();
        event.stopPropagation();

        // Call function
        openPage($(this));
    });

    // Detect click on menu hamburger
    $('#nav_icon').on('click', function(){
        // Toggle open class
        $(this).toggleClass('open');

        // If open then open the navigation else close
        if($(this).hasClass('open')){
            // Open the navigation
            openNavigation();
        } else{
            // Close the navigation
            closeNavigation();
        }
    });

    // Detect click on a navigation item
    $('.nav_item').on('click', function(event){
        // Check if using external link
        if(!$(this).hasClass('external')){
            event.preventDefault();
            event.stopPropagation();

            // Call function
            openPage($(this));
        }
    });

    // --------------------------------------------------------
    // --------------------Paradiski Events--------------------
    // --------------------------------------------------------

    // Detect click on the download button
    $('body').on('click', '#app_link', function(event){
        // Check if this button has been disabled
        if($(this).hasClass('disabled')){
            event.preventDefault();
            event.stopPropagation();
        }
    });

    // --------------------------------------------------------
    // --------------------Attendees Events--------------------
    // --------------------------------------------------------

    // Detect when search box is focused.
    $('body').on('focus', '#search', function(event){
        // Call function
        searchInFocus();
    });

    // Detect when focus leaves the search box
    $('body').on('focusout', '#search', function(event){
        // Call function
        searchOutFocus();
    });

    // Detect keyup on search box
    $('body').on("keyup", "#search", function() {
        // Call function
        searchFunction();
    });
});
