<template>
    <div>
        <el-menu :router="true" theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="user">
                <template slot="title">用户管理</template>
                <el-menu-item index="addUser">新增用户</el-menu-item>
                <el-menu-item index="userList">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="movie">
                <template slot="title">电影管理</template>
                <el-menu-item index="addMovie">新增电影</el-menu-item>
                <el-menu-item index="getMovie">电影列表</el-menu-item>
            </el-submenu>
            <el-submenu index="studio">
                <template slot="title">影院管理</template>
                <el-menu-item index="addStudio">新增影院</el-menu-item>
                <el-menu-item index="studioList">影院列表</el-menu-item>
            </el-submenu>
            <el-submenu index="schedule">
                <template slot="title">排片管理</template>
                <el-menu-item index="addSchedule">新增排片</el-menu-item>
                <el-menu-item index="scheduleList">排片查询</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
import router from "../../router/router.js";

export default {
	name: 'info',
	data(){
		return{
			activeIndex: 'addMovie'
		}
	},
	methods:{
		handleSelect(key, keyPath) {
			router.push(`/info/${key}`)
		},
	}
}
</script>

<style>
	.el-menu-demo{
		display:flex;
		justify-content: center;
	}
</style>