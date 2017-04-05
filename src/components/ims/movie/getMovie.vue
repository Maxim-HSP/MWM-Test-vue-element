<template>
<div>
		<el-row type="flex" justify="center" class="row-bg-content">
			<el-col :span="6">
				<div class="grid-content textCenter">- Movie List -</div>
			</el-col>
		</el-row>
	<el-row type="flex" justify="center">
		<el-col :span="16">
			<el-table :data="movieList.rows" border style="width: 100%">
				<el-table-column prop="cName" sortable label="电影名称" width="200" fixed></el-table-column>
				<el-table-column prop="eName" sortable label="英文名称" width="200"></el-table-column>
				<el-table-column prop="type" sortable label="电影类型" width="120"></el-table-column>
				<el-table-column prop="duration" sortable label="片长" width="100"></el-table-column>
				<el-table-column prop="country" sortable label="制片国家" width="130"></el-table-column>
				<el-table-column prop="release" sortable label="上映时间" width="200"></el-table-column>
				<el-table-column label="操作"  width="155" fixed="right">
					 <template scope="scope">
					 	<el-button 
							@click="saveMovie(scope.row),dialogFormVisible=true"
						  type="primary" 
							icon="edit" 
							size="mini">修改</el-button>
						<el-button 
							@click.native.prevent="deleteRow(scope.row._id)" 
							type="danger" 
							icon="delete" 
							size="mini"
							:plain="true">删除</el-button>
						</template>
				</el-table-column>
			</el-table>
			
			<!--分页-->
			<div class="block">
				<el-pagination
				  @current-change="handleCurrentChange"
				  :current-page=1
				  :page-size=10
				  layout="prev, pager, next, jumper"
				  :total="movieList.total">
				</el-pagination>
		  	</div>
		</el-col>
		<!--修改-->
		<el-dialog title="电影详情修改" v-model="dialogFormVisible">
			<el-form :model="setmovie" label-width="80px">
				<el-form-item label="中文名">
					<el-input v-model="setmovie.cName"></el-input>
				</el-form-item>
				<el-form-item label="英文名">
					<el-input v-model="setmovie.eName"></el-input>
				</el-form-item>
				<el-form-item label="影片类型">
					<el-input v-model="setmovie.type"></el-input>
				</el-form-item>
				<el-form-item label="制片国家">
					<el-input v-model="setmovie.country"></el-input>
				</el-form-item>
				<el-form-item label="片长">
					<el-input v-model="setmovie.duration"></el-input>
				</el-form-item>
				<el-form-item label="上映时间">
					<el-input v-model="setmovie.release"></el-input>
				</el-form-item>
				<el-form-item label="剧情简介">
					<el-input type="textarea" autosize v-model="setmovie.synopsis"></el-input>
				</el-form-item>
				<el-button type="success" icon="circle-check" @click="updateMovie">保存</el-button>
				<el-button type="danger" icon="circle-close" @click="dialogFormVisible=false">取消</el-button>
				<el-button type="warning" icon="upload2" @click="toImg">修改图片</el-button>
			</el-form>
		</el-dialog>
	</el-row>
</div>
</template>
<script>
	import { mapActions,mapState,mapMutations } from "vuex";
	import "babel-polyfill"
	import router from "../../../router/router.js"
	
	export default{
		name:"getMovie",
		data(){
			return{
				dialogFormVisible:false,
				setmovie:{}
			}
		},
		computed:{...mapState(["movieList","delMovieSuc","upMovieSuc"])},
		created(){
			this.asyncGetMoviesByPage()
		},
		methods:{
			//分页
			handleCurrentChange(page) {
				this.setMovieListPage(page);
				this.asyncGetMoviesByPage()
			},
			//删除
			async deleteRow(_id) {
				await this.asyncdeleteMovie(_id);
				if(this.delMovieSuc){
					this.$message({
						showClose: true,
						message: '删除成功',
						type: 'success'
					})
				};
				this.asyncGetMoviesByPage();
			},
			//更新电影
			async updateMovie(){
				await this.asyncupdateMovie(this.setmovie);
				if(this.upMovieSuc){
					this.$message({
						showClose: true,
						message: '保存成功',
						type: 'success'
					})
				}else{
					this.$message({
						showClose: true,
						message: '修改失败',
						type: 'success'
					})
				}
				this.dialogFormVisible=false
				this.asyncGetMoviesByPage()
			},
			saveMovie(movie){
				this.setmovie.cName=movie.cName;
				this.setmovie.eName=movie.eName;
				this.setmovie.type=movie.type;
				this.setmovie.country=movie.country;
				this.setmovie.duration=movie.duration;
				this.setmovie.release=movie.release;
				this.setmovie.synopsis=movie.synopsis;
				this.setmovie._id=movie._id
			},	
			toImg(){
				router.push(`movieImg/${this.setmovie._id}`);
			},
			...mapMutations(["setMovieListPage"]),
			...mapActions([
				"asyncdeleteMovie",
				"asyncGetMoviesByPage",
				"asyncupdateMovie"
			]),
		}
	}
</script>
<style>
</style>