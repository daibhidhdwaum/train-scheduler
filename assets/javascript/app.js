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
    var firstTrain = "HH:mm";
    var frequency = 0;
    var nextArrival = 0;
    var minutesAway = 0;
    var currentTime = moment();

    //administrators can submit train name, destination, first train (in military time), frequency in minutes
     //capture click event and log to database
    $("#add-train").on("click", function(event){

        event.preventDefault();

        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train-time").val().trim();
        frequency = $("#frequency").val().trim();

        

             //connect to moment.js
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        
        console.log("this is the first train " + firstTrain);
        console.log("this is the first train converted " + firstTrainConverted);

        currentTime
        console.log("current time: " + moment(currentTime).format("hh:mm"));

        var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
        timeDiff.toString();
        console.log("difference in time " + timeDiff);

        var remainder = timeDiff % frequency;
        console.log("remainder: " + remainder);

        minutesAway = frequency - remainder;
        console.log("minutes away: " + minutesAway);

        nextArrival = moment().add(minutesAway, "minutes");
        console.log("next arrival " + moment(nextArrival).format("hh:mm"));

        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        };

        database.ref().push(newTrain);

 

        //clears form inputs
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
    });
      

   

    

    database.ref().on("child_added", function(childSnapshot) {

        childTrainName = childSnapshot.val().trainName;
        childDestination = childSnapshot.val().destination;
        childFirstTrain = childSnapshot.val().firstTrain;
        childFrequency = childSnapshot.val().frequency;
        NextArrival = childSnapshot.val().nextArrival;
        MinutesAway = childSnapshot.val().minutesAway;

        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(parseInt(childSnapshot.val().firstTrain));
        console.log(parseInt(childSnapshot.val().frequency));
        console.log(parseInt(childSnapshot.val().nextArrival));
        console.log(parseInt(childSnapshot.val().minutesAway));

        var newRow = $("<tr>").append(
            $("<td>").text(childTrainName),
            $("<td>").text(childDestination),
            $("<td>").text(childFrequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway)
        );

        $("#train-table > tbody").append(newRow);
    });

   

    
    

    
    //calculate when next train will arrive relative to current time
    //users using different machines can view the same time schedule
    
});