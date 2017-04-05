<template>
<div>
	<el-row type="flex" justify="center" class="row-bg-content">
		<el-col :span="6">
			<div class="grid-content textCenter">- Studio List -</div>
		</el-col>
	</el-row>
	
	<el-row type="flex" justify="center">
    <el-col :span="20" class="tableContainer">
		<!--表格区域-->
			<el-table 
				:data="studioList" 
				border 
				style="width: 800px" 
				height="600">
				<el-table-column
					prop="name" 
					sortable 
					label="影院名称" 
					width="300">
				</el-table-column>
				<el-table-column prop="address" sortable label="影院地址" width="330"></el-table-column>
				<el-table-column fixed="right" label="操作" width="160">
						<template scope="scope">
							<el-button 
								@click="saveStudio(scope.row),dialogFormVisible=true"
								type="primary" 
								icon="edit" 
								size="mini">修改</el-button>
							<el-button 
								@click.native.prevent="deleteStudio(scope.row._id)" 
								type="danger" 
								icon="delete" 
								size="mini"
								:plain="true">删除</el-button>
						</template>
				</el-table-column>
			</el-table>
			<!--修改表单-->
			<el-dialog title="影院详情修改" v-model="dialogFormVisible">
			<el-form :model="setStudio" label-width="80px">
				<el-form-item label="影院名称">
					<el-input v-model="setStudio.name"></el-input>
				</el-form-item>
				<el-form-item label="影院地址">
					<el-input v-model="setStudio.address"></el-input>
				</el-form-item>
				<el-button type="success" icon="circle-check" @click="updateStudio">保存</el-button>
				<el-button type="danger" icon="circle-close" @click="dialogFormVisible=false">取消</el-button>
				<el-button type="warning" icon="setting" @click="toTheater">修改放映厅</el-button>
			</el-form>
			</el-dialog>
    </el-col>
  </el-row>
</div>
</template>
<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import "babel-polyfill"
	import router from "../../../router/router.js"
	
	export default {
		name:"studioList",
		data(){
			return{
				dialogFormVisible:false,
				setStudio:{}
			}
		},
		created(){
			this.asyncGetStudios()
		},
		computed: {
			...mapState([
				"studioList",
				"delStudioSuc",
				"upStudioSuc"
			]),
		}, 
		methods: {
			async deleteStudio(_id) {
				await this.asyncDeleteStudio(_id);
				if(this.delStudioSuc){
					this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success'
					})
				}else{
					this.$message.error("删除失败")
				}
				this.asyncGetStudios()
			},
			async updateStudio(){
				await this.asyncUpdateStudio(this.setStudio)
				if(this.upStudioSuc){
					this.$message({
						showClose: true,
						message: '保存成功',
						type: 'success'
					})
				}else{
					this.$message.error("修改失败")
				}
				this.dialogFormVisible=false
				this.asyncGetStudios()
			},
			saveStudio(studio){
				this.setStudio._id=studio._id;
				this.setStudio.name=studio.name;
				this.setStudio.address=studio.address
			},
			toTheater(){
				router.push(`addStudio/${this.setStudio._id}/theater`)
			},
			...mapActions(["asyncGetStudios","asyncDeleteStudio","asyncUpdateStudio"]),
		}
	}
</script>
<style>
	
</style>