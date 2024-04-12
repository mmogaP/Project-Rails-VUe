<template>
    <div class="max-w-sm m-auto my-8">
        <div class="border p-10 border-gray-50 shadow rounded">
            <h3 class="text-2xl mb-6 text-gray-800">Sign In</h3>
            <form @submit.prevent="signin">
                <div class="text-red-400" v-if="error">{{ error }}</div>
            
                <div class="mb-6">
                    <label for="email" class="block text-gray-800">Email</label>
                    <input type="email" id="email" v-model="email" class="w-full p-2 border border-gray-300 rounded" placeholder="email@gmail.com">
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-gray-800">Password</label>
                    <input type="password" id="password" v-model="password" class="w-full p-2 border border-gray-300 rounded" placeholder="***********">
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Sign In</button> 

                <div class="mt-4 text-center">
                    <router-link to="/signup" class="text-blue-500">Create an account</router-link>
                </div>
            
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Signin',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    created() {
        this.checkSignedIn();
    },
    updated() {
        this.checkSignedIn();
    },
    methods: {
        signin() {
            this.$http.plain.post('/signin', { email: this.email, password: this.password })
                .then(response => this.signinSuccessful(response))
                .catch(error => this.signinFailed(error));
        },
        signinSuccessful(response) {
            if (!response.data.csrf) {
                this.signinFailed(response);
                return;
            }
            localStorage.csrf = response.data.csrf;
            localStorage.signedIn = true;
            this.error = '';
            this.$router.replace('/records');
        },
        signinFailed(error) {
            this.error = (error.response && error.response.data && error.response.data.error) || 'An error occurred';
            delete localStorage.csrf;
            delete localStorage.signedIn;
        },
        checkSignedIn() {
            if (localStorage.signedIn) {
                this.$router.replace('/records');
            }
        }
    }    
}

</script>