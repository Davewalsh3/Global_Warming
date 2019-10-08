queue()
    .defer(d3.json, "data/annual.json")
    .await(makeGraphs);

function makeGraphs(error, annualData) {
    var ndx = crossfilter(annualData);
    var date_dim = ndx.dimension(dc.pluck("Year"));
    var temperature_yearly = date_dim.group().dc.pluck("Mean");


    dc.lineChart("#monthly_chart")
        .width(1000)
        .height(350)
        .margins({ top: 25, right: 50, bottom: 30, left: 50 })
        .dimension(date_dim)
        .group(temperature_yearly)
        .transitionDuration(500)
        .x(d3.time.scale().ordinal)
        .xAxisLabel("Year")
        .yAxis().ticks(4);

    dc.renderAll();

};