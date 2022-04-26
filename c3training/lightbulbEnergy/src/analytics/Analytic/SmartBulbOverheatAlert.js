var log = C3.logger("SmartBulbOverheatAlert");

var TEMP_THRESHOLD = 80;

function process(input) {
    // input comes from a DFE  
    // The .data() and .dates() methods are available on any metric output
    var data = input.data(),
        dates = input.dates();
    for (var i = 0; i < data.length; i++) {
        // By using input.source, we are using the source source type referenced by the DFE.
        // Use the .make() method and let the Analytic handle creating & persisting/updating the object

        if (data.at(i) > TEMP_THRESHOLD) {
            return SmartBulbEvent.make({
                smartBulb: input.source,
                eventCode: "OVERHEAT",
                eventType: "HEALTH",
                start: dates.at(i),
                end: dates.at(i + 1)
            });
        }
    }
}