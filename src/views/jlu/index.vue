<template>
    <div class="contain">
        <div class="col1">
            <div id="a1" class="type1" style="height: 10.2rem;">
                <a1></a1>
            </div>
            <div class="type1">
                <a2></a2>
            </div>
            <div class="type1">
                <b3></b3>
            </div>
            <div class="type2" style="height:42.4rem;">
                <d2></d2>
            </div>
        </div>
        <div class="col2">
            <div class="type-head">{{schoolName}} {{currentYear}} 级自助数字化迎新展示</div>
            <div class="mid-contain">
                <div class="mid-left">
                    <div id="b2" class="type3"
                         style="height: 53.8rem; padding-left: 15px;padding-right: 15px;box-sizing: border-box;">
                        <div class="title">
                            最新报到的学生
                        </div>
                        <el-row :gutter="20">
                            <el-row>
                                <el-col :span="8" class="head">学号</el-col>
                                <el-col :span="8" class="head">姓名</el-col>
                                <!--<el-col :span="8" class="head">性别</el-col>-->
                                <!--<el-col :span="6" class="head">学院</el-col>-->
                                <el-col :span="8" class="head">到校时间</el-col>
                            </el-row>
                            <div v-if="b2_list.length === 0">
                                <el-row v-for="(i,index) in b2_list" :key="index" style="margin-top: 1rem;">
                                    <el-col :span="6" class="body">{{i.xh}}</el-col>
                                    <el-col :span="6" class="body">{{i.xm}}</el-col>
                                    <!--<el-col :span="8" class="body">{{i.xb}}</el-col>-->
                                    <el-col :span="6" class="body">{{i.xy}}</el-col>
                                    <el-col :span="6" class="body">{{i.czrq}}</el-col>
                                </el-row>
                            </div>
                            <el-row v-else
                                    style="width: 100%;height: 50%;text-align: center;font-size: 18px;padding-top: 5rem;">
                                暂无数据
                            </el-row>
                        </el-row>
                    </div>
                </div>
                <div class="mid-right-map">
                    <c2></c2>
                </div>
            </div>
            <div class="mid-bottom">
                <div class="type2 mid-bottom-left">
                    <b4></b4>
                </div>
                <div class="type2 mid-bottom-right">
                    <c3></c3>
                </div>
            </div>
        </div>
        <div class="col3">
            <div class="type2" style="height:102.3rem !important;">
                <el-carousel height="102rem" indicator-position="outside" autoplay :interval="intervalTime">
                    <el-carousel-item style="">
                        <d1></d1>
                    </el-carousel-item>
                    <el-carousel-item>
                        <a4></a4>
                    </el-carousel-item>
                    <el-carousel-item>
                        <d3></d3>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
    /*业务组件*/
    import a1 from './a1/a1.vue'
    import a2 from './a2/a2.vue'
    import a4 from './a4/a4.vue'
    import b3 from './b3/b3.vue'
    import b4 from './b4/b4.vue'
    import c2 from './c2/c2.vue'
    import c3 from './c3/c3.vue'
    import d1 from './d1/d1.vue'
    import d2 from './d2/d2.vue'
    import d3 from './d3/d3.vue'
    /*图表类组件*/
    // color: ['#FFD441', '#2AC5A9', '#ED82B0', '#0081D0', '#D58AEA', '#74C3CE', '#6283C0', '#5F83B7'],//颜色
    export default {
        name: "index",
        components: {a1, a2, a4, b3, b4, c3, c2, d1, d2, d3},
        data() {
            return {
                b2_list: [],
                schoolName: "",
                currentYear: "",
                intervalTime: 5000,//右侧轮播图轮播间隔
            }
        },
        methods: {
            getName() {//学校名，年级
                this.$axios.get('/api/init').then(res => {
                    this.schoolName = res.data.schoolName;
                    this.currentYear = res.data.currentYear;
                })
            },
            getData_b2() {//最新报到的学生信息
                this.$axios.get('/api/newstudent').then(res => {
                    // console.log(res)
                    this.b2_list = res.data
                })
            }
        },
        mounted() {
            this.getName();
            this.getData_b2();
        }
    }
</script>

<style scoped lang="scss">
    .lbt-item {
        width: 44rem !important;
        height: 102rem !important;
    }
</style>