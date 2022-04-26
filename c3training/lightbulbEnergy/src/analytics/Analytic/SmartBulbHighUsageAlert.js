var log = C3.logger("SmartBulbHighUsageAlert");

var USAGE_THRESHOLD = 1.1;

function process(input) {
    // input comes from a DFE  
    // The .data() and .dates() methods are available on any metric output
    var data = input.data(),
        dates = input.dates();
    for (var i = 0; i < data.length; i++) {
        // By using input.source, we are using the source source type referenced by the DFE.
        // Use the .make() method and let the Analytic handle creating & persisting/updating the object

        if (data.at(i) > USAGE_THRESHOLD && data.at(i) < 100) {
            return BuildingEvent.make({
                building: input.source,
                eventCode: "HIGH_SMARTBULB",
                eventType: "USAGE",
                eventDate: dates.at(i),
            });
        }
    }
}