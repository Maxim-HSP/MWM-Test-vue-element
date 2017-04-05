<template>
	<div>
	<el-row type="flex" justify="center" class="row-bg-content">
		<el-col :span="6">
			<div class="grid-content textCenter">- Add User -</div>
		</el-col>
	</el-row>
	<el-row type="flex" justify="center" >
		<el-col :span="10">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="用户名">
						<el-input v-model="form.username" @blur="checkUsername"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="账户类型">
						<el-radio-group v-model="form.status" @change="checkUsername">
							<el-radio label=0>猫眼账户</el-radio>
							<el-radio label=1>管理账户</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button 
							type="primary" 
							:disabled="isInputEmpty || isUsernameUse" 
							icon="circle-check" 
							@click="addUser">添加(注册)用户
						</el-button>
						<el-button 
							type="primary"
							icon="circle-cross" 
							:plain="true" 
							@click="clear">清空
						</el-button>
					</el-form-item>
						<el-alert
							v-if="isUsernameUse"
							title="已存在该用户名！"
							type="error"
							show-icon>
						</el-alert>
				</el-form>
		</el-col>
	</el-row>
	</div>
</template>

<script>
	import { mapState,mapMutations,mapActions } from "vuex";
	import "babel-polyfill"
	
	export default {
		name: "addUser",
		data(){
			return{
				form:{
					username:"",
					password:"",
					status:""
				}
			}
		},
		created(){
			this.setIsUsernameUse(false)
		},
		computed:{
			isInputEmpty(){
				for(var key in this.form){
					if(this.form[key] == ""){
						return true
					}
				}
			},
			...mapState(["isRegSuc","isUsernameUse"])
		},
		methods:{
			async addUser(){
				await this.asyncReg(this.form);
				if(this.isRegSuc){
					this.$message.success('注册成功')
				}else{
					this.$message.error('注册失败')
				}
			},
			checkUsername(){
				this.asyncCheckUsername({
					username:this.form.username,
					status:this.form.status
				})
			},
			clear(){
				for(var key in this.form){
					this.form.username = ""
					this.form.password = ""
				}
			},
			...mapMutations(["setIsUsernameUse"]),
			...mapActions(["asyncReg","asyncCheckUsername"])
		}
	}
</script>

<style>

</style>