<template>
    <div id="c2" class="fullSize"></div>
</template>

<script>
    var echarts = require('echarts');
    import 'echarts/map/js/china.js';

    var Chart_c2;

    export default {
        name: "c2",
        data() {
            return {
                type: [],
                list: [],
                option: {
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#000'},
                    tooltip: {
                        trigger: 'item',
                        formatter:'',
                    },
                    roam: true,
                    itemStyle:{
                      areaColor:'red',
                      color:'red'
                    },
                    series: [
                        {
                            name: '',
                            type: 'map',
                            mapType: 'china',
                            symbolSize: 50,
                            symbol: 'data:image/png;base64,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',
                            symbolRotate: 35,
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data: [
                                {
                                    "syd": "浙江",//省份
                                    "zrs": 64,//总人数
                                    "zykl0": 0,//理工人数 这个是和zykls里面的顺序对应
                                    "zykl1": 0,//艺术人数
                                    "zykl2": 64,//综合改革人数
                                    "zykl3": 0//文史人数
                                }
                            ]
                        }
                    ],
                    visualMap: {
                        left: 'left',
                        top: 'bottom',
                        calculable: true,
                        textStyle: {color: '#fff'},
                        min: 0,
                        max: 2000,
                        text: ['高（人数）', '低（人数）'],
                        // Map the score column to color
                        dimension: 0,
                        inRange: {
                            color: ['#D7DA8B', '#E15457']
                        }
                    },
                    // geo: {
                    //     map: 'china',
                    //     roam: true,
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             textStyle: {
                    //                 color: 'rgba(0,0,0,0.4)'
                    //             }
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal:{
                    //             borderColor: 'rgba(0, 0, 0, 0.2)'
                    //         },
                    //         emphasis:{
                    //             areaColor: null,
                    //             shadowOffsetX: 0,
                    //             shadowOffsetY: 0,
                    //             shadowBlur: 20,
                    //             borderWidth: 0,
                    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //         }
                    //     }
                    // },
                }
            }
        },
        methods: {
            initC2() {
                Chart_c2 = echarts.init(document.getElementById('c2'));
                Chart_c2.setOption(this.option);
            },
            getData() {
                this.$axios.get('/api/syddetail').then(res => {
                    this.type = res.data.data.zykls;
                    this.list = res.data.data.list;
                    //处理数据，syd字段,添加name
                    for (let i = 0; i < this.list.length; i++) {
                        this.list[i].name = this.list[i].syd
                        this.list[i].value = this.list[i].zrs

                    }
                    let type = this.type
                    Chart_c2.setOption({
                        tooltip: {
                            formatter: (res) => {//格式化
                                let data = res.data
                                let str = `${data.name}<br/>总人数：${data.zrs}人<br/>${type[0]}：${data['zykl0']}人<br/>${type[1]}：${data['zykl1']}人<br/>${type[2]}：${data['zykl2']}人<br/>${type[3]}：${data['zykl3']}人<br/>`
                                return str
                            }
                        },
                        series: [
                            {
                                data: this.list
                            }
                        ],
                    })
                })
            }
        },
        mounted() {
            this.getData()
            this.initC2()
        }
    }
</script>

<style scoped>

</style>