<template>
    <!--新生前十-->
    <div id="b4" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');
    var Chart_b4;

    export default {
        name: "b4",
        data() {
            return {
                list: [],
                list_name: [],//学院名集合
                list_value: [],//对应值集合
                option: {
                    color: ['#74C3CE', '#0081D0'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '新生人数前十的学院',
                        subtext: '',
                        left:10,
                        top:10,
                        textStyle: {color: '#fff', fontSize: 18}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter:'{b}：{c}人',
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
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
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
                        data: [],
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
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
            initB4() {
                Chart_b4 = echarts.init(document.getElementById('b4'));
                Chart_b4.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/xy').then(res => {
                    this.list = res.data.data
                    let list_name = []
                    let list_value = []
                    for (let x = 0; x < this.list.length; x++) {
                        if(x==10){
                            break;
                        }
                        list_name.unshift(this.list[x].deptname)
                        list_value.unshift(this.list[x].rs)
                    }
                    // console.log(list_name)
                    // console.log(list_value)
                    // console.log(this.list)
                    Chart_b4.setOption({
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
            this.initB4()
            this.getData()
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                console.log('resize a3')
                setTimeout(() => {
                    Chart_b4.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped>

</style>