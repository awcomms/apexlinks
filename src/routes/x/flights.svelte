<script>
    import {api} from '$lib/api'
    
    const load = async() => {
        let outbound = {
            date: '2021-11-21T00:00:00',
            destination: 'LAX',
            origin: 'NYC'
        }
        let passengers = {
            'ADT': 1
        }
        let arg = JSON.stringify({ outbound, passengers })
        await api.get(`flights?req=${arg}`)
    }
</script>

<button on:click={load}>q</button>

done