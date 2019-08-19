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
                list_name: ['机械与电气工程学院', '水利与生态工程学院', '信息工程学院', '土木与建筑工程学院', '经济贸易学院', '人文与艺术学院'],//学院名集合
                list_value: [666, 555, 777, 888, 999, 444],//对应值集合
                option: {
                    color: ['#ED82B0', '#D58AEA'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '少数名族占比前十学院',
                        subtext: '',
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
                        boundaryGap: [0, 0.1]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['机械与电气工程学院', '水利与生态工程学院', '信息工程学院', '土木与建筑工程学院', '经济贸易学院', '人文与艺术学院']
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth: '10',
                            data: [666, 555, 777, 888, 999, 444]
                        }
                    ]
                }
            }
        },
        methods: {
            initC3() {
                Chart_c3 = echarts.init(document.getElementById('c3'));
                console.log(this.option)
                Chart_c3.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/xyssmz').then(res => {
                    this.list = res.data.data.data
                    let list_name = []
                    let list_value = []
                    for (let x = 0; x < this.list.length; x++) {
                        list_name.push(this.list[x].deptname)
                        list_value.push(this.list[x].rs)
                    }
                }).then(
                    //数据更新后
                    Chart_c3.setOption(this.option)
                )

            }
        },
        mounted() {
            // this.getData()
            this.initC3()
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                console.log('resize c3')
                setTimeout(() => {
                    Chart_c3.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped>

</style>