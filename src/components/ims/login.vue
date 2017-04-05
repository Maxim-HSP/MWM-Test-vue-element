<template>
	<div>
	<el-row type="flex" justify="center" align="middle" class="Content">
		<el-col :span="24">
			<el-row type="flex" justify="center" align="middle">
			<el-col :span="24" class="textCenter">
				<div class="grid-content">
					<h3>M.W.M - 登 录</h3> 
				</div>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="16">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="账户">
						<el-input v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="loginFn">登录</el-button>
					</el-form-item>
					<el-form-item v-if="loginFail" :style="{color:'red'}">登录失败，账户验证错误！</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		</el-col>
	</el-row>
		
	</div>
</template>

<script>
import router from "../../router/router.js";
import {mapState,mapMutations,mapActions} from "vuex"
import "babel-polyfill"
	
export default {
	name: 'login',
	data(){
		return{
			form:{
				username: 'maxim',
				password: '123456'  
			},
			loginFail:null,
		}
	},
	computed:{
		...mapState(["isLogin"])
	},
	methods:{
		async loginFn(){
			await this.asyncLogin({
				username:this.form.username,
				password:this.form.password
			});
			//等待action完成后检测state中isLogin状态，成功则进入欢迎页，失败则提示
			if(this.isLogin){
				this.loginFail = false
				router.push("/loginSwitch")
			}else{
				this.loginFail = true
			}
		},
		...mapActions(["asyncLogin"])
	}
}
</script>

<style>
  
</style>
