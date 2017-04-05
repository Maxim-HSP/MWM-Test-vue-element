<template>
<div>
	<el-row type="flex" justify="center" class="row-bg-content">
		<el-col :span="6">
			<div class="grid-content textCenter">- Add Schedule -</div>
		</el-col>
	</el-row>
	<el-row type="flex" justify="center">
  <el-col :span="16">
  	<el-form ref="form" :model="form" label-width="90px">
  	
		<el-form-item label="电影名称">
			<el-select v-model="form.movieID" placeholder="点击选择电影" style="width:100%">
				<el-option					
					v-for="item in movieList.rows" 					
					:key="item._id" 					
					:value="item._id" 					
					:label="`${item.cName} (${item.duration})`">
					<span class="leftSpan">{{item.cName}}</span>
      		<span class="rightSpan">{{item.duration}}</span>
				</el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="放映时间">
			<el-date-picker
				style="width:100%"
				v-model="form.showTime"
				type="datetime"
				format="yyyy-MM-dd HH:mm:ss"
				placeholder="选择日期时间">
    	</el-date-picker>
		</el-form-item>
		
		<el-form-item label="影院名称">
			<el-select v-model="form.studioID" placeholder="点击选择影院" style="width:100%" @change="getTheater">
				<el-option					
					v-for="item in studioList" 					
					:key="item._id" 					
					:value="item._id" 					
					:label="item.name">
					<span class="leftSpan">{{item.name}}</span>
      		<span class="rightSpan">{{item.address}}</span>
				</el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="放映厅名称">
			<el-select v-model="form.theaterID" placeholder="请先选择影院" style="width:100%" v-if="form.studioID == ''" :disabled="true">
			</el-select>
			<el-select v-model="form.theaterID" placeholder="点击选择放映厅" style="width:100%" v-else>
				<el-option					
					v-for="(item,index) in theaterList.rows" 					
					:key="item._id" 					
					:value="item._id" 					
					:label="item.name">
					<span class="leftSpan">{{item.name}}</span>
      		<span class="rightSpan">{{item.index}}</span>
				</el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="票价(元)">
    	<el-input v-model="form.price" placeholder="请输入数字"></el-input>
  	</el-form-item>
		
		<el-form-item>
			<el-button type="primary" icon="circle-check" @click="onSubmit" :disabled="resSubmit">立即创建</el-button>
			<el-button type="danger" icon="delete" :plain="true" @click="clear">清空</el-button>
		</el-form-item>
		
	</el-form>
  </el-col>
</el-row>
	
</div>
</template>

<script>
	import {mapState,mapMutations,mapActions} from "vuex"
	import "babel-polyfill"
	
	
	export default {
		name:"addSchedule",
    data() {
      return {
        form: {
          movieID: "",
          showTime: "",
          studioID: "",
          theaterID: "",
          price: "",
        }
      }
    },
		created(){
			this.asyncGetMovies();
			this.asyncGetStudios();
		},
		computed:{
			resSubmit(){
				for(var key in this.form){
					if(this.form[key] == ""){
						return true
					}
				}
			},
			...mapState([
				"movieList",
				"studioList",
				"theaterList",
				"addScheduleSuc"
			])
		},
    methods: {
      async onSubmit() {
				await this.asyncAddSchedule(this.form);
				//消息弹框
				if(this.addScheduleSuc){
					this.$message.success('添加成功')
				}else{
					this.$message.error('添加失败')
				}
      },
			getTheater(){
				this.form.theaterID = ""
				this.asyncGetTheatersByStudioID({studioID:this.form.studioID});
				
			},
			clear(){
				for(var key in this.form){
					this.form[key] = ""
				}
			},
			...mapActions([
				"asyncGetMovies",
				"asyncGetStudios",
				"asyncGetTheatersByStudioID",
				"asyncAddSchedule"
			])
    }
  }
</script>

<style>
	.leftSpan {
		float: left;
		padding-right: 10px
	}
	.rightSpan {
		float: right;
		color: #8492a6;
		font-size: 13px;
	}
</style>