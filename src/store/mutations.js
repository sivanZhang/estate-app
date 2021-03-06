export default {
    setToken(state, str) {
        state.estateToken = str;
        if (str) {
            sessionStorage.setItem('estateToken', str);
        } else {
            sessionStorage.removeItem('estateToken');
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
        state.Property = arr.concat();
    },
    setTotal(state, number) {
        state.Total = number;
    },
    setListType(state, str) {
        state.ListType = str;
    },
    setUserId(state, num) {
        state.userId = num;
    },
}