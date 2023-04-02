import heroService from "@/services/hero.service";
import teamService from "@/services/team.service";
import orgService from "@/services/org.service";
import store from "@/store/index";
import authapiService from "@/services/authapi.service";

export default {
    namespaced : true,
    state: () => ({
        // Hero
        heroList: [],
        currentHero: null,
        // Team
        teamList: [],
        currentTeam: null,
        // Org
        orgList: [],
        currentOrg: null,
        // User API
        currentuser: null,
        xsfrToken: ""
    }),
    mutations: {
        setHeroList(state, heroList) {
            state.heroList = heroList;
        },
        setCurrentHero(state, currentHero) {
            state.currentHero = currentHero;
        },
        setTeamList(state, teamList) {
            state.teamList = teamList;
        },
        setCurrentTeam(state, currentTeam) {
            console.log("setCurrentTeam", currentTeam)
            state.currentTeam = currentTeam;
        },
        setOrgList(state, orgList) {
            state.orgList = orgList;
        },
        setCurrentOrg(state, currentOrg) {
            state.currentOrg = currentOrg;
        },
        addOrg(state, org) {
            state.orgList.push(org);
        },
        addMember(state,member) {
            state.heroList.push(member);
        },
        addMemberToTeam(state,member) {
            state.currentTeam.members.push(member);
        },
        addTeamToOrg(state,team) {
            state.currentOrg.teams.push(team);
        },
        updateOrg(state, org) {
            const index = state.orgList.findIndex((item) => item._id === org._id);
            console.log(index);
            state.orgList.splice(index, 1, org);
        },
        updateAPIUser(state, user){
            state.currentuser = user;
        },
        setxsfrToken(state, xsfrToken){
            console.log("xsfrToken",xsfrToken)
            state.xsfrToken = xsfrToken
        }
    },
    getters: {
    },
    actions: {
        async loading(context) {
            console.log("Loading All")
            try{
                var res = await orgService.getAllOrgs()//  myaxios.get('/orgs/get')
                context.commit("setOrgList", res.data.data)

                res = await teamService.getAllTeam()//await myaxios.get('/teams/get')
                context.commit("setTeamList", res.data.data)

                res = await heroService.getAllHero()//await myaxios.get('/heroes/getaliases')
                context.commit("setHeroList", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while loading data",{root : true})
            }
        },
        async loadOrg(context, org) {
            console.log("Loading Org", "Context: ", context, "org: ", org)
            try{
                console.log("id: ", org._id)
                const res = await orgService.getOrgById(org._id, store.state.auth.passwd)//await myaxios.get('/orgs/getbyid/' + org._id)
                console.log( res.data.data[0])
                context.commit("setCurrentOrg", res.data.data[0])
            }catch (e) {
                context.commit("setCurrentOrg", null)
                console.log(e)
            }
        },
        async loadTeam(context, team) {
            console.log("Loading Team", "Context: ", context, "team: ", team)
            const res=[]
            console.log("res created")
            if (team.members) {
                console.log("Member exist")
                for (const item of team.members) {
                    console.log(item)
                    // res.push((await myaxios.get('/heroes/getbyid/' + item)).data.data[0])
                    res.push((await heroService.getHeroById(item)).data.data[0])
                }
            } else {
                console.log("get Members, org: ", store.state.data.currentOrg)
                if (store.state.data.currentOrg == null){
                    console.log("Impossible to load team connect to an organisation before")
                    context.commit("errors/pushError","Impossible to load team connect to the team organisation before",{root : true})
                }
                for (const teamIndex of store.state.data.currentOrg.teams){
                    console.log(teamIndex, "< team")
                    if (team._id == teamIndex._id){
                        for (const item of teamIndex.members) {
                            console.log(item)
                            // res.push((await myaxios.get('/heroes/getbyid/' + item)).data.data[0])
                            res.push((await heroService.getHeroById(item)).data.data[0])
                        }
                    }
                }
            }
            team.members = res
            context.commit("setCurrentTeam", team)
            console.log(res)
        },
        async loadHero(context, hero){
            console.log("Loading hero", "Context: ", context, "hero: ", hero)
            try{
                console.log("id: ", hero._id)
                const res = await heroService.getHeroById(hero._id);
                const herores = res.data.data[0];
                console.log( herores)
                context.commit("setCurrentHero", herores)
            }catch (e) {
                context.commit("setCurrentHero", null)
                console.log(e)
            }
        },
        async addOrg(context, org) {
            console.log("Adding Organisation")
            try{
                console.log(org)
                const res = await orgService.newOrg(org)// myaxios.post('/orgs/create', org)
                context.commit("addOrg", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while adding org",{root : true})
            }
        },
        async addMember(context, data) {
            console.log("addMember", "Context: ", context, "data: ", data)
            try{
                console.log(data)
                const res = await heroService.newHero(data) //myaxios.post('/heroes/create', data)
                console.log("Adding Member - res: ",res)
                context.commit("addMember", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while adding member",{root : true})
            }
        },
        async addTeam(context, data) {
            console.log("addTeam", "Context: ", context, "data: ", data)
            try{
                const res = await teamService.newTeam(data) //myaxios.post('/teams/create', data)
                context.commit("setTeamList", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while adding team",{root : true})
            }
        },
        async addMemberToTeam(context, data) {
            try{
                console.log("addMemberToTeam")
                console.log(data)
                const res = await teamService.addHeroInTeam(data) //myaxios.patch('/teams/addheroes', data)
                context.commit("addMemberToTeam", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while adding member to team",{root : true})
            }
        },
        async addTeamToOrg(context, data) {
            try{
                console.log("addTeamToOrg")
                console.log(data)
                const res = await orgService.addTeamInOrg(data, store.state.auth.passwd)//myaxios.patch('/orgs/addteam', data)
                context.commit("addTeamToOrg", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while adding team to org",{root : true})
            }
        },
        async removeTeamInOrg(context, team) {
            try{
                const res = await orgService.removeTeamInOrg(team, store.state.auth.passwd)//  myaxios.patch('/orgs/removeteam', {idTeam:team._id})
                console.log(res)
                context.commit("updateOrg", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while removing team from org",{root : true})
            }
        },
        async removeHeroInTeam(context, hero) {
            console.log("removeHeroInTeam Context",context, "hero", hero, "team", store.state.data.currentTeam);
            try{
                const res = await teamService.removeHeroInTeam(hero, store.state.data.currentTeam._id)//  myaxios.patch('/teams/removeheroes', {idHero:hero._id})
                console.log(res)
                context.commit("updateOrg", res.data.data)
            }catch (e) {
                context.commit("errors/pushError","Error while removing member from team",{root : true})
            }
        },
        // ===================== Connection API ==========================
        /**
         * @param context
         * @param loginData { login: ..., password: ...}
         * @returns {Promise<void>}
         */
        async singInAPI(context, loginData){
            console.log("SignIn", "context", context, "loginData", loginData);
            try {
                const res = await authapiService.signIn(loginData)
                console.log("res", res);
                context.commit("updateAPIUser", res.data.data)
                context.commit('setxsfrToken', res.data.data.xsrfToken)
                console.log("user", store.state.data.currentuser)
                store.state.auth.isUserAuth = true
            } catch (e) {
                context.commit("errors/pushError","Error while login the user in the API",{root : true})
            }
        },

        async getUserAPI(context){
            console.log("getUserAPT","context", context);
            try {
                const res = await authapiService.getUser(store.state.data.currentuser.name);
                console.log(res);
                const hero = res.data.data.hero;
                console.log(hero);
                context.commit("setCurrentHero", hero);
            } catch (e) {
                context.commit("errors/pushError","Error while getting the user from the API",{root : true})
            }
        },
        async updateHero(context, hero) {
            console.log("updateHero","context", context,"hero",hero);
            console.log("updateHero - OrgPath")
            try {
                const res = await heroService.updateHero(hero)
                console.log(res)
                context.commit("setCurrentHero", hero);
            } catch (e) {
                context.commit("errors/pushError","Error while updating the hero from the API",{root : true})
            }
        },
        async updateHeroAPI(context, hero) {
            console.log("updateHero","context", context,"hero",hero,"token",store.state.data.xsfrToken);
            console.log("updateHero - UserPath")
            try {
                const res = await heroService.updateHeroUser(hero)
                console.log(res)
                context.commit("setCurrentHero", hero);
            } catch (e) {
                context.commit("errors/pushError","Error while updating the hero from the API",{root : true})
            }
        }
    }
}