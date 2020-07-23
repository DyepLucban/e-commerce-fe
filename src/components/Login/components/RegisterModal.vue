<template>
         <div>
        <v-dialog max-width="700" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text @click="dialog=true">
                    <span class="mr-2">Register</span>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>                
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Create your account</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="12" >
                                <v-text-field v-model="form.full_name" label="Full Name" autocomplete="off"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12" >
                                <v-text-field v-model="form.address" label="Complete Address" autocomplete="off"></v-text-field>
                            </v-col>                            
                            <v-col cols="12" sm="6" md="12" >
                                <v-text-field v-model="form.email" label="Email" autocomplete="off"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12" >
                                <v-text-field v-model="form.password" type="password" label="Password" autocomplete="off"></v-text-field>
                            </v-col>                                                     
                        </v-row>
                    </v-container>
                </v-card-text>      
                <v-card-actions v-if="loading == false">
                    <v-container>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close" >Cancel</v-btn>                      
                            <v-btn :disabled="btn_disable" color="blue darken-1" text @click="register" >Register</v-btn>                      
                        </v-row>
                    </v-container>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer>
                    </v-spacer>
                    <v-btn color="blue darken-1" text disabled>
                        <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                        Processing ... 
                    </v-btn>
                </v-card-actions>                   
            </v-card>                  
        </v-dialog> 
     </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'RegisterModal',

    components: {

    },

    data() {
        return {
            dialog: false,
            loading: false,
            btn_disable: false,
            form: {
                full_name: null,
                address: null,
                email: null,
                password: null,
            }
        }
    },

    methods: {

        ...mapActions ('auth', ['authLogin']),
        ...mapActions ('user', ['createUser']),

        close()
        {
            this.dialog = false
            this.form = {}
        },

        async register()
        {
            this.loading = true
            let res = await this.createUser(this.form);

            if (res.status == 200)
            {
                this.dialog = false;
                this.loading = false;
                this.form = {}
            } else {
                this.dialog = false;
                this.loading = false;
                this.form = {}
            }


        }
    }
}
</script>