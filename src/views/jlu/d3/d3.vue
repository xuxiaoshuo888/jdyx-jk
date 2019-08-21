<template>
    <div id="d3" class="fullSize" style="width:44rem !important;height:102rem !important;"></div>
</template>

<script>
    var echarts = require('echarts');

    var Chart_d3;
    // color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
    export default {
        name: "d3",
        data() {
            return {
                list: [],
                list_name: [],//学院名集合
                list_value: [],//对应值集合
                option: {
                    color: ['#2AC5A9', '#6283C0'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '各省份学生人数统计',
                        subtext: '',
                        left: 10,
                        top: 10,
                        textStyle: {color: '#fff', fontSize: 18}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: '{b}：{c}人',
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
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.2)'
                            }
                        },
                        boundaryGap: [0, 0.1]
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                            }
                        },
                        data: []
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth: '80%',
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            initD3() {
                Chart_d3 = echarts.init(document.getElementById('d3'));
                Chart_d3.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/syd').then(res => {
                    this.list = res.data.data
                    let list_name = []
                    let list_value = []
                    for (let x = 0; x < this.list.length; x++) {
                        list_name.unshift(this.list[x].syd)
                        list_value.unshift(this.list[x].rs)
                    }
                    Chart_d3.setOption({
                        yAxis: {
                            data: list_name
                        },
                        series: [
                            {
                                data: list_value
                            }
                        ]
                    })
                })
            }
        },
        mounted() {
            this.getData()
            this.initD3()
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                setTimeout(() => {
                    Chart_d3.resize();
                }, 300)
            }

        }
    }
</script>

<style scoped>

</style>