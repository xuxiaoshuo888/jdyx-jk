<template>
    <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
</template>

<script>
    import echarts from "echarts";

    var option3 = {
        color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
        textStyle: {color: '#fff'},
        tooltip: {
            textStyle: {color: '#fff'},
            trigger: 'axis'
        },
        title: {
            textStyle: '#fff'
        },
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [89.3, 58212, 'Matcha Latte'],
                [57.1, 78254, 'Milk Tea'],
                [74.4, 41032, 'Cheese Cocoa'],
                [50.1, 12755, 'Cheese Brownie'],
                [89.7, 20145, 'Matcha Cocoa'],
                [68.1, 79146, 'Tea'],
                [19.6, 91852, 'Orange Juice'],
                [10.6, 101852, 'Lemon Juice'],
                [32.7, 20112, 'Walnut Brownie']
            ]
        },
        grid: {containLabel: true},
        xAxis: {name: 'x轴'},
        yAxis: {type: 'category'},
        // visualMap: {
        //     orient: 'horizontal',
        //     left: 'center',
        //     min: 10,
        //     max: 100,
        //     text: ['High Score', 'Low Score'],
        // },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
    }
    export default {
        name: "histogram",
        props: {
            className: {
                type: String,
                default: "yourClassName"
            },
            id: {
                type: String,
                default: "yourID"
            },
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "100%"
            },
            option: {
                type: Object,
                default(){
                    return{
                        option3
                    }
                }
            }
        },
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$refs.myEchart);
                // 把配置和数据放这里
                this.chart.setOption(this.option);
            }
        }
    };
</script>

<style scoped>

</style>