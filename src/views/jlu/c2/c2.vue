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
                // option: {
                //     color: ['#FFD441', '#2AC5A9'],
                //     textStyle: {color: '#fff'},
                //     tooltip: {
                //         trigger: 'item',
                //         formatter: '{b}'
                //     },
                //     series: [
                //         {
                //             name: '中国',
                //             type: 'map',
                //             mapType: 'china',
                //             label: {
                //                 normal: {
                //                     show: true
                //                 },
                //                 emphasis: {
                //                     show: true
                //                 }
                //             },
                //             data:[
                //                 {name:'广东'}
                //             ]
                //         }
                //     ]
                // }
            }
        },
        methods: {
            initC2() {
                Chart_c2 = echarts.init(document.getElementById('c2'));
                Chart_c2.setOption(this.option);
            },
        },
        computed: {
            isResize() {
                return this.$store.state.isResize
            }
        },
        watch: {
            isResize(newValue, oldValue) {
                this.Chart_c2.resize();
            }
        },
        mounted() {
            this.initC2()
        }
    }
</script>

<style scoped>

</style>