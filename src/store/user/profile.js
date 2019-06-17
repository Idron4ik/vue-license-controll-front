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
    setProfileData(state, {
    token = '', 
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
    isAdmin = false,
    user = isAdmin
  }){
      if (firstName) state.firstName = firstName;
      if (lastName) state.lastName = lastName;
      if (age) state.age = age;
      if (email) state.email = email;
      if (password) state.password = password;
      if (phone) state.phone = phone;
      if (_id) state.id = _id;
      if (address) state.address = address;
      if (agree) state.agree = agree;
      if (accountPlus) state.accountPlus = accountPlus;
      if (avatarUrl) state.avatar.src = avatarUrl;

      if(token) localStorage.setItem('jwt', token);
      if(user) localStorage.setItem('user', JSON.stringify(user));
    },
    updataProfile(state, {stateValue, value}){
      console.log(stateValue);
      console.log(value);
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