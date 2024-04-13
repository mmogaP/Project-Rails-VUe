<template>
    <div class="max-w-md m-auto py-10">
        <div class="text-red-500" v-if="error">{{ error }}</div>
        <h3 class="font-mono font-normal text-3xl mb-4">Add a new artist</h3>

        <form @submit.prevent="addArtist">
            <div class="mb-6">
                <input 
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded"
                    autofocus
                    autocomplete="off"
                    placeholder="Type an artist name"
                    v-model="newArtist.name"
                >
            </div>

            <input type="submit" value="Add artist" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-400 hover:bg-green-800 block w-full py-4 text-white justify-center">
        </form>

        <hr class="border border-gray-400 my-6"> 

        <ul class="list-reset mt-4">
            <li class="py-4" v-for="artist in artists" :key="artist.id" :artist="artist">
                <div class="flex items-center justify-between flex-wrap">
                    <p class="block flex-1 font-mono font-semibold flex items-center">
                        {{ artist.name }}
                    </p>

                    <button class="bg-transparent text-sm hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 no-underline font-bold py-2
                    px-4 mr-2 rounded" @click.prevent="editArtist(artist)">Edit</button>

                    <!-- delete -->
                    <button class="bg-transparent text-sm hover:bg-red-400 hover:text-white text-red-400 border border-red-400 no-underline font-bold py-2
                    px-4 rounded" @click.prevent="removeArtist(artist)">Delete</button>
                </div>

                <div v-if="artist == editedArtist">
                    <form @submit.prevent="updateArtist(artist)">
                        <div class="mb-6 p-4 bg-white rounded border border-gray-300 mt-4">
                            <input type="input" v-model="artist.name">
                            <input type="submit" value="Update" class="my-2 bg-transparent text-sm hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400
                            no-underline font-bold py-2 px-4 rounded cursor-pointer">
                        </div>
                    </form>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'Artists',
        data() {
            return {
                artists: [],
                newArtist: [],
                editedArtist: '',
                error: ''
            }
        },
        created() {
            if (!localStorage.signedIn) {
                this.$router.replace('/');
            } else {
                this.$http.secured.get('/api/v1/artists')
                    .then(response => this.artists = response.data)
                    .catch(error => this.setError(error, 'Cannot load artists'));
            }
        },

        methods: {
            setError(error, text) {
            this.error = (error.response && error.response.data && error.response.data.error) || text;
            },
            addArtist() {
                const value = this.newArtist
                if (!value) {
                    return
                }
                this.$http.secured.post('/api/v1/artits' { artist: { name: this.newArtist.name } })
                    .then(response => {
                        this.artists.push(response.data);
                        this.newArtist = '';
                    })
                    .catch(error => this.setError(error, 'Cannot add artist'));
            },
            removeArtist(artist) {
                this.$http.secured.delete(`/api/v1/artists/${artist.id}`)
                    .then(response => {
                        this.artists.splice(this.artists.indexOf(artist), 1);
                    })
                    .catch(error => this.setError(error, 'Cannot delete artist'));
            },
            editArtist(artist) {
                this.editedArtist = artist;
            },
            updateArtist(artist) {
                this.editedArtist = '';
                this.$http.secured.patch(`/api/v1/artists/${artist.id}`, { artist: { title: artist.name } })
                    .catch(error => this.setError(error, 'Cannot update artist'));
            }
        }
    }
</script>