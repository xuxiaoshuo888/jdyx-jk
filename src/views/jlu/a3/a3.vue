<template>
    <!--    新生报到男女比例-->


    <!--不用了-->
    <div id="a3" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');

    var Chart_a3;
    <!--不用了-->
    export default {
        name: "a3",
        data() {
            return {
                male_ybd: "",//男-已报到
                male_zrs: "",//男-总人数
                female_ybd: "",//女-已报到
                femal_zrs: "",//女-总人数
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '已报到男女新生比例',
                        textStyle: {color: '#fff', fontSize: 18}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: "{b}<br/>已报到:  {c}%",
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
                        data: ['男', '女']
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth: '10',
                            data: [0, 0]
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
            getData() {
                this.$axios.get('/api/xbbdl').then(res => {
                    this.male_ybd = res.data.data[0].ybd,//男-已报到
                        this.male_zrs = res.data.data[0].zrs,//男-总人数
                        this.female_ybd = res.data.data[1].ybd,//女-已报到
                        this.femal_zrs = res.data.data[1].zrs//女-总人数
                    Chart_a3.setOption({
                        series: [
                            {
                                data: [this.male_ybd / this.male_zrs, this.female_ybd / this.femal_zrs]
                            }
                        ]
                    })
                })
            }
        },
        mounted() {
            // this.getData()
            this.initA3()
            //窗口大小改变时，图标自动适应宽高
            // window.onresize = function () {
            //     console.log('resize a3')
            //     setTimeout(() => {
            //         Chart_a3.resize();
            //     }, 300)
            // }
        }
    }
</script>

<style scoped>

</style>