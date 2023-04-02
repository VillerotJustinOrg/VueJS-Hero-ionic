export default {
    namespaced : true,
    state: () => ({
        passwd: "",
        isAuth: false,
        isUserAuth: false
    }),
    mutations: {
        setPasswd(state, passwd) {
            state.passwd = passwd;
            state.isAuth = true;
        }
    },
    getters: {
    },
    actions: {
    }
}