import * as d3 from 'd3'
;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var margin = { top: 50, right: 50, bottom: 50, left: 80 }
  var width = 700 - margin.left - margin.right

  var height = 400 - margin.top - margin.bottom

  var svg = d3
    .select('#chart14')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var bandScale = d3
    .scaleBand()
    .range([0, width])
    .padding(0)

  var heightScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, height])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'cow', 'dog'])
    .range(['#8C221A', '#F4BFCA', '#CD5C5C'])

  d3.csv(require('./eating-data.csv'))
    .then(ready)
    .catch(function(err) {
      console.log('Failed with', err)
    })

  function ready(datapoints) {
    // Add and style your marks here

    var names = datapoints.map(function(d) {
      console.log(d.name)
      return d.name
    })

    bandScale.domain(names)

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('x', function(d) {
        console.log(d.name)
        return bandScale(d.name)
      })
      .attr('y', function(d) {
        return height - heightScale(d.hamburgers)
      })
      .attr('width', bandScale.bandwidth())
      .attr('height', function(d) {
        return heightScale(d.hamburgers)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    var yAxis = d3.axisLeft(heightScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(bandScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
