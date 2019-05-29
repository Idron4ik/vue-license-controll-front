export const profile = {
  state: {
    firstName:'john',
    lastName:'Dove',
    email:'johnDove@gmail.com',
    password:'cheburek123',
    token: '',
    id: ''
   },

   mutations: {
    setProfileData(state, {token, user} ){
      let {firstName, lastName, email, password, _id} = user;
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.password = password;
      state.id = _id;
    }
   },


   actions:{
     setProfileData({commit}, userData){
       console.log(userData);
       commit('setProfileData', userData );
     }
   }
};