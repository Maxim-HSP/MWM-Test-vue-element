<template>
<div>
	<el-row type="flex" justify="center" class="row-bg-content">
		<el-col :span="6">
			<div class="grid-content textCenter">- Add Movie -</div>
		</el-col>
	</el-row>
	<el-row type="flex" justify="center">
		<el-col :span="16">
			<el-form ref="form" :model="movie">
				<el-form-item>
					<el-input v-model="movie.cName" placeholder="请输入影片中文名">
						<template slot="prepend">中文名称</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="movie.eName" placeholder="En Title">
						<template slot="prepend">英文名称</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="movie.type" placeholder="请用“、”号隔开">
						<template slot="prepend">影片类型</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="movie.country" placeholder="请用“、”号隔开">
						<template slot="prepend">制片国家</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="movie.duration" placeholder="单位：分">
						<template slot="prepend">影片时长</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="movie.release" placeholder="格式： 2017-01-01 上映地点">
						<template slot="prepend">上映时间</template>
					</el-input>
				</el-form-item>
				<el-form-item label="剧情简介">
					<el-input type="textarea" :rows="6" v-model="movie.synopsis"></el-input>
				</el-form-item>
				<el-form-item label="图片上传">
					<el-button 
						:disabled="!addMovieSuc" 
						type="success" 
						@click="uploadBtn">{{addMovieSuc ? `在《${addMovieName}》条目中添加图片` : "未创建影片条目"}}
						<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<span class="el-upload__tip" v-if="!addMovieSuc"> 添加电影后才能上传图片</span>
				</el-form-item>
				<el-button 
					type="primary" 
					icon="circle-check" 
					@click="addMovie" 
					:disabled="isInputEmpty">立即创建
				</el-button>
				<el-button 
					type="danger" 
					icon="circle-cross" 
					:plain="true" 
					@click="resetBtn">清空</el-button>
			</el-form>
		</el-col>
	</el-row>
</div>
</template>
<script>
	import { mapState,mapMutations,mapActions } from "vuex";
	import "babel-polyfill";
	import router from "../../../router/router.js"
	
	export default{
		name:"addMovie",
		data(){
			return{
				movie:{
					cName:"",
					eName:"",
					type:"",
					country:"",
					duration:"",
					release:"",
					synopsis:""
				}
			}
		},
		created(){
			this.setAddMovieSuc({
				addMovieSuc:false
			})
		},
		computed:{
			isInputEmpty(){
				for(var key in this.movie){
					if(this.movie[key] == ""){
						return true
					}
				}
			},
			...mapState(["addMovieSuc","addMovieID","addMovieName"])
		},
		methods:{
			//重置按钮
			resetBtn(){
				for(var key in this.movie){
					this.movie[key]=""
				}
			},
			//跳转图片上传
			uploadBtn(){
				router.push(`movieImg/${this.addMovieID}`);
			},
			//新增按钮
			async addMovie(){
				await this.asyncAddMovie(this.movie);
				if(this.addMovieSuc){
					this.$message.success('新增成功');
				}
			},
			...mapActions(["asyncAddMovie"]),
			...mapMutations(["setAddMovieSuc"])
		}
	}
</script>
<style>
	.el-upload__tip{
		color: rgba(33, 33, 33, 0.59) !important;
		font-style: italic
	}
</style>