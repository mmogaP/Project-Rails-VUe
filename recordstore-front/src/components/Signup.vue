<template>
    <div class="max-w-sm m-auto my-8">
        <div class="border p-10 border-gray-50 shadow rounded">
            <h3 class="text-2xl mb-6 text-gray-800">Sign Up</h3>
            <form @submit.prevent="signup">
                <div class="text-red-400" v-if="error">{{ error }}</div>
            
                <div class="mb-6">
                    <label for="email" class="block text-gray-800">Email</label>
                    <input type="email" id="email" v-model="email" class="w-full p-2 border border-gray-300 rounded" placeholder="email@gmail.com">
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-gray-800">Password</label>
                    <input type="password" id="password" v-model="password" class="w-full p-2 border border-gray-300 rounded" placeholder="***********">
                </div>

                <div class="mb-6">
                    <label for="password_confirmation" class="block text-gray-800">Confirm Password</label>
                    <input type="password" id="password_confirmation" v-model="password_confirmation" class="w-full p-2 border border-gray-300 rounded" placeholder="***********">
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button> 

                <div class="mt-4 text-center">
                    <router-link to="/" class="text-blue-500">
                        Already have an account? Sign in
                    </router-link>
                </div>
            
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/records')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>