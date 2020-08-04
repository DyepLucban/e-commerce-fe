<template>
         <div>
        <v-dialog max-width="500" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text @click="dialog=true">
                    <span class="mr-2">Login</span>
                    <v-icon>mdi-login</v-icon>
                </v-btn>                
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Welcome</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="12" >
                                <v-text-field v-model="form.email" label="Email" autocomplete="off"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12" >
                                <v-text-field v-model="form.password" type="password" label="Password" autocomplete="off"></v-text-field>
                            </v-col>                            
                        </v-row>
                    </v-container>
                </v-card-text>      
                <v-card-actions>
                    <v-container>
                        <v-row>
                            <v-container>
                                <v-btn v-if="loading == false" block x-large :disabled="btn_disable" class="mb-3" color="blue" @click="login">Login</v-btn>
                                <v-btn v-else color="blue darken-1" block x-large disabled>
                                    <v-progress-circular indeterminate color="primary" class="mr-3"></v-progress-circular>
                                    Processing ... 
                                </v-btn>
                            </v-container>
                        </v-row>
                            <h5 class="text-left font-weight-bold ">or via social:</h5>
                            <hr>
                        <v-row>
                            <v-container>
                                <v-btn block class="mb-3" color="green" @click="googleLogin">Google</v-btn>
                                <v-btn block color="primary" @click="fbLogin">Facebook</v-btn>                                    
                            </v-container>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-card>                  
        </v-dialog> 
     </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'LoginModal',

    components: {

    },

    data() {
        return {
            dialog: false,
            loading: false,
            btn_disable: false,
            form: {
                email: null,
                password: null,
                device_name: 'browser'
            },
            social: {
                google: 'google',
                fb: 'facebook'
            }
        }
    },

    methods: {

        ...mapActions ('auth', ['authLogin', 'socialLogin']),

        close()
        {
            this.dialog = false
            this.form.email = null
            this.form.password = null
        },

        async login()
        {
            this.loading = true
            let res = await this.authLogin(this.form);

            if (res.status == 200)
            {
                localStorage.setItem('token', res.data);
                this.$router.push({name: 'Home'}).catch(()=>{})
                this.dialog = false;
                this.loading = false;
            } else {
                this.loading = false;
            }
        },

        async googleLogin()
        {
            let res = await this.socialLogin(this.social.google)
        },

        async fbLogin()
        {
            let res = await this.socialLogin(this.social.fb)
        },
    }
}
</script>