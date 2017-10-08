// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAz9fgiSeKS_5wVHlMDqm-yx0r58ZPiIE",
    authDomain: "train-scheduler-a67d3.firebaseapp.com",
    databaseURL: "https://train-scheduler-a67d3.firebaseio.com",
    projectId: "train-scheduler-a67d3",
    storageBucket: "train-scheduler-a67d3.appspot.com",
    messagingSenderId: "486421732726"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event) {

    event.preventDefault();

    // Grabs user input
    var trainName = $("#name").val().trim();
    var trainDest = $("#dest").val().trim();
    var firstTrain = $("#first").val().trim();
    var trainFreq = $("#freq").val().trim() ;

    // Creates local temporary object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        firstTrainTime: firstTrain,
        frequency: trainFreq
      };

    // Uploads train data to the database
    database.ref().push(newTrain);
    
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#name").val("");
    $("#dest").val("");
    $("#first").val("");
    $("#freq").val("");

  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrainTime;
    var trainFreq = childSnapshot.val().frequency;

    // Train Info
    console.log("Name: " + trainName);
    console.log("Destination: " + trainDest);
    console.log(firstTrain);
    console.log(trainFreq);

    var frequency = trainFreq;    

    // Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    
    var firstTime = currentTime;

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference: " + diffTime);

    var timeRemainer = diffTime % frequency;
    console.log(timeRemainer);

    var minTillTrain = frequency - timeRemainer;
    console.log("Minutes till train: " + minTillTrain);

    var nextArrival = moment().add(minTillTrain, "minutes");
    console.log("Arrival Time: " + moment(nextArrival).format("hh:mm"));

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + nextArrival.format("hh:mm") + "PM" + "</td><td>" + minTillTrain + "</td></tr>");
    

  });
    