<template>
  <div class="compont">
        <el-radio-group v-model="collect" size="mini" @change="loaddImages(1)">
          <el-radio-button @click.native="loaddImages(false)"
          label="false">全部</el-radio-button>
          <el-radio-button
           @click.native="loaddImages(true)"
           label="true">收藏</el-radio-button>
          </el-radio-group>
       <el-row :gutter="20">
         <el-col   :xs="12" :sm="6" :md="6" :lg="4" v-for="(image, index) in images" :key="index" class="image-item">
           <el-image
      :src="image.url"
      @click.native="selected = index"
       style="width:120px; height: 120px;  position: relative; "></el-image >
 <div v-if="selected === index"
        class="selectyaus"></div>
     </el-col>
       </el-row>
       <el-pagination
          background
         layout="prev, pager, next"
         :total="totalCount"
         :page-size="pageSize"
        @current-change="onpagessss"
         :current-page.sync="page">
       </el-pagination>
       <div>悠然飘扬</div>
 </div>
</template>
<script>
import { getimageed, collexteimageed, deleteimgea } from '@/api/image.js'
export default {
  name: 'comppntIndex',
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
      pageSize: 8,
      page: 1,
      selected: null
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
        per_page: 8
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
<style lang="less" scoped >
  .claassa {
    display: flex;
    justify-content: space-between;
 }
 .selectyaus{
 height: 120px;
 width: 120px;
 background-color: navajowhite; opacity: 0.5 ; position: absolute;
 left: 0; right: 0; top: 0; bottom: 0;}
</style>
