d3.csv("data/world_bank_gdp_per_capita.csv").then(function(data) {
    console.log(data);
});

var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {"url": "data/world_bank_gdp_per_capita.csv"},
    mark: 'circle',
    title: "Wage Gap vs GDP per capita",
    width: 900,
    height: 500,
    transform: [
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/oecd_gender_pay_gap.csv",
                },
                key: "LOCATION",
                fields: ["Value"]
            }
        },
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/population_by_country.csv",
                },
                key: "Country Code",
                fields: ["2018_pop"]
            }
        },
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/world_bank_income_groups.csv",
                },
                key: "Code",
                fields: ["Income classifications (World Bank (2017))"]
            }
        }
    ],
    encoding: {
        x: {
            field: '2018',
            type: 'quantitative',
            axis: {title: '2018 GDP per capita'},
            scale: {
                type: 'log',
                domain: [5000,200000]
            }
        },
        y: {
            field: 'Value',
            type: 'quantitative',
            axis: {title: 'Latest gender pay gap'}
        },
        size: {
            field: '2018_pop',
            type: 'quantitative',
            scale: {range: [0, 5000]}
        },
        color: {
            field: "Income classifications (World Bank (2017))",
            type: 'nominal',
            scale: {
                "domain": ["Low income", "Lower-middle income", "Upper-middle income", "High income", "Not categorized"],
                "range": ["#f60606", "#f7a3a3", "#81d9de", "#0678ad", "#a2a2a2"]
            },
            legend: {title: 'Income level'}
        },
        tooltip: [
            {
                field: 'Country Name',
                type: 'nominal',
            },
            {
                field: '2018',
                type: 'quantitative'
            },
            {
                field: 'Value',
                type: 'quantitative'
            },
            {
                field: '2018_pop',
                type: 'quantitative'
            }

        ],
        opacity: {value: 0.4}
        // order: {
            // field: 'degree_type_ordering',
            // type: 'quantitative',
            // sort: 'ascending'
        // }
    }
    };

// Embed the visualization in the container with id `vis`
vegaEmbed('#vis3', vlSpec);