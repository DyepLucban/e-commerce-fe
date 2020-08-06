<template>
    <div>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-container fill-height-fluid>
                    <v-card height="100%">
                        <v-card-title>
                            <div>
                                <span class="grey--text">E-Commerce Admin Panel</span><br>
                                <span>Login your credentials</span>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="12" >
                                        <v-text-field v-model="form.email" type="email" label="Email" autocomplete="off"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12" >
                                        <v-text-field v-model="form.password" type="password" label="Password" autocomplete="off"></v-text-field>
                                    </v-col>                            
                                </v-row>
                            </v-container>
                        </v-card-text> 
                        <v-card-actions>
                            <v-btn v-if="loading == false" block large color="orange" @click="login">Login</v-btn>
                            <v-btn v-else color="orange" block large disabled>
                                <v-progress-circular indeterminate color="orange" class="mr-3"></v-progress-circular>
                                Processing ... 
                            </v-btn>                            
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Admin',

    data() {
        return {
            form: {
                email: null,
                password: null,
                device_name: 'browser'
            },
            loading: false,
        }
    },

    methods: {
        ...mapActions('auth', ['authLogin']),

        async login()
        {
            this.loading = true
            let res = await this.authLogin(this.form)

            if (res.status == 200)
            {
                this.loading = false
                if (res.data.auth) {
                    localStorage.setItem('token', res.data.token);
                    this.$router.push({name: 'Dashboard'}).catch(()=>{})
                } else {
                    alert('Unauthorized account')
                }
            }
            
            this.loading = false

        }
    }
}
</script>