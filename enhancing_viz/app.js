const h = 200
const w = 400
const padding = 20

// let dataLoad;//global variable
// let salesTotal = 0.0
// let salesAvg = 0.0
// let metrics = []

function getDate (d) {
    const strDate = d.toString()

    const year = strDate.substring(0,4)
    const month = strDate.substring(4,6)-1
    const day = strDate.substring(6,8)

    return new Date(year, month, day)
}

function showHeader(dataLoad) {
    d3.select('body').append('h1')
        .text(`${dataLoad.category} Sales (2013) ${dataLoad.region} Region`)
}

function buildLine (dataLoad) {

    const minDate = getDate(dataLoad.monthlySales[0].month)
    const maxDate = getDate(dataLoad.monthlySales[dataLoad.monthlySales.length - 1].month)

    console.log(minDate)
    console.log(maxDate)

    const xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([padding + 5, w - padding])

    const yScale = d3.scaleLinear()
            .domain([
                0, d3.max(dataLoad.monthlySales, function (d) {return d.sales})
            ])
            .range([h - padding,10])

    const yAxisGen = d3.axisLeft(yScale)
    const xAxisGen = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b'))


    const lineFun  = d3.line()
        .x(function (d) { return xScale(getDate(d.month))})
        .y(function (d) { return yScale(d.sales)})
        .curve(d3.curveLinear)

    const svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    const yAxis = svg.append('g').call(yAxisGen)
            .attr('class','axis')
            .attr('transform', `translate(${padding},0)`)
    
    const xAxis = svg.append('g').call(xAxisGen)
        .attr('class','axis')
        .attr('transform', `translate(0,${h - padding})`)

    const viz = svg.append('path')
        .attr('d', lineFun(dataLoad.monthlySales))
        .attr('stroke','purple')
        .attr('stroke-width',2 )
        .attr('fill', 'none')
}

// function showTotals (dataLoad) {
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



d3.json('https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json').then(function (data) {

    const decodedData = JSON.parse(window.atob(data.content))

    console.log(decodedData.contents)

    decodedData.contents.forEach (function(dataLoad) {
            console.log(dataLoad)
            showHeader(dataLoad);
            buildLine(dataLoad);
            // showTotals(dataLoad);
    }) 




}).catch (function (error) {
    console.log(error)
})