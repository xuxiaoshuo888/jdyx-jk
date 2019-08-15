<template>
    <!--折线图-->
    <div id="main"></div>
</template>

<script>
    var echarts = require('echarts');
    export default {
        name: "polygonal",
        methods: {
            init() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                myChart.setOption({
                    color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
                    title: {textStyle: '#fff'},
                    textStyle: {color: '#fff'},
                    legend: {
                        textStyle: {color: '#fff'}
                    },
                    tooltip: {
                        textStyle: {color: '#fff'}
                    },
                    dataset: {
                        source: [
                            ['product', '2015', '2016', '2017'],
                            ['Matcha Latte', 43.3, 85.8, 93.7],
                            ['Milk Tea', 83.1, 73.4, 55.1],
                            ['Cheese Cocoa', 86.4, 65.2, 82.5],
                            ['Walnut Brownie', 72.4, 53.9, 39.1]
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {},
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                });
            }
        },
        mounted() {
            this.init()
        },
    }
</script>

<style scoped>

</style>