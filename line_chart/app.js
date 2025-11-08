const h = 350
const w = 400

const monthlySale = [
    {'month':10, 'sales': 100},
    {'month':20, 'sales': 130},
    {'month':30, 'sales': 250},
    {'month':40, 'sales': 300},
    {'month':50, 'sales': 265},
    {'month':60, 'sales': 225},
    {'month':70, 'sales': 180},
    {'month':80, 'sales': 120},
    {'month':90, 'sales': 145},
    {'month':100, 'sales': 130}
]

const lineFun = d3.line()
    .x(function(d) {return d.month*3})
    .y(function(d) {return h-d.sales})
    .curve(d3.curveBasis);

const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height',h)


const viz = svg.append('path')
    .attr('d',lineFun(monthlySale))
    .attr('stroke', 'purple',)
    .attr('stroke-width', 2)
    .attr('fill', 'none')


    //add labes 

const labels = svg.selectAll('text')
    .data(monthlySale)
    .enter()
    .append('text')
    .text(function(d) {return d.sales})
    .attr('x', function (d) {return d.month*3 - 28})
    .attr('y', function (d,i) {return h - d.sales})
    .attr('font-size', '12px')
    .attr('font-family', 'sans-serif')
    .attr('text-anchor','start')
    .attr('dy','.35em')
    .attr('font-weight', function(d,i) {
        if (i === 0 || i === (monthlySale.length-1)) {
            return 'bold'
        }
        return 'normal'
    })
