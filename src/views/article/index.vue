<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
      <span>  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb></span>
      </div>
      <el-form :model="ruleForm"  label-width="100px" class="demo-ruleForm" size="mini">
       <el-form-item label="状态">
         <el-radio-group v-model="status">
           <el-radio   :label="null">全部</el-radio>
           <el-radio :label="0">草稿</el-radio>
           <el-radio :label="1">待审核</el-radio>
           <el-radio :label="2">审核通过</el-radio>
           <el-radio :label="3">审核失败</el-radio>
           <el-radio :label="4">已失败</el-radio>
         </el-radio-group>
       </el-form-item>
       <el-form-item label="频道" >
         <el-select v-model="channelId" placeholder="请选择活动区域">
           <el-option label="全部" :value="null"></el-option>
           <el-option   :label="channel.name" :value="channel.id" v-for="(channel,index) in channels" :key="index"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="日期" required>
          <el-date-picker
              v-model="rangeDate"
              value-format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']">
            </el-date-picker>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="loadArticles(1)">查询</el-button>
       </el-form-item>
       </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选的结果为{{totalCount}}</span>
      </div>
  <el-table
  v-loading="isloadings"
  class="list-table"
       style="width: 100% "
        :data="articles"
       stripe
       >
       <el-table-column
         prop="image"
         label="封面"
         width="180" style="height: 280px;">
         <template slot-scope="scope">
           <img :src="scope.row.cover.images[0]"  class="article-cover">
         </template>

       </el-table-column>
       <el-table-column
         prop="title"
         label="标题"
         width="280">
       </el-table-column>
       <el-table-column
         prop="status"
         label="状态"
         width="100">
         <template slot-scope="scope">
         <el-tag  type="warning" size="medium" v-if="scope.row.status === 0">草稿</el-tag>
         <el-tag v-else-if="scope.row.status === 1 ">待审核</el-tag>
         <el-tag v-else-if="scope.row.status === 2 ">审核通过</el-tag>
         <el-tag  type="danger" v-else-if="scope.row.status === 3 ">审核失败</el-tag>
         <el-tag  type="info" v-else-if="scope.row.status === 4 ">已删除</el-tag>
         </template>
       </el-table-column>
       <el-table-column
         prop="pubdate"
         label="发布时间"
         width="280">
       </el-table-column>
       <el-table-column
         label="操作">
          <template slot-scope="scope">
           <el-button
           type="primary"  icon="el-icon-edit"  circle
           @click="$router.push('/publish?id=' +
           scope.row.id)"
           ></el-button>
           <el-button
            type="danger" icon="el-icon-delete" circle
             @click="handleDelete(scope.row.id)"></el-button>
         </template>
       </el-table-column>
     </el-table>
  <el-pagination
  :disabled="isdisables"
  :current-page.sync="page"
     layout="prev, pager, next"
     :total="totalCount"
     @current-change="onCurrentChange"
     :page-size="pageSize">
   </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deletArticle } from '@/api/article.js'
export default {
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  name: 'ArticleIndex',
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        ate2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [],
      totalCount: 0,
      pageSize: 10,
      status: null,
      channels: [],
      channelId: null,
      rangeDate: null,
      isloadings: true,
      isdisables: true,
      page: 1
    }
  },
  methods: {
    loadArticles (page = 1) {
      this.isloadings = true
      this.isdisables = true
      getArticles(
        {
          page,
          per_page: this.pageSize,
          status: this.status,
          channel_id: this.channelId,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.isloadings = false
        this.isdisables = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    handleDelete (articlesdID) {
      console.log(articlesdID.toString())
      this.$confirm('确认退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletArticle(articlesdID.toString()).then(res => {
          this.loadArticles(this.page)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style >
  .filter-card{
    margin-bottom: 20px;
  }
  .list-table {
    margin-bottom: 20px;
  }
  .article-cover {
    width: 200px;
    background-size: cover;
  }
</style>
