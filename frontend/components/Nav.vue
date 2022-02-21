<script>
export default {
  name: 'Nav'
}
</script>

<template>
  <div class='nav'>
    <nuxtLink to='/' ><h1>Philosophers</h1></nuxtLink>
    <div class="links">
      <nuxtLink to="/users/login" class="nav-item">Login</nuxtLink>
      <nuxtLink to="#" class="nav-item">Link2</nuxtLink>
      <nuxtLink to="#" class="nav-item">Link3</nuxtLink>
    </div>
  </div>
</template>

<style>
  .nav {
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .links {
    display: flex;
  }
  .nav-item {
    margin-left: 15px;
  }
</style>