export const profile = {
  namespaced: true,
  state: {
    firstName:'',
    lastName:'',
    age: '',
    email:'',
    password:'',
    phone: '',
    id: '',
    address: '',
    accountPlus: null,
    avatar:{
      src: 'https://previews.123rf.com/images/stalkerstudent/stalkerstudent1601/stalkerstudent160101173/50961996-user-icon-vector-flat-design-style-eps-10.jpg',
      title: 'persnal avarat',
      file: ''
    },

    agree: null,
   },

   getters: {
      userFullName(state){
        return state.firstName +' ' + state.lastName;
      },
      accontPlus(state){
        return state.accuntPlus ? 'verified_user' : ''
      }
   },

   mutations: {
    setProfileData(state, {token = '', user} ){
      let { 
        firstName = "",
        lastName = "", 
        email = "", 
        password = "", 
        _id = "",
        phone = "",
        address = "",
        avatarUrl= "",
        age = "",
        agree = null,
        accountPlus = null,
      } = user;
      state.firstName = firstName;
      state.lastName = lastName;
      state.age = age;
      state.email = email;
      state.password = password;
      state.phone = phone;
      state.id = _id;
      state.address = address;
      state.agree = agree;
      state.accountPlus = accountPlus;
      state.avatar.src = avatarUrl;

      if(token) localStorage.setItem('jwt', token);
      if(user) localStorage.setItem('user', JSON.stringify(user));
    },
    updataProfile(state, {stateValue, value}){
      if(stateValue === 'avatar.src') {
        state['avatar']['src'] = value.result;
        state['avatar']['file'] = value.file;
        return
      }
      state[stateValue] = value;
    }
   },


   actions:{
     setProfileData({commit}, userData){
       commit('setProfileData', userData );
     },
     updataProfile({commit}, {stateValue, value}){
      commit('updataProfile',  {stateValue, value} );
     }
   }
};