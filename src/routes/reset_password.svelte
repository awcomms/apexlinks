<svelte:window on:keydown={keydown} />

<script context='module'>
    import { api } from '$lib/api'
    export async function load(){
        let res = await api.get('check_reset_password_token')
        if(!res.r){
            return {
                status: 302,
                redirect: 'login?n=invalid'
            }
        }
    }
</script>

<script>
    import {
        InlineLoading,
        ButtonSet,
        FluidForm,
        Button,
        Column,
        Row
    } from 'carbon-components-svelte'
    import Input from '$lib/components/Input/Input.svelte'
    import { goto } from '$app/navigation'
    import { notify } from '$lib/stores'
    import { post } from '$lib/utils/fetch/post'

    let password
    let password2
    let passwordError
    let passwordInvalid

    let loading

    const keydown=(e)=>{
        if(e.ctrlKey){
            switch(e.keyCode){
                case 13:
                    join()
            }            
        } else {
            switch(e.keyCode){
                case 13:
                    login()
            }
        }
    }

    let reset=async()=>{
        loading = true
        if(!password2){
            passwordInvalid = true
            passwordError = 'Empty'
            loading = false
            return
        }
        if(password2 !== password){
            passwordInvalid = true
            passwordError = 'Passwords do not match'
            loading = false
            return
        }
        let res = await api.put('reset_password', {password}).finally(
            (r)=>{
                loading=false
                return r
            }
        )
        if(res.r) {
            $notify = 'resetSuccess'
            await post('auth/login', {username, password})
            goto('/')
        } else {
            $notify = 'invalidLink'
            goto('/login')
        }
    }
</script>

<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalid={passwordInvalid}
                invalidText={passwordError}
                bind:value="{password2}"
                labelText='Password'
                password
                focus
            />
            <Input
                bind:value="{password}"
                labelText='Password'
                password
            />
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <Column>
        <ButtonSet 
            stacked
        >
            <Button as let:props>
                <div on:click={reset} {...props}>
                    <p>Reset</p>
                    {#if loading}
                    <div class='right'>
                        <InlineLoading />
                    </div>
                    {/if}
                </div>
            </Button>
    </ButtonSet>
    </Column>
</Row>

<style>
    .right {
        float: right;
    }
</style>