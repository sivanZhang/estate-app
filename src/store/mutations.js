export default {
  setToken(state, str) {
    state.estateToken = str;
    if(str){
      localStorage.setItem('estateToken', str);
    }else{
      localStorage.removeItem('estateToken');
    }
  },
  setUserName(state, str) {
    state.user_name = str;
  },
  setPortrait(state, str) {
    state.portrait = str;
  },
  setPortrait(state, str) {
    state.portrait = str;
  },
  setProperty(state, arr) {
    state.Property = arr.concat()
  },
  setTotal(state, number) {
    state.Total = number
  }
}