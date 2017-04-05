<template>
	<div>
		<el-row type="flex" justify="center" class="row-bg-content">
			<el-col :span="6">
				<div class="grid-content textCenter">- Schedule List -</div>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
		<el-col :span="20">
			<!--选择区域-->
			<el-form ref="form" :model="form" label-width="90px">
			<el-row type="flex" justify="center">
				<!--电影-->
				<el-col :span="8">
				<el-form-item label="电影名称">
					<el-select v-model="form.movieID" placeholder="点击选择电影" style="width:100%">
						<el-option					
							v-for="item in movieList.rows" 					
							:key="item._id" 					
							:value="item._id" 					
							:label="`${item.cName} (${item.duration})`">
							<span class="leftSpan">{{item.cName}}</span>
							<span class="rightSpan">{{item.eName}}</span>
						</el-option>
					</el-select>
				</el-form-item>
				</el-col>
				<!--时间-->
				<el-col :span="8">
				<el-form-item label="放映时间">
					<el-date-picker
						style="width:100%"
						v-model="form.showTime"
						type="datetime"
						format="yyyy-MM-dd HH:mm:ss"
						placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				</el-col>
				<!--影院-->
				<el-col :span="8">
				<el-form-item label="选择影院">
					<el-select 
						v-model="form.studioID" 
						placeholder="点击选择影院" 
						style="width:100%" 
						v-if="isGetStudio" 
						v-loading="gettingStudio"
						@change="getSchedules">
						<el-option					
							v-for="item in studioList"
							:key="item._id" 					
							:value="item._id" 					
							:label="item.name">
							<span class="leftSpan">{{item.name}}</span>
							<span class="rightSpan">{{item.address}}</span>
						</el-option>
					</el-select>
					<el-select v-model="form.studioID" placeholder="请先确定电影与时间" style="width:100%" :disabled="true" v-else>
					</el-select>
				</el-form-item>
				</el-col>
			</el-row>
			</el-form>
			<!--列表区域-->
			<el-row type="flex" justify="center">
			<el-table
				:data="scheduleList"
				border
				style="width: 1150px"
				height="600"
				:default-sort = "{prop: 'showTime', order: 'descending'}"
				v-loading="gettingSchedule">
				<el-table-column
					fixed
					prop="showTime"
					sortable
					label="放映日期"
					width="200">
				</el-table-column>
				<el-table-column
					prop="movieID.cName"
					label="片名"
					width="190">
				</el-table-column>
				<el-table-column
					prop="movieID.duration"
					label="时长"
					width="90">
				</el-table-column>
				<el-table-column
					prop="movieID.type"
					label="类型"
					width="150">
				</el-table-column>
				<el-table-column
					prop="studioID.address"
					label="影院地址"
					width="300">
				</el-table-column>
				<el-table-column
					prop="theaterID.name"
					label="放映厅"
					width="120"
					fixed="right">
				</el-table-column>
				<el-table-column
					prop="price"
					label="票价"
					width="70"
					fixed="right">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="70">
					<template scope="scope">
						<el-button 
						:plain="true" 
						type="danger" 
						size="small" 
						@click="deleteSchedule(scope.row._id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			</el-row>
		</el-col>
		</el-row>
	</div>
</template>

<script>
	import {mapState,mapMutations,mapActions} from "vuex"
	import "babel-polyfill"
	
	export default {
		name:"scheduleList",
    data() {
      return {
        form: {
          movieID: "",
          showTime: "",
          studioID: ""
        },
				scheduleID: "",
				gettingStudio:false,
				gettingSchedule:false
      }
    },
		created(){
			this.asyncGetMovies();
			this.setScheduleList([]);
		},
		computed:{
			isGetStudio(){
				if(this.form.movieID !== "" && this.form.showTime!== ""){
					this.form.studioID = "";
					this.setScheduleList([])
					this.getStudios();
					return true
				}else{
					return false
				}
			},
			...mapState([
				"movieList",
				"studioList",
				"scheduleList",
				"delScheduleSuc"
			])
		},
    methods: {
      async getSchedules() {
				this.gettingSchedule = true
				this.setScheduleList([])
				await setTimeout(()=>{
					this.asyncGetSchduleByMSTime(this.form);
					this.gettingSchedule = false
				},800)
      },
			async getStudios(){
				this.gettingStudio = true
				await setTimeout(()=>{
					this.asyncGetStudiosByMovieID({
						movieID:this.form.movieID,
						time:this.form.showTime
					});
					this.gettingStudio = false
				},800)
			},
			deleteSchedule(_id){
				this.$msgbox({
          title: '警告',
					type: 'warning',
          message: '将会永久删除该条排片信息！是否继续？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(async() => {
								await this.asyncDeleteByScheduleID(_id);
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 800);
            } else {
              done();
            }
          }
        }).then(action => {
					if(action == 'confirm'){
						if(this.delScheduleSuc){
							this.$message.success('删除成功！');
							this.getSchedules()
						}else{
							this.$message.error('删除失败...！');
							this.getSchedules()
						}
					}else{
						this.$message.info('取消删除');
					}
        });
			},
			...mapMutations(["setScheduleList"]),
			...mapActions([
				"asyncGetMovies",
				"asyncGetStudios",
				"asyncGetStudiosByMovieID",
				"asyncGetSchduleByMSTime",
				"asyncDeleteByScheduleID"
			])
    }
  }
</script>

<style>

</style>
