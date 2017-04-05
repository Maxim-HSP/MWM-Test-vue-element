<template>
	<div>
		<el-row type="flex" justify="center" align="middle" class="Content">
			<el-col :span="15" class="textCenter">
				<div class="grid-content bg-purple" v-if="isLogin">
						<h3>登录成功!</h3>
						<p>用户:{{loginUser}}</p>
				</div>
				<div class="grid-content bg-purple" v-else>
						<h3>请先登录!</h3>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import router from "../../router/router.js";
import {mapState,mapMutations,mapActions} from "vuex"
  
export default {
  name: 'loginFailedPage',
	computed:{
		...mapState(["isLogin","loginUser"])
	},
	created(){
		if(this.isLogin){
			this.gotoInfo();
		}else{
			this.backToLogin();
		}
	},
	methods:{
		backToLogin(){
			setTimeout(()=>{
				router.push("/login")
			},1500)
		},
		gotoInfo(){
			setTimeout(()=>{
				router.push("/info")
			},1500)
		}
	}
}
</script>

<style>
   
</style>
