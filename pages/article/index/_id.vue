<template>
  <div class="card article__content">
    <div class="card-body flex-column">
      <h3 class="font-weight-bold">{{ curArticle.title }}</h3>
      <div>{{ curArticle.content }}</div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "~/graphql/article";

export default {
  name: "Article",
  apollo: {
    curArticle: {
      query: getArticle,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  }
};
</script>

<style>
.article__content {
  max-height: 300px;
  overflow-y: auto;
}
</style>
