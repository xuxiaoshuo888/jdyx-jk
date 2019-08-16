<template>
    <div id="a3" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');

    var Chart_a3;

    export default {
        name: "a3",
        data() {
            return {
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '新生男女比例',
                        subtext: '数据来自**',
                        textStyle: '#fff'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        textStyle: {color: '#fff'}
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['男', '女']
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth:'10',
                            data: [55, 45]
                        }
                    ]
                }
            }
        },
        methods: {
            initA3() {
                Chart_a3 = echarts.init(document.getElementById('a3'));
                Chart_a3.setOption(this.option);
            },
        },
        computed: {
            isResize() {
                return this.$store.state.isResize
            }
        },
        watch: {
            isResize(newValue, oldValue) {
                this.Chart_a3.resize();
            }
        },
        mounted() {
            this.initA3()
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                setTimeout(() => {
                    Chart_a3.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped>

</style>