<template>
  <div class="comment">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>评论管理</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- slot-scopen='名字' -->
            <el-button type="primary" size="mini" @click="$router.push(`/comment/${scope.row.id}`)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(r => {
        // console.log(r)
        this.articles = r.data.data.results
      })
    },
    onStatusChange (a) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: a.id.toString() // 请求返回的 id 是 ‘BigNumber’ 向服务器传递数据格式要求 String
        },
        data: {
          allow_comment: a.comment_status
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: `${a.comment_status ? '启用' : '关闭'} 成功`
        })
      })
    }

  },
  created () {
    this.loadArticles()
  }
}
</script>

<style>
</style>
