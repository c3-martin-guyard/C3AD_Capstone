function lifeSpanInYears() {
    var bulb, startTime, defectFilter, defectDatum, defectTime, lifespan, conversionFactor, lifeSpanInYears;

    bulb = SmartBulb.get({ id: this.id });
    // The manufacture date of the bulb
    startTime = bulb.startDate;
    // Defines defective as "bulb is on but not emitting light"
    // Also need the SmartBulbMeasrurmentSeries id based on the SmartBulb id
    defectFilter = "status == 1 && lumens == 0 && parent.id == '" + 'SBMS_serialNo_' + bulb.id + "'";
    defectDatum = SmartBulbMeasurement.fetch({ filter: defectFilter });
    // Drill down into the return JSON and find the Timestamp for the failed record
    defectTime = defectDatum.objs[0].start;
    lifespan = defectTime - startTime;
    // converts microseconds to years
    conversionFactor = 1000 * 60 * 60 * 24 * 365;
    lifeSpanInYears = lifespan / conversionFactor;

    return lifeSpanInYears;
}

function getSmartBulbsLifesSpan() {
    var smartBulbs = SmartBulb.fetch({
        include: "id",
        limit: -1
    }).objs;
    var smartBulbsLifespan = smartBulbs.map((bulb) => {
        var lifeSpan = bulb.lifeSpanInYears()
        return {
            id: bulb.id,
            lifeSpan: lifeSpan,
        }
    });
    return smartBulbsLifespan;
}

function shortestLifeSpanBulb() {
    var smartBulbsLifespan = getSmartBulbsLifesSpan();
    var shortestLifespanSmartBulb = smartBulbsLifespan.reduce((prev, curr) => prev.lifeSpan < curr.lifeSpan ? prev : curr);
    return shortestLifespanSmartBulb.id;
}

function longestLifeSpanBulb() {
    var smartBulbsLifespan = getSmartBulbsLifesSpan();
    var longestLifespanSmartBulb = smartBulbsLifespan.reduce((prev, curr) => prev.lifeSpan > curr.lifeSpan ? prev : curr);
    return longestLifespanSmartBulb.id;
}

function averageLifeSpanBulb() {
    var smartBulbsLifespan = getSmartBulbsLifesSpan();
    var averageLifeSpan = smartBulbsLifespan.reduce((acc, curr) => acc + curr.lifeSpan, 0) / smartBulbsLifespan.length;
    return averageLifeSpan;
}