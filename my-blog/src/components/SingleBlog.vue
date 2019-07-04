<template>
    <div id="single-blog">
      <h1>{{blog.title}}</h1>
      <article>{{blog.content}}</article>
      <p>作者：{{blog.author}}</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">
          {{category}}
        </li>
      </ul>

      <router-link v-bind:to="'/edit/'+id">编辑</router-link>
      <button @click="deleteSingleBlog()">删除</button>

    </div>
</template>

<script>
  import axios from 'axios'
  export default {
      name: "single-blog",
      data(){
        return {
          id:this.$route.params.id,
          blog:{}
        }
      },
      created() {
        // this.$http.get('http://jsonplaceholder.typicode.com/posts/'+this.id).then(function (data) {
        //   this.blog = data.body;
        // });

        //请求firebase
        // this.$http.get('https://vuedemo-f5deb.firebaseio.com/posts/'+this.id+'.json').then(function (data) {
        //   // console.log(data)
        //   // this.blog = data.body;
        //   return data.json();
        // }).then(function (data) {
        //   this.blog = data;
        //   console.log(data)
        // });

        //axios请求
        axios.get('/posts/'+this.id+'.json').then(function (data) {
          return data.data;
        }).then((data) => {
          this.blog = data;
        });
      },
      methods:{
        deleteSingleBlog(){
          //使用vueResourse请求
          // this.$http.delete('https://vuedemo-f5deb.firebaseio.com/posts/'+this.id+'.json').then(respose => {
          //   this.$router.push({path:'/'})
          // });
          //使用axios
          axios.delete('/posts/'+this.id+'.json').then(respose => {
            this.$router.push({path:'/'})
          });
        }
      }
    }
</script>

<style scoped>
  #single-blog {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
    background: #eee;
    border: 1px dotted #aaa;
  }
  #single-blog a {
    color: #fff;
    text-decoration: none;
    padding: 12px;
    border-radius: 5px;
    background: crimson;
    font-size: 12px;
  }
  ul {
    list-style-type: none;
    margin: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  button {
    display: inline-block;
    margin: 20px 0;
    background: crimson;
    color: #fff;
    border: 0;
    padding: 12px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
</style>
