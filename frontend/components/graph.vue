<script>
export default {
  name: 'Graph',
  mounted () {
    console.log('hey');
    this.$axios
			.get('/phils/read')
			.then(res => console.log(res.data));
  }
}
</script>

<template>
  <div class='graph'>
    <div>Graph</div>
  </div>
</template>

<style>
  /* .nav {
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
  } */
</style>