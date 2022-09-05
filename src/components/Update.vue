<template>
    <div class="updateMain">
        <el-card class="box-card">
            <el-form label-position="labelPosition" label-width="100px" model="formLabelAlign" style="max-width: 460px">
                <el-form-item label="昵称">
                    <el-input v-model="updateInfo.nickname" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="updateInfo.email" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="UpdateInfo">修改</el-button>
                </el-form-item>
            </el-form>
            <div id="Box">
                <h3>预览</h3>
                <!--  预览的图片  -->
                <div class="before"></div>
                <!--  裁剪按钮-->
                <el-button @click="sureSava">裁剪</el-button>
                <div class="box">
                    <div class="box_1">
                        <img src="../assets/img/sample.jpg" ref="image">
                    </div>
                    <!--裁剪完的图片-->
                    <div class="box_2" style="display: none;">
                        <img :src="afterImg">
                        <div ref="imgData">{{ afterImg }}</div>
                    </div>

                </div>
            </div>

        </el-card>

    </div>
</template>

<script>
import Cropper from "cropperjs";
import '../../node_modules/cropperjs/dist/cropper.css'
import service from '../axiosChange/axiosconfig.js'
import instance from '../axiosChange/imgAxios.js'
import { getCurrentInstance, ref, onMounted, reactive, toRefs } from "vue";
export default {
    name: 'Update',
    data() {
        return {

            updateInfo: {

            },
            img:{

            }

        }
    },
    props:{
        avater:String
    },
    methods: {
        UpdateInfo() {

            // service({
            //     method: 'post',
            //     url: '/my/userinfo',
            //     data: this.updateInfo,
            // }).then(res => {
            //     console.log(res);
            //     if (res.data.status !== 0) {
            //         return this.$message.error('修改失败！')
            //     }
            //     this.$message.success('修改成功！')
            // }).catch(err => {
            //     this.$message.error('修改失败！')
            // })
                
            this.img.avater = this.imgData.innerText
            console.log(this.img.avater);
            instance({
                method: 'post',
                url: '/my/update/avatar',
                data: 
                    this.imgData.innerText
            }).then(res => {
                console.log(res);
                if (res.data.status !== 0) {
                    return this.$message.error('修改失败！')
                }
                this.$message.success('修改成功！')
            }).catch(err => {
                this.$message.error('修改失败！')
            })

        },

    },
    setup() {

        const imgData = ref(null)
        const Shuju = reactive({
            // 裁剪后的图片
            afterImg: '',
            // 裁剪的图片
            image: null,
            // 进行裁剪
            myCropper: null
        })
        // 页面刷新自动执行
        onMounted(() => {
            Shuju.myCropper = new Cropper(Shuju.image, {
                /*
                * viewMode 视图控制
                  - 0 无限制
                  - 1 限制裁剪框不能超出图片的范围
                  - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
                  - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
                * */
                viewMode: 0,
                // 设置图片是否可以拖拽功能
                /*
                * dragMode 拖拽图片模式
                  - crop 形成新的裁剪框
                  - move 图片可移动
                  - none 什么也没有
                * */
                dragMode: 'move',
                // 是否显示图片后面的网格背景,一般默认为true
                background: true,
                // 进行图片预览的效果
                preview: '.before',
                // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
                autoCropArea: 0.8,
                // 设置图片是否可以进行收缩功能
                zoomOnWheel: true,
                // 是否显示 + 箭头
                center: true
            })
        })
        const sureSava = () => {
            // 拿到裁剪后的图片
            Shuju.afterImg = Shuju.myCropper.getCroppedCanvas({
                imageSmoothingQuality: 'high'
            }).toDataURL('image/jpeg'); // 设置图片格式



        }


        return {
            sureSava,
            imgData,
            ...toRefs(Shuju),

        }
    }



}

</script>

<style lang='less' scoped>
#Box {
    border: 1px silver solid;
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    height: 800px;
}

.before {
    width: 150px;
    height: 150px;
    position: relative;
    left: 150px;
    overflow: hidden;
}

.box {
    display: flex;
    column-gap: 6rem;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    div {
        flex: 1;
        height: 500px;
        background: #ccc;

        img {
            display: block;
        }
    }

    .box_2 {
        img {
            width: 200px;
            margin: 0 auto;
        }
    }
}
</style>
