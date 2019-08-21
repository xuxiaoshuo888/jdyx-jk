<template>
    <!--少数名族占比前十学院-->
    <div id="c3" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');
    var Chart_c3;

    export default {
        name: "c3",
        data() {
            return {
                list: [],
                list_name: [],//学院名集合
                list_value: [],//对应值集合
                update: "",
                option: {
                    color: ['#ED82B0', '#D58AEA'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '少数名族占比前十学院',
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
                        formatter: '少数名族占比{c}%',
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
            initC3() {
                Chart_c3 = echarts.init(document.getElementById('c3'));
                Chart_c3.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/xyssmz').then(res => {
                    this.list = res.data.data
                    let list_name = []
                    let list_value = []
                    for (let x = 0; x < this.list.length; x++) {
                        list_name.unshift(this.list[x].deptname)
                        list_value.unshift(this.list[x].bl)
                    }
                    Chart_c3.setOption({
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
            this.initC3()
            this.update = setInterval(() => {
                this.getData()
            }, 10000)
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                // console.log('resize c3')
                setTimeout(() => {
                    Chart_c3.resize();
                }, 300)
            }
        },
        beforeDestroy() {
            if (this.update) {
                clearInterval(this.update)
            }
        }
    }
</script>

<style scoped>

</style>