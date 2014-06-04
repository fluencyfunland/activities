
//change the cursor to the replay icon
var replayCursorUrl = makeCursor("#191975");

addBookEvent();

function addReplayCursor() {
    $("#bb-bookblock, #container").css({cursor: replayCursorUrl});
}
function removeReplayCursor() {
    $("#bb-bookblock, #container").css({cursor: "default"});
}

function animate(anim, play) {

    //Play animation and sound whether subjects or extras
    if (anim !== null) {
        var objType = anim.indexOf("Kid") !== -1 ? subjects : extras;
        if (objType[anim].sound !== null && objType[anim].sound !== undefined) {
            play ? $.ionSound.play(objType[anim].sound) : "";
        }
        removeBookEvent();
        //show the image and animate
        tweens[anim].reset();
        images[anim].show();
        tweens[anim].play();
        play ? "" : tweens[anim].pause();
    }
}

function animateMulti(anim1, anim2, anim3, play) {
    //show the stage
    $("#container").show();
    //call the first animation
    animate(anim1, play);
    //define the concurrent animation (if exists)
    if (anim2 !== null) {
        function animate2(anim) {
            animate(anim, play);
        }
        images[anim2].moveToTop();
        animate2(anim2, play);
    }
    //define the concurrent animation (if exists)
    if (anim3 !== null) {
        function animate3(anim, play) {
            animate(anim, play);
        }
        images[anim3].moveToTop();
        animate3(anim3, play);
    }
}

//hide container when navigating
$(".bb-custom-icon").on("mousedown touchstart", function(event) {
    event.stopPropagation();
    event.preventDefault();

    $("#container").hide();
    imgLayer.getChildren().hide();
    imgLayer.draw();
});

//Add event to play the animation when container selected
function addBookEvent() {

    addReplayCursor();

    $("#bb-bookblock, #container").on("mousedown touchstart", function(event) {
        event.stopPropagation();
        event.preventDefault();

        //find the currently visible background and play animation
        var page = getCurrentPage();

        if (page !== "page0" && page !== "page11") {//if not on last or first page
            var pageObj = storybook.pages[page];
            pageObj.animate(true);
        }
    });
}
function removeBookEvent() {
    $("#bb-bookblock, #container").unbind();
    removeReplayCursor();
}


function getCurrentPage() {
    var itemId;
    $.each($(".bb-item"), function(idx, item) {
        if (!$(item).is(":hidden")) {
            itemId = $(item).attr("id");
        }
    });
    return itemId;
}

function playOnPageTurn() {

    var page = getCurrentPage();
    removeReplayCursor();
    var pageObj = storybook.pages[page];
    pageObj.animate(false);
    setTimeout(function() {
        var currentPage = getCurrentPage();
        //only play if page hasn't been turned ie still the same
        page === currentPage ? pageObj.animate(true) : "";
    }, 1000);
}

function hideImages() {
    $.each(images, function(idx, image) {
        image.hide();
    });
}


var Page = (function() {

    var config = {
        $bookBlock: $('#bb-bookblock'),
        $navNext: $('#bb-nav-next'),
        $navPrev: $('#bb-nav-prev'),
        $navFirst: $('#bb-nav-first'),
        $navLast: $('#bb-nav-last')
    },
    init = function() {
        config.$bookBlock.bookblock({
            speed: 800,
            shadowSides: 0.8,
            shadowFlip: 0.7,
            onEndFlip: function(page, isLimit) {
                playOnPageTurn();
                return false;
            },
            onBeforeFlip: function(page) {
                return false;
            }
        });
        initEvents();
    },
            initEvents = function() {

                var $slides = config.$bookBlock.children();

                // add navigation events
                config.$navNext.on('mousedown touchstart', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    config.$bookBlock.bookblock('next');
                    hideImages();
                    removeReplayCursor();
                    return false;
                });

                config.$navPrev.on('mousedown touchstart', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    config.$bookBlock.bookblock('prev');
                    hideImages();
                    removeReplayCursor();
                    return false;
                });

                config.$navFirst.on('mousedown touchstart', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    config.$bookBlock.bookblock('first');
                    removeReplayCursor();
                    return false;
                });

                config.$navLast.on('mousedown touchstart', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    config.$bookBlock.bookblock('last');
                    removeReplayCursor();
                    return false;
                });

                // add swipe events
                $slides.on({
                    'swipeleft': function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        config.$bookBlock.bookblock('next');
                        return false;
                    },
                    'swiperight': function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        config.$bookBlock.bookblock('prev');
                        return false;
                    }
                });

                // add keyboard events
                $(document).keydown(function(e) {
                    var keyCode = e.keyCode || e.which,
                            arrow = {
                                left: 37,
                                up: 38,
                                right: 39,
                                down: 40
                            };

                    switch (keyCode) {
                        case arrow.left:
                            config.$bookBlock.bookblock('prev');
                            break;
                        case arrow.right:
                            config.$bookBlock.bookblock('next');
                            break;
                    }
                });
            };

    return {init: init};

})();

Page.init();


function makeCursor(color) {

    /// create off-screen canvas
    var cursor = document.createElement('canvas'),
            ctx = cursor.getContext('2d');

    cursor.width = 100;
    cursor.height = 100;
    /// draw the image
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(63, 8);
    ctx.bezierCurveTo(65, 7, 66, 5, 68, 3);
    ctx.bezierCurveTo(68, 10, 69, 16, 70, 22);
    ctx.bezierCurveTo(64, 21, 58, 20, 53, 19);
    ctx.lineTo(52, 19);
    ctx.bezierCurveTo(54, 17, 55, 16, 57, 15);
    ctx.bezierCurveTo(54, 11, 50, 10, 46, 12);
    ctx.bezierCurveTo(42, 13, 39, 17, 39, 22);
    ctx.bezierCurveTo(39, 27, 42, 31, 47, 32);
    ctx.bezierCurveTo(51, 33, 56, 31, 59, 26);
    ctx.bezierCurveTo(62, 27, 64, 29, 67, 30);
    ctx.bezierCurveTo(65, 36, 57, 41, 50, 41);
    ctx.bezierCurveTo(41, 41, 34, 36, 31, 28);
    ctx.bezierCurveTo(29, 20, 31, 11, 38, 6);
    ctx.bezierCurveTo(44, 2, 55, 1, 63, 8);
    ctx.fill();

    return 'url(' + cursor.toDataURL() + '), auto';
}
