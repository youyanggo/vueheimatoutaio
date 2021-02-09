<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header"  class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.id ? '修改文章': '发布文章'}}</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div>
        <el-form  ref="publish-form"
        :rules="fromRules"
        :model="article" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
               <el-tiptap
                         v-model="article.content"
                    :extensions="extensions"
                    lang="zh"
                    height="400"
                    placeholder="请输入文章内容"
                  />
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <template v-if="article.cover.type > 0">
            <UploadCover
           v-model="article.cover.images[index]"
             v-for="(cover,index) in article.cover.type" :key="cover"></UploadCover></template>
          </el-form-item>
          <el-form-item  prop="channel_ids" label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option   :label="channeled.name" :value="channeled.id" v-for="(channeled,index) in channels" :key="index"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onpublish(false)">发表</el-button>
            <el-button @click="onpublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import UploadCover from './compont/uploads.vue'
import uploadimage from '@/api/image.js'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Image
} from 'element-tiptap'
import { getArticlesChannels, addArticles, getArticle, updatasArticle } from '@/api/article.js'
import 'element-tiptap/lib/index.css'
export default {
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  name: 'publishIndex',
  data () {
    return {
      article: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: null,
          images: []
        }
      },
      channels: [],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadimage(fd).then(res => {
              return res.data.data.url
            })
          }
        })
      ],
      fromRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }],
        content: [{
          validator (rule, value, callback) {
            if (value === '<p></p>') {
              callback(new Error('请输入文章内容'))
            } else {
              callback()
            }
          }
        },
        { required: true, message: '请输入文章标题', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.loadChannel()
    if (this.$route.query.id) {
      this.loadArticless()
    }
  },
  methods: {
    upadata (index, url) {
      console.log(index, url)
      this.article.cover.images[index] = url
    },
    loadChannel () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onpublish (draft) {
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        if (this.$route.query.id) {
          updatasArticle(this.$route.query.id, this.article, draft).then(res => {
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
          addArticles(this.article, draft).then(res => {
            this.$message({
              message: '发布成功',
              type: 'success'
            })
          })
        }
      })
    },
    loadArticless () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>
<style>
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .box-card {
      width: 100%;
    }
    .publish-container {
      display: flex;
      weight: 100%;
    }
</style>
