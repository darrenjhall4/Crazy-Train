var firebaseConfig = {
  apiKey: "AIzaSyBmt_au3LwRgGqLb-q2nENDBv4QEyw-kbE",
  authDomain: "train-hw-23cb8.firebaseapp.com",
  databaseURL: "https://train-hw-23cb8.firebaseio.com",
  projectId: "train-hw-23cb8",
  storageBucket: "train-hw-23cb8.appspot.com",
  messagingSenderId: "50923568217",
  appId: "1:50923568217:web:b03b300e08bf49ec"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  var newTrain = childSnapshot.val().newTrain;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstArrival = childSnapshot.val().firstArrival;
  console.log(newTrain + "?????");
  var tFrequency = frequency;
  var firstTime = firstArrival;
  var firstTimeConverted = moment(firstTime, "HH:mm");

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Time difference is: " + diffTime);

  var timeRemainder = diffTime % tFrequency;
  var minutesTilTrain = tFrequency - timeRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesTilTrain);
  var nextTrain = moment().add(minutesTilTrain, "minutes");
  var nextTrain = moment(nextTrain).format("hh:mm");
  $("#appended-content").append(
    `<tr><td>${newTrain}</td><td>${destination}</td><td>${firstArrival}</td><td>${frequency}</td><td>${nextTrain}</td><td>${minutesTilTrain}</td></tr>`
  );
});

$("#submit-button").on("click", function(event) {
  event.preventDefault();
  console.log("submit-button" + "!!!!!");
  newTrain = $("#new-train-name")
    .val()
    .trim();
  destination = $("#new-destination-name")
    .val()
    .trim();
  firstArrival = $("#added-train-arrival")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  database.ref().push({
    newTrain: newTrain,
    destination: destination,
    firstArrival: firstArrival,
    frequency: frequency
  });
});

/*INSTRUCTIONS:* When adding trains, administrators should be able to submit the following:
 * Train Name
 * Destination
 * First Train Time -- in military time
 * Frequency -- in minutes
 * Code this app to calculate when the next train will arrive; this should be relative to the current time.
 * Users from many different machines must be able to view same train times.
 */

/*
 // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18
_________________________________________________________________________
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  */
