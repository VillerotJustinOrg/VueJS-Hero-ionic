import myaxios from "@/services/axios.service";

export default {

    /**
     * https://apidemo.iut-bm.univ-fcomte.fr/authapi/auth/signin
     * [POST] : , Pour s'authentifer, l'API propose une route
     * Le corp de la requete est un objet au format { login: ..., password: ...}
     * En cas de succès, la réponse est un objet au format : {err: 0, status: 200, data: { name : login_user, xsrfToken: ..., refreshtoken: ... } }.
     * De plus, un cookie JWT est renvoyé afin de vérifier l'authentification pour les requêtes suivantes.
     * en cas d'échec, la réponse est un objet au format : {err: XXX, status: 400, data: 'message erreur' }, avec XXX > 0
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    signIn(loginData) {
        console.log("AuthApi - signIn");
        let res = myaxios.post('/authapi/auth/signin', loginData);
        console.log(res);
        return res;
    },

    /**
     * Après authentification, il est possible de récupérer les informations d'un utilisateur, avec la route :
     * https://apidemo.iut-bm.univ-fcomte.fr/authapi/user/getuser/:login
     * [ Get ] le login étant indiqué comme dernier élément de la route
     * en cas de succès, le champ data de la réponse est un objet contenant le login, le mot de passe,
     * et un objet décrivant le héro associé, comme celui que l'on récupère avec la route /herocorp/heroes/getbyid/:id.
     * en cas d'échec, la réponse est un objet au format : {err: XXX, status: 400, data: 'message erreur' }, avec XXX > 0
     * Si l'API ne reçoit pas le cookie JWT et/ou le token xsrf dans les entêtes,
     * ou bien si la valeur du xsrf ne correspond à celle stockée dans le JWT, suivre cette route est forcément un échec.
     * Cette route correspond au fait qu'un héro possède un compte sur l'API et qu'il peut récupérer ses propres informations,
     * pour éventuellement les modifier (cf. exo 2)
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getUser(login){
        console.log("AuthApi - getUser");
        let url = '/authapi/user/getuser/'+login
        let res = myaxios.get(url);
        console.log(res);
        return res;
    }
}