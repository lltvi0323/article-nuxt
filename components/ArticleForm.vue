<template>
  <!-- form add -->
  <div>
    <button v-on:click="handleShowAdd" class="button">Thêm bài viết</button>

    <v-dialog
      v-model="showAdd"
      data-app
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          <h2>Thêm bài viết</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="addItem.title"
            label="Title"
          ></v-text-field>
          <v-text-field
            v-model="addItem.url"
            label="Url"
          ></v-text-field>
          <button @click="handleAddAction" color="success">Save</button>
          <button @click="showAdd = !showAdd" color="error">Cancel</button>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createArticle } from "~/graphql/article";

export default {
  props: {
    getArticles: Function
  },

  data() {
    return {
      showAdd: false,
      addItem: {
        url: "",
        title: "",
      },
    };
  },

  methods: {
    handleShowAdd() {
      this.showAdd = true;
      this.addItem = {
        url: "",
        title: ""
      };
    },

    async handleAddAction() {
      await this.$apollo.mutate({
        mutation: createArticle,
        variables: {
          input: { 
            ...this.addItem,
            category_id: 8
          },
        },
      });
      this.getArticles();
      this.showAdd = false;
    },
  },
};
</script>

<style scoped>
.v-dialog__container {
  display: block;
}

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  padding: 5px;
}
</style>