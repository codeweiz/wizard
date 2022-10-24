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
    <div class="registerFormContainer">
      <el-form
          ref="registerFormRef"
          :model="registerFormModel"
          :rules="rules"
          label-width="180px"
          status-icon
          class="registerForm"
      >
        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="registerFormModel.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="registerFormModel.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.confirmPassword')" prop="confirmPassword">
          <el-input v-model="registerFormModel.confirmPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerForm(registerFormRef)">
            {{ $t('login.register') }}
          </el-button>
          <el-button @click="toLogin()">
            {{ $t('login.cancel') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {useRouter} from "vue-router";
import {register} from "@/http/services";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";

// 拿到 store 对象
const store = useStore();
const locale = useI18n();
const router = useRouter();

// 注册表单 ref
const registerFormRef = ref<FormInstance>()

// 注册表单 model reactive
const registerFormModel = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 用户名校验器
const validateUsername = (rule: any, value: nay, callback: any) => {
  if (value === '') {
    callback(new Error(locale.t("loginValidate.usernameCannotBeBlank")));
  }
  callback();
}

// 密码校验器
const validatePassword = (rule: any, value: nay, callback: any) => {
  if (value === '') {
    callback(new Error(locale.t("loginValidate.passwordCannotBeBlank")));
  }
  callback();
}

// 确认密码校验器
const validateConfirmPassword = (rule: any, value: nay, callback: any) => {
  if (value === '') {
    callback(new Error(locale.t("loginValidate.confirmPasswordCannotBeBlank")));
  }
  if (value !== registerFormModel.password) {
    callback(new Error(locale.t("loginValidate.confirmPasswordIsNotEqualToPassword")));
  }
  callback();
}

// 约束
const rules = reactive({
  username: [{required: true, validator: validateUsername, trigger: 'blur'}],
  password: [{required: true, validator: validatePassword, trigger: 'blur'}],
  confirmPassword: [{required: true, validator: validateConfirmPassword, trigger: 'blur'}],
})

// 改变语言
const changeLanguage = (value: string): void => {
  locale.locale.value = value;
  store.commit("CHANGE_LANGUAGE", value);
}

// 注册表单
const registerForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      register(registerFormModel).then((res) => {
        if (res.success) {
          ElMessage({
            message: locale.t("register.registerSuccess"),
            type: "success"
          })
          router.push("/login");
        } else {
          ElMessage({
            message: locale.t("register.registerError"),
            type: "error"
          })
        }
      }).catch((err) => {
        ElMessage({
          message: locale.t("register.registerError"),
          type: "error"
        })
      })
    } else {
      return false;
    }
  })
}

// 跳转登陆页面
const toLogin = () => {
  router.push("login");
}

</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
}

.registerFormContainer {
  display: flex;
  justify-content: center;
}

.registerForm {
  width: 500px;
}

::v-deep(.el-form-item__content) {
  display: flex;
  justify-content: center;
}
</style>
