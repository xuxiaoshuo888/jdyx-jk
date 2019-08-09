<template>
    <div>
        这是index
        <el-row :gutter="30">
            <el-col :span="6">这是A1
                <router-view name="A1"></router-view>
            </el-col>
            <el-col :span="12">这是A2
                <router-view name="A2"></router-view>
            </el-col>
            <el-col :span="6">这是A3
                <router-view name="A3"></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {
            A1: () => import('./total/total.vue'),
            A2: () => import('./time/time.vue'),
            A3: () => import('./gender/gender.vue')
        },
    }
</script>

<style scoped>

</style>