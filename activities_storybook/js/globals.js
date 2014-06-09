
var coords = {};
var charName = null;
var gender = null;
var cap = null;
var hair = null;
var faceUrl = null;
var body = {name: null, posX: null, posY: null, bodyImg: null};
//THE BODY IMAGES
girls = {};

girls.girlIntro = {name: "girlIntro", posX: 34, posY: 93, bodyImg: docUrl + "img/girl_intro.png"};
girls.girlCar = {name: "girlCar", posX: -30, posY: 90, bodyImg: docUrl + "img/girl_car.png"};
girls.girlBike = {name: "girlBike", posX: 15, posY: 96, bodyImg: docUrl + "img/girl_bike.png"};

girls.girlBeach = {name: "girlBeach", posX: 15, posY: 78, 
    bodyImg: docUrl + "img/girl_beach.png"};

girls.girlSand = {name: "girlSand", posX: 13, posY: 77, bodyImg: docUrl + "img/girl_sand.png"};
girls.girlSoccer = {name: "girlSoccer", posX: 0, posY: 93, bodyImg: docUrl + "img/girl_soccer.png"};
girls.girlFarm = {name: "girlFarm", posX: 35, posY: 93, bodyImg: docUrl + "img/girl_farm.png"};
girls.girlsSuper = {name: "girlSuper", posX: 105, posY: 25, bodyImg: docUrl + "img/girl_super.png"};
girls.girlsSuper2 = {name: "girlSuper2", posX: 105, posY: 25, bodyImg: docUrl + "img/girl_super.png"};
girls.girlRun = {name: "girlRun", posX: 58, posY: 13, bodyImg: docUrl + "img/girl_running.png"};
girls.girlPj = {name: "girlPj", posX: 62, posY: 110, bodyImg: docUrl + "img/girl_pj.png"};

boys = {};
boys.boyIntro = {name: "boyIntro", posX: 38, posY: 100, bodyImg: docUrl + "img/boy_intro.png"};
boys.boyCar = {name: "boyCar", posX: -30, posY: 90, bodyImg: docUrl + "img/boy_car.png"};
boys.boyBike = {name: "boyBike", posX: 15, posY: 96, bodyImg: docUrl + "img/boy_bike.png"};
boys.boyBeach = {name: "boyBeach", posX: 15, posY: 77, bodyImg: docUrl + "img/boy_beach.png"};
boys.boySand = {name: "boySand", posX: 15, posY: 77, bodyImg: docUrl + "img/boy_sand.png"};
boys.boySoccer = {name: "boySoccer", posX: 0, posY: 93, bodyImg: docUrl + "img/boy_soccer.png"};
boys.boyFarm = {name: "boyFarm", posX: 38, posY: 97, bodyImg: docUrl + "img/boy_farm.png"};
boys.boySuper = {name: "boySuper", posX: 105, posY: 25, bodyImg: docUrl + "img/boy_super.png"};
boys.boySuper2 = {name: "boySuper2", posX: 105, posY: 25, bodyImg: docUrl + "img/boy_super.png"};
boys.boyRun = {name: "boyRun", posX: 52, posY: 13, bodyImg: docUrl + "img/boy_running.png"};
boys.boyPj = {name: "boyPj", posX: 62, posY: 110, bodyImg: docUrl + "img/boy_pj.png"};

unisexes = {};
unisexes.uniBed = {name: "uniBed", posX: -30, posY: 90, bodyImg: docUrl + "img/blank.png"};
unisexes.uniSleep = {name: "uniSleep", posX: -30, posY: 90, bodyImg: docUrl + "img/blank.png"};
unisexes.uniMonkey = {name: "uniMonkey", posX: 108, posY: 26, bodyImg: docUrl + "img/monkey.png"};
unisexes.uniMonkey2 = {name: "uniMonkey2", posX: 59, posY: -6, bodyImg: docUrl + "img/monkey_trick.png"};
unisexes.uniLion = {name: "uniLion", posX: 55, posY: 0, bodyImg: docUrl + "img/lion.png"};
unisexes.uniRocket = {name: "uniRocket", posX: 23, posY: 0, bodyImg: docUrl + "img/rocket.png"};
unisexes.uniAstro = {name: "uniAstro", posX: 60, posY: 105, bodyImg: docUrl + "img/astro.png"};

//THE HAIR IMAGES
var blondeHair = {name: "blondeHair", posX: 84, posY: 25, img: docUrl + "img/blonde_hair.png"};
var redHair = {name: "redHair", posX: 106, posY: 30, img: docUrl + "img/red_hair.png"};
var brownHair = {name: "brownHair", posX: 106, posY: 23, img: docUrl + "img/brown_hair.png"};
var blackgreyHair = {name: "blackgreyHair", posX: 94, posY: 30, img: docUrl + "img/blackgrey_hair.png"};
var blackHair = {name: "blackHair", posX: 79, posY: 20, img: docUrl + "img/black_hair.png"};
var whiskers = {name: "whiskers", posX: 90, posY: 80, img: docUrl + "img/whiskers.png"};
var noHair = {name: "noHair", posX: 0, posY: 0, img: docUrl + "img/blank.png"};
//THE CAP IMAGES
var helmet = {name: "helmet", posX: 107, posY: 20, img: docUrl + "img/helmet.png"};
var redCap = {name: "redCap", posX: 107, posY: 20, img: docUrl + "img/red_cap.png"};
var blueCap = {name: "blueCap", posX: 107, posY: 20, img: docUrl + "img/blue_cap.png"};
var pinkHat = {name: "pinkHat", posX: 74, posY: 5, img: docUrl + "img/pink_hat.png"};
var pinkCap = {name: "pinkCap", posX: 101, posY: 0, img: docUrl + "img/pink_cap.png"};
var sleepCap = {name: "sleepCap", posX: 105, posY: 10, img: docUrl + "img/sleep_cap.png"};
var porthole = {name: "porthole", posX: 108, posY: 123, img: docUrl + "img/porthole.png"};
var noCap = {name: "noCap", posX: 0, posY: 0, img: docUrl + "img/blank.png"};

//THE ANIMATED IMAGES
var subjects = {};
subjects.introKid = {imgName: "introKid", imgSrc: null, posX: 280, posY: 250,
    movX: 10, movY: 10, scale: 0.6, scaleTo: 0.8,
    duration: 3, easing: "Linear", sound: "intro", callback: function() {
        addBookEvent();
    }};
subjects.carKid = {imgName: "carKid", imgSrc: null, posX: -120, posY: 225,
    movX: 450, movY: 0, scale: 0.5, scaleTo: 0.5,
    duration: 3, easing: "EaseOut", sound: null, callback: function() {
    }};
subjects.bikeKid = {imgName: "bikeKid", imgSrc: null, posX: 250, posY: 250,
    movX: 330, movY: 30, scale: 0.7, scaleTo: 0.8,
    duration: 4, easing: "EaseOut", sound: "bicycle", callback: function() {
        addBookEvent();
    }};
subjects.beachKid = {imgName: "beachKid", imgSrc: null, posX: 160, posY: 270,
    movX: 0, movY: 5, scale: 0.75, scaleTo: 0.8,
    duration: 2, easing: "Linear", sound: "lifeguard", callback: function() {
    }};
subjects.sandKid = {imgName: "sandKid", imgSrc: null, posX: 300, posY: 250,
    movX: 0, movY: 0, scale: 0.85, scaleTo: 0.9,
    duration: 2, easing: "Linear", sound: null, callback: function() {
    }};

subjects.soccerKid = {imgName: "soccerKid", imgSrc: null, 
    posX: 100, posY: 300,movX: 320, movY: 25, 
    scale: 0.5, scaleTo: 0.7, duration: 2, easing: "EaseOut", 
    sound: null, callback: function() {
    }};

subjects.farmKid = {imgName: "farmKid", imgSrc: null, posX: 280, posY: 250,
    movX: 0, movY: 0, scale: 0.7, scaleTo: 0.8,
    duration: 2, easing: "Linear", sound: null, callback: function() {
        addBookEvent();
    }};
subjects.bedKid = {imgName: "bedKid", imgSrc: null, posX: 70, posY: 225,
    movX: -5, movY: 7, scale: 1.1, scaleTo: 1.1, rotation: -3,
    duration: 1, easing: "EaseOut", sound: null, callback: function() {
    }};
subjects.sleepKid = {imgName: "sleepKid", imgSrc: null, posX: 70, posY: 225,
    movX: -5, movY: 7, scale: 1.1, scaleTo: 1.1, rotation: -3,
    duration: 1, easing: "EaseOut", sound: null, callback: function() {
    }};
subjects.superKid = {imgName: "superKid", imgSrc: null, posX: 600, posY: 320,
    movX: -610, movY: -55, scale: 0.7, scaleTo: 0.3, rotation: -60,
    duration: 4, easing: "EaseInOut", sound: "swooshh", callback: function() {
        addBookEvent();
    }};
subjects.super2Kid = {imgName: "super2Kid", imgSrc: null, posX: 600, posY: 320,
    movX: -525, movY: -110, scale: 0.7, scaleTo: 0.7, rotation: -20,
    duration: 4, easing: "EaseInOut", sound: "swoosh", callback: function() {
        addBookEvent();
    }};
subjects.runKid = {imgName: "runKid", imgSrc: null, posX: 600, posY: 130,
    movX: -520, movY: 40, scale: 0.3, scaleTo: 0.6,
    duration: 4, easing: "EaseInOut", sound: "scream", callback: function() {
        addBookEvent();
    }};
subjects.monkeyKid = {imgName: "monkeyKid", imgSrc: null, posX: 360, posY: 280,
    movX: -850, movY: 0, scale: 1.2, scaleTo: 1.2, rotation: 0,
    duration: 3, easing: "BounceEaseInOut", sound: "monkeys", callback: function() {
        animate("monkey2Kid", true);
    }};
subjects.monkey2Kid = {imgName: "monkey2Kid", imgSrc: null, posX: -100, posY: 200,
    movX: 500, movY: 0, scale: 1.2, scaleTo: 1.2, rotation: 20,
    duration: 2, easing: "BounceEaseInOut", sound: "monkeys", callback: function() {
        addBookEvent();
    }};

subjects.lionKid = {imgName: "lionKid", imgSrc: null, posX: 360, posY: 300,
    movX: -220, movY: 0, scale: 0.5, scaleTo: 1.2, rotation: 0,
    duration: 4, easing: "EaseInOut", sound: "lion", callback: function() {
        addBookEvent();
    }};
subjects.rocketKid = {imgName: "rocketKid", imgSrc: null, posX: 60, posY: 480,
    movX: 500, movY: -430, scale: 0.2, scaleTo: 1.0, rotation: 40,
    duration: 6, easing: "EaseInOut", sound: "rocket", callback: function() {
        addBookEvent();
    }};
subjects.astroKid = {imgName: "astroKid", imgSrc: null, posX: 270, posY: 50,
    movX: 100, movY: 40, scale: 1.0, scaleTo: 1.1, rotation: 0,
    duration: 5, easing: "EaseInOut", sound: "radio", callback: function() {
        addBookEvent();
    }};
subjects.astroKid = {imgName: "astroKid", imgSrc: null, posX: 400, posY: 50,
    movX: -100, movY: 40, scale: 1.0, scaleTo: 1.1, rotation: 0,
    duration: 5, easing: "EaseInOut", sound: "radio", callback: function() {
        addBookEvent();
    }};
subjects.pjKid = {imgName: "pjKid", imgSrc: null, posX: 70, posY: 200,
    movX: 0, movY: 20, scale: 1.0, scaleTo: 1.0, rotation: 0,
    duration: 1, easing: "BounceEaseInOut", sound: "presents", callback: function() {
        addBookEvent();
    }};


//SOME EXTRA ANIMATED OBJECTS
var extras = {};
extras.sandcastle = {imgName: "sandcastle", imgSrc: docUrl + "img/sandcastle.png", posX: 330, posY: 490, scale: 0.2,
    movX: 0, movY: -60, scaleTo: 0.8, duration: 4, easing: "StrongEaseInOut", sound: "sandcastle", callback: function() {
        addBookEvent();
    }};

extras.seagull1 = {imgName: "seagull1", imgSrc: docUrl + "img/seagull.png", 
    posX: 600, posY: 300, scale: 0.1, rotation: 5,
    movX: -80, movY: 50, scaleTo: 0.2, duration: 3, easing: "EaseInOut", 
    sound: "seagull", callback: function() {
        addBookEvent();
    }};

extras.seagull2 = {imgName: "seagull2", imgSrc: docUrl + "img/seagull.png", posX: 580, posY: 200, scale: 0.2, rotation: 15,
    movX: -100, movY: 50, scaleTo: 0.3, duration: 4, easing: "EaseInOut", sound: "seagull", callback: function() {
        addBookEvent();
    }};
extras.soccerBall = {imgName: "soccerBall", imgSrc: docUrl + "img/soccerball.png", posX: 280, posY: 500,
    movX: 350, movY: 25, scale: 0.4, scaleTo: 0.6, rotation: 270,
    duration: 3, easing: "EaseOut", sound: "ball", callback: function() {
        addBookEvent();
    }};
extras.car = {imgName: "car", imgSrc: docUrl + "img/car.png", posX: -150, posY: 200,
    movX: 450, movY: 0, scale: 1.5, scaleTo: 1.5, rotation: 0,
    duration: 3, easing: "EaseOut", sound: "car", callback: function() {
        addBookEvent();
    }};
extras.chicken = {imgName: "chicken", imgSrc: docUrl + "img/chicken.png", posX: 675, posY: 470, scale: 0.8,
    movX: -40, movY: 0, scaleTo: 0.8, duration: 2, easing: "EaseInOut", sound: "chicken", callback: function() {
        addBookEvent();
    }};
extras.duck = {imgName: "duck", imgSrc: docUrl + "img/duck.png", posX: 540, posY: 430, scale: 0.7,
    movX: -40, movY: 0, scaleTo: 0.7, duration: 2, easing: "Linear", sound: "duck", callback: function() {
        addBookEvent();
    }};
extras.goat = {imgName: "goat", imgSrc: docUrl + "img/goat.png", posX: 180, posY: 400, scale: 1,
    movX: 40, movY: 0, scaleTo: 1, duration: 2, easing: "EaseInOut", sound: "goat", callback: function() {
        addBookEvent();
    }};
extras.sheep = {imgName: "sheep", imgSrc: docUrl + "img/sheep.png", posX: 500, posY: 420, scale: 1,
    movX: -50, movY: 0, scaleTo: 1, duration: 2, easing: "Linear", sound: "sheep", callback: function() {
        addBookEvent();
    }};
extras.cow = {imgName: "cow", imgSrc: docUrl + "img/cow.png", posX: 500, posY: 400, scale: 1,
    movX: -50, movY: 20, scaleTo: 1.05, duration: 2, easing: "Linear", sound: "cow", callback: function() {
        addBookEvent();
    }};
extras.pig = {imgName: "pig", imgSrc: docUrl + "img/pig.png", posX: 120, posY: 450, scale: 1,
    movX: 40, movY: 0, scaleTo: 1, duration: 2, easing: "Linear", sound: "pig", callback: function() {
        addBookEvent();
    }};

extras.dog = {imgName: "dog", imgSrc: docUrl + "img/dog.png", posX: 300, posY: 250,
    movX: 0, movY: 20, scale: 1, scaleTo: 1, rotation: 0,
    duration: 2, easing: "BounceEaseInOut", sound: "puppy", callback: function() {
        addBookEvent();
    }};
extras.dreamBox = {imgName: "dreamBox", imgSrc: docUrl + "img/dreamBox.png", posX: 280, posY: 150,
    movX: 0, movY: 0, scale: 1, scaleTo: 1, rotation: 0,
    duration: 2, easing: "EaseInOut", sound: null, callback: function() {
        addBookEvent();
    }};
extras.dreamImg1 = {imgName: "dreamImg1", imgSrc: docUrl + "img/dreamImg1.png", posX: 430, posY: 184,
    movX: -20, movY: 0, scale: 0.7, scaleTo: 0.8, rotation: 0,
    duration: 2, easing: "EaseInOut", sound: "lullaby", callback: function() {
        addBookEvent();
    }};
extras.dreamImg2 = {imgName: "dreamImg2", imgSrc: docUrl + "img/cake.png", posX: 500, posY: 184,
    movX: -20, movY: 0, scale: 0.7, scaleTo: 0.8, rotation: 0,
    duration: 2, easing: "EaseInOut", sound: "birthday", callback: function() {
        addBookEvent();
    }};
extras.dino = {imgName: "dino", imgSrc: docUrl + "img/dino.png", posX: 925, posY: 70, scale: 0.5,
    movX: -600, movY: 85, scaleTo: 0.9, duration: 4, easing: "Linear", sound: "dinosaur", callback: function() {
        addBookEvent();
    }};
extras.giraffe = {imgName: "giraffe", imgSrc: docUrl + "img/giraffe.png", posX: 300, posY: 190, scale: 1,
    movX: 50, movY: 0, scaleTo: 1, duration: 6, easing: "Linear", sound: null, callback: function() {
        addBookEvent();
    }};
extras.kitten = {imgName: "kitten", imgSrc: docUrl + "img/kitten.png", posX: 90, posY: 195, scale: 0.8,
    movX: 0, movY: 0, scaleTo: 0.8, duration: 4, easing: "Linear", sound: "kitten", callback: function() {
        addBookEvent();
    }};
extras.kidJumping = {imgName: "kidJumping", imgSrc: docUrl + "img/kid_jumping.png", posX: 150, posY: 420, scale: 0.7,
    movX: 0, movY: -10, scaleTo: 0.7, duration: 4, easing: "BounceEaseIn", sound: null, callback: function() {
        addBookEvent();
    }};
extras.flame = {imgName: "flame", imgSrc: docUrl + "img/flame.png", posX: 150, posY: 420, scale: 0.7,
    movX: 0, movY: -10, scaleTo: 0.7, duration: 4, easing: "Linear", sound: null, callback: function() {
        addBookEvent();
    }};



//THE PAGES AND THE ANIMATIONS TO BE CALLED
var pages = {};
pages.page = {animate: function() {
        animateMulti(null, null, null, false);
    }};

//THE BOOKS

goingPlaces = {name: "Going Places", pages: {}, 
    coverImg: docUrl + "img/going_places/going_places.png"};
goingPlaces.pages.page0 = {name: "cover", animate: function(play) {
        animateMulti(null, null, null, play);
    }};
goingPlaces.pages.page1 = {name: "intro", animate: function(play) {
        animateMulti("introKid", null, null, play);
    }};
goingPlaces.pages.page2 = {name: "road", animate: function(play) {
        animateMulti("carKid", "car", null, play);
    }};
goingPlaces.pages.page3 = {name: "park", animate: function(play) {
        animateMulti("soccerKid", "soccerBall", null, play);
    }};

goingPlaces.pages.page4 = {name: "bikeway", animate: function(play) {
        animateMulti("bikeKid", null, null, play);
    }};
goingPlaces.pages.page5 = {name: "beach1", animate: function(play) {
        animateMulti("beachKid", "seagull1", "seagull2", play);
    }};
goingPlaces.pages.page6 = {name: "beach2", animate: function(play) {
        animateMulti("sandKid", "sandcastle", null, play);
    }};

goingPlaces.pages.page7 = {name: "farm1", animate: function(play) {
        animateMulti("farmKid", "sheep", "goat", play);
    }};

goingPlaces.pages.page8 = {name: "farm2", animate: function(play) {
        animateMulti("farmKid", "duck", "chicken", play);
    }};
goingPlaces.pages.page9 = {name: "more", animate: function(play) {
        animateMulti("farmKid", "cow", "pig", play);
    }};
goingPlaces.pages.page10 = {name: "house", animate: function(play) {
        animateMulti("bedKid", "dog", null, play);
    }};
goingPlaces.pages.page11 = {name: "end", animate: function(play) {
        animateMulti(null, null, null, play);
    }};

goingPlaces.pages.page0.text = "Going Places<br> with nme";
goingPlaces.pages.page1.text = "nme always wanted to go out. Wherever she went she always liked to take her thingo.";
goingPlaces.pages.page2.text = "nme enjoyed riding in the back seat of her mum's car.";
goingPlaces.pages.page3.text = "nme was very good at kicking a ball and she liked to run after her soccerball at the park.";
goingPlaces.pages.page4.text = "nme loved to go to the bikeway to ride her fast bike. nme always wore a helmet so she didn't get a sore head if she fell.";
goingPlaces.pages.page5.text = "nme also loved to go to the beach where she could watch the seagulls.";
goingPlaces.pages.page6.text = "nme liked to play in the sand and would build sandcastles. nme would pretend to be the Queen of the castle.";
goingPlaces.pages.page7.text = "nme liked to visit a farm to see her favourite animals, sheep and goats.";
goingPlaces.pages.page8.text = "nme also liked the chickens and ducks.  I wonder what they eat, she thought.";
goingPlaces.pages.page9.text = "nme thought that the pigs and cows made funny noises.";
goingPlaces.pages.page10.text = "But sometimes it was just good to stay home and snuggle up in bed with her little dog, Fluffy.";
goingPlaces.pages.page11.text = "THE END";


crazyDreams = {name: "Crazy Dreams", pages: {}, coverImg: docUrl + "img/crazy_dreams/crazy_dreams.png"};
crazyDreams.pages.page0 = {name: "cover", animate: function(play) {
        animateMulti(null, null, null, play);
    }};
crazyDreams.pages.page1 = {name: "intro", animate: function(play) {
        animateMulti("sleepKid", "dreamBox", "dreamImg1", play);
    }};
crazyDreams.pages.page2 = {name: "dino_plain", animate: function(play) {
        animateMulti("runKid", "dino", null, play);
    }};
crazyDreams.pages.page3 = {name: "jungle1", animate: function(play) {
        images["monkey2Kid"].hide();
        animateMulti("monkeyKid", null, null, play);
    }};
crazyDreams.pages.page4 = {name: "jungle2", animate: function(play) {
        animateMulti("lionKid", "giraffe", null, play);
    }};
crazyDreams.pages.page5 = {name: "super1", animate: function(play) {
        animateMulti("superKid", null, null, play);
    }};
crazyDreams.pages.page6 = {name: "super2", animate: function(play) {
        animateMulti("super2Kid", "kitten", "kidJumping", play);
    }};
crazyDreams.pages.page7 = {name: "planets", animate: function(play) {
        animateMulti("rocketKid", null, null, play);
    }};
crazyDreams.pages.page8 = {name: "moon", animate: function(play) {
        animateMulti("astroKid", null, null, play);
    }};
crazyDreams.pages.page9 = {name: "birthday", animate: function(play) {
        animateMulti("sleepKid", "dreamBox", "dreamImg2", play);
    }};
crazyDreams.pages.page10 = {name: "presents", animate: function(play) {
        animateMulti("pjKid", null, null, play);
    }};
crazyDreams.pages.page11 = {name: "end", animate: function(play) {
        animateMulti(null, null, null, play);
    }};

crazyDreams.pages.page0.text = "nme <br>and her <br>Crazy Dreams";
crazyDreams.pages.page1.text = "nme went to sleep pulling her cap over her eyes. She always had such crazy dreams.";
crazyDreams.pages.page2.text = "Once nme had a scary dream about being chased by a dinosaur.";
crazyDreams.pages.page3.text = "Another dream was when nme was a monkey in the jungle.";
crazyDreams.pages.page4.text = "nme also dreamed that she was a lion, the KING of the jungle.";
crazyDreams.pages.page5.text = "nme had a dream that she was a super hero and could fly high above the tallest buildings.";
crazyDreams.pages.page6.text = "In her dream nme would help people, and once saved a kitten that was stuck up a tree.";
crazyDreams.pages.page7.text = "nme had a favourite dream where she was travelling into space in a rocket.";
crazyDreams.pages.page8.text = "nme dreamed that she landed on the moon, and could see the sun rise over the earth.";
crazyDreams.pages.page9.text = "Her most exciting dream was that it was her birthday";
crazyDreams.pages.page10.text = "One day, when nme woke up, it WAS her BIRTHDAY!";
crazyDreams.pages.page11.text = "THE END";
