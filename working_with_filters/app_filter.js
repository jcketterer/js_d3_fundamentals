

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

//KPI

function salesKpi (d) {
    if (d >= 250) {
        return '#33CC66'
    } else if (d < 250) {
        return '#666666'
    }
}


function showMinMax (ds, col, val, type) {
    const max = d3.max(ds, function(d) {return d[col]})
    const min = d3.min(ds, function(d) {return d[col]})

    if (type === 'minmax' && (val === max || val == min)) {
        return val
    } else {
        if (type === 'all') {
            return val;
        }
    }
}

//create svg
const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height',h)

//adding dots

const dots = svg.selectAll('circle')
    .data(monthlySale)
    .enter()
    .append('circle')
    .attr('cx', function (d) {return d.month*3})
    .attr('cy', function (d,i) {return h - d.sales})
    .attr('r', 5)
    .attr('fill', function(d) {return salesKpi(d.sales)})

//labels

const lables = svg.selectAll('text')
    .data(monthlySale)
    .enter()
    .append('text')
    .text(function (d) {return showMinMax(monthlySale, 'sales', d.sales, 'all')})
    .attr('x', function (d) {return (d.month*3)-28})
    .attr('y', function (d) {return h - d.sales})
    .attr('font-size','12px')
    .attr('font-family','sans-serif')
    .attr('fill','#666666')
    .attr('text-anchor','start')


d3.select('select')
    .on('change', function (e) {
        const sel = e.target.value

        svg.selectAll('text')
            .data(monthlySale)
            .text(function (d) {
                return showMinMax(monthlySale, 'sales', d.sales, sel)
            })
    })