queue().defer(d3.csv, "data/global_1990_2014.csv").await(moreGraphs);

function moreGraphs(error, global_1990_2014Data) {
    var ndx = crossfilter(global_1990_2014Data);

    //console.log(global_1751_2014Data) 
    var time_dim = ndx.dimension(dc.pluck("year"));
    var total_carbon_fossilfuel = time_dim.group().reduceSum(dc.pluck("total_carbon_emissions_fossilfuel"));

    dc.rowChart("#total_emission_per_fossilfuel")
        .height(500)
        .ordinalColors(["darkblue", "red"])
        .dimension(time_dim)
        .group(total_carbon_fossilfuel);
    dc.renderAll();
};