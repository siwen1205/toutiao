<template>
  <div>
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>评论详情列表</span>
      </div>
      <!-- el-table 中 prop 属性绑定的数据 由后端返回 -->
      <el-table :data="comments" style="width: 100%">
        <el-table-column prop="title" label="头像" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo" width="50" />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" width="220"></el-table-column>
        <el-table-column label="点赞" width="100">
          <template slot-scope="scope">
            {{ scope.row.is_liking === 1 ? '已赞' : '没有赞' }}
          </template>
        </el-table-column>
        <el-table-column prop="like_count" label="点赞" width="100"></el-table-column>
        <el-table-column prop="pubdate" label="日期" width="180"></el-table-column>
        <el-table-column prop="reply_count" label="回复" width="100"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'commentLists',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          source: this.articleId
        }
      }).then(r => {
        // console.log(r)
        this.comments = r.data.data.results
      })
    }
  }
}
</script>

<style>
</style>
