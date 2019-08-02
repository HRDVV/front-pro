<template>
    <div class="wraper">
        <p class="iconfont icon-zitigui"></p>
        hello world
        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        imgSrc: require('@/assets/img/1.jpg')
      }
    },
    created() {
        fetch('/data/index.json').then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
        })
    }
  }
</script>

<style lang="scss">
    body {
        background: url('~@/assets/img/1.jpg');
    }
    .wraper {
        color: $color;
    }
</style>
