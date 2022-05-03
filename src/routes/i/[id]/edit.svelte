<script context='module'>
    import { api } from '$lib/api'
    export  const load = async({ params, session}) =>{
        let user = session.user
        if (!user){
            return {
                status: 302,
                redirect: '/'
            }
        }
        let {id} = params
        let item = await api.get(`items/${id}`)
        if (item.user.username !== user.username){
            return {
                status: 302,
                redirect: `/items/?username=${user.username}`
            }
        }
        return {
            props: {
                item,
                user
            }
        }
    }
</script>

<script>
    export let item,user
    import { Row, Column } from 'carbon-components-svelte';
    import Edit from '$lib/components/Items/Edit.svelte';
</script>

<Row noGutter>
    <Column>
        <Edit method='put' {item} {user} />
    </Column>
</Row>