queue().defer(d3.csv, "data/global_1950_2014.csv").await(moreGraphs);

function moreGraphs(error, global_1950_2014Data) {
    var ndx = crossfilter(global_1950_2014Data);

    //console.log(global_1751_2014Data) 



    var date_dim = ndx.dimension(dc.pluck("year"));
    var emissions_per_capita = date_dim.group().reduceSum(dc.pluck("capita"));

    dc.barChart("#emissions_chart")
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .ordinalColors(["black"])
        .dimension(date_dim)
        .group(emissions_per_capita)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel("Co2 emissions per capita")
        .xAxisLabel("Time")
        .xAxis().tickValues(global_1950_2014Data.map(set => set.year - (set.year % 5)));
    dc.renderAll();
};