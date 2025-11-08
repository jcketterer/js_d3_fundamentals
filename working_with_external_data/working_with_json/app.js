const h = 100
const w = 400

// let dataLoad;//global variable
// let salesTotal = 0.0
// let salesAvg = 0.0
// let metrics = []

function showHeader(dataLoad) {
    d3.select('body').append('h1')
        .text(`${dataLoad.category} Sales (2013) ${dataLoad.region} Region`)
}

function buildLine (dataLoad) {
        const lineFun  = d3.line()
        .x(function (d) { return ((d.month-20130001)/3.25)})
        .y(function (d) { return h-d.sales})
        .curve(d3.curveLinear)

    const svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    const viz = svg.append('path')
        .attr('d', lineFun(dataLoad.monthlySales))
        .attr('stroke','purple')
        .attr('stroke-width',2 )
        .attr('fill', 'none')
}

// function showTotals () {
//     const t = d3.select('body')
//         .append('table')

//     for (let i = 0; i < dataLoad.length; i++) {
//         salesTotal += parseFloat(dataLoad[i].sales)
//     }

//     salesAvg = salesTotal / dataLoad.length

//     metrics.push(`Sales Total: ${salesTotal}`)
//     metrics.push(`Sales Average: ${salesAvg.toFixed(2)}`)

//     const tr = t.selectAll('tr')
//         .data(metrics)
//         .enter()
//         .append('tr')
//         .append('td')
//         .text(function (d) { return d})
// }


d3.json('MonthlySalesbyCategoryMultiple.json').then(function (data) {

    // console.log(data)


    data.contents.forEach (function(dataLoad) {
            console.log(dataLoad)
            showHeader(dataLoad);
            buildLine(dataLoad);
            // showTotals();
    }) 




}).catch (function (error) {
    console.log(error)
})






