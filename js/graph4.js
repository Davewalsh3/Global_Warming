queue()
    .defer(d3.csv, "data/cumulative_co_emissions.csv")
    .await(doGraphs);

function doGraphs(error, cumulative_co_emissionsData) {
    var ndx = crossfilter(cumulative_co_emissionsData);

    //console.log(cumulative_co_emissionsData)

    var date_dim = ndx.dimension(dc.pluck("Entity"));
    var cumulative_emissions = date_dim.group().reduceSum(dc.pluck("cumulative"));

    dc.pieChart("#cumulative_carbon_emissions")
        .height(500)
        .innerRadius(100)
        .dimension(date_dim)
        .group(cumulative_emissions)
        .transitionDuration(500)
        .legend(dc.legend());
    dc.renderAll();
}