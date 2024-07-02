// HighChartConfig.js
export default function getChartOptions(historical) {
    return {
        title: {
            text: ''
        },
        yAxis: {
            title: {
                text: 'Price'
            }
        },
        xAxis: {
            type: 'datetime'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
        series: historical.map(series => ({
            ...series,
            color: '#55BF3B' // Set the color to green
        })),
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    };
}
