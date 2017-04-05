<template>
	<div>
		<el-row type="flex" justify="center" class="row-bg-content">
			<el-col :span="6">
				<div class="grid-content textCenter">- Add Studio -</div>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="12">
				<!--表单区域-->
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="影院名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button 
							type="primary" 
							icon="circle-check" 
							@click="addStudio" 
							:disabled="isInputCom">立即创建</el-button>
						<el-button type="danger" icon="delete" :plain="true" @click="clear">清空</el-button>
					</el-form-item>
					<el-form-item>
						<el-alert
							title="创建完成后可添加放映厅"
							:closable="false"
							type="info"
							show-icon
							v-if="!addStudioSuc">
						</el-alert>
						<el-button 
							v-else 
							type="success" 
							icon="plus"
							@click="toTheater" 
							:disabled="!addStudioSuc">在“{{addStudioName}}”下添加放映厅</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState,mapMutations,mapActions } from "vuex";
	import "babel-polyfill";
	import router from "../../../router/router.js";

	export default{
		name:"addStudio",
		data(){
			return{
				form:{
					name: "",
					address: ""
				}
			}
		},
		created(){
			this.setAddStudioSuc({
				addStudioSuc:false
			})
		},
		computed:{
			isInputCom(){
				for(var key in this.form){
					if(this.form[key] == ""){
						return true
					}
				}
			},
			...mapState(["addStudioSuc","addStudioId","addStudioName"])
		},
		methods:{
			async addStudio(){
				await this.asyncAddStudio(this.form);
				if(this.addStudioSuc){
					this.$message.success("添加成功")
				}else{
					this.$message.error("添加失败！")
				}
			},
			clear(){
				for(var key in this.form){
					this.form[key]=""
				}
			},
			toTheater(){
				router.push(`addStudio/${this.addStudioId}/theater`)
			},
			...mapMutations(["setAddStudioSuc"]),
			...mapActions(["asyncAddStudio"])
		}
	}
</script>