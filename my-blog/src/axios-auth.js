import axios from 'axios'

const instance = axios.create({
  baseURL:'https://vuedemo-f5deb.firebaseio.com'
})

export default instance
