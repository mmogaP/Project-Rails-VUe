import { default } from '../artists/Artists.vue';
<template>
    <div class="max-w-md m-auto py-10">
        <div class="text-red-500" v-if="error">{{ error }}</div>
        <h3 class="font-mono font-normal text-3xl mb-4">Add a new record</h3>

        <form @submit.prevent="addRecord">
            <div class="mb-6">
                <label for="record_title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" id="record_title" class="w-full p-2 border border-gray-300 rounded" autofocus
                    autocomplete="off" placeholder="Type a record title" v-model="newRecord.title">
            </div>

            <div class="mb-6">
                <label for="record_year" class="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <input type="text" id="record_year" class="w-full p-2 border border-gray-300 rounded" autofocus
                    autocomplete="off" placeholder="Year" v-model="newRecord.year">
            </div>

            <div class="mb-6">
                <label for="artist" class="block text-gray-700 text-sm font-bold mb-2">Artist</label>
                <select id="artist" class="w-full p-2 border border-gray-300 rounded" v-model="newRecord.artist">

                    <option disabled value="">Select an artist</option>
                    <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name }}</option>

                </select>
                <p class="pt-4">Don't see an artist? <router-link to="/artists"
                        class="text-blue-500 hover:text-blue-700">Add a new artist</router-link></p>
            </div>

            <input type="submit" value="Add Record"
                class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-400 hover:bg-green-800 block w-full py-4 text-white justify-center">
        </form>

        <hr class="border border-gray-300 my-6">

        <ul class="list-reset mt-4">
            <li class="py-4" v-for="record in records" :key="record.id" :record="record">
                <div class="flex items-center justify-between flex-wrap">
                    <div class="flex-1 flex justify-between flex-wrap pr-4">
                        <p class="block font-mono font-semibold items-center">{{ record.title }} &mdash; {{ record.year
                            }}</p>
                        <p class="block font-mono font-semibold">{{ getArtist(record) }}</p>
                    </div>

                    <button class="bg-transparent text-sm hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 no-underline font-bold py-2
                    px-4 mr-2 rounded" @click.prevent="editRecord(record)">Edit</button>

                    <!-- delete -->
                    <button class="bg-transparent text-sm hover:bg-red-400 hover:text-white text-red-400 border border-red-400 no-underline font-bold py-2
                    px-4 rounded" @click.prevent="removeRecord(record)">Delete</button>
                </div>

                <div v-if="record == editedRecord">
                    <form action="" @submit.prevent="updateRecord(record)">
                        <div class="mb-6 p-4 bg-white rounded border border-gray-300 mt-4">

                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                <input class="w-full p-2 border border-gray-300 rounded" v-model="record.title">
                            </div>

                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                <input class="w-full p-2 border border-gray-300 rounded" v-model="record.year">
                            </div>

                            <div class="mb-6">
                                <select id="artist_update" class="w-full p-2 border border-gray-300 rounded"
                                    v-model="record.artist">

                                    <option disabled value="">Select an artist</option>
                                    <option :value="artist.id" v-for="artist in artists" :key="artist.id">{{ artist.name
                                        }}</option>

                                </select>
                            </div>

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
    name: 'Records',
    data() {
        return {
            records: [],
            artists: [],
            newRecord: {
                title: '',
                year: '',
                artist: ''
            },
            editedRecord: '',
            error: ''
        }
    },
    created() {
        if (!localStorage.signedIn) {
            this.$router.replace('/');
        } else {
            this.$axios.secured.get('/api/v1/records')
                .then(response => this.records = response.data)
                .catch(error => this.setError(error, 'Cannot load records'));

            this.$axios.secured.get('/api/v1/artists')
                .then(response => this.artists = response.data)
                .catch(error => this.setError(error, 'Cannot load artists'));
        }
    },
    methods: {
        setError(error, text) {
            this.error = (error.response && error.response.data && error.response.data.error) || text;
        },
        getArtist(record) {
            const recordArtistValues = this.artists.filter(artist => artist.id === record.artist_id);

            let artist
            recordArtistValues.forEach(function (element) {
                artist = element.name
            });
            return artist
        },
        addRecord() {
            const value = this.newRecord
            if (!value) {
                return
            }
            this.$axios.secured.post('/api/v1/records', { record: { title: this.newRecord.title, year: this.newRecord.year, artist_id: this.newRecord.artist } })
                .then(response => {
                    this.records.push(response.data);
                    this.newRecord = { title: '', year: '', artist: '' };
                })
                .catch(error => this.setError(error, 'Cannot add record'));
        },
        removeRecord(record) {
            this.$axios.secured.delete(`/api/v1/records/${record.id}`)
                .then(response => {
                    this.records.splice(this.records.indexOf(record), 1);
                })
                .catch(error => this.setError(error, 'Cannot delete record'));
        },
        editRecord(record) {
            this.editedRecord = record;
        },
        updateRecord(record) {
            this.editRecord = '';
            this.$axios.secured.patch(`/api/v1/records/${record.id}`, { record: { title: record.title, year: record.year, artist_id: record.artist } })
                .catch(error => this.setError(error, 'Cannot update record'));
        }
    }
}

</script>