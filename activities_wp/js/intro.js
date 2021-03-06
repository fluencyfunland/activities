/* 
 This script to run first to show the theme menu
 */

//globals
var themes = {};
var currentTheme = null;
var currentItem = null;
var flickrSets = {};
var customPhotos = {};

displayThemeMenu();

/** Collect the theme names by looking through the theme folders
 * - create the theme menu items for navigation
 * - add the sprite stylesheets
 * - when done, call the function to init theme navigation
 * @returns void
 */
function displayThemeMenu() {
    
    $("#theme-menu").addClass("loading");
    
    $.ajax({
        type: "GET",
        url: docUrl + "include/get_themes.php",
        datatype: "json",
        cache: false
    }).done(function(result) {
        //loop through the names: display the navigation and add sprite images
        var themeNames = $.parseJSON(result);

        themeNames["custom"] = "";
        $.each(themeNames, function(themeName, items) {
        
        var imgSource = docUrl + "img/thumbs/" + themeName + ".png";

            //create the theme item
            themes[themeName] = {
                name: themeName,
                items: {}
            };

            $("#theme-menu").append($("<img>")
                    .attr("src", imgSource)
                    .attr("alt", themeName)
                    .addClass("nav")
                    );
            themeName !== "custom" ? addSpriteStylesheet(themeName) : "";
            themeName !== "custom" ? createThemeBackground(themeName) : "";

            $.each(items, function(idx, item) {
                themes[themeName].items[item] = {};
            });
        });

        initThemeNavigation();
        setItemParams(themeNames);
        
    });//end ajax
}

/**Initialise the events for the items on the theme menu
 * @returns void
 */
function initThemeNavigation() {

    //initialise the wp thumbs event to assign theme and display selected background and sprites
    $("#theme-menu .nav, .custom-menu .nav").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        $("#col1, #col2").addClass("loading");

        currentTheme = $(this).attr("alt");
        currentItem = currentTheme;

        imgLayer.getChildren().hide();
        imgLayer.draw();

        //show the theme as text on the image
        var posX = $("#container").width() / 2;
        var posY = 100;
        var size = 100;
        var message = currentTheme;
        drawText(posX, posY, size, message);

        $("#container, #col1, #col2, #back").show();
        $("#showTextMsg").hide();
        $("#theme-menu, #home, #act-home").hide();

        //if this is the first time selected, create the item backgrounds
        if ($("#image-div").children("." + currentTheme).length === 0) {
            createItemBackgrounds();
        }

        //for custom show page with the sets and navigation to each set
        if (currentTheme === "custom") {
            showCustomPage();
            $("#act-home").show();
        } else {
            //show background and item images 
            $("#" + currentTheme + "_bg").show();
            displayThemeSpriteImages();
        }
    });
}

function addSpriteStylesheet(theme) {
	
	var hrefUrl = docUrl + "themes/" + theme + "/sprites.css";	

    $(document.head).append(
            "<link rel='stylesheet' type='text/css' href='" + hrefUrl + "'/>"
            );
}
/** Create the html for each background theme (one each), which is hidden until selected 
 * @returns {undefined}
 */
function createThemeBackground(theme) {

    var themeBgSrc = docUrl + "themes/" + theme + "/backgrounds/" + theme + "_bg.png";
    
    $("#image-div")
            .append($("<img>")
                    .addClass("theme-bg")
                    .attr("src", themeBgSrc)
                    .attr("id", theme + "_bg")
                    .attr("alt", theme)
                    );
}


//function to init and assign item co-ords and scale
function setItemParams(themeNames) {

    themes.beach.items.beachball = {
        posX: 300, posY: 250, scale: 1, rotation: 10,
        movX: 20, movY: 70, scaleTo: 1, duration: 2, 
        easing: "BounceEaseOut"};
    
    themes.beach.items.bucket = {posX: 200, posY: 300, scale: 0.6, rotation: 10,
        movX: 0, movY: 0, scaleTo: 0.6, duration: 1, easing: "StrongEaseInOut"};
    themes.beach.items.crab = {posX: 300, posY: 300, scale: 0.9,
        movX: 30, movY: 0, scaleTo: 0.9, duration: 1, easing: "EaseOut"};
    themes.beach.items.jellyfish = {posX: 300, posY: 100, scale: 1,
        movX: 30, movY: -40, scaleTo: 1, duration: 2, easing: "EaseInOut"};
    themes.beach.items.lifeguard = {posX: 300, posY: 200, scale: 1.1,
        movX: -20, movY: 0, scaleTo: 1.1, duration: 2, easing: "Linear"};
    themes.beach.items.sandcastle = {posX: 350, posY: 500, scale: 0.1,
        movX: 0, movY: -100, scaleTo: 0.9, duration: 4, easing: "StrongEaseInOut"};
    themes.beach.items.seagull = {posX: 200, posY: 100, scale: 0.7, rotation: 5,
        movX: -100, movY: 50, scaleTo: 0.8, duration: 2, easing: "EaseInOut"};
    themes.beach.items.seashell = {posX: 400, posY: 280, scale: 0.4,
        movX: 0, movY: 20, scaleTo: 1.1, duration: 2, easing: "Linear"};
    themes.beach.items.towel = {posX: 100, posY: 350, scale: 0,
        movX: 00, movY: 0, scaleTo: 1.2, duration: 1, easing: "StrongEaseInOut"};
    themes.beach.items.umbrella = {posX: 80, posY: -40, scale: 1,
        movX: 10, movY: 20, scaleTo: 1, duration: 1, easing: "StrongEaseInOut"};

    themes.home.items.backyard = {posX: 100, posY: 0, scale: 0.88,
        movX: 0, movY: 0, scaleTo: 0.9, duration: 1, easing: "Linear"};
    themes.home.items.bath = {posX: 100, posY: 200, scale: .99,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.bed = {posX: 80, posY: 250, scale: .99,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.fridge = {posX: 200, posY: 20, scale: 0.97,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.lounge = {posX: 190, posY: 170, scale: 0.99,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.oven = {posX: 100, posY: 200, scale: 0.9,
        movX: 0, movY: 0, scaleTo: 0.92, duration: 1, easing: "Linear"};
    themes.home.items.parents = {posX: 270, posY: 250, scale: 0.9,
        movX: 0, movY: 20, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.toilet = {posX: 280, posY: 180, scale: 0.99,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.tv = {posX: 280, posY: 60, scale: .99,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.home.items.washing_machine = {posX: 400, posY: 160, scale: 0.98,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};

    themes.farm.items.chicken = {posX: 675, posY: 420, scale: 0.8,
        movX: -20, movY: 0, scaleTo: 0.8, duration: 1, easing: "EaseInOut"};
    themes.farm.items.cow = {posX: 350, posY: 350, scale: 1,
        movX: -20, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.farm.items.duck = {posX: 540, posY: 380, scale: 1,
        movX: -20, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.farm.items.farmer = {posX: 600, posY: 380, scale: 0.97,
        movX: 0, movY: 5, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.farm.items.horse = {posX: 260, posY: 150, scale: 1,
        movX: -20, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.farm.items.goat = {posX: 380, posY: 340, scale: 1,
        movX: 20, movY: 0, scaleTo: 1, duration: 1, easing: "EaseInOut"};
    themes.farm.items.pig = {posX: 350, posY: 380, scale: 1,
        movX: 20, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.farm.items.scarecrow = {posX: 300, posY: 280, scale: 1,
        movX: 0, movY: 0, scaleTo: 1.2, duration: 1, easing: "EaseInOut"};
    themes.farm.items.sheep = {posX: 350, posY: 370, scale: 1,
        movX: -20, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.farm.items.tractor = {posX: 230, posY: 250, scale: 0.98,
        movX: -20, movY: 10, scaleTo: 1, duration: 1, easing: "Linear"};

    themes.pets.items.bird = {posX: 180, posY: 390, scale: 1,
        movX: 20, movY: 0, scaleTo: 1, duration: 1, easing: "EaseInOut"};
    themes.pets.items.goldfish = {posX: 280, posY: 280, scale: 1,
        movX: -30, movY: 0, scaleTo: 1, duration: 2, easing: "Linear"};
    themes.pets.items.guineapig = {posX: 290, posY: 200, scale: 1,
        movX: -20, movY: 0, scaleTo: 1, duration: 4, easing: "Linear"};
    themes.pets.items.hermitcrab = {posX: 310, posY: 290, scale: 1,
        movX: 20, movY: 0, scaleTo: 1, duration: 4, easing: "Linear"};
    themes.pets.items.kitten = {posX: 430, posY: 370, scale: 0.95,
        movX: 0, movY: 0, scaleTo: 1, duration: 4, easing: "Linear"};
    themes.pets.items.lamb = {posX: 430, posY: 270, scale: 1,
        movX: 20, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.pets.items.mouse = {posX: 420, posY: 220, scale: 1,
        movX: 0, movY: -20, scaleTo: 1, duration: 4, easing: "Linear"};
    themes.pets.items.puppy = {posX: 385, posY: 280, scale: 1, rotation: -3,
        movX: -5, movY: 10, scaleTo: 1, duration: 1, easing: "EaseInOut"};
    themes.pets.items.rabbit = {posX: 290, posY: 270, scale: 1,
        movX: 10, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.pets.items.turtle = {posX: 390, posY: 251, scale: 1, rotation: 3,
        movX: 10, movY: 0, scaleTo: 1, duration: 2, easing: "Linear"};

    themes.picnic.items.ants = {posX: 180, posY: 320, scale: 1,
        movX: 50, movY: 0, scaleTo: 1, duration: 2, easing: "EaseInOut"};
    themes.picnic.items.bbq = {posX: 180, posY: 320, scale: 0,
        movX: 50, movY: 0, scaleTo: 0, duration: 2, easing: "EaseInOut"};
    themes.picnic.items.boomerang = {posX: 270, posY: 150, scale: 1, rotation: 360,
        movX: -200, movY: 0, scaleTo: 0.8, duration: 2, easing: "Linear"};
    themes.picnic.items.park_bench = {posX: 80, posY: 30, scale: 0.9,
        movX: 0, movY: 0, scaleTo: 0.9, duration: 1, easing: "Linear"};
    themes.picnic.items.picnic_basket = {posX: 120, posY: 320, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 4, easing: "Linear"};
    themes.picnic.items.picnic_blanket = {posX: 240, posY: 260, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 4, easing: "Linear"};
    themes.picnic.items.tennisball = {posX: 380, posY: 210, scale: 1,rotation: 90,
        movX: -130, movY: 20, scaleTo: 1, duration: 2, easing: "Linear"};
    
    themes.playground.items.slide = {posX: 200, posY: 50, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.playground.items.swings = {posX: 150, posY: 130, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.playground.items.trampoline = {posX: 230, posY: 120, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.playground.items.tunnel = {posX: 260, posY: 150, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};

    themes.school.items.blackboard = {posX: 240, posY: 80, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.school.items.lunchbox = {posX: 320, posY: 170, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.school.items.pencils = {posX: 530, posY: 400, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.school.items.singing = {posX: 230, posY: 200, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};

    themes.shops.items.icecream_truck = {posX: 40, posY: 180, scale: 1,rotation: -4,
        movX: -200, movY: 100, scaleTo: 1, duration: 4, easing: "EaseIn"};
    themes.shops.items.money = {posX: 250, posY: 90, scale: 1.1,
        movX: 0, movY: 0, scaleTo: 1.1, duration: 1, easing: "Linear"};
    themes.shops.items.vegetables = {posX: 190, posY: 265, scale: 0,
        movX: 0, movY: 0, scaleTo: 0, duration: 4, easing: "Linear"};

    themes.sport.items.basketball = {posX: 320, posY: 130, scale: 1,
        movX: 0, movY: -20, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.sport.items.cricket = {posX: 200, posY: 290, scale: 1,
        movX: 0, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};
    themes.sport.items.football = {posX: 500, posY: 500, scale: 0.5,rotation: 180,
        movX: -100, movY: -440, scaleTo: 0.1, duration: 2, easing: "EaseInOut"};
    themes.sport.items.gymnastics = {posX: 280, posY: 120, scale: 1,
        movX: 10, movY: 0, scaleTo: 1, duration: 2, easing: "Linear"};
    themes.sport.items.netball = {posX: 300, posY: 100, scale: 1,
        movX: 10, movY: -20, scaleTo: 1, duration: 1, easing: "EaseIn"};
    themes.sport.items.soccer = {posX: 230, posY: 250, scale: 1,
        movX: 10, movY: 10, scaleTo: 1.1, duration: 1, easing: "Linear"};
    themes.sport.items.tennis = {posX: 100, posY: 230, scale: 1,
        movX: 10, movY: 0, scaleTo: 1, duration: 1, easing: "Linear"};

    themes.transport.items.bicycle = {posX: 360, posY: 220, scale: 1, rotation: 5,
        movX: 55, movY: 15, scaleTo: 1, duration: 1, easing: "EaseOut"};
    themes.transport.items.bus = {posX: 380, posY: 270, scale: 1, rotation: -2,
        movX: -40, movY: 0, scaleTo: 1, duration: 2, easing: "Linear"};
    themes.transport.items.car = {posX: 50, posY: 90, scale: .4, rotation: -3,
        movX: -40, movY: 30, scaleTo: .4, duration: 2, easing: "Linear"};
    themes.transport.items.motorcycle = {posX: 390, posY: 370, scale: 1,
        movX: -50, movY: 0, scaleTo: 1, duration: 2, easing: "EaseInOut"};
    themes.transport.items.plane = {posX: 40, posY: 170, scale: .4,rotation: 5,
        movX: 100, movY: 0, scaleTo: 1, duration: 2, easing: "Linear"};
    themes.transport.items.rocket = {posX: 100, posY: 380,rotation: -5,
        movX: 700, movY: -230, scale: 1, scaleTo: 0, duration: 4, easing: "EaseOut", };
    themes.transport.items.scooter = {posX: 220, posY: 150, scale: 0.96,
        movX: -60, movY: 10, scaleTo: 1, duration: 2, easing: "EaseOut"};
    themes.transport.items.ship = {posX: 200, posY: 280, scale: 0.9, rotation: -5,
        movX: 80, movY: 0, scaleTo: 1, duration: 2, easing: "Linear"};
    themes.transport.items.train = {posX: 260, posY: 230, scale: 1.17,rotation: -2,
        movX: -16, movY: 0, scaleTo: 1.24, duration: 1, easing: "Linear"};
    themes.transport.items.tram = {posX: 120, posY: 180, scale: 1.2,
        movX: -150, movY: 0, scaleTo: 1.2, duration: 3, easing: "EaseOut"};

    $.each(themeNames, function(themeName, items) {
        $.each(items, function(idx, item) {
            themes[themeName].items[item].imgName = item;
            themes[themeName].items[item].imgSrc = docUrl + "themes/" + themeName
                    + "/items/" + item + ".png";
            themes[themeName].items[item].callback = function() {
            };
            drawImage(themes[themeName].items[item]);
        });
    });
}