import * as d3 from 'd3'
;(function() {
  var width = 400
  var height = 200

  // Here is your data
  var countries = [
    {
      name: 'Blahstia',
      continent: 'North America',
      gdp: 40
    },
    {
      name: 'Bleers',
      continent: 'Europe',
      gdp: 12
    },
    {
      name: 'Blolo',
      continent: 'Antarctica',
      gdp: 35
    },
    {
      name: 'Blurben',
      continent: 'North America',
      gdp: 90
    }
  ]

  // Get the svg with the id of 'chart2'
  var svg = d3
    .select('#chart2')
    .attr('width', width)
    .attr('height', height)

  // Scales

  var widthScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, width])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['North America', 'Europe', 'Antarctica'])
    .range(['#F3B3AE', '#B3CDE3', '#CCEBC5'])

  // Get the rectangles inside of it
  svg
    .selectAll('rect')
    .data(countries)
    .attr('height', 50)
    .attr('width', function(d) {
      return widthScale(d.gdp)
    })
    .attr('fill', function(d) {
      return colorScale(d.continent)
    })
})()
