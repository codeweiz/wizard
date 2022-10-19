<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <el-form :model="loginModel" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="loginModel.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginModel.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {LoginModel} from "../components/login/LoginModel";

@Options({
  components: {
  },
})
export default class Home extends Vue {
  loginModel: LoginModel = new LoginModel();

  onSubmit = (): void => {
    console.log(this.loginModel);
  }
}
</script>
