<template>
  <div>
    <div class="article">
      <h1>Danh sách bài viết</h1>
      <button><NuxtLink to="/Article/ArticleForm">thêm bài viết</NuxtLink></button>

      <div
        class="article__contents"
        v-for="(article, index) in articles"
        :key="article.id"
      >
        <span class="article_number">{{ index + 1 }}</span>
        <h3 class="article__title">
          <NuxtLink :to="`/article/${article.id}`">{{
            article.title
          }}</NuxtLink>
        </h3>
        <span class="article__date">28-12-2020</span>
        <span>
          <button>Sửa</button>
          <svg
            v-if="!isActiveLink(article.id)"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash cursor-pointer ml-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            v-on:click="removeArticle(article.id)"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { getArticles } from "~/graphql/queries/article";
import { removeArticle } from "@/graphql/queries/mutation";

export default {
  methods: {
    isActiveLink: function (articleId) {
      return articleId === this.$route.params.id;
    },
    removeArticle: function (articleId) {
      this.$apollo.mutate({
        mutation: removeArticle,
        variables: {
          id: articleId,
        },
      });

    window.location.reload(true);
    },
  },
  apollo: {
    articles: {
      query: getArticles,
    },
  },
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  .article__contents span {
    margin-left: 5px;
  }
  .articles {
    margin-top: 50px;
  }
</style>