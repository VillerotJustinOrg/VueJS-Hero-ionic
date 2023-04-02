import myaxios from "@/services/axios.service";

export default{
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/get
   * [ GET ] : permet d'obtenir l'identifiant BdD et le nom de toutes les organisations
   * aucun paramètre/corps de requête,
   * le résultat est un tableau contenant des objets au format { _id: ..., name: ...}
   * @returns {Promise<{}>}
   */
  getAllOrgs(){
    console.log("getAllOrgs - /herocorp/orgs/get")
    return myaxios.get('/herocorp/orgs/get')
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/getbyid/:id
   * [ GET ] : permet de récupérer toutes les informations d'une organisation existante
   * le paramètre :id doit être remplacé par l'identifiant d'une organisation existante
   * il faut également fournir le mot de passe secret de cette organisation. Pour cela, soit une entête org-secret est ajoutée à la requête, soit la route est modifiée comme suivant : /orgs/get/123456789abcd?org-secret=... (cf. exercices)
   * le résultat est un objet contenant l'organisation demandée, dont le tableau des équipes a été "complété". Cela veut dire qu'il contient des objets représentant des équipes, donc avec les identifiants des membres.
   * @param id
   * @returns {Promise<void>}
   */
  getOrgById(id, passwd){
    console.log("getOrgById - /herocorp/orgs/getbyid/"+id+"?org-secret="+passwd)
    console.log(myaxios.get('/herocorp/orgs/getbyid/'+id+"?org-secret="+passwd))
    return myaxios.get('/herocorp/orgs/getbyid/'+id+"?org-secret="+passwd)
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/create
   * [ POST ] : permet de créer une organisation avec aucune équipe
   * le corps de la requête est un objet au format { name: ..., secret: ...}. Les deux champs sont une chaîne de caractère.
   * le résultat est un objet représentant l'organisation créée avec une liste d'équipes vide.
   * @param name
   * @param secret
   * @returns {Promise<void>}
   */
  newOrg(org){
    console.log("newOrg - /herocorp/orgs/create")
    return myaxios.post('/herocorp/orgs/create', org)
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/addteam
   * [ PATCH ] : permet d'ajouter une équipe à une organisation
   * le corps de la requête est un objet au format { idTeam: ...}. La valeur du champ doit être celle d'une équipe existante.
   * il faut également fournir le mot de passe secret de l'organisation pour laquelle on veut ajouter une équipe.
   * Pour cela, soit une entête org-secret est ajoutée à la requête, soit la route est modifiée comme suivant : /orgs/addteam?org-secret=... (cf. exercices)
   * le résultat est un objet contenant l'organisation mise à jour.
   * @param idTeam
   * @returns {Promise<void>}
   */
  addTeamInOrg(team, passwd){
    console.log("addTeamInOrg - /herocorp/orgs/addteam")
    console.log(team)
    let url = '/herocorp/orgs/addteam?org-secret=' + passwd;
    console.log(url);
    return myaxios.patch(url, {idTeam:team})
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/removeteam
   * [ PATCH ] : permet de supprimer une équipe d'une organisation
   * le corps de la requête est un objet au format { idTeam: ...}. La valeur du champ doit être celle d'une équipe existante.
   * il faut également fournir le mot de passe secret de l'organisation pour laquelle on veut supprimer une équipe.
   * Pour cela, soit une entête org-secret est ajoutée à la requête, soit la route est modifiée comme suivant : /orgs/addteam?org-secret=... (cf. exercices)
   * le résultat est un objet contenant l'organisation mise à jour.
   * @param idTeam
   * @returns {Promise<void>}
   */
  removeTeamInOrg(team, passwd){
    console.log("removeTeamInOrg - /herocorp/orgs/removeteam")
    let url = '/herocorp/orgs/removeteam?org-secret=' + passwd;
    console.log(url)
    return myaxios.patch(url, {idTeam:team._id})
  }
}