<template>
    <div id="d3" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');

    var Chart_d3;

    export default {
        name: "d3",
        data() {
            return {
                option1: {
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
                }
            }
        },
        methods: {
            initD3() {
                Chart_d3 = echarts.init(document.getElementById('d3'));
                Chart_d3.setOption(this.option1);
            },
        },
        computed: {
            isResize() {
                return this.$store.state.isResize
            }
        },
        watch: {
            isResize(newValue, oldValue) {
                this.Chart_d3.resize();
            }
        },
        mounted() {
            this.initD3()
//窗口大小改变时，图标自动适应宽高
//             window.onresize = function () {
//                 setTimeout(() => {
//                     Chart_d3.resize();
//                 }, 300)
//             }

        }
    }
</script>

<style scoped>

</style>