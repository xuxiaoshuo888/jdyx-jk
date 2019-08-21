<template>
    <div id="d2" class="fullSize"></div>
</template>

<script>
    const echarts = require('echarts');

    let Chart_d2;

    /*地图数据*/
    // let res = [["2000-06-05 08:00", 116], ["2000-06-06 09:00", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60], ["2000-07-25", 44], ["2000-07-26", 127], ["2000-07-27", 114], ["2000-07-28", 86], ["2000-07-29", 73], ["2000-07-30", 52], ["2000-07-31", 69], ["2000-08-01", 86], ["2000-08-02", 118], ["2000-08-03", 56], ["2000-08-04", 91], ["2000-08-05", 121], ["2000-08-06", 127], ["2000-08-07", 78], ["2000-08-08", 79], ["2000-08-09", 46], ["2000-08-10", 108]];

    export default {
        name: "d2",
        data() {
            return {
                update: "",
                option: {
                    color: ['#2ac5a9', '#ed82b0', '#2AC5A9', '#FFD441', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: '新生报到实时监测',
                        textStyle: {color: '#fff', fontSize: 18},
                        left: 10,
                        top: 10,
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: [''],
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                    },
                    yAxis: {
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.2)'
                            }
                        }
                    },
                    toolbox: {
                        left: 'center',
                        feature: {
                            // restore: {},
                        }
                    },
                    dataZoom: [{
                        startValue: '2019-08-09 10'
                    }, {
                        type: 'inside'
                    }],
                    series: {
                        name: '报到人数',
                        type: 'line',
                        data: [''],
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 50
                            }, {
                                yAxis: 100
                            }, {
                                yAxis: 150
                            }, {
                                yAxis: 200
                            }, {
                                yAxis: 300
                            }]
                        }
                    }
                }
            }
        },
        methods: {
            initD2() {
                Chart_d2 = echarts.init(document.getElementById('d2'));
                Chart_d2.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/hour_bdl').then(res => {
                    let data = res.data.data
                    Chart_d2.setOption({
                        xAxis: {
                            data: data.map(function (item) {
                                return item[0];
                            })
                        },
                        series: {
                            name: '报到人数',
                            type: 'line',
                            data: data.map(function (item) {
                                return item[1];
                            }),
                        }
                    });
                })
            }
        },
        mounted() {
            this.getData()
            this.initD2()
            //间隔更新数据
            this.update = setInterval(() => {
                this.getData()
            }, 10000)
            //窗口大小改变时，图标自动适应宽高
            window.onresize = function () {
                console.log('resize d2')
                setTimeout(() => {
                    Chart_d2.resize();
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