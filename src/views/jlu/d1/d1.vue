<template>
    <!--少数名族占比前十学院-->
    <div id="d1" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');
    var Chart_d1;

    export default {
        name: "d1",
        data() {
            return {
                list: [],
                list_name: ['机械与电气工程学院', '水利与生态工程学院', '信息工程学院', '土木与建筑工程学院', '经济贸易学院', '人文与艺术学院'],//学院名集合
                list_value: [666, 555, 777, 888, 999, 444],//对应值集合
                option: {
                    color: ['#6283C0', '#5F83B7'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '各学院报到情况实时统计',
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
            initD1() {
                Chart_d1 = echarts.init(document.getElementById('d1'));
                console.log(this.option)
                Chart_d1.setOption(this.option);
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
                    Chart_d1.setOption(this.option)
                )

            }
        },
        mounted() {
            // this.getData()
            this.initD1()
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                console.log('resize d1')
                setTimeout(() => {
                    Chart_d1.resize();
                }, 300)
            }
        }
    }
</script>

<style scoped>

</style>