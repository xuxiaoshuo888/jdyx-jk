<template>
    <div id="a4" class="fullSize"></div>
</template>

<script>
    const echarts = require('echarts');

    let Chart_a4;

    /*地图数据*/
    let res = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60], ["2000-07-25", 44], ["2000-07-26", 127], ["2000-07-27", 114], ["2000-07-28", 86], ["2000-07-29", 73], ["2000-07-30", 52], ["2000-07-31", 69], ["2000-08-01", 86], ["2000-08-02", 118], ["2000-08-03", 56], ["2000-08-04", 91], ["2000-08-05", 121], ["2000-08-06", 127], ["2000-08-07", 78], ["2000-08-08", 79], ["2000-08-09", 46], ["2000-08-10", 108]];

    export default {
        name: "a4",
        data() {
            return {
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#fff'},
                    title: {
                        text: 'Beijing AQI',
                        textStyle: '#fff'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: res.map(function (item) {
                            return item[0];
                        })
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        }
                    },
                    toolbox: {
                        left: 'center',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: '2014-06-01'
                    }, {
                        type: 'inside'
                    }],
                    visualMap: {
                        top: 10,
                        right: 10,
                        pieces: [{
                            gt: 0,
                            lte: 50,
                            color: '#096'
                        }, {
                            gt: 50,
                            lte: 100,
                            color: '#ffde33'
                        }, {
                            gt: 100,
                            lte: 150,
                            color: '#ff9933'
                        }, {
                            gt: 150,
                            lte: 200,
                            color: '#cc0033'
                        }, {
                            gt: 200,
                            lte: 300,
                            color: '#660099'
                        }, {
                            gt: 300,
                            color: '#7e0023'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    series: {
                        name: 'Beijing AQI',
                        type: 'line',
                        data: res.map(function (item) {
                            return item[1];
                        }),
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
            initA4() {
                Chart_a4 = echarts.init(document.getElementById('a4'));
                Chart_a4.setOption(this.option);
            },
            getData() {
                // this.$axios.get('/api/xbbdl').then(res => {
                //
                // })
            }
        },
        mounted() {
            // this.getData()
            this.getData()
            this.initA4()
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