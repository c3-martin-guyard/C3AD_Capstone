
var log = C3.logger("SmartBulbDefectiveAlert");

var FAILED = 1;
var DURATION_THRESHOLD = 10500;
var TEMP_THRESHOLD = 70;
var failCode = "";
var flagEOL = 0;
var flagOverheat = 0;

function process(input) {
  // input comes from the SmartBulbDefectiveInput, passed in the first Analytic parameter in SmartBulbDefectiveAlert.c3typ.
  // The defective field was declared in SmartBulbDefectiveInput.c3typ and is used here.
  // The .data() and .dates() methods are available on SmartBulbDefective and called here to instantiate our variables.
  var dataDefective  = input.bulbDefective.data(),
      datesDefective = input.bulbDefective.dates(),
      dataEndOfLife  = input.bulbLife.data(),
      dataTemp  = input.bulbTemperature.data();

  for (var i = 0; i < dataDefective.length; i++) {
    // If the timeseries at a given point is 1, which means that the SmartBulb has failed, then we need to create a new SmartBulbEvent instance to log the event.
    // By using input.source, we are using the source SmartBulb referenced by our input object, SmartBulbDefectiveInput.
    // Additionally, we are filling in the values for the other SmartBulbEvent fields.
    // Lastly, we use the .make() method and let the Analytic handle creating & persisting/updating the  object
    if (dataDefective.at(i) == FAILED) {
      failCode = "DEFECTIVE";

      // Check why bulb failed - if it failed because it reached end of life or because it overheated
      for (var j=0; j < i; j++ ){
        if (dataEndOfLife.at(j) > DURATION_THRESHOLD){
          flagEOL = 1;
        }
        if (dataTemp.at(j) > TEMP_THRESHOLD){
          flagOverheat = 1;
        } 
      }// end of j for loop
     // Write reasons for event
      if (flagEOL == 1){
        failCode += " - END OF LIFE"};
      if (flagOverheat == 1){   
        failCode += " - OVERHEATED"}; 
     
        return SmartBulbEvent.make({
        smartBulb: input.source,
        eventCode: failCode,
        eventType: "FAILURE",
        start: datesDefective.at(i),
        end: datesDefective.at(i+1)
      });
    }
  } // end of i for loop
}
