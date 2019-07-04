<template>
<!--    <div v-theme="'wide'" id="show-blogs">-->
      <div id="show-blogs">
      <h1>博客总览</h1>
      <input type="text" v-model="search" placeholder="搜索"/>
      <!-- 正常写法-->
<!--      <div v-for="blog in blogs" class="single-blog">-->
<!--        <h2 v-rainbow>{{blog.title | toUppercase}}</h2>-->
<!--        <armatchedticle>{{blog.body | snippet}}</article>-->
<!--      </div>-->
      <!-- 使用过滤器写法-->
      <div v-for="blog in filteredBlogs" class="single-blog" :key="blog.title">
        <router-link v-bind:to="'/blog/'+blog.id"><h2 v-rainbow>{{blog.title | toUppercase}}</h2></router-link>
        <article>{{blog.content | snippet}}</article>
      </div>
    </div>
</template>

<script>
  import axios from '../axios-auth'
  export default {
        name: "show-blogs",
      data(){
          return {
            blogs:[],
            search:""
          }
      },
      created() {
        //axios请求
        axios.get('/posts.json').then(function (data) {
          return data.data;
        }).then((data) => {
          var blogsArray = [];
          for (let key in data) {
            data[key].id = key;
            blogsArray.push(data[key]);
          }
          this.blogs = blogsArray;
        });
        //resourse请求
        // this.$http.get('https://vuedemo-f5deb.firebaseio.com/posts.json').then(function (data) {
        //   return data.json()
        // }).then(function (data) {
        //   var blogsArray = [];
        //   for (let key in data) {
        //     // console.log(key)
        //     // console.log(data[key])
        //     data[key].id = key;
        //     blogsArray.push(data[key]);
        //   }
        //   this.blogs = blogsArray;
        // });
        //请求本地数据
        // this.$http.get('../static/posts.json').then(function (data) {
        //   this.blogs = data.body.slice(0,10);
        // });
      },
      //定义局部过滤器
      filters: {
        toUppercase(value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        },
        snippet(value) {
          if (!value) return ''
          return value.slice(0,100) + "..."
        }
      },
      //实现搜索
      computed:{
          filteredBlogs() {
            return this.blogs.filter((blog) => {
              return blog.title.match(this.search);
            })
          }
      }
    }
</script>

<style scoped>
  #show-blogs {
    max-width: 800px;
    margin: 0 auto;
  }

  .single-blog {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
    border: 1px dotted #aaa;

  }
  #show-blogs a {
    color: #444;
    text-decoration: none;
  }

  input[type="text"] {
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }


</style>
