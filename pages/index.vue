<template>
  <h1>Index page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
        return redirect('/article')
    }
  }
</script>