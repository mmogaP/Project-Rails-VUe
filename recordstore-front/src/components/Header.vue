import { useRouter } from 'vue-router';
<template>
    <header class="bg-gray-200 py-4">
        <div class="container m-auto flex flex-wrap items-center justify-end">
            <div class="flex-1 flex items-center">
                <a href="/" class="uppercase text-sm font-mono pl-4 font-semibold no-underline text-indigo-500 hover:text-indigo-700">Record store</a>
            </div>
            <div>
                <router-link to="/" v-if="!signedIn()" class="no-underline px-2 text-gray-800">Sign In</router-link>
                <router-link to="/signup" v-if="!signedIn()"class="no-underline px-2 text-gray-800">Sign Up</router-link>
    
                <router-link to="/records" v-if="signedIn()" class="no-underline px-2 text-gray-800">Records</router-link>
                <router-link to="/artists" v-if="signedIn()" class="no-underline px-2 text-gray-800">Artists</router-link>
                
                <a href="#" @click.prevent="signOut" v-if="signedIn()" class="no-underline px-2 text-gray-800">Sign Out</a>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        created() {
            this.signedIn();
        },
        methods: {
            setError (error, text) {
                this.error = (error.response && error.response.data && error.response.data.error) || text;
            },
            signedIn() {
                return localStorage.signedIn;
            },
            signOut() {
                this.$http.secured.delete('/signin')
                    .then(response => {
                        delete localStorage.csrf;
                        delete localStorage.signedIn;
                        this.$router.replace('/');
                    })
                    .catch(error => this.setError(error, 'Cannot sign out'));
            }
        }
    }
</script>