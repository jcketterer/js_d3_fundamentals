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

    const toolTip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

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
        .attr('id',`svg-${dataLoad.category }`)

    const yAxis = svg.append('g').call(yAxisGen)
            .attr('class','y-axis')
            .attr('transform', `translate(${padding},0)`)
    
    const xAxis = svg.append('g').call(xAxisGen)
        .attr('class','x-axis')
        .attr('transform', `translate(0,${h - padding})`)

    const viz = svg.append('path')
        .attr('d', lineFun(dataLoad.monthlySales))
        .attr('stroke','purple')
        .attr('stroke-width',2 )
        .attr('fill', 'none')
        .attr('class',`path-${dataLoad.category }`)
    
    const dots = svg.selectAll('circle')
            .data(dataLoad.monthlySales)
            .enter()
            .append('circle')
            .attr('cx',function (d) { return xScale(getDate(d.month))})
            .attr('cy',function (d) { return yScale(d.sales)})
            .attr('r', 4)
            .attr('fill', '#666666')
            .attr('class',`circle-${dataLoad.category}` )
            .on('mouseover', function(e, d) {
                toolTip.transition()
                    .duration(500)
                    .style('opacity', .85)
                toolTip.html(`<strong>Sales $${d.sales} K  </strong>`)
                    .style('left', (e.pageX) + 'px')
                    .style('top', (e.pageY - 28) + 'px')
            })
            .on('mouseout', function (e,d) {
                toolTip.transition()
                    .duration(300)
                    .style('opacity',0)
            })
}

function updateLine (dataLoad) {

    const minDate = getDate(dataLoad.monthlySales[0].month)
    const maxDate = getDate(dataLoad.monthlySales[dataLoad.monthlySales.length - 1].month)

    const xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([padding + 5, w - padding])

    const yScale = d3.scaleLinear()
            .domain([
                0, d3.max(dataLoad.monthlySales, function (d) {return d.sales})
            ])
            .range([h - padding,10])

    const yAxisGen = d3.axisLeft(yScale)

    const xAxisGen = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat('%b'))
        .ticks(dataLoad.monthlySales.length -1)


    const lineFun  = d3.line()
        .x(function (d) { return xScale(getDate(d.month))})
        .y(function (d) { return yScale(d.sales)})
        .curve(d3.curveLinear)

    const svg = d3.select('body')
        .select(`#svg-${dataLoad.category}`)

    const yAxis = svg.selectAll('g.y-axis').call(yAxisGen)
    
    const xAxis = svg.selectAll('g.x-axis').call(xAxisGen)

    const viz = svg.selectAll(`.path-${dataLoad.category}`)
        .transition()
        .duration(3000)
        .ease(d3.easeCircle)
        .attr('d', lineFun(dataLoad.monthlySales))
    
    const dots = svg.selectAll(`.circle-${dataLoad.category}`)
            .transition()
            .duration(3000)
            .ease(d3.easeCircle)
            .attr('cx',function (d) { return xScale(getDate(d.month))})
            .attr('cy',function (d) { return yScale(d.sales)})

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


    decodedData.contents.forEach (function(dataLoad) {

            showHeader(dataLoad);
            buildLine(dataLoad);
            // showTotals(dataLoad);
    }) 

    d3.select('select')
        .on('change', function (e, d, i) {
            const sel = e.target.value

            const decodedData = JSON.parse(window.atob(data.content))

            decodedData.contents.forEach (function(dataLoad) {

                    dataLoad.monthlySales = dataLoad.monthlySales.slice(- sel)

                    updateLine(dataLoad);
        })

    }) 


}).catch (function (error) {
    console.log(error)
})