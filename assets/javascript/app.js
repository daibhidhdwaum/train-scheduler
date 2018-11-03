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
    var clickCounter = 0;

    //capture click event
    $("#add-train").on("click", function(event){

        event.preventDefault();

        $("#train-name").val();
        $("destination").val();
        $("first-train-time").val();
        $("frequency").val();

        database.ref().set({
            TrainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        })
    })

    
    

    //connect to moment.js
    //calculate when next train will arrive relative to current time
    //users using different machines can view the same time schedule
    //administrators can submit train name, destination, first train (in military time), frequency in minutes
});