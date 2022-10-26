<template>
  <div class="home_container">
    <!--  左侧导航栏  -->
    <div class="home_nav">
      <el-menu
          :collapse-transition="false"
          default-active="0"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          @select="handleSelect"
      >
        <el-menu-item index="0">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">角色管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Menu/>
            </el-icon>
            <span>任务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>Navigator Three</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">item one</el-menu-item>
            <el-menu-item index="3-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <setting/>
            </el-icon>
            <span>Navigator Four</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">item one</el-menu-item>
            <el-menu-item index="4-2">item two</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
    <!--  右侧内容栏  -->
    <div :class=" isCollapse ? 'home_content_fold' : 'home_content'">
      <!--  上方抬头栏  -->
      <div class="home_content_header">
        <!--  靠左  -->
        <div class="home_content_header_left">
          <el-icon v-if="!isCollapse" :size="40">
            <Fold @click="toExpand"/>
          </el-icon>
          <el-icon v-if="isCollapse" :size="40">
            <Expand @click="toFold"/>
          </el-icon>
        </div>
        <!--  靠右  -->
        <div class="home_content_header_right_container">
          <div class="home_content_header_right">
            <!--  消息  -->
            <div class="bell_badge_container">
              <el-badge :value="messageCount">
                <el-icon :size="40">
                  <Message/>
                </el-icon>
              </el-badge>
            </div>
            <!--  头像  -->
            <div class="avatar_container">
              <el-dropdown @command="clickAvatarItem">
                <span class="el-dropdown-link">
                  <el-avatar class="avatar" :size="40" :src="circleUrl"/>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="user">
                      <el-icon>
                        <User/>
                      </el-icon>
                      <span>{{ $t("home.avatar.userInfo") }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="language">
                      <el-icon>
                        <Switch/>
                      </el-icon>
                      <span>{{ $t("home.avatar.switchLanguage") }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                      <el-icon>
                        <SwitchButton/>
                      </el-icon>
                      <span>{{ $t("home.avatar.logout") }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="help">
                      <el-icon>
                        <Help/>
                      </el-icon>
                      <span>{{ $t("home.avatar.help") }}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <!--  下方标签栏  -->
      <div class="home_tabs">
        <el-tabs
            v-model="editableTabsValue"
            type="card"
            addable
            class="demo-tabs"
            @edit="handleTabsEdit"
        >
          <el-tab-pane
              key="0"
              label="首页"
              name="0"
          >
            {{ content }}
          </el-tab-pane>
          <el-tab-pane
              closable
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
          >
            {{ item.content }}
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {deleteCookie, getCookie} from "@/utils/cookie";
import {logout} from "@/http/services";

const store = useStore();
const router = useRouter();
const locale = useI18n();

// 消息数量
let messageCount = ref(0);
let content = ref("0");

// 是否展开侧边栏
let isCollapse = ref(false);
let tabIndex = 2;
const editableTabsValue = ref('0');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

onMounted(() => {
  if (getCookie("userInfo") === '') {
    router.push('/login');
  }
})

const handleSelect = (key: string, keyPath: string[]) => {
  content.value = key;
}

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

// 点击展开侧边栏
const toExpand = () => {
  isCollapse.value = true;
}

// 点击收缩侧边栏
const toFold = () => {
  isCollapse.value = false;
}

// 点击头像下的选项
const clickAvatarItem = (command: string | number | object) => {
  switch (command) {
    case 'user':
      ElMessage.success(command.toString());
      return;
    case 'language':
      if (locale.locale.value === 'en') {
        locale.locale.value = 'zhCn';
      } else if (locale.locale.value === 'zhCn') {
        locale.locale.value = 'en';
      }
      store.commit("CHANGE_LANGUAGE", locale.locale.value);
      ElMessage.success(command.toString());
      return;
    case 'logout':
      logout().then((res) => {
        if (res.success) {
          deleteCookie("userInfo");
          router.push("/login");
          ElMessage.success('登出成功');
        } else {
          ElMessage.error(res.error);
        }
      }).catch(error => {
        ElMessage.error('登出失败');
      })
      return;
    case 'help':
      ElMessage.success(command.toString());
      return;
  }
}

</script>

<style scoped>
.home_container {
  height: 100%;
  display: flex;
}

.home_nav {
  height: 100%;
  overflow-y: auto;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.home_content {
  width: calc(100% - 200px);
  height: 100%;
}

.home_content_fold {
  width: calc(100% - 64px);
  height: 100%;
}

.home_content_header {
  display: flex;
  align-items: center;
  background: aliceblue;
  height: 60px;
}

.home_content_header_left {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.home_content_header_right_container {
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 40px);
}

.home_content_header_right {
  display: flex;
  align-items: center;
}

.bell_badge_container {
  margin-right: 40px;
}

.bell_badge {
}

.avatar_container {
  margin: 0 20px 0 0;
}

.avatar {

}

::v-deep(.el-badge) {
  display: flex;
  justify-content: center;
}
</style>
