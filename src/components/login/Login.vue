<template>
  <div class="login_container">
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

    <div class="login_form_container">
      <div class="login_form_container_content">
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
          <el-form-item :label="$t('login.captchaCode')" prop="captchaCode">
            <el-input style="width: 220px; margin-right: 20px;" v-model="loginModel.captchaCode" autocomplete="off"/>
            <img :src=captchaModel.img @click="getCode" class="captcha_image" alt=""/>
          </el-form-item>
          <div class="login_btn">
            <el-button type="primary" @click="loginForm(ruleFormRef)">{{ $t('login.login') }}</el-button>
            <el-button @click="toRegister()">{{ $t('login.register') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {getCaptchaCode, login} from "@/http/services";
import {ElMessage, FormInstance} from "element-plus";
import {onMounted, reactive, ref} from "vue";
import {addCookie} from "@/utils/cookie";
import {useRouter} from "vue-router";

// store
const store = useStore();
// 国际化
const locale = useI18n();
// 路由
const router = useRouter();

// 表单
const ruleFormRef = ref<FormInstance>();

// 登陆模型
const loginModel = reactive({
  username: '',
  password: '',
  captchaCode: '',
  uuid: ''
});

// 验证码模型
let captchaModel = reactive({
  img: '',
  uuid: ''
})

onMounted(() => {
  // 获取验证码
  getCode();
})

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

// 验证码校验器
const validateCaptchaCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(locale.t("loginValidate.captchaCodeCannotBeBlank")));
  }
  callback();
}

const rules = reactive({
  username: [{required: true, validator: validateUsername, trigger: 'blur'}],
  password: [{required: true, validator: validatePassword, trigger: 'blur'}],
  captchaCode: [{required: true, validator: validateCaptchaCode, trigger: 'blur'}],
})

// 改变语言
const changeLanguage = (value: string): void => {
  locale.locale.value = value;
  store.commit("CHANGE_LANGUAGE", value);
}

// 获取验证码
const getCode = () => {
  getCaptchaCode().then((res) => {
    if (res.code === 200) {
      captchaModel.img = "data:image/gif;base64," + res.img;
      captchaModel.uuid = res.uuid;
      loginModel.uuid = res.uuid;
    }
  })
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
          addCookie('userInfo', res.data.access_token, res.data.expires_in * 60);
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

// 跳转登陆页面
const toRegister = () => {
  router.push("/register");
}

</script>

<style scoped>
.login_container {
  height: 100%;
}

.header {
  display: flex;
  justify-content: flex-end;
  height: 16px;
}

.login_form_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 16px);
}

.login_form_container_content {
  display: flex;
  justify-content: center;
}

.loginForm {
  width: 500px;
}

.captcha_image {
  height: 30px;
}

.login_btn {
  display: flex;
  justify-content: center;
  margin: 0 0 0 180px;
}
</style>
