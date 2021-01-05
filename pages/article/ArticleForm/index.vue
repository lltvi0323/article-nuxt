<template>
  <form>
    <h4 class="mt-3">Create Article</h4>
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
      <button type="submit" class="btn btn-success">
        Submit
      </button>
    </div>
  </form>
</template>