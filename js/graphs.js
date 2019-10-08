queue()
    .defer(d3.json, "data/annual.json")
    .await(makeGraphs);

function makeGraphs(error, annualData) {
    var ndx = crossfilter(annualData);
    // console.log(annualData);

    var date_dim = ndx.dimension(dc.pluck("Year"));
    var temperature_monthly = date_dim.group().reduceSum(dc.pluck("Mean"));


    dc.lineChart("#monthly_chart")
        .width(1200)
        .height(350)
        .margins({ top: 25, right: 50, bottom: 30, left: 50 })
        .dimension(date_dim)
        .group(temperature_monthly)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxis().ticks(4);
    dc.renderAll();
}