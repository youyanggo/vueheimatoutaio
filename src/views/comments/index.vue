<template>
  <div class="comment-cointain">
<el-card class="box-card">
  <div slot="header" class="clearfix">
<el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
    <el-table
      :data="articles"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.comment_status ? '正常' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="onStatusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          background>
        </el-pagination>
</el-card>
  </div>
</template>
<script>
import { getArticles, updatacomments } from '@/api/article.js'
export default {
  name: 'commentIndex',
  data () {
    return {
      articles: [],
      pageSize: 10,
      page: 1
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    handleSizeChange (page) {
      this.loadArticle(1)
    },
    handleCurrentChange (page) {
      this.loadArticle(page)
    },
    loadArticle (page = 1) {
      this.page = page
      getArticles({
        page,
        response_type: 'comment',
        per_page: this.pageSize
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      }
      )
    },
    onStatusChange (articles) {
      updatacomments(articles.id.toString(), articles.comment_status).then(res => {
      })
    }
  }
}
</script>
<style>
</style>
