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
                geoCoordMap:{},
                type: [],
                list: [],
                option: {
                    title: {
                        text: '各省录取情况',
                        subtext: '',
                        left:10,
                        top:10,
                        textStyle: {color: '#fff', fontSize: 18}
                    },
                    color: ['#FFD441', '#2AC5A9'],
                    textStyle: {color: '#000'},
                    tooltip: {
                        trigger: 'item',
                        formatter: '',
                    },
                    roam: true,
                    itemStyle: {
                        areaColor: 'red',
                        color: 'red'
                    },
                    series: [
                        {
                            name: '散点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: [],
                            symbolSize: 10,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#fff'
                                }
                            },
                            tooltip: {
                                formatter: '{b}'
                            }
                        },
                        {
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#3B5077',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: []
                        },
                        {
                            name: '点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin', //气泡
                            symbolSize: 50,
                            label: {
                                normal: {
                                    formatter: '{@[2]}',
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 12
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F62157' //标志颜色
                                }
                            },
                            zlevel: 6,
                            tooltip: {
                                formatter: '{b}'
                            },
                            data: []
                        },
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: [],
                            symbolSize: 10,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'yellow',
                                    shadowBlur: 10,
                                    shadowColor: 'yellow'
                                }
                            },
                            tooltip: {
                                formatter: '{b}'
                            },
                            zlevel: 10
                        }
                    ],
                    visualMap: {
                        left: 'left',
                        top: 'bottom',
                        calculable: true,
                        textStyle: {color: '#fff'},
                        min: 0,
                        max: 100,
                        text: ['高（人数）', '低（人数）'],
                        // Map the score column to color
                        dimension: 0,
                        inRange: {
                            color: ['#4FC3F7', '#015798']
                        }
                    },
                    geo: {
                        show: true,
                        map: 'china',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        }
                    }
                }
            }
        },
        methods: {
            initC2() {
                let mapFeatures = echarts.getMap('china').geoJson.features;
                let this_ = this;
                mapFeatures.forEach(function(v) {
                    // 地区名称
                    let name = v.properties.name;
                    // 地区经纬度
                    this_.geoCoordMap[name] = v.properties.cp;
                });
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
                                let str = `${data.name}<br/>总人数：${data.zrs}人<br/>${type[0]}：${data['zykl0']}人<br/>${type[1]}：${data['zykl1']}人`
                                return str
                            }
                        },
                        series: [
                            {
                                data: this.convertData(this.list)
                            },
                            {
                                data: this.list
                            },
                            {
                                data: this.convertData(this.list)
                            },
                            {
                                data: this.convertData(this.list.sort(function(a, b) {
                                    return b.value - a.value;
                                }).slice(0, 5))
                            }
                        ],
                    })
                })
            },
            convertData(data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = this.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                        });
                    }
                }
                return res;
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