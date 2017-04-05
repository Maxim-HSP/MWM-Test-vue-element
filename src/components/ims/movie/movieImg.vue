<template>
	<div>
		<el-row type="flex" justify="center" class="row-bg-content">
			<el-col :span="6">
				<div class="grid-content textCenter">- Add Images -</div>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
		<el-col :span="18">
			<!--上传区域-->
			<el-form ref="form" :model="form" label-width="90px">
			<el-row type="flex" justify="space-between">
				<el-col :span="1"></el-col>
				<el-col :span="9">
				<el-form-item label="图片类型">
					<el-select 
						v-model="form.type" 
						placeholder="点击选择类型"
						filterable
						@change="getImgList" 
						style="width:100%">
							<el-option					
								v-for="item in types" 					
								:key="item.value" 					
								:value="item.value" 					
								:label="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				</el-col>
				
				<el-col :span="12">
					<el-upload
						:before-upload="checkImg"
						:on-success="getImgList"
						:data="form"
						:multiple="true"
						:show-file-list="false"
						action="http://localhost:3000/files/upload">
						<el-button type="primary" icon="upload">点击上传</el-button>
						<span slot="tip" class="el-upload__tip"> 上传前请检查文件名与图片类型</span>
					</el-upload>
				</el-col>
			</el-row>
			</el-form>
			
			<!--表格区域-->
			<el-row type="flex" justify="center" class="RowTableTitle">
				<el-alert
					:title="curMovie.cName==undefined ? '错误:未找到该影片': `《${curMovie.cName}》条目下的图片`"
					type="info"
					style="max-width: 1000px"
					:closable="false">
				</el-alert>
			</el-row>
			<el-row type="flex" justify="center">
			<el-table :data="imgTableData" :height="600" style="width: 1000px" border>
			
				<el-table-column width="70" type="index" label="序号"></el-table-column>
				<el-table-column width="100" label="图片预览">
					<template scope="scope">
						<img :src="'http://localhost:3000'+scope.row.url" alt="">
					</template>
				</el-table-column>
				<el-table-column width="200" property="type" label="图片类型"></el-table-column>
				<el-table-column width="600" property="name" sortable label="图片名称"></el-table-column>
				<el-table-column width="70" label="操作" fixed="right">
					<template scope="scope">
						<el-button 
							@click.native.prevent="deleteImg(scope.$index,imgTableData)" 
							type="danger" 
							size="small">删除
						</el-button>
					</template>
				</el-table-column>
				
			</el-table> 
			</el-row>
		</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import axios from 'axios';
	import "babel-polyfill";
	
	export default {
		name: "addImg",
		data() {
			return {
				form: {
					movieId: this.$route.params.movieId,
					type: "indexImg"
				},
				types: [{
					value: 'indexImg',
					label: '主页图片'
				},{
					value: 'normal',
					label: '剧情图片'
				},{
					value: 'actorImg',
					label: '演员图片'
				}],
				resObj:[{
					imgPre:"",
					imgId:"",
					imgType:""
				}],
				imgTableData: [],
			}
		},
		created: function() {
			//获取当前电影信息，以配合渲染，及后期可加翻页
			this.asyncGetMovieByMovieID(this.$route.params.movieId)
			//进入即加载图片列表
			this.getImgList();
		},
		computed:{
			...mapState(["curMovie"])
		},
		//图片剔重
		methods:{
			async checkImg(file){
				var res=await axios.get('http://localhost:3000/imgs/movieImgIsUpload',{
					params: {
						movieId:this.$route.params.movieId,
						name: file.name,
						type: this.form.type
					}
				})
				.then( res => {
					if(res.data.count!=0){
						this.$message.error('重复图片，取消上传')
						return Promise()
					}
				})
			},
			// 删除图片    
			deleteImg(index,imgTableData) {
				this.$confirm('永久删除该图片数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					axios.get('http://localhost:3000/imgs/delete',{
						params: {
							_id:imgTableData[index]._id
						}
					})
					.then( res => {
						if(res.data) {
							this.getImgList();
							this.$message({
								type: 'success',
								message: '图片删除成功!'
							});
						}
					})
					.catch(function(err){
							console.log(err)
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					});          
				});
			},
			getImgList() {
				axios.get('http://localhost:3000/imgs/getMovieImgByMovieId',{
					params: {
						movieId: this.$route.params.movieId,
						curImgType: this.form.type,
					}
				})
				.then( res => {
					this.imgTableData = res.data.rows;
				})
				.catch(function(err){
					console.log(err)
				})
			},
			...mapActions(["asyncGetMovieByMovieID"])
		}
	}
</script>
<style>
	img {
		width: 50px;
		height: 50px;
	}
	.el-upload__tip{
		color: rgba(33, 33, 33, 0.59) !important;
		font-style: italic
	}
</style>