const app = new Vue({
    el: '#app',

    data: {
        items: null,
        keyword: '',
        message: '',
    },
    created: function(){
        this.debounceGetAnswer = _.debounce(this.getAnswer, 1000)
    },

    methods: {
        search: function(){
        const url = 'https://qiita.com/api/v2/items';
        const params = { page: 1, per_page: 20, query: this.keyword }

        if(this.keyword===''){
            this.items = null;
            return
        };
        this.message = 'Loading...'

        axios.get(url, {params})
        .then(response => {
            const items = response.data
            console.log(items)
        })
        .catch( error => {
            this.message = 'Error!' + error;
        })
        .finally( () => {
            this.message = '';
        })
        }
    },
    watch: {
        keyword: function(newKey, oldKey){
            this.message = "Waiting until you finish typing";
            this.debounceGetAnswer();

        }
    }
})