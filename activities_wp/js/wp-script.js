

initStage();
initLayers();
//displayPosition("#container");



/** Initialise the click event to show the selected image and bg
 * @returns void
 */
function initSpriteEvent() {
    $(".sprite").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        txtLayer.removeChildren();
        txtLayer.draw();

        currentItem = ($(this).attr("class")).split(" ")[0];
        $("#container, .theme-bg").hide();

        //show the  background and item
        $("#" + currentItem + "_bg").show("500", function() {
            imgLayer.getChildren().hide();
            images[currentItem].show();
            tweens[currentItem].reset();
            tweens[currentItem].play();
            $.ionSound.play(currentItem);
            $("#showTextMsg1").show();
            $("#container").show();
        });
    });
    initBackNavigation();
}

function initBackNavigation() {

    //initialise event to take us back to the wp menu
    $("#back").unbind().on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        imgLayer.getChildren().hide();
        $("#showTextMsg1").hide();

        //clear the column divs, and hide the page elements
        $("#col1, #col2").empty();
        $("#container, #col1, #col2, #back, .theme-bg").hide();


        //if in the custom theme go back to the custom menu, or main menu
        if (currentTheme === "custom") {
            //if coming back from the custom menu to main menu
            if (!$("#custom-menu").is(":hidden")) {

                $("#theme-menu, #image-div, #home").show();
                $("#custom-menu").hide();
            } else {
                //if coming back from the the large images to the custom menu
                $("#image-div").children(".customImage").remove();
                $("#custom-menu").show();
                $("#theme-menu").hide();
                $("#showTextMsg2").hide();
                $("#back").show();
            }
        } else {
            $("#theme-menu, #image-div, #home").show();
        }
    });
}


/** Create the html for each item with a theme, which is hidden until selected 
 * @returns void
 */
function createItemBackgrounds() {

    $.each(themes[currentTheme].items, function(idx, item) {

        var itemBg = docUrl + "themes/" + currentTheme + "/backgrounds/" + idx + "_bg.png";

        //for each item - create an item background
        $("#image-div")
                .append($("<img>")
                        .addClass("theme-bg " + currentTheme)
                        .attr("src", itemBg)
                        .attr("id", idx + "_bg")
                        .attr("alt", idx)
                        );
    });
}


/** Get the image names for the selected theme from the theme folder
 * - loop through them to display the sprite thumbs, evenly in the columns
 * @returns void
 */
function displayThemeSpriteImages() {

    if (currentTheme !== "custom") {

        var imageNames = themes[currentTheme].items;

        var imageSounds = new Array();
        var numColumns = 2;
        var i = 0;
        $.each(imageNames, function(imageName, item) {

            if (i < getObjectSize(imageNames) / numColumns) {
                $("#col1").append($("<div>").addClass(imageName).addClass("sprite nav"));
            } else {
                $("#col2").append($("<div>").addClass(imageName).addClass("sprite nav"));
            }
            //change file name syntax to suit ionSound plugin
            imageSounds.push(imageName.replace("_", ""));
            i++;
        });//end each
        //tidy the icons so they are evenly spaced
        spaceElements("col1");
        spaceElements("col2");

        //initialise the events and sounds
        initSpriteEvent();
        initSounds(imageSounds);
        initShowTextEvent();

        setTimeout(function() {
            $("#col1, #col2").removeClass("loading");
        }, 1500);
    }
}

/** Initialise the event to show the text when the background is clicked
 * @returns void
 */
function initShowTextEvent() {
    $("#container, #image-div").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        $("#showTextMsg1, #showTextMsg2").hide();

        // show the theme as text on the image
        var posX = $("#container").width() / 2;
        var posY = 100;
        var size = 70;
        var message = currentItem;
        drawText(posX, posY, size, message);
        $("#container").show();
    });
}

//function to initialise the sounds
function initSounds(imageSounds) {

    //need to initialise imageNames without underscores because ionSound can't handle
    $.ionSound({
        sounds: imageSounds,
        path: docUrl + "themes/" + currentTheme + "/sounds/",
        volume: "1.0",
        multiplay: true
    });
}


function spaceElements(column) {

    var elements = $("#" + column).children();
    var heights = 0;

    $.each(elements, function(idx, element) {
        heights += $(element).height();
    });
    var margin = ($("#" + column).height() - heights) / elements.length;
    $("#" + column + " .sprite").css({"margin-top": margin});
    $("#" + column + " img").css({"margin-top": margin});
}


/** Function to show the custom page
 * @returns void
 */
function showCustomPage() {

    //clear the divs ready for the custom images
    $("#col1, #col2").empty();
    $("#col1, #col2").removeClass("loading");
    initBackNavigation();

    //hide the canvas
    $("#image-div, #container").hide();
    $("#custom-menu").show();
    $("#showInstr").hide();

    $("#showInstr").on("mousedown touchstart", function() {
        $("#flickr-instr").show();
        $(".custom-item").remove();
        $("#showInstr").hide();
    });
}

function displayCustomSets() {

    var userId = $("#flickrId").val();

    $("#custom-menu").addClass("loading");
    $("#flickr-instr").hide();
    $("#custom-menu").removeClass("loading");
    $(".custom-item").remove();

    var baseUrl = "http://api.flickr.com/services/rest/?jsoncallback=?";
    var apiKey = "e7eda1a0b16883ab5f62f53d055d57e3";
    var method = "flickr.photosets.getList";

    $.ajax({
        url: baseUrl,
        data: {
            api_key: apiKey,
            user_id: userId,
            method: method,
            format: "json"
        },
        type: "GET",
        cache: true,
        dataType: 'jsonp',
        success: createPhotoList
    });
}

function createPhotoList(list) {
    $.each(list.photosets.photoset, function(idx, photos) {

        var photoset = {name: null};

        customPhotos[photos.id] = photoset;
        photoset.name = photos.title._content;

    });

    $.each(customPhotos, function(photoSetId, photoset) {
        getFlickrPics(photoSetId);
    });
}

function getFlickrPics(photoSetId) {

    var baseUrl = "http://api.flickr.com/services/rest/?jsoncallback=?";
    var apiKey = "e7eda1a0b16883ab5f62f53d055d57e3";
    var method = "flickr.photosets.getPhotos";

    $.ajax({
        url: baseUrl,
        data: {
            api_key: apiKey,
            method: method,
            photoset_id: photoSetId,
            format: "json",
            per_page: 10
        },
        type: "GET",
        cache: true,
        dataType: 'jsonp',
        success: createCustomMenu
    });
}

function createCustomMenu(photos) {

    createCustomMenuItems(photos);
    $("#showInstr").show();

    //initialise navigation to select the images
    $(".custom-item").on("mousedown touchstart", function() {
        //show the divs
        $("#custom-menu").hide();
        $("#col1, #col2, #bg-canvas, #bg-canvas2, #back, #image-div").show();

        displayFlickrThumbs($(this).attr("id"));
    });
}

function createCustomMenuItems(photos) {

    //assign the json photos object to customPhotos (associate with photoset id)
    customPhotos[photos.photoset.id] = photos;
    var photosetName = customPhotos[photos.photoset.id].photoset.title;

    //get the first photo in the photo array
    var firstPhoto = customPhotos[photos.photoset.id].photoset.photo[0];
    var imgUrl = createImageUrl(firstPhoto, "thumb");

    //append names,ids to create navigation for the sets
    $("#flickr-sets")
            .append(($("<div>")
                    .addClass("custom-item nav")
                    .attr("id", photos.photoset.id)
                    .css("background-image", "url(" + imgUrl + ")")
                    .append($("<h3>")
                            .addClass("customTxt")
                            .html(photosetName)
                            )));
}

function displayFlickrThumbs(photosetId) {

    $("#image-div").addClass("loading");
    $("#col1, #col2").empty();
    $("#col1, #col2").removeClass("loading");

    var photos = customPhotos[photosetId].photoset.photo;

    //loop through the data and create the pics in the right div
    $.each(photos, function(idx, photo) {
        //add the thumbnails to the columns evenly
        var columnDiv = idx % 2 === 0 ? "#col1" : "#col2";
        appendThumbs(columnDiv, photo);
        createLargeImages(photo);
    }); //end each
    //show the content ie the thumbnails
    $("#content").delay(100).fadeIn(100);
    $("#image-div").removeClass("loading");

    //initialise event to display alt text - ie title
    $("#image-div, #container").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        initShowTextEvent();
    });
    initCustomThumbEvent();
    //trigger event on first image - ie load first image
    $("#col1").children(":first").trigger("mousedown");

}//end function

function createLargeImages(photo) {
    //create the large images (to be hidden until selected)
    $("#image-div")
            .append($("<img>")
                    .attr("src", createImageUrl(photo, "large"))
                    .addClass("customImage theme-bg")
                    .attr("id", photo.id + "_lge")
                    .attr("alt", photo.title)
                    );
}

function appendThumbs(columnDiv, photo) {
    $(columnDiv)
            .append($("<img>")
                    .attr("id", photo.id)
                    .attr("alt", photo.title)
                    .addClass("customThumb nav")
                    .attr("src", createImageUrl(photo, "thumb")
                            ));
}

function createImageUrl(photo, size) {
    var suffix = size === "thumb" ? "t.jpg" : "c.jpg";
    var src_url = "http://farm" + photo.farm + ".static.flickr.com/" +
            photo.server + "/" + photo.id + "_" + photo.secret + "_" + suffix;
    return src_url;
}

//Function to initialise event to display the custom images selected by thumbs
function initCustomThumbEvent() {

    $("#col1 img, #col2 img").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        currentItem = $(this).attr("alt");
        var imageId = $(this).attr("id");
        $("#container").hide();
        $("#showTextMsg2").show();
        $(".customImage").hide();
        $("#" + imageId + "_lge").fadeIn(500);
    }); //end mousedown
}

var getObjectSize = function(obj) {
    var len = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            len++;
    }
    return len;
};