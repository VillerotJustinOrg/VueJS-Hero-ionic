import myaxios from "@/services/axios.service";

export default {
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/getaliases
   * [ GET ] : permet d'obtenir l'identifiant BdD et le nom public de tous les héros.
   * aucun paramètre/corps de requête,
   * le résultat est un tableau contenant des objets au format { _id: ..., publicName: ...}
   * @returns {Promise<{}>}
   */
  getAllHero() {
    console.log("getAllHero - /herocorp/heroes/getaliases")
    return myaxios.get('/herocorp/heroes/getaliases')
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/getbyid/:id
   * [ GET ] : permet de récupérer toutes les informations d'un héro existant
   * le paramètre :id doit être remplacé par l'identifiant d'un héro existant
   * il faut également fournir le mot de passe secret d'une organisation dont le héro fait partie. Pour cela, soit une entête org-secret est ajoutée à la requête, soit la route est modifiée comme suivant : /heroes/getbyid/1234567abcd?org-secret=... (cf. exercices)
   * le résultat est un objet contenant le héro demandé.
   * @param id
   * @returns {Promise<void>}
   */
  getHeroById(id) {
    console.log("getHeroById - /herocorp/heroes/getbyid"+id)
    return myaxios.get('/herocorp/heroes/getbyid/'+id)
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/create
   * [ POST ] : permet de créer un héro
   * le corps de la requête est un objet au format { publicName: ..., realName: ..., powers: [ { name: ..., type: ..., level: ...}, {name: ..., type: ..., level: ...}, ... ] }. Le champ power est optionnel mais s'il est fournit, les objets de ce tableau doivent contenir obligatoirement les champs name, type et level, avec type entre 1 à 7 et level entre 0 et 100 (cf. section 1)
   * le résultat est un objet contenant la même chose que ce qui a été envoyé, plus l'identifiant _id du héro.
   * @returns {Promise<void>}
   */
  newHero(hero) {
    console.log("newHero - /herocorp/heroes/create")
    return myaxios.post('/herocorp/heroes/create', hero)
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/update
   * [ PUT ] : permet de mettre à jour un ou plusieurs champ d'un héro existant
   * le corps de la requête est un objet au format.
   * @hero { _id: ..., publicName: ..., realName: ..., powers: [ { name: ..., type: ..., level: ...}, {name: ..., type: ..., level: ...}, ... ] }
   * Seul le champ _id est obligatoire et doit correspondre à un héro existant.
   * il faut également fournir le mot de passe secret d'une organisation dont le héro fait partie.
   * Pour cela, soit une entête org-secret est ajoutée à la requête,
   * soit la route est modifiée comme suivant : /heroes/update?org-secret=... (cf. exercices)
   * le résultat est un objet contenant le héro mis à jour.
   * @returns {Promise<void>}
   */
  updateHero(hero) {
    console.log("updateHero - /herocorp/heroes/update")
    return myaxios.put('/herocorp/heroes/update', hero)
  },

  /**
   * Comme la requete précédente mais depuis la connexion user
   * donc une entête avec le token xsfr
   * @param hero { _id: ..., publicName: ..., realName: ..., powers: [ { name: ..., type: ..., level: ...}, {name: ..., type: ..., level: ...}, ... ] }
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  updateHeroUser(hero){
    console.log("updateHeroUser - /herocorp/heroes/authupdate")
    return myaxios.put('/herocorp/heroes/authupdate', hero)

  }

}