<template>
  <div class="image-cointain">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>  <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb></span>
         </div>
         <div style="padding-bottom:  20px;"  class="claassa">
        <el-radio-group v-model="collect" size="mini" @change="loaddImages(1)">
          <el-radio-button @click.native="loaddImages(false)"
          label="false">全部</el-radio-button>
          <el-radio-button
           @click.native="loaddImages(true)"
           label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button size="mini" @click="dialogTableVisible = true" type="success">上传素材</el-button>
       </div>
       <el-row :gutter="20">
         <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(image, index) in images" :key="index" class="image-item">
           <el-image
         style="height: 200px;"
      :src="image.url"
     ></el-image >
       <div class="image-action">
         <i :class="{
           'el-icon-star-on': image.is_collected,
           'el-icon-star-off': !image.is_collected
           }"
           @click="oncollectedd(image)"></i>
         <i class="el-icon-delete-solid" @click="deleladasdimage(image)"></i>
       </div>
     </el-col>
       </el-row>
       <el-pagination
         background
         layout="prev, pager, next"
         :total="totalCount"
         :page-size="pageSize"
        @current-change="onpagessss"
         :current-page.sync="page"
         >
       </el-pagination>
    </el-card>
    <el-dialog title="上传素材" :visible.sync="dialogTableVisible"  :append-to-body="true" >
      <div>
      <el-upload
      class="imggeupimahge"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadheaders"
        name="image"
        :on-success="onpusuceess"
        multiple>
        <div >将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import { getimageed, collexteimageed, deleteimgea } from '@/api/image.js'
export default {
  name: 'imageIndex',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      radio1: '全部',
      images: [],
      collect: false,
      dialogTableVisible: false,
      uploadheaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 5,
      page: 1
    }
  },
  created () {
    this.loaddImages(1, false)
  },
  methods: {
    loaddImages (page, collect = false) {
      this.page = page
      getimageed({
        collect: this.collect,
        page,
        per_page: 5
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onpusuceess () {
      this.dialogTableVisible = false
      this.loaddImages(false)
    },
    onpagessss (page) {
      this.loaddImages(page)
    },
    oncollectedd (image) {
      collexteimageed(image.id, !image.is_collected).then(res => {
        image.is_collected = !image.is_collected
      })
    },
    deleladasdimage (image) {
      deleteimgea(image.id).then(res => {
        this.loaddImages(this.page)
      })
    }
  }
}
</script>
<style>
.claassa {
  display: flex;
  justify-content: space-between;
}
.image-action {
  height:40px;
  background-color: rgb(204, 204, 204, 0.5);
  position: absolute;
  bottom: 4px;
  left: 10px;
  right: 10px;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  cursor: pointer;
}
.image-item{
  position: relative;
}
</style>
