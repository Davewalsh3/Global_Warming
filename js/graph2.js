queue().defer(d3.csv, "data/global_1751_2014.csv").await(moreGraphs);

function moreGraphs(error, global_1751_2014Data) {
    var ndx = crossfilter(global_1751_2014Data);

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
        .xAxis().tickValues(global_1751_2014Data.map(set => set.year - (set.year % 5)));

    var time_dim = ndx.dimension(dc.pluck("year"));
    var total_carbon_fossilfuel = date_dim.group().reduceSum(dc.pluck("total_carbon_emissions_fossilfuel"));

    dc.rowChart("#total_emission_per_fossilfuel")
        .height(850)
        .ordinalColors(["darkblue"])
        .dimension(time_dim)
        .group(total_carbon_fossilfuel)
    dc.renderAll();
};