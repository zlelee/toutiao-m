<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-cell title="头像" is-link @click="isShowUpdatePhoto=true">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowUpdateBirthdy = true"
    />
    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      style="height: 100%"
    >
      <update-name
        @update-user_name="updateUserName"
        :value="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 编辑性别弹层 -->
    <van-popup
      v-if="isShowUpdateGender"
      v-model="isShowUpdateGender"
      position="bottom"
    >
      <update-gender
        @update-gender="updateGender"
        @close="isShowUpdateGender = false"
        :value="user.gender"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <update-birthday v-model="user.birthday" @close="isShowUpdateBirthdy=false"/>
    </van-popup>
    <!-- 编辑生日弹层 -->
    <!-- 编辑头像弹层 -->
    <van-popup v-model="isShowUpdatePhoto" position="bottom" style="height: 100%">
      <update-photo  v-model="user.photo" @close="isShowUpdatePhoto=false"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      isShowUpdatePhoto: false
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
      }
    },
    updateUserName(newName) {
      this.isUpdateNameShow = false
      this.user.name = newName
    },
    updateGender(newGender) {
      this.isShowUpdateGender = false
      this.user.gender = newGender
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
