export const profile = {
  namespaced: true,
  state: {
    token: '',
    firstName:'john',
    lastName:'Dove',
    age: '20',
    email:'johnDove@gmail.com',
    password:'cheburek123',
    phone: '0997578501',
    id: '',
    address: 'Mars',
    accountPlus: true,
    avatar:{
      src: 'https://randomuser.me/api/portraits/men/85.jpg',
      title: 'persnal avarat'
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
    setProfileData(state, {token = "", user} ){
      let { 
        firstName = "",
        lastName = "", 
        email = "", 
        password = "", 
        _id = "",
        phone = "",
        address = "",
        avatar= "",
        age = "",
        agree = null,
        accountPlus = true

      } = user;
      state.token = token;
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
      state.avatar = avatar;
      localStorage.setItem('jwt', token)
      localStorage.setItem('user', JSON.stringify(user));
    },
    updataProfile(state, {stateValue, value}){
      console.log(stateValue);
      console.log(value);
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