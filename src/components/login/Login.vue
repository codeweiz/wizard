<template>
  <div>
    <div class="header">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ $t("i18n.chooseLanguage") }}
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zhCn">{{ $t("i18n.zhCn") }}</el-dropdown-item>
            <el-dropdown-item command="en">{{ $t("i18n.en") }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-form :model="loginModel" label-width="120px">
      <el-form-item :label="$t('login.username')">
        <el-input v-model="loginModel.username"/>
      </el-form-item>
      <el-form-item :label="$t('login.password')">
        <el-input v-model="loginModel.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('login.login') }}</el-button>
        <el-button>{{ $t('login.register') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {LoginModel} from "@/components/login/LoginModel";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {login, test1} from "@/http/services";

export default class Login extends Vue {
  loginModel: LoginModel = new LoginModel();

  // 拿到 store 对象
  store = useStore();
  locale = useI18n();

  created(): void {
    console.log("1");
  }

  handleCommand = (value: string): void => {
    (this.locale.locale as any) = value;
    this.store.commit("CHANGE_LANGUAGE", value);
  };

  onSubmit = (): void => {
    login(this.loginModel).then((res) => {
      console.log(res);
    });
    test1().then((res) => {
      console.log(res);
    });
  }
}
</script>

<style scoped>

</style>
