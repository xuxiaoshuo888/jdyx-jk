<template>
    <!--新生前十-->
    <div id="a4" class="fullSize" style="width:44rem !important;height:102rem !important;"></div>
</template>

<script>
    var echarts = require('echarts');
    var Chart_a4;

    export default {
        name: "a4",
        data() {
            return {
                list: [],
                list_name: [],//学院名集合
                list_value: [],//对应值集合
                option: {
                    color: ['#74C3CE', '#0081D0'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '各民族学生人数统计',
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
                        // nameGap: 1,
                        // boundaryGap:10,
                        nameTextStyle: {
                            fontSize: '10'
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        nameRotate:60,
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
            initA4() {
                Chart_a4 = echarts.init(document.getElementById('a4'));
                Chart_a4.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/mz').then(res => {
                    this.list = res.data.data
                    let list_name = []
                    let list_value = []
                    for (let x = 0; x < this.list.length; x++) {
                        list_name.unshift(this.list[x].mz)
                        list_value.unshift(this.list[x].rs)
                    }
                    // console.log(list_name)
                    // console.log(list_value)
                    Chart_a4.setOption({
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
            this.initA4()
            this.getData()
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                console.log('resize a4')
                setTimeout(() => {
                    Chart_a4.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped>

</style>