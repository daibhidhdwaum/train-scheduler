$(document).ready(function(){

    //connect to firebase
    var config = {
      apiKey: "AIzaSyC7OcgGdc3r0bQ_5VBZ_420zYBoO7y0dlc",
      authDomain: "the-last-stop.firebaseapp.com",
      databaseURL: "https://the-last-stop.firebaseio.com/",
      storageBucket: "the-last-stop.appspot.com"
    };

    firebase.initializeApp(config);

     // Get a reference to the database service
    var database = firebase.database();

    //set variables
    var trainName = " ";
    var destination = " ";
    var firstTrain = 0;
    var frequency = 0;

     //capture click event and log to database
    $("#add-train").on("click", function(event){

        event.preventDefault();

        trainName = $("#train-name").val();
        destination = $("#destination").val();
        firstTrain = $("#first-train-time").val();
        frequency = $("#frequency").val();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
    });

    

    database.ref().on("child_added", function(childSnapshot) {

        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(parseInt(childSnapshot.val().firstTrain));
        console.log(parseInt(childSnapshot.val().frequency));

        $(".name").text(trainName);
        $(".destination").text(destination);
        $(".first-train").text(firstTrain);
        $(".frequency").text(frequency);
    });

   

    
    

    //connect to moment.js
    //calculate when next train will arrive relative to current time
    //users using different machines can view the same time schedule
    //administrators can submit train name, destination, first train (in military time), frequency in minutes
});