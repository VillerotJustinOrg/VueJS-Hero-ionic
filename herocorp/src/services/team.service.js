import myaxios from "@/services/axios.service";


export default {
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/get
   * [ GET ] : permet d'obtenir la liste des équipes avec pour chacune
   * , son identifiant BdD, son nom et le nombre d'organisations auxquelles elle est affiliée.
   * aucun paramètre/corps de requête,
   * le résultat est un tableau contenant des objets au format { _id: ..., name: ..., nbAffiliations: ...}
   * @returns {JSON}
   */
  getAllTeam(){
    console.log("GetAllTeam - /herocorp/teams/get")
    return myaxios.get('/herocorp/teams/get')
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/create
   * [ POST ] : permet de créer une équipe, sans membres.
   * le corps de la requête est un objet au format { name: ...}
   * le résultat est un objet représentant l'équipe créée en Bdd, avec son _id, son nom et un tableau des membres vide.
   * @returns {JSON}
   */
  newTeam(team){
    console.log("newTeam - /herocorp/teams/create", team)
    let res = myaxios.post('/teams/create', {name: team});
    console.log(res)
    return res;
  },
  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/addheroes
   * [ PATCH ] : permet d'ajouter des héros à une équipe
   * le corps de la requête est un objet au format { idHeroes: [ ..., ...], idTeam: ...}. idHeroes contient des identifiant de héros existant, et idTeam celui d'une équipe existante.
   * le résultat est un objet contenant l'équipe mise à jour.
   * @returns {JSON}
   */
  addHeroInTeam(data){
    console.log("addHeroInTeam - /herocorp/teams/addheroes")
    console.log(data);
    return myaxios.patch('/herocorp/teams/addheroes', data)
  },

  /**
   * https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/removeheroes
   * [ PATCH ] : permet de supprimer des héros d'une équipe
   * le corps de la requête est un objet au format { idHeroes: [ ..., ...], idTeam: ...}.
   * idHeroes contient des identifiant de héros existant, et idTeam celui d'une équipe existante.
   * @hero { idHeroes: [ ..., ...], idTeam: ...}
   * @teamId Id de l'équipe utiliser
   * le résultat est un objet contenant l'équipe mise à jour.
   * @returns {JSON}
   */
  removeHeroInTeam(hero, teamId){
    console.log("removeHeroInTeam - /herocorp/teams/removeheroes");
    console.log("hero", hero, "team", teamId);
    let url = '/herocorp/teams/removeheroes';
    return myaxios.patch(url, {idHeroes:[hero._id], idTeam:teamId});
  }
}