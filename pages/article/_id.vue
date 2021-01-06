<template>
<div>
  <div class="article">
    <h1>Danh sách bài viết</h1>
    <ArticleForm :getArticles="handleFetchArticles" />

    <div class="article__contents" v-for="(article, index) in articles" :key="article.id">
      <span class="article_number">{{ index + 1 }}</span>
      <span class="article__title" >
        <NuxtLink :to="article.id">
          {{ article.title }}
        </NuxtLink>
      </span>
      <span class="icon__article">
        <svg v-on:click="getEdit(article)" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1em" height="1em" viewBox="0 0 528.899 528.899" style="enable-background: new 0 0 528.899 528.899" xml:space="preserve">
          <g>
            <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                  c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                  C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                  L27.473,390.597L0.3,512.69z" />
          </g>
        </svg>
        <svg v-if="!isActiveLink(article.id)" v-on:click="removeArticle(article.id)" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash cursor-pointer ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
      </span>
    </div>
  </div>

  <!-- detail article -->
  <div class="article__detail">
    <span>{{this.articleDetail.title}}</span>
  </div>

  <!-- form Edit -->
  <v-dialog data-app v-model="showEdit" persistent :overlay="false" max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>
        <h2>Edit bài viết</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="edit.title" label="Title"></v-text-field>
        <v-text-field v-model="edit.url" label="Url"></v-text-field>
        <button @click="updateAction" color="success">Save</button>
        <button @click="showEdit = !showEdit" color="error">Cancel</button>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {
  getArticles,
  removeArticle,
  updateArticle
} from "~/graphql/article";

import ArticleForm from "~/components/ArticleForm";

export default {
  components: {
    ArticleForm
  },

  data() {
    return {
      showEdit: false,
      flagUpdate: false,
      edit: {
        url: "",
        title: ""
      },
      articles: [],
      articleDetail: []
    };
  },
  methods: {
    isActiveLink: function (articleId) {
      return articleId === this.$route.params.id;
    },
    async removeArticle(articleId) {
      this.$apollo.mutate({
        mutation: removeArticle,
        variables: {
          id: articleId
        }
      });
      this.handleFetchArticles();
    },

    getEdit(article) {
      this.showEdit = true;
      this.edit = {
        ...article
      };
    },

    async updateAction() {
      const {
        id,
        url,
        title
      } = this.edit;

      const res = await this.$apollo.mutate({
        mutation: updateArticle,
        variables: {
          id,
          input: {
            url,
            title
          }
        }
      });

      this.showEdit = false;
      this.handleFetchArticles();
      if (!res) return console.log("sys fail");

      const {
        isUpdated
      } = res.data;
      if (isUpdated[0] !== 1) return console.log("update fail");
      console.log("update success");
    },
    async handleFetchArticles() {
      const articles = await this.getArticles();
      console.log({
        articles
      })
      this.articles = articles;
    },
    async getArticles() {
      const res = await this.$apollo.query({
        query: getArticles
      });
      return res.data.articles;
    },

    async showArticleDetail(idArticle) {
      const articles = await this.getArticles();

      for ( let i = 0; i < articles.length; i++ ) {
        if (idArticle === articles[i].id) {
           this.articleDetail = articles[i];
           return;
         }
       }
    }
  },
  async mounted() {
    const articles = await this.getArticles();
    const curArticleId = this.$route.params.id;
    this.showArticleDetail(curArticleId);

    if (!curArticleId) {
      this.$router.push(`/article/${articles[0].id}`)
    }

    this.articles = articles;
  }
};
</script>

<style scoped>
.v-dialog__container {
  display: block;
}

h1 {
  text-align: center;
}

.article__contents span {
  margin-left: 5px;
}

.articles {
  margin-top: 50px;
}

.icon__article svg {
  cursor: pointer;
}
</style>
