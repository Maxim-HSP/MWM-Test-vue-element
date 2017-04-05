<template>
	<div>
		<el-row class="Header">
			<el-col :span="24">
				<div class="bg-purple-dark Title">
					<h1>MaoYan Web Management System</h1> 
				</div>
			</el-col>
			<el-col :span="24" v-if="isLogin">
				<div class="bg-purple-light Title2">
					<p>当前用户：{{loginUser}}{{" | "}} <span @click="logout" class="logoutBtn">登出</span></p>
				</div>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="20" class="Content bg-purple">
					<router-view></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {mapState,mapMutations,mapActions} from "vuex";
import router from "../router/router.js";

export default {
	name: 'App_vue',
	computed:{
	...mapState(["isLogin","loginUser"])
	},
	methods:{
		logout(){
			this.setIsLogin({isLogin:false});
			router.push("/login")
		},
		...mapMutations(["setIsLogin"])
	}
}
</script>

<style>
	body{
		background:url(../bgimg/bg.jpg);
		background-size: cover;
		background-attachment:fixed;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}
	.Header{
		margin: 0!important
	}
	.Title{
		font-size: 20px;
		padding-left: 10px;
		font-style: italic;
		color: rgba(0, 0, 0, 0.71)
	}
	.Title2{
		padding-left: 10px;
		color: #212121
	}
	.logoutBtn{
		cursor: pointer;
	}
	.logoutBtn:hover{
		text-decoration: underline;
		color: #20A0FF;
	}
	.Content{
		min-height: 500px!important
	}
	.el-row {
	margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: rgba(153, 169, 191, 0.6);
	}
	.bg-purple {
		background: rgba(211, 220, 230, 0.74);
	}
	.bg-purple-light {
		background: rgba(229, 233, 242, 0.7);
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 30px 0;
		background: linear-gradient(rgba(0, 0, 0, 0.73), transparent)
	}
	.row-bg-content{
		padding: 20px 0;
		background: linear-gradient(rgba(32, 160, 255, 0.52),transparent);
		color: rgba(50, 65, 87, 0.71);
		font-size: 20px;
	}
	.textCenter{
		text-align: center
	}
	.RowTableTitle{
		margin-bottom: 0!important
	}
	.tableContainer{
		display: flex;
		justify-content: center
	}
</style>
