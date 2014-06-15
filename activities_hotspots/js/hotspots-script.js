

initStage();
initLayers();

//displayPosition("#hotspots-layout");


function createImages() {
    $.each(hotspot.items, function(idx, item) {
        drawImage(item);
    });
}

function initObjects() {

    //initially show the normal image
    $(".objGlow").hide();
    $(".objImage").show();

    //on mouseover show the glowing image
    $(".items").on("mouseenter", function(event) {
        event.stopPropagation();
        event.preventDefault();
        var image1 = $(this).find("img:eq(0)");
        var image2 = $(this).find("img:eq(1)");
        image1.hide();
        image2.show();
    });
    //when leaving, go back to the normal image
    $(".items").on("mouseleave", function(event) {
        event.stopPropagation();
        event.preventDefault();
        var image1 = $(this).find("img:eq(0)");
        var image2 = $(this).find("img:eq(1)");
        image1.show();
        image2.hide();
    });

    //on click or touch, hide the small image and call the animation to enlarge
    $(".items").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        //stop further selection
        $(".items").unbind("mousedown touchstart");
        //show the image canvas
        $("#container").show();

        var itemName = $(this).attr("id");

        $(this).hide();

        $("#hotspots-layout").css({opacity: "0.2"});

        //hide the images that will be tweened
        $.each(images, function(idx, image) {
            image.hide();
        });

        //play tween
        images[itemName].show();
        tweens[itemName].play();
    });
}


function initSounds() {

    //create the sounds array 
    var sounds = [];
    $.each(hotspot.items, function(idx, item) {
        sounds.push(item.name);
    });

    $.ionSound({
        sounds: sounds,
        path: docUrl + "sounds/",
        volume: "1.0",
        multiplay: true
    });
}

function tweenCallback(tween, itemName) {
    //show text for the item
    drawText(512, 20, 60, itemName);
    $.ionSound.play(itemName);

    //initiate event to remove large image on click
    $("#container").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        txtLayer.removeChildren();
        tween.reset();
        imgLayer.draw();
        txtLayer.draw();
        $(".items").show();
        initObjects();
        $("#container").hide();
        $("#hotspots-layout").css({opacity: "1.0"});
    }); //end event initialisation
}
