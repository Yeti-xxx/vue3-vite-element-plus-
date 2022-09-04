<template>
    <div class="main">
        <el-container>
            <el-header style="background:#ffffff">
                <div class="block">
                    <el-avatar class="avater" :size="50" :src="userInfo.user_pic" />
                    <span class="nickname">{{ userInfo.nickname }}</span>
                </div>
                <div class="loginOutBox">
                    <el-link type="danger" class="loginOut" @click="loginOut">退出登录</el-link>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-row class="AsideMenu">
                        <el-col :span="24">
                            <el-menu default-active="2" class="el-menu-vertical-demo AsideMenu" @open="handleOpen"
                                @close="handleClose">
                               
                                <el-menu-item index="2">
                                    <el-icon>
                                        <icon-menu />
                                    </el-icon>
                                    <span @click="UserCenter">用户中心</span>
                                </el-menu-item>
                                <el-menu-item index="4">
                                    <el-icon>
                                        <setting />
                                    </el-icon>
                                    <span>Navigator Four</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import service from '../axiosChange/axiosconfig.js'
export default {
    name: 'Home',
    data() {
        return {
            userInfo: {

            }
        }
    },
    created() {
        this.getUserInfo()

    },
    mounted(){
        this.UserCenter()
    },
    methods: {
        getUserInfo() {
            service({
                methods: 'get',
                url: '/my/userinfo'
            }).then(res => {
                if (res.data.status !== 0) {
                    return this.$message.error('获取用户信息失败')
                } else {
                    this.userInfo = res.data.data

                }
            })
        },
        loginOut() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
        UserCenter(){
            this.$router.push('/home/userinfo')
        }
    }
}

</script>

<style lang='less' scoped>
.main,
.el-container {

    height: 100%;
    width: 100%;
}

.el-header {
    border-top: 1px solid #eee;
    border-bottom: 2px solid #eee;
}

.AsideMenu {
    height: 100%;
}

.block {
    width: 200px;
    margin-top: 5px;
    margin-right: 100px;
    float: right;
}

.loginOutBox {
    float: right;
    text-align: center;
    margin-top: 19px;
    margin-right: -269px;

}

.loginOut {
    font-size: 17px;
}

.nickname {
    margin-top: -38px;
    margin-left: 64px;
    display: block;
    height: 100%;

}
</style>
