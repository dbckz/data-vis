d3.csv("data/world_bank_gdp_per_capita.csv").then(function(data) {
    console.log(data);
});

var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {"url": "data/world_bank_gdp_per_capita.csv"},
    mark: 'circle',
    title: "Wage Gap vs GDP per capita",
    width: 1000,
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
        }
    ],
    encoding: {
        x: {
            field: 'Country Name',
            type: 'nominal',
            axis: {title: 'Country'},
            sort: {
                field: '2018',
                order: 'ascending'
            }
        },
        y: {
            field: '2018',
            type: 'quantitative',
            axis: {title: '2018 GDP per capita'}
        },
        // color: {
        //     field: 'Classification_of_First_Degree',
        //     type: 'nominal',
        //     scale: {
        //         "domain": ["First", "Upper second", "Lower second", "Third/Pass"],
        //         "range": ["#c7c7c7", "#e7ba52", "#aec7e8", "#1f77b4"]
        //     },
        //     legend: {title: 'Degree Classification'}
        // },
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
            }

        ]
        // order: {
            // field: 'degree_type_ordering',
            // type: 'quantitative',
            // sort: 'ascending'
        // }
    }
    };

// Embed the visualization in the container with id `vis`
vegaEmbed('#vis3', vlSpec);