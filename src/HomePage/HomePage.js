import React from 'react';
import Chart from "chart.js/auto";
import axios from 'axios';
import * as d3 from 'd3';


const baseURL = "http://localhost:3001";
function HomePage() {
    var dataSource = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#cc65fe',
                    '#ff9442',
                    '#4bc0c0',
                    '#ff66c3'
                ],
            }
        ],
        labels: []
    };

    React.useEffect(() => {
        axios.get(baseURL+'/budget').then((response) => {
            for (var i = 0; i < response.data.myBudget.length; i++) {
                dataSource.datasets[0].data[i] = response.data.myBudget[i].budget;
                dataSource.labels[i] = response.data.myBudget[i].title;
            }
            createChart();
            createDonutChart(response.data.myBudget);
        });
      }, []);

    function createChart() {
        var ctx = document.getElementById('myChart').getContext('2d');
        let chartStatus = Chart.getChart("myChart");

        if (chartStatus !== undefined) {
            chartStatus.destroy();
        }
    
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: dataSource
        });
    }

    

    function createDonutChart(data) {
        // Clear any existing chart elements
        d3.select('#d3Chart').selectAll('*').remove();
    
        // Set up D3 chart dimensions
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
    
        // Create an SVG element
        const svg = d3.select('#d3Chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);
    
        // Define color scale
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.title))
            .range(dataSource.datasets[0].backgroundColor);
    
        // Create a pie chart
        const pie = d3.pie()
            .value(d => d.budget);
    
        // Create an arc generator for the outer radius
        const arc = d3.arc()
            .innerRadius(radius * 0.6) // Set inner radius for donut effect
            .outerRadius(radius);
    
        // Create and append chart elements
        const path = svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc) // Use the arc generator for path
            .attr('fill', d => color(d.data.title));
    
        // Add labels
        path.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .text(d => `${d.data.title}: $${d.data.budget}`); // Display data
    
        // Create a legend
        const legend = svg.selectAll('.legend')
            .data(data.map(d => d.title))
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(-100, ${i * 20})`);
    
        legend.append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', d => color(d));
    
        legend.append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .text(d => d);
    }
    
  return (
    <main id="main">

    <div class="container center">
        <div class="page-area">
            <pb-article>
                <h1>Stay on track</h1>
                <div>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </div>      
            </pb-article>

        
                <pb-article>
                    <h1>Alerts</h1>
                    <div>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </div>      
                </pb-article>


                <pb-article>
                    <h1>Results</h1>
                    <div>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear...
                    because they know it is all good and accounted for.
                    </div>      
                </pb-article>
                
                <pb-article>
                    <h1>Stay on track</h1>
                    <div>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </div>      
                </pb-article>
    
            
                    <pb-article>
                        <h1>Alerts</h1>
                        <div>
                            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                        </div>      
                    </pb-article>
    
    
                    <pb-article>
                        <h1>Results</h1>
                        <div>
                            People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                        </div>      
                    </pb-article>
            
                    <div class="text-box">
                <h1>Charts</h1>
                <p>
                    <canvas id="myChart" width="200" height="200"></canvas>
                </p>
              
            </div>

            <div class="text-box">
                <h1>Charts</h1>
                <p>
                <div id="d3Chart"></div>
                </p>
            </div>
  
        </div>
    </div>
</main>
  );
}

export default HomePage;
