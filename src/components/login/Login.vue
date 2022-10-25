<template>
  <div>
    <div class="header">
      <el-dropdown @command="changeLanguage">
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

    <div class="loginFormContainer">
      <el-form
          ref="ruleFormRef"
          :model="loginModel"
          :rules="rules"
          label-width="180px"
          class="loginForm">
        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="loginModel.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="loginModel.password" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginForm(ruleFormRef)">{{ $t('login.login') }}</el-button>
          <el-button @click="toRegister()">{{ $t('login.register') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {login} from "@/http/services";
import {ElMessage, FormInstance} from "element-plus";
import {reactive, ref} from "vue";
import {addCookie} from "@/utils/cookie";
import {useRouter} from "vue-router";

// 拿到 store 对象
const store = useStore();
const locale = useI18n();
const router = useRouter();

const ruleFormRef = ref<FormInstance>();

const loginModel = reactive({
  username: '',
  password: ''
});

// 用户名校验器
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(locale.t("loginValidate.usernameCannotBeBlank")));
  }
  callback();
}

// 密码校验器
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(locale.t("loginValidate.passwordCannotBeBlank")));
  }
  callback();
}

const rules = reactive({
  username: [{required: true, validator: validateUsername, trigger: 'blur'}],
  password: [{required: true, validator: validatePassword, trigger: 'blur'}],
})

// 改变语言
const changeLanguage = (value: string): void => {
  locale.locale.value = value;
  store.commit("CHANGE_LANGUAGE", value);
}

// 登陆
const loginForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      login(loginModel).then((res) => {
        if (res.success) {
          addCookie('userInfo', res.data.access_token, res.data.expires_in);
          ElMessage({
            message: locale.t("login.loginSuccess"),
            type: 'success',
          });
          router.push("/");
        } else {
          ElMessage({
            message: locale.t("login.loginError"),
            type: 'error',
          });
        }
      }).catch(error => {
        ElMessage({
          message: locale.t("login.loginError"),
          type: 'error',
        });
      });
    } else {
      return false;
    }
  })
}

// 挑战登陆页面
const toRegister = () => {
  router.push("/register");
}

</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
}

.loginFormContainer {
  display: flex;
  justify-content: center;
}

.loginForm {
  width: 500px;
}

::v-deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
}
</style>
