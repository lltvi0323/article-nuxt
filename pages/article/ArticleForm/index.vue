<template>
  <div class="articleform container">
    <form>
      <h4 class="mt-3">Thêm bài viết</h4>
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="title..."
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Content</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
          placeholder="content..."
          required
        ></textarea>
      </div>
      <div class="row ml-0 mr-0">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
    </form>
  </div>
</template>

<style  scoped>
</style>

<script>
import { createArticle } from "@/graphql/queries/mutation";

export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    onSubmitCreateArticle: function(event) {
      event.preventDefault();

      this.$apollo.mutate({
        mutation: createArticle,
        variables: {
          title: this.title,
          content: this.content
        }
      });

      
      this.$router.go({
        path: "/article",
        force: true,
      });
    }
  }
};
</script>