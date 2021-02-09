<template>
  <div class="uplaod">
    <div class="imag-sag" @click="showCoverSelect">
      <img class="cover-img" :src="value"
      ref="cover-image"  style="width: 150px; height: 120px;" >
    </div>
   <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    append-to-body>
     <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="用户管理" name="first">
          <image-list
          ref="image-list"
          ></image-list>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          SCTPNR
          <input type="file" ref="file"  @change="yulanshijian">
          <img src="" width="200" alt=""
          ref='preview-image'
           >
        </el-tab-pane>
      </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import ImageList from '@/views/image/compont/index.vue'
import { uploadimage } from '@/api/image.js'
export default {
  components: {
    ImageList
  },
  props: ['value'],
  name: 'UploadCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      file: ''
    }
  },
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    yulanshijian () {
      console.log('file change')
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
    },
    onCoverConfirm (selected) {
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message('qingxuanzhewenjian')
        }
        const file = this.$refs.file.files[0]
        const fd = new FormData()
        fd.append('image', file)
        uploadimage(fd).then(res => {
          console.log(res)
          this.dialogVisible = false
          this.$refs['cover-image'].src = res.data.data.url
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        this.dialogVisible = false
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (!selected) {
          this.$message('qingxuanzhezhefengmiaqntupian')
        }
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}
</script>
<style scoped>
.imag-sag {
  width: 150px;
  height: 120px;
  border: 1px solid black;
  .cover-img {
    height: 120px;
    max-width: 100%;
  }
}
</style>
