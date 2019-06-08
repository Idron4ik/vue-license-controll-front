export const profile = {
  namespaced: true,
  state: {
    firstName:'john',
    lastName:'Dove',
    email:'johnDove@gmail.com',
    password:'cheburek123',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZmI3ZWI3NjEyZTc0M2FmNDM0ZWM3NyIsImlhdCI6MTU1OTk4NjM2MiwiZXhwIjoxNTYwMDcyNzYyfQ.omzqOFcT_uPzEwMdKOf9liuWygE0FeIkxA_eBfjUtVk',
    phone: '00000000000',
    id: '',
    address: 'Mars',
    accuntPlus: true,
    avatar:{
      src: 'https://randomuser.me/api/portraits/men/85.jpg',
      title: 'persnal avarat'
    } 
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
        isAdmin
      } = user;
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.password = password;
      state.id = _id;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      localStorage.setItem('jwt', token)
      localStorage.setItem('user', JSON.stringify(user));

    }
   },


   actions:{
     setProfileData({commit}, userData){
       console.log(userData);
       commit('setProfileData', userData );
     }
   }
};