<template>
    <!--    新生报到男女比例-->
    <div id="b3" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');

    var Chart_b3;

    export default {
        name: "b3",
        data() {
            return {
                male_ybd: "",//男-已报到
                male_zrs: "",//男-总人数
                female_ybd: "",//女-已报到
                femal_zrs: "",//女-总人数
                update:"",
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '已报到男女新生比例',
                        left: 10,
                        top: 10,
                        textStyle: {color: '#fff', fontSize: 18}
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: "{b}<br/>报到率:  {c}%",
                        textStyle: {color: '#fff'}
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        name: '人数',
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
                        inverse: true,
                        data: ['男', '女']
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth: '60%',
                            data: [0, 0]
                        }
                    ]
                },
            }
        },
        methods: {
            initB3() {
                Chart_b3 = echarts.init(document.getElementById('b3'));
                Chart_b3.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/xbbdl').then(res => {
                    this.male_ybd = res.data.data[0].ybd,//男-已报到
                        this.male_zrs = res.data.data[0].zrs,//男-总人数
                        this.female_ybd = res.data.data[1].ybd,//女-已报到
                        this.femal_zrs = res.data.data[1].zrs//女-总人数
                    Chart_b3.setOption({
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
            this.getData()
            this.initB3()
            this.update = setInterval(() => {
                this.getData()
            },  10000)
            //窗口大小改变时，图标自动适应宽高
            // window.onresize = function () {
            //     console.log('resize b3')
            //     setTimeout(() => {
            //         Chart_b3.resize();
            //     }, 300)
            // }
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