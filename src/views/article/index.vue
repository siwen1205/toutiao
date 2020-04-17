<template>
  <div class="article">
    <!-- filter section  -->
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>All</span>
      </div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <channel-select v-model="filterForm.channel_id"></channel-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="to"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticles(1)" value="search">查找</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- article lists section  -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>total {{ totalCount }} lists</span>
      </div>
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.cover.images[0]" alt />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <!-- <span v-show="scope.row.status === 0">草稿</span>
            <span v-show="scope.row.status === 1">待审核</span>
            <span v-show="scope.row.status === 2">审核通过</span>
            <span v-show="scope.row.status === 3">审核失败</span>
            <span v-show="scope.row.status === 4">已删除</span>-->
            <!-- <span>{{ articleStatus[scope.row.status].label }}</span> -->
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">edit</el-button>
            <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- pagination -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onPagechange"
      :disabled="loading"
    ></el-pagination>
  </div>
</template>

<script>
import channelSelect from '@/components/channels'
export default {
  name: 'articles', // 组件名字
  components: {
    'channel-select': channelSelect
  },
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null
        // begin_pubdate: '',
        // end_pubdate: ''
      },
      rangeDate: [],
      articles: [],
      articleStatus: [
        {
          type: 'warning',
          label: '草稿'
        },
        {
          type: 'info',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ],
      totalCount: 0,
      loading: true,
      // channels: [],
      page: 1
    }
  },
  created () {
    this.loadArticles(1)
  },
  methods: {
    // filter button

    loadArticles (page = 1) {
      this.page = page
      this.loading = true
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        params: {
          page,
          per_page: 10, // at least 10 lists per page
          status: this.filterForm.status, // status: null  --  axios value is null & undefined axion do not send request
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.rangeDate[0] ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate[1] ? this.rangeDate[1] : null
        }
      })
        .then(r => {
          // console.log(r)
          this.articles = r.data.data.results
          this.totalCount = r.data.data.total_count
        })
        .catch(() => {
          // failed
          // console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    onPagechange (page) {
      this.loadArticles(page)
    },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}` // articleId 需要 toString() 方法转为字符串，此处字符串拼接可省略
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      }).then(() => {
        // alert('删除成功')
        this.$message({
          message: '成功',
          type: 'success'
        })
        this.loadArticles(this.page)
      })
    }
  }
}
</script>

<style>
</style>
