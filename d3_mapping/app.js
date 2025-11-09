const w = 500
const h = 300

const projection = d3.geoAlbersUsa()
    .translate([w/2, h/2])
    .scale(500)

const path = d3.geoPath()
    .projection(projection)

const svg = d3.select('body').append('svg')
    .attr('width',w)
    .attr('height', h)

const color = d3.scaleLinear()
    .range(['rgb(254,240,217)','rgb(253,204,138)','rgb(252,141,89)','rgb(227,74,51)','rgb(179,0,0)'])


d3.csv('state-sales.csv').then( function (data) {

    color.domain([
        0, d3.max(data, function (d) {return d.sales})
    ])

    d3.json('us.json').then( function (json) {



        for (let i = 0; i < data.length; i++) {

            const salesState = data[i].state
            const salesValue = parseFloat(data[i].sales)

            for (let j = 0; j < json.features.length; j++) {
                
                const usState = json.features[j].properties.NAME
                
                if (salesState === usState) {
                    json.features[j].properties.value = salesValue

                    break;
                }

            }

        }

        svg.selectAll('path')
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .style('fill', function (d) {
                const value  = d.properties.value

                if(value) {
                    return color(value)
                } else {
                    return '#555555'
                }
            })

        d3.csv('sales-by-city.csv').then (function (data) {

            const validData = data.filter(function (d) {return projection([d.lon, d.lat]) !== null})

            svg.selectAll('circle')
                .data(validData)
                .enter()
                .append('circle')
                .attr('cx', function(d) {return projection([d.lon, d.lat])[0]})
                .attr('cy', function(d) {return projection([d.lon, d.lat])[1]})
                .attr('r', function (d) {return Math.sqrt(parseInt(d.sales)* 0.00005)})
                .style('fill','black')
        })

    }).catch (function (error) {
        console.log(error)
    })


}).catch (function (error) {
    console.log(error)
})