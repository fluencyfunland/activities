

initStage();
initLayers();
addNavigationEvents();
addChooseEvents();
getSfuFiles();

/* FOR TESTING AND SETUP*/
//$(".container").show();
//$("#content").hide();
//storybook = crazyDreams;
//createStorybook();
//writeStory();

//displayPosition("#content, #container");

function initExtrasSounds() {

    var sounds = new Array();
    $.each(extras, function(idx, extra) {
        drawImage(extra);
        extra.sound !== null && extra.sound !== undefined ? sounds.push(extra.sound) : "";
    });
    $.each(subjects, function(idx, subject) {
        subject.sound !== null && subject.sound !== undefined ? sounds.push(subject.sound) : "";
    });
    initSounds(sounds);
}


/* Create the images and show the fwd arrow 
 * (if all the items in choose2 page have been completed) */
function checkAllCompleted() {


    if (charName !== null &&
            gender !== null && hair !== null && cap !== null) {

        //Loop through the objects create the images & tweens
        if (gender === "girl") {
            $.each(girls, function(idx, girl) {
                createBodyImage(girl);
            });
        } else {
            $.each(boys, function(idx, boy) {
                createBodyImage(boy);
            });
        }
        $.each(unisexes, function(idx, unisex) {
            createBodyImage(unisex);
        });

        initExtrasSounds();
        $("#fwd2").show();
    } else {
        $("#fwd2").hide();
    }

    /* For testing */
    //console.log(charName + ", " + gender + ", " + cap + ", " + hair);
}


//function to initialise the sounds
function initSounds(sounds) {
//need to initialise imageNames without underscores because ionSound can't handle
    $.ionSound({
        sounds: sounds,
        path: docUrl + "sounds/",
        volume: "1.0",
        multiplay: true
    });
}
//Add the event to call the face detect script
$("#myPicture").on("mousedown touchstart", function(event) {
    event.stopPropagation();
    event.preventDefault();
    faceDetect();
});
/*Create the complete image, assigning the image to the animation object
 * and call the drawing method to create the animated images
 * */
function createCompletedImage(body, stage) {

    //Find the subject type from the body type eg if body = girlIntro is introKid
    var kidType = (((body.name).replace("boy", "")).replace("girl", "")).replace("uni", "");
    kidType = kidType.substr(0, 1).toLowerCase() + kidType.substr(1);
    var subject = subjects[kidType + "Kid"];

    stage.toDataURL({
        callback: function(url) {

            //assign image source corresponding to body and create the image/tween
            subject.imgSrc = createPng(url);
            drawImage(subject);

            //show the completed Image in the Step 3 page
            $("#imageContainer").empty();
            $("#imageContainer").append($("<img>").attr("src", subjects.pjKid.imgSrc));
        }
    }); //end stage3.toDataURL
}


function createPng(dataURL) {
    var data = atob(dataURL.substring("data:image/png;base64,".length)),
            asArray = new Uint8Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) {
        asArray[i] = data.charCodeAt(i);
    }
    var blob = new Blob([asArray.buffer], {type: "image/png"});
    var image = (window.webkitURL || window.URL).createObjectURL(blob);
    return image;
}

//Assign the image to each page of the storybook
function createStorybook() {

    var folderName = ((storybook.name).replace(" ", "_")).toLowerCase();

    //add the image source to each page
    $.each(storybook.pages, function(idx, page) {

        var imgSrc = docUrl + "img/" + folderName + "/" + idx + ".png";
        $("#" + idx).find("img").attr("src", imgSrc);
    });
}

//Write the text in the html <p> tage for each page
function writeStory() {

    /* THE STORY: written with female pronouns 
     * - object pronoun ie "I like her" written as herOb, and replaced as "him"
     * - others pronouns replaced as she->he, her->his
     * - Story character is written as nme.
     */

    //Add the text to the pages, replacing where required
    $.each(storybook.pages, function(idx, page) {

        var fontSize = page.name === "cover" || page.name === "end" ? "80px" : "45px";
        var align = page.name === "cover" || page.name === "end" ? "center" : "left";

        var text = page.text;
        text = replaceGenderText(text);
        $("#" + idx)
                .find("p").html(text)
                .css({fontSize: fontSize, textAlign: align});
    });
}

function addChooseEvents() {
//Add event when name is filled out
    $("#your-name").unbind().on("keyup", function(event) {
        event.stopPropagation();
        event.preventDefault();

        var text = $(this).val().replace(/ /g, '');
        if (text.length > 1) {
            charName = text;
            $("#write-name .complete").attr("src", docUrl + "img/tick.png");
            $("#character").show();
        } else {
            charName = null;
            $("#write-name .complete").attr("src", docUrl + "img/question.png");
        }
        checkAllCompleted();
    });
//Add events to select the character, hair and cap
    $("#body-image .nav").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        gender = $(this).attr("id");
        $("#body-image img").css({borderColor: "transparent", opacity: 0.8});
        $(this).css({borderColor: "blue", opacity: 1.0});
        $("#body-image .complete").attr("src", docUrl + "img/tick.png");
        $("#hair").show();
        checkAllCompleted();
    });
    $("#hair .nav").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#hair img").css({borderColor: "transparent", opacity: 0.8});
        $(this).css({borderColor: "blue", opacity: 1.0});
        hair = eval($(this).attr("id"));
        $("#hair .complete").attr("src", docUrl + "img/tick.png");
        $("#cap").show();
        checkAllCompleted();
    });
    $("#cap .nav").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#cap img, #cap p").css({borderColor: "transparent", opacity: 0.8});
        $(this).css({borderColor: "blue", opacity: 1.0});
        cap = eval($(this).attr("id"));
        $("#cap .complete").attr("src", docUrl + "img/tick.png");
        checkAllCompleted();
    });
}

function addNavigationEvents() {

    $("#fwd1").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#choose1").hide();
        $("#choose2").show();
        checkAllCompleted();
    });
    $("#back2").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#choose2").hide();
        $("#choose1").show();
    });
    $("#back3").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#choose3").hide();
        $("#choose2").show();
        imgLayer.removeChildren();
        imgLayer.draw();
    });
    $("#fwd2").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#book-menu").empty();
        createBookMenu(goingPlaces);
        createBookMenu(crazyDreams);
        $("#choose2").hide();
        $("#choose3").show();

    });
    $("#back-story").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#content").show();
        $(".container").hide();
        $("#container").hide();
        removeReplayCursor();
    });

}

function addThumbSelectEvent() {
    //Add event to select the uploaded photo
    $(".thumb").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        var picSrc = ($(this).attr("src")).replace("_sfuthumb", "");
        //re-initialise
        $("#face-rect, #ovalContainer").css({visibility: "hidden"});
        $("#myPicture").attr("src", picSrc);
        $("#face-msg").html("Click the picture to find my face");
        $("#fwd1").hide();

        //re-initialise choose2 items 
        $("#your-name").val("");
        $("#body-image img, #cap img, #hair img ").css({borderColor: "transparent"});
        $("#write-name .complete, #body-image .complete,#cap .complete, #hair .complete ")
                .attr("src", docUrl + "img/question.png");
        $("#character, #hair, #cap").hide();
        charName = null;
        gender = null;
        cap = null;
        hair = null;


    });

//Add events to delete the uploaded images
    $("#edit").on("keyup", function(event) {
        $(this).val() === "edit" ? $(".trash").show() : $(".trash").hide();
    });
}

function faceDetect() {

    coords = $("#picImage img").faceDetection({
        complete: function() {
        },
        error: function(img, code, message) {
            //$this.text('error!');
            alert('Error: ' + message);
        }
    });
    if (coords[0] === undefined) {
        $("#face-msg").html("Oops sorry, can't find a face");
    } else {
        $("#face-msg").html("Move the box to adjust");
        $("#fwd1").show();
        //create a larger rect than returned from the faceDetection
        var expandRatio = 0.6;
        coords[0].width += coords[0].width * expandRatio;
        coords[0].height += coords[0].height * expandRatio;
        coords[0].positionX -= (coords[0].width * expandRatio) / 4;
        coords[0].positionY -= (coords[0].height * expandRatio) / 2;
        drawFaceRect(coords[0].width, coords[0].height,
                coords[0].positionX, coords[0].positionY);
        //assign the pic image ready for face detect
        var pic = $("#myPicture").attr("src");
        createFaceImage(coords[0].width, coords[0].height,
                $("#face-rect").position().left, $("#face-rect").position().top, pic);
        //make the face-rect draggable to adjust the face, and recreate the face image        
        $("#face-rect").draggable();
        $("#face-rect").on("dragstop", function(event, ui) {
            //call the function to crop the image
            createFaceImage(coords[0].width, coords[0].height,
                    $(this).position().left, $(this).position().top, pic);
        });
    }
}

function createFaceImage(w, h, posX, posY, faceImage) {
    $("#face-rect, #ovalContainer").css({visibility: "visible"});
    /*set the container size and expand the cropped image to fill
     and adjust the size of the faceImage to fill the container */
    var containerWidth = 100;
    var containerHeight = 100;
    var scale = containerWidth / w;
    var stage1 = new Kinetic.Stage({
        container: 'rectContainer',
        width: containerWidth,
        height: containerHeight
    });
    layer1 = new Kinetic.Layer();
    stage1.add(layer1);
    //create the face image, cropping to the rectangle coords
    var faceRectImgObj = new Image();
    faceRectImgObj.src = faceImage;
    faceRectImgObj.onload = function() {
        var image1 = new Kinetic.Image({
            image: faceRectImgObj,
            x: 0,
            y: 0,
            width: w * scale,
            height: h * scale,
            crop: {
                x: posX,
                y: posY,
                width: w,
                height: h
            }
        }); //end image1

        //add the cropped face to the first layer
        layer1.add(image1);
        stage1.add(layer1);
        //Create the oval shape
        stage1.toDataURL({
            callback: function(dataUrl) {
                //add another stage for the oval face and image body
                var stage2 = new Kinetic.Stage({
                    container: 'ovalContainer',
                    width: 120,
                    height: 120
                });
                layer2 = new Kinetic.Layer();
                stage2.add(layer2);
                //create the oval image and fill with the face image    
                var ovalImgObj = new Image();
                ovalImgObj.src = dataUrl;
                var ovalFace = new Kinetic.Ellipse({
                    x: 40,
                    y: 50,
                    radius: {
                        x: 40,
                        y: 50
                    },
                    fillPatternImage: ovalImgObj,
                    fillPatternOffset: {x: 50, y: 50}
                }); //end ovalFace

                //add the oval face to stage 2
                layer2.add(ovalFace);
                stage2.add(layer2);
                //Create a data url of the oval face and assign to global var
                stage2.toDataURL({
                    callback: function(url) {
                        faceUrl = url;
                    }
                });
            }
        });
    }; //end faceRectImgObj.onload
}

function drawFaceRect(w, h, posX, posY) {
    $("#face-rect").css({width: w, height: h,
        left: posX, top: posY});
}

//Place the face on the selected body 
function createBodyImage(body) {

    var sel = changeSelectedHairCap(body);

    //For testing and setup
    //console.log("hair: " + sel.hair.name + ", cap: " + sel.cap.name);

    //create the stage and layer
    var stage3 = new Kinetic.Stage({
        container: 'createContainer',
        width: 350,
        height: 450
    });
    var layer3 = new Kinetic.Layer(); //body
    stage3.add(layer3);
    //Create the body image 
    var bodyImgObj = new Image();
    bodyImgObj.src = body.bodyImg; //the body image source
    bodyImgObj.onload = function() {
        var bodyImage = new Kinetic.Image({
            image: bodyImgObj,
            x: body.posX,
            y: body.posY
        });
        //Create the oval face image 

        //adjust head vertical position
        var headPosY = body === unisexes.uniRocket ||
                body === unisexes.uniAstro ||
                body === unisexes.uniMonkey2 ? 120 : 33;

        var faceImgObj = new Image();
        faceImgObj.src = faceUrl;
        faceImgObj.onload = function() {
            var faceImage = new Kinetic.Image({
                image: faceImgObj,
                x: 115,
                y: headPosY,
                scaleX: 0.8,
                scaleY: 0.8
            });
            //Create the hair image    
            var hairImgObj = new Image();
            hairImgObj.src = sel.hair.img;
            hairImgObj.onload = function() {
                var hairImage = new Kinetic.Image({
                    image: hairImgObj,
                    x: hair.posX,
                    y: hair.posY
                });
                //Create the cap image

                var capImgObj = new Image();
                capImgObj.src = sel.cap.img;
                capImgObj.onload = function() {
                    var capImage = new Kinetic.Image({
                        image: capImgObj,
                        x: sel.cap.posX,
                        y: sel.cap.posY
                    });
                    layer3.add(bodyImage);
                    layer3.add(faceImage);
                    layer3.add(hairImage);
                    layer3.add(capImage);
                    stage3.add(layer3);
                    createCompletedImage(body, stage3);
                };
            }
            ;
        };
    };
}

/*Add event to delete the selected (uploaded) photo and thumb 
 * and reload the images*/
function addDeletePhotoEvent() {

    $(".trash").on("mousedown touchstart", function(event) {

        var fileName = $(this).attr("alt");

        //send the file name using the ajax method
        deleteSfuFile(fileName);
    });
}

function getSfuFiles() {

    if (!localhost) {

        $.ajax({
            url: 'index.php?option=com_sfufiles&task=getimages&format=raw',
            method: 'post'
        }).done(function(result) {
            appendThumbs(result);
        }).fail(function() {
            alert("error");
        });
    } else {
        appendThumbs(null);
    }
}

/*Delete the file selected*/
function deleteSfuFile(file) {

    $.ajax({
        url: 'index.php?option=com_sfufiles&task=deleteimage&format=raw',
        method: 'post',
        data: {image: file}
    }).done(function(result) {
        getSfuFiles();
        $("#edit").val("");
        //For testing
        //console.log(result);
    });
}

function showFirstImage() {

    var firstPic;

    var divs = $("#imageThumbs").children("div");
    $.each(divs, function(idx, div) {
        var image = $(div).find("img");
        firstPic = $(image).css("display") !== "none" ? image : "";
    });
    $(".thumb").trigger("mousedown");

    //$("#myPicture").attr("src", firstPic.attr("src").replace("_sfuthumb", ""));

    //if image is showing and face-rect not showing - add a message to click face
    if ($("#myPicture").attr("src")) {
        $("#face-msg").html("Click the picture to find my face");
    }
}

function appendThumbs(result) {

    //Is there a server connection?
    if (result !== null) {

        var data = $.parseJSON(result);

        var path = "/fluencyfunland/users_sfu" + userDir;
        var images = data.images;

        //clear the div ready for the images
        $("#imageThumbs .thumb").remove();

        //Are there any files in the directory?
        if (images.length > 0) {

            //append to the imageThumbs div 
            $.each(images, function(idx, image) {

                var thumb = image.replace(".", "_sfuthumb.");

                $("#imageThumbs")
                        .append($("<img>").addClass("thumb nav drag")
                        .attr("src", path + "/" + thumb).attr("alt", thumb)
                        );
            });//end each

            addDeletePhotoEvent();

        } else { // no images in directory

            $("#imageThumbs")//show the sample photo
                    .append($("<img>").addClass("thumb nav").attr("src", docUrl + "img/tess.jpg").attr("alt", "thumb")
                    );
        }//end if

    } else { //either server is localhost or new user (no user directory created yet)

        $("#imageThumbs")//show the sample photo
                .append($("<img>").addClass("thumb nav drag").attr("src", docUrl + "img/tess.jpg").attr("alt", "thumb1")
                );
    }
    addThumbSelectEvent();
    showFirstImage();

    $(".drag").draggable({
        containment: "#upload",
        helper: "clone"
    });
    $("#delete-msg").droppable({
        accept: ".thumb",
        hoverClass: "highlight",
        drop: function(event, ui) {
            var filename = ui.draggable.attr("alt");
            deleteFile(filename);
        }
    });

}

function deleteFile(filename) {

    $("#dialog-confirm").html("Delete " + filename + " from server?");

    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "DELETE CONFIRMATION",
        height: 250,
        width: 420,
        buttons: {
            "Yes Delete": function() {

                deleteSfuFile(filename);
                $(this).dialog('close');
            },
            "Cancel": function() {
                $(this).dialog('close');
            }
        }
    });
}

function createBookMenu(storybook) {

    var title = storybook.pages.page0.text; //name of story
    title = replaceGenderText(title);
    var imgSrc = storybook.coverImg;
    var storyname = ((storybook.name).replace(/ /g, "")).charAt(0).toLowerCase() +
            ((storybook.name).replace(/ /g, "")).substr(1);

    $("#book-menu")
            .append($("<div>").addClass("book nav").attr("id", storyname)
            .css({background: "url(" + imgSrc + ")"})
            .append($("<p>").attr("id", "title-small")
            .html(title)));

    addBookMenuNav();
}

//Replace text where required for gender change from female to male
function replaceGenderText(text) {

    var nme = coloriseCharName();

    text = text.replace(/nme/g, nme);

    if (gender === "boy") {
        text = text.replace(/ she /g, " he ");
        text = text.replace(/ She /g, " He ");
        text = text.replace(/She /g, "He ");
        text = text.replace(/Her /g, "His ");
        text = text.replace(/ her /g, " his ");
        text = text.replace(/ herOb /g, " him ");

        text = text.replace(/thingo/g, "ball");
        text = text.replace(/ Queen /g, " King ");

    } else {
        text = text.replace(/ herOb /g, " her ");
        text = text.replace(/thingo/g, "bag");
    }
    return text;
}

function coloriseCharName() {
    var color = (gender === "boy") ? "#3385FF" : "#FFADEB";
    var nme = "<span style='color:" + color + "'>" + charName + "</span>";
    return nme;
}

function addBookMenuNav() {

    //add the book menu for selection
    $("#book-menu .nav").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        storybook = eval($(this).attr("id"));
        createStorybook();
        writeStory();

        $("#content").hide();
        $(".container").show();
        $("#container").show();
        $('#bb-nav-first').trigger("mousedown");
        playOnPageTurn();
    });
}

function changeSelectedHairCap(body) {

    var sel = {hair: null, cap: null};

    //Make some adjusttments
    switch (body) {
        case boys.boyBike:
            sel.hair = hair;
            sel.cap = helmet;
            break;
        case girls.girlBike:
            sel.hair = hair;
            sel.cap = helmet;
            break;
        case unisexes.uniBed:
            sel.hair = hair;
            sel.cap = noCap;
            break;
        case unisexes.uniSleep:
            sel.hair = noHair;
            sel.cap = sleepCap;
            break;
        case unisexes.uniMonkey:
            sel.hair = noHair;
            sel.cap = noCap;
            break;
        case unisexes.uniMonkey2:
            sel.hair = noHair;
            sel.cap = noCap;
            break;
        case unisexes.uniLion:
            sel.hair = noHair;
            sel.cap = whiskers;
            break;
        case unisexes.uniRocket:
            sel.hair = noHair;
            sel.cap = porthole;
            break;
        case unisexes.uniAstro:
            sel.hair = noHair;
            sel.cap = porthole;
            break;
        default: //no changes
            sel.hair = hair;
            sel.cap = cap;
    }
    return sel;
}