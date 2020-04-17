<template>
  <div class="publish">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>{{ $route.params.articleId ? '编辑文章' : '发布文章' }}</span>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" style="margin-bottom: 120px">
          <!-- 富文本组件 非 elementUI -->
          <quill-editor
            style="height: 200px"
            v-model="article.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="频道列表">
          <channel-select v-model="article.channel_id"></channel-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css' // quill 富文本
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import channelSelect from '@/components/channels'

export default {
  name: 'articlePublish',
  components: {
    quillEditor,
    'channel-select': channelSelect
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      channels: [],
      editorOption: {}
    }
  },
  created () {
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      })
        .then(r => {
          // console.log(r)
          this.article = r.data.data
        })
        .catch(err => {
          console.log(err + 'loadArticle')
        })
    },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.editArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        params: {
          draft
        },
        data: this.article
      })
        .then(r => {
          console.log(r)
        })
        .catch(err => {
          console.log(err + 'addArticle')
        })
    },
    editArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      })
        .then(r => {
          this.$message({
            type: 'success',
            message: 'success'
          })
          this.$router.push('/article')
        })
        .catch(() => {
          this.$message.error('edit')
        })
    }
  }
}
</script>

<style>
</style>
