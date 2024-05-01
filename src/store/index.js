import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpCategories = [
  {
    id: 1,
    name: "1Mobile Apps",
    slug: "1mobile-apps"
  },
  {
    id: 2,
    name: "2Mobile Apps",
    slug: "2mobile-apps"
  },
  {
    id: 3,
    name: "3Mobile Apps",
    slug: "3mobile-apps"
  },
  {
    id: 4,
    name: "4Mobile Apps",
    slug: "4mobile-apps"
  }
];
const tmpPosts = [
  {
    id: 1,
    title : "'Unclack' for Mac Mutes Your Mic While You're Typing", //
    guid : "01HSWF2H1Q38BETRV2CEXE1E8Q", //
    date : "2024-03-26", //
    description : "Type up notes—or message your coworkers—during team calls.", //
    thumbnail : "",
    content : "<p>Ever been in a meeting where you're taking notes, looking things up, or just surreptitiously Slacking with your co-workers? If so, you might want to hide the</p>", //
    link : "https://lifehacker.com/tech/unclack-mac-mutes-your-mic-while-typing",
    category : "3Mobile Apps",
    category_id : 3,
    slug : "tech/unclack-mac-mutes-your-mic-while-typing",
    image : "https://lifehacker.com/imagery/articles/01HSWF2H1Q38BETRV2CEXE1E8Q/images-1.fill.size_2000x1091.v1711426061.jpg",
  },
  {
    id: 2,
    title : "2'Unclack' for Mac Mutes Your Mic While You're Typing",
    guid : "01HSWF2H1Q38BETRV2CEXE1E8Q",
    date : "2024-03-26",
    description : "Type up notes—or message your coworkers—during team calls.",
    thumbnail : "",
    content : "<p>Ever been in a meeting where you're taking notes, looking things up, or just surreptitiously Slacking with your co-workers? If so, you might want to hide the</p>",
    link : "https://lifehacker.com/tech/unclack-mac-mutes-your-mic-while-typing",
    category : "3Mobile Apps",
    category_id : 3,
    slug : "tech/unclack-mac-mutes-your-mic-while-typing",
    image : "https://lifehacker.com/imagery/articles/01HSWF2H1Q38BETRV2CEXE1E8Q/images-1.fill.size_2000x1091.v1711426061.jpg",
  },
  {
    id: 3,
    title : "3'Unclack' for Mac Mutes Your Mic While You're Typing",
    guid : "01HSWF2H1Q38BETRV2CEXE1E8Q",
    date : "2024-03-26",
    description : "Type up notes—or message your coworkers—during team calls.",
    thumbnail : "",
    content : "<p>Ever been in a meeting where you're taking notes, looking things up, or just surreptitiously Slacking with your co-workers? If so, you might want to hide the</p>",
    link : "https://lifehacker.com/tech/unclack-mac-mutes-your-mic-while-typing",
    category : "3Mobile Apps",
    category_id : 3,
    slug : "tech/unclack-mac-mutes-your-mic-while-typing",
    image : "https://lifehacker.com/imagery/articles/01HSWF2H1Q38BETRV2CEXE1E8Q/images-1.fill.size_2000x1091.v1711426061.jpg",
  },
];

const store = createStore({
  state: {
    user: {
      data: {
        // name: 'Tom Cook',
        // email: 'tom@example.com',
      },
      token: sessionStorage.getItem("TOKEN"),
      // token: 111,
    },
    posts: {
      loading: false,
      links: [],
      data: [...tmpPosts]
    },
    categories: {
      loading: false,
      links: [],
      data: [...tmpCategories]
    },
    dashboard: {
      data: {},
      loading: false
    },
    errors: {
      login: {
        data : {
          name: '',
          email: '',
        }
      }
    },
    app: {

    },
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/api/v1/auth/register', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token);
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/api/v1/auth/login', user)
        .then((response) => {
          if (typeof response.data === 'undefined') {
            return {
              'error': true,
              'data': response.response.data.errors
            };
          } else {
            commit('setUser', response.data.user);
            commit('setToken', response.data.user.token);
            return {
              'error': false,
              'data': response.data
            };
          }
        })
    },
    logout({commit}) {
      return axiosClient.post('/api/v1/auth/logout')
        .then(response => {
          commit('logout')
          return response;
        })
    },
    // resetErrors({commit}, errorPage) {
    //   if (errorPage === 'login') {
    //     commit('setLoginPageErrors', {
    //       name: '',
    //       email: '',
    //     });
    //   }
    // },

    /* User */
    getUser({commit}) {
      return axiosClient.get('/api/v1/auth/me')
        .then(res => {
          commit('setUser', res.data)
        })
    },
    /* Post */
    getPosts({commit}) {
      //commit('setPostsLoading', true)
      return axiosClient.get('/api/v1/posts')
          .then((res) => {
            // console.log(res.data);
            commit('setPostsLoading', false)
            commit("setPosts", res.data);
          })
    },
    savePost({commit}, post) {
      let response;
      if (post.id) {
        // update
        return axiosClient
            .put(`/api/v1/posts/${post.id}`, post)
            .then((res) => {
              commit('updatePost', res.data);
              return res;
            })
      } else {
        // Create
        response = axiosClient
            .post('/api/v1/posts')
            .then((res) => {
              commit('savePost', res.data);
              return res;
            })
      }

    },
  },

  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem('TOKEN', token);
    },
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data
    },
    setLoginPageErrors: (state, data) => {
      console.log('setLoginERRors', data)
      state.errors.login.data = data
    },

    // Post
    savePost: (state, post) => {
      state.posts = [...state.posts, post.data];
    },
    updatePost: (state, post) => {
      state.posts = state.posts.map((s) => {
        if (s.id === post.id) {
          return post;
        }
      });
      state.posts = [...state.posts, post.data];
    },
    setPostsLoading: (state, loading) => {
      state.posts.loading = loading;
    },
    setPosts: (state, posts) => {
      state.posts.links = posts.meta.links;
      state.posts.data = posts.data;
    },
  },
  modules: {}
});

export default store;
