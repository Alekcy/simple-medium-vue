<template>
  <div class="box post-card">
    <div class="post-title">
      {{post.title}}
    </div>
    <div class="post-content">
      {{post.description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: ['post'],
  mounted: function () {
    console.log(this.post)
  }
}
</script>

<style>
.post-card {
  margin: 5px;
  border-radius: 1px;
}
.post-title {
  font-weight: bold;
  font-size: 1.2rem;
  text-align: left;
  margin-bottom: 10px;
}
.post-content {
  text-align: left;
}

@media (min-width: 1200px) {
  .post-card {
    width: 40%;
  }
}
@media (min-width: 800px) and (max-width: 1200px) {
  .post-card {
    width: 60%;
  }
}
@media (max-width: 800px) {
  .post-card {
    width: 100%;
  }
}
</style>
