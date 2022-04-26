
var log = C3.logger("SmartBulbEndOfLifeAlert");

var DURATION_THRESHOLD = 10500;

function process(input) {
  // input comes from the SmartBulbLongLifeInput, passed in the first Analytic parameter in SmartBulbLongLifeAlert.c3typ.
  // The defective field was declared in SmartBulbLongLifeInput.c3typ and is used here.
  // The .data() and .dates() methods are available on SmartBulbLongLife and called here to instantiate our variables.
  var data = input.data(),
      dates = input.dates();
  for (var i = 0; i < data.length; i++) {
    // If the duration is greater than the threshold then we need to update the source object
    // By using input.source, we are using the source SmartBulb referenced by our input object, SmartBulbLongLifeInput.
    // Additionally, we are filling in the values for the other SmartBulbEvent fields.
    // Lastly, we use the .make() method and let the Analytic handle creating & persisting/updating the  object
    if (data.at(i) > DURATION_THRESHOLD) {
      return SmartBulbEvent.make({
        smartBulb: input.source,
        eventCode: "END_OF_LIFE",
        eventType: "HEALTH",
        start: dates.at(i),
        end: dates.at(i+1)
      });
    }
  }
}
