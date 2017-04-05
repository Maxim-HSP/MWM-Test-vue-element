<template>
	<div>
	<el-row type="flex" justify="center" class="row-bg-content">
			<el-col :span="6">
				<div class="grid-content textCenter">- Add Theater -</div>
			</el-col>
	</el-row>
		<el-row type="flex" justify="center" class="add-theater">
		<el-col :span="20">
				<!--添加放映厅以及座位信息-->
			<el-form ref="form" :model="theaterData">
			<el-row type="flex" justify="space-between">

				<el-col :span="8">
					<el-form-item>
						<el-input v-model="theaterData.name" placeholder="请输入放映厅名称">
							<template slot="prepend">放映厅名称</template>
						</el-input>
					</el-form-item>
				</el-col>

				<el-col :span="4">
					<el-form-item>
						<el-input v-model="theaterData.row" placeholder="总行数">
							<template slot="append">行</template>
						</el-input>
					</el-form-item>
				</el-col>

				<el-col :span="4">
					<el-form-item>
						<el-input v-model="theaterData.col" placeholder="总列数">
							<template slot="append">列</template>
						</el-input>
					</el-form-item>
				</el-col>
				
				<!--确认按钮-->
				<el-col :span="4">
					<el-button 
					class="addBtn"
					type="primary" 
					:disabled="isInputCom"
					@click="asyncAddTheater(theaterData)">添加
						<i class="el-icon-plus el-icon--right"></i>
					</el-button>
				</el-col>
				
			</el-row>
			</el-form>
		</el-col>
		</el-row>
		<el-row type="flex" justify="center" :gutter="20">
			<el-col :span="10" :xs="12">
				<!--放映厅列表-->
				<el-row type="flex" justify="start" class="RowTableTitle">
					<el-alert
						:title="curStudio.name == null ? '错误:未找到该影院': `放映厅列表 - ${curStudio.name}`"
						type="info"
						style="max-width:415px"
						:closable="false">
					</el-alert>
				</el-row>
				<el-table style="width: 415px" height="460" :data="theaterListData.rows" border>
						<el-table-column 
							prop="name" 
							sortable 
							label="放映厅名称" 
							width="180"
							fixed>
						</el-table-column>
						<el-table-column label="操作"  width="230">
								<template scope="scope">
										<el-button 
										@click="saveTheaterId(scope.row._id), selectedName = scope.row.name"
										size="small"
										type="info"
										>查看座位
										</el-button>
										<el-button size="small" type="warning"
											@click="dialogFormVisible = true,getTheaterName(scope.row)">修改
										</el-button>
										<el-button size="small" type="danger" 
											@click="delTheater(scope.row._id)">删除
										</el-button>
								</template>
						</el-table-column>
				</el-table>
				<!--分页组件-->
				<el-pagination
					class="theaterPagination"
					@current-change="getTheaterByPage"
					:current-page="theaterListData.page"
					:page-size=10
					layout="total, prev, pager, next, jumper"
					:total="theaterListData.total">
				</el-pagination>
			</el-col>

			<el-col :span="8" :xs="12">
				<!--座位列表-->
				<el-row type="flex" justify="end" class="RowTableTitle">
					<el-alert
						:title="selectedName == '' ? '未选择放映厅' : `座位列表 -  ${selectedName}`"
						type="info"
						style="width:100%"
						:closable="false">
					</el-alert>
				</el-row>
				<el-table style="width: 100%" height="460" :data="seatListData.rows" border>
						<el-table-column prop="displayName" label="座位"></el-table-column>
						<el-table-column prop="rowNo" sortable label="行"></el-table-column>
						<el-table-column prop="colNo" sortable label="列"></el-table-column>
				</el-table>
				<!--分页组件-->
				<el-pagination
					class="seatPagination"
					@current-change="getSeatByPage"
					:current-page="seatListData.page"
					:page-size=10
					layout="total, prev, pager, next, jumper"
					:total="seatListData.total">
				</el-pagination>
			</el-col>
		</el-row>
		<!--修改框-->
		<el-dialog title="修改放映厅" v-model="dialogFormVisible">
			<el-form :model="updateTheaterData">
				<el-form-item label="放映厅名称" :label-width="formLabelWidth">
					<el-input v-model="updateTheaterData.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" 
					@click="asyncUpdateTheater(updateTheaterData),dialogFormVisible = false">确 定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import { mapState,mapMutations,mapActions,mapGetters } from "vuex";
	import "babel-polyfill";

	export default {
		name: "theater",
		data(){
			return {
				theaterData:{
					studioID: this.$route.params.studioId,
					name:"",
					row:"",
					col:""
				},
				selectedName:"",
				dialogFormVisible: false,
				formLabelWidth: '120px',
				//修改放映厅需要的数据
				updateTheaterData:{
					name:"",
					_id:""
				},
			}
		},
		computed:{
			isInputCom(){
				for(let key in this.theaterData){
					if(this.theaterData[key] == ""){
						return true
					}
				}
			},
			...mapState(["theaterListData","seatListData","curStudio"])
		},
		async created(){
			//获取当前影院信息以便渲染表格并实现翻页
			await this.asyncGetStudioByID(this.$route.params.studioId)
			//初次渲染放映厅列表
			this.asyncGetTheaterByPage();
			//清空座位列表
			this.setSeatListData({seatData:[]})
		},
		methods:{
			//根据页码渲染放映厅列表
			getTheaterByPage(page){
				this.asyncGetTheaterByPage({page});
			},
			//保存放映厅ID同时渲染座位列表
			saveTheaterId(theaterId){
				this.setTheaterId(theaterId);
				this.asyncGetSeat();
			},
			//根据页码渲染座位列表
			getSeatByPage(page){
				this.asyncGetSeat({page});
			},
			//获取放映厅名称
			getTheaterName(row){
				this.updateTheaterData.name = row.name;
				this.updateTheaterData._id = row._id;
			},
			delTheater(_id){
				this.asyncRemoveTheater(_id)
				this.setSeatListData({seatData:[]})
				this.selectedName=""
			},
			...mapMutations([
				"setTheaterId",
				"setSeatListData",
			]),
			...mapActions([
				"asyncAddTheater",
				"asyncGetTheaterByPage",
				"asyncRemoveTheater",
				"asyncUpdateTheater",
				"asyncGetSeat",
				"asyncGetStudioByID"
			]),
		}
	}
</script>

<style>
	.theaterPagination,.seatPagination{
		margin-top: 15px;
	}
</style>


