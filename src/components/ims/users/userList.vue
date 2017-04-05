<template>
<div>
	<el-row type="flex" justify="center" class="row-bg-content">
		<el-col :span="6">
			<div class="grid-content textCenter">- User List -</div>
		</el-col>
	</el-row>
	<el-row type="flex" justify="center">
    <el-col :span="20">
    
			<el-row type="flex" justify="center" class="RowTableTitle">
				<div class="title-lineL"></div>
				<el-radio-group v-model="UserStatus" @change="getUsers">
					<el-radio-button label=0 >猫眼账户</el-radio-button>
					<el-radio-button label=1 >管理账户</el-radio-button>
					<el-radio-button label="deleted" >已注销</el-radio-button>
				</el-radio-group>
				<div class="title-lineR"></div>
			</el-row>
			
			<!--表格区域-->
			<el-row type="flex" justify="center">
			<el-table 
				:data="userList" 
				border 
				style="width: 800px" 
				height="600">
				<el-table-column
					prop="username" 
					sortable 
					label="账户名" 
					width="200">
				</el-table-column>
				<el-table-column prop="password" sortable label="密码" width="330"></el-table-column>
				<el-table-column prop="status" sortable label="账户类型" width="200">
					<template scope="scope">
						{{scope.row.status == 0 ? "猫眼(前台)账户" : "管理(后台)账户"}}
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="160">
						<template scope="scope">
							<el-button 
								@click="getRow(scope.row),dialogFormVisible=true"
								type="primary" 
								icon="edit" 
								size="mini">修改</el-button>
							<el-button 
								@click.native.prevent="deleteUser(scope.row._id)" 
								type="danger" 
								icon="delete" 
								size="mini"
								:disabled="UserStatus=='deleted'"
								:plain="true">注销</el-button>
						</template>
				</el-table-column>
			</el-table>
			</el-row>
			
			<!--修改表单-->
			<el-dialog title="账户信息修改" v-model="dialogFormVisible">
			<el-form :model="dialogForm" label-width="80px">
				<el-form-item label="账户名">
					<el-input v-model="dialogForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="dialogForm.password"></el-input>
				</el-form-item>
				<el-button type="success" icon="circle-check" @click="updateUser">保存</el-button>
				<el-button type="danger" icon="circle-close" @click="dialogFormVisible=false">取消</el-button>
			</el-form>
			</el-dialog>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from "vuex"
    
	export default {
		data(){
			return {
				UserStatus:1,
				dialogFormVisible:false,
				dialogForm:{
					_id:"",
					username:"",
					password:""
				},
			}
		},
		computed: {
			...mapState([
				"userList",
				"delUserSuc",
				"upUserSuc"
			]),
		},
		created(){
			this.asyncGetUsers({status:this.UserStatus});
		},
		methods: {
			async deleteUser(_id) {
				await this.asyncDeleteUser(_id);
				if(this.delUserSuc){
					this.$message.success("删除成功")
				}else{
					this.$message.error("删除失败！")
				}
				this.asyncGetUsers({status:this.UserStatus});
			},
			getRow(row){
				this.dialogForm._id=row._id
				this.dialogForm.username=row.username
				this.dialogForm.password=row.password
			},
			async updateUser(){
				await this.asyncUpdateUser(this.dialogForm);
				if(this.upUserSuc){
					this.$message.success("修改成功")
				}else{
					this.$message.error("修改失败！")
				}
				this.dialogFormVisible=false;
				this.asyncGetUsers({
					status:this.UserStatus
				});
			},
			getUsers(){
				if(this.UserStatus == "deleted"){
					this.asyncGetUsers({flag:1})
				}else{
					this.asyncGetUsers({status:this.UserStatus})
				}
			},
			...mapActions([
				"asyncGetUsers",
				"asyncDeleteUser",
				"asyncUpdateUser"
			])
		}
  }
</script>
<style>
	.title-lineL , .title-lineR{
		display: inline-block;
		width: 150px
	}
	.title-lineR{
		background:linear-gradient(to right,rgb(32, 160, 255),transparent);
	}
	.title-lineL{
		background:linear-gradient(to left,rgb(32, 160, 255),transparent);
	}
</style>