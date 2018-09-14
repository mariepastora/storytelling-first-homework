/* global d3 */
import * as d3 from 'd3'

;(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic

  var margin = { top: 50, right: 50, bottom: 50, left: 80 }
  var width = 450 - margin.left - margin.right

  var height = 490 - margin.top - margin.bottom

  var svg = d3
    .select('#chart13')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var bandScale = d3.scaleBand().range([height, 0])

  var widthScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'cow', 'dog'])
    .range(['#8C221A', '#F4BFCA', '#CD5C5C'])

  d3.csv('eating-data.csv')
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
        widthScale(d.hamburgers)
      })
      .attr('y', function(d) {
        console.log(d.name)
        return bandScale(d.name)
      })
      .attr('height', bandScale.bandwidth())
      .attr('width', function(d) {
        return widthScale(d.hamburgers)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    var yAxis = d3.axisLeft(bandScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(widthScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
