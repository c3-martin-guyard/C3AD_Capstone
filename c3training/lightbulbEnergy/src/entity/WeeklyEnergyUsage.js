function energyUsageMeter(endDate) {
    var metricSpec, weeklyUsageSum, metricOutput;
    metricSpec = EvalMetricsSpec.make({
        ids: [this.id],
        expressions: ["EnergyUsageMeterWindow"],
        start: endDate,
        end: endDate,
        interval: "DAY"
    });
    metricOutput = this.type().evalMetrics(metricSpec);
    weeklyUsageSum = metricOutput.result[this.id].EnergyUsageMeterWindow.data()[0];
    return weeklyUsageSum;
}