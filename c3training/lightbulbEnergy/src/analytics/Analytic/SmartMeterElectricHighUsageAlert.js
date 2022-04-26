var log = C3.logger("SmartMeterElectricHighUsageAlert");

var ENERGY_THRESHOLD = 80;

function process(input) {
    // input comes from a DFE  
    // The .data() and .dates() methods are available on any metric output
    var data = input.data(),
        dates = input.dates();
    for (var i = 0; i < data.length; i++) {
        // By using input.source, we are using the source source type referenced by the DFE.
        // Use the .make() method and let the Analytic handle creating & persisting/updating the object

        if (data.at(i) > ENERGY_THRESHOLD) {
            return SmartMeterEvent.make({
                smartMeter: input.source,
                eventCode: "HIGH_USAGE",
                meterType: "ELECTRIC",
                eventDate: dates.at(i)
            });
        }
    }
}