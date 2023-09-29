import React from 'react';
import Chart from "chart.js/auto";
import axios from 'axios';
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
  
        </div>
    </div>
</main>
  );
}

export default HomePage;
