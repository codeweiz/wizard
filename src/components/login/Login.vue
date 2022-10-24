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

    <div>
      <el-form
          ref="ruleFormRef"
          :model="loginModel"
          :rules="rules"
          label-width="120px"
          style="width: 500px">
        <el-form-item :label="$t('login.username')" prop="username">
          <el-input v-model="loginModel.username"/>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="loginModel.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(ruleFormRef)">{{ $t('login.login') }}</el-button>
          <el-button>{{ $t('login.register') }}</el-button>
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

// 拿到 store 对象
const store = useStore();
const locale = useI18n();

const ruleFormRef = ref<FormInstance>();

const loginModel = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{required: true, message: "用户名不能为空", trigger: 'blur'}],
  password: [{required: true, message: "密码不能为空", trigger: 'blur'}]
})

// 改变语言
const changeLanguage = (value: string): void => {
  locale.locale.value = value;
  store.commit("CHANGE_LANGUAGE", value);
}

// 登陆
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      login(loginModel).then((res) => {
        if (res.success) {
          addCookie('Authorization', res.data.access_token, res.data.expires_in);
          ElMessage({
            message: '登陆成功',
            type: 'success',
          });
        } else {
          ElMessage({
            message: '登陆失败',
            type: 'error',
          });
        }
      }).catch(error => {
        ElMessage({
          message: '登陆失败',
          type: 'error',
        });
      });
    } else {
      return false;
    }
  })
}

</script>

<style scoped>
</style>
