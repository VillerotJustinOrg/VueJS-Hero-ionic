<template>
    <v-dialog v-model="showForm">
        <template v-slot:activator="{ on,attrs }">
            <v-btn color="orange" dark v-on="on" v-bind="attrs">Edit User Hero</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Edit User Hero</span>
            </v-card-title>
            <v-container>
                <v-text-field
                        v-model="heroName"
                        label="Public Name"
                        placeholder="Public Name"
                        clearable
                        required
                ></v-text-field>
                <v-text-field
                        v-model="name"
                        label="Real Name"
                        placeholder="Real Name"
                        clearable
                        required
                ></v-text-field>
                Powers:
                <li v-for="(item, index) in powers" :key="item.id" class="d-flex flex-row">
                    <v-text-field
                            v-model="powers[index].name"
                            label="Power name"
                            placeholder="Power name"
                            clearable
                            required
                    ></v-text-field>
                    <v-combobox
                            v-model="powers[index].type"
                            label="Powers"
                            :items="powerType"
                            item-text="name"
                            item-value="id"
                            :return-object="false"
                    ></v-combobox>
                    <v-text-field
                            v-model="powers[index].level"
                            type="number"
                            label="Level"
                            min="0"
                            max="100"
                            required
                    ></v-text-field>
                    <v-btn color="blue" text @click="rmPower(index)">Remove power</v-btn>
                </li>
                <v-btn color="blue darken-1" text @click="addPower">Add new power</v-btn>
            </v-container>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="showForm = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="editPatch">Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "EditUserAPI",
    data: () => ({
        // Hero data
        heroName: "",
        name: "",
        powers: [],
        showForm: false,
        powerType: [
            {id:1,name:"force"},
            {id:2,name:"vitesse"},
            {id:3,name:"endurance"},
            {id:4,name:"magie"},
            {id:5,name:"effrayant"},
            {id:6,name:"furtivité"},
            {id:7,name:"stupidité"}
        ]
    }),
    computed:{
        ...mapState("data",["currentHero"])
    },
    methods: {
        ...mapActions("data", ["updateHeroAPI"]),
        setData(){
            console.log("setdefaultData",this.currentHero)
            console.log("1")
            this.heroName = this.currentHero.publicName
            console.log("2")
            this.name = this.currentHero.realName;
            console.log("3")
            for (const power of this.currentHero.powers) {
                console.log(power);
                this.powers.push({name:power.name, type:power.type, level:power.level})
            }
            //this.powers =  this.currentHero.powers;
            console.log("4")
            console.log("setdefaultData heroname",this.heroName,"name",this.name,"powers",this.powers)
        },
        addPower() {
            console.log("addPower")
            console.log("addPower - before", this.powers);
            this.powers.push({name:"PowerName", type:1, level:1})
            console.log("addPower - after", this.powers);
        },
        rmPower(index) {
            console.log("rmPower - before", this.powers);
            this.powers.splice(index, 1);
            console.log("rmPower - after", this.powers);
        },
        async editPatch() {
            this.showForm = false;
            console.log("EditHero -> heroName",this.currentHero)
            const hero = {_id:this.currentHero._id, publicName:this.heroName, realName: this.name, powers:this.powers}
            console.log(hero)
            this.updateHeroAPI(hero);
        }
    },
    beforeMount() {
        this.setData()
    }
}
</script>

<style scoped>

</style>