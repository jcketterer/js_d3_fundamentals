const w = 300
const h = 120

const padding = 2

const dataSet = [5, 10, 15, 21, 25, 11, 25, 22, 18, 8]

const svg = d3.select('body').append('svg')
            .attr('width',w).attr('height',h)

function colorPicker (v) {
    if (v <= 20) {
        return "#666666"
    } else if (v > 20) {
            return "#FF0033"
        }
    
}

svg.selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
        .attr('x', function (d,i) {
            return i * (w/dataSet.length)
        })
        .attr('y', function (d,i) {
            return h - (d*4)
        })
        .attr('width', w / dataSet.length - padding)
        .attr('height', function (d,i) {
            return d*4
        })
        .attr('fill', function (d) {
            return colorPicker(d)
        })

svg.selectAll('text')
        .data(dataSet)
        .enter()
        .append('text')
        .text(function(d){return d})
        .attr('text-anchor', 'middle')
        .attr('x', function (d,i) {return i * (w/dataSet.length) + (w/dataSet.length - padding)/2})
        .attr('y', function (d,i) {return h - (d*4) + 14})
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('fill','white')
