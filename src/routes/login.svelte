<svelte:window on:keydown={keydown} />

<script context="module">
    import * as api from '$lib/api'
    export async function load({ page, session }) {
        let n = page.query.n
        if (session.token) {
            return {
                status: 302,
                redirect: '/',
            }
        }
        return {
            props: {
                n
            }
        }
    }
</script>
    
<script>
    export let n

    import {
        Row,
        FluidForm,
        Button,
        Column,
        ButtonSet,
        InlineLoading,
    } from 'carbon-components-svelte';
    import Input from '$lib/components/Input/Input.svelte'
    import { goto } from '$app/navigation';
    import { session } from '$app/stores'
    import { isSideNavOpen, notify } from '$lib/stores'
    import { post, checkEmail } from '$lib/utils'
    import NavNotification from '$lib/components/Notifications/NavNotification.svelte'

    $: if(newUser) {
        userText = 'Login instead'
    } else {
        userText = 'Join instead'
    }

    if(n && process.browser) {
        $notify = n
        goto('/login')
    }

    let newUser
    let userText

    let usernameInvalid = false
    let username = null
    let usernameError

    let usernameRef
    let passwordRef
    let emailRef

    let passwordInvalid = false
    let password = null
    let passwordError

    let emailInvalid = false
    let emailError = 'Invalid Email'
    let email

    let resetPasswordLoading
    let resetPasswordRes
    let loginLoading
    let joinLoading

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

    const validateEmail=()=>{
        if(email) emailInvalid = false
        if(emailRef) emailRef.focus()
    }

    const validateUsername=()=>{
        if(username) usernameInvalid = false
        if(usernameRef) usernameRef.focus()
    }

    const validatePassword=()=>{
        if(password) passwordInvalid = false
        if(passwordRef) passwordRef.focus()
    }

    const toggleNewUser=()=>{
        newUser = !newUser
    }

    const resetPassword=async()=>{
        if(!username){
            usernameInvalid = true
            return
        }
        resetPasswordLoading = true
        const res = await api.put('forgot_password', {username}).finally(
            (r)=>{
                resetPasswordLoading = false
                return r
            }
        )
        usernameInvalid = res.usernameInvalid
        usernameError = res.usernameError
        if (res.r){
            resetPasswordRes = res.r
        }
    }

    const login = async function() {
        loginLoading = true
        if (!username){
            usernameInvalid = true
            usernameError = 'Empty'
            loginLoading = false
            return
        }
        if (!password){
            passwordInvalid = true
            passwordError = 'Empty'
            loginLoading = false
            return
        }
        usernameInvalid=false
        passwordInvalid=false
        let r = await post('auth/login', { username, password }).finally(
            (r)=>{
                loginLoading=false
                return r
            })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.token) {
            $session.token = await r.token
            $isSideNavOpen = true
            goto('/')
        }
    }

    const join  = async function() {
        joinLoading = true
        if (newUser && !email){
            emailInvalid = true
            emailError = 'Empty'
            joinLoading = false
            return
        }
        if (!checkEmail(email)){
            emailInvalid = true
            emailError = 'Unaccepted'
            joinLoading = false
            return 
        }
        if (!username){
            usernameInvalid = true
            usernameError = 'Empty'
            joinloading = false
            return
        }
        if (checkEmail(username)){
            usernameInvalid = true
            usernameError = 'Unaccepted'
            joinLoading = false
            return
        }
        if (!password){
            passwordInvalid = true
            passwordError = 'Empty'
            joinloading = false
            return
        }
        usernameInvalid=false
        passwordInvalid=false
        emailInvalid=false
        const r = await post('auth/join', { email, username, password }).finally(
            (r)=>{
                joinLoading = false
                return r
            }
        )
        usernameInvalid = r.usernameInvalid
        usernameError = r.usernameError
        passwordInvalid = r.passwordInvalid
        passwordError = r.passwordError
        if (r.token) {
            $session.token = r.token
            $isSideNavOpen = true
            goto('/edit')
        }
    }
</script>

<NavNotification />

<svelte:head>
    <title>Login</title>
</svelte:head>

<Row noGutter>
    <Column sm={8} md={8} lg={8} xlg={8}>
        <h1 id='head'>Apexlinks</h1>
        <h2>List your business, products and services</h2>
    </Column>
    <Column sm={8} md={8} lg={8} xlg={8}>
        <FluidForm>
            {#if newUser}
                <Input
                    bind:invalid={emailInvalid}
                    invalidText={emailError}
                    bind:ref={emailRef}
                    bind:value={email}
                    labelText='Email'
                    focus
                />
            {/if}
            <Input
                bind:invalid={usernameInvalid}
                invalidText={usernameError}
                bind:value={username}
                bind:ref={usernameRef}
                labelText='Username'
            />
            <Input
                bind:invalid={passwordInvalid}
                invalidText={passwordError}
                bind:value={password}
                labelText='Password'
                bind:ref={passwordRef}
                password
            />
            <ButtonSet stacked>
                {#if !newUser}
                    <Button as let:props>
                        <div on:click={login} {...props}>
                            <p>Login</p>
                            {#if loginLoading}
                                <div class='right'>
                                    <InlineLoading />
                                </div>
                            {/if}
                        </div>
                    </Button>
                    <!-- <Button kind='ghost' as let:props>
                        <div on:click={resetPassword} {...props}>
                            <p>Reset Password</p>
                            {#if resetPasswordLoading}
                                <div class='right'>
                                    <InlineLoading />
                                </div>
                            {/if}
                        </div>                
                    </Button> -->
                {/if}
                
                {#if newUser}
                    <Button as let:props>
                        <div on:click={join} {...props}>
                            <p>Join</p>
                            {#if joinLoading}
                                <div class='right'>
                                    <InlineLoading />
                                </div>
                            {/if}
                        </div>                
                    </Button>
                {/if}
                <Button
                    kind='ghost'
                    size='small'
                    on:click={toggleNewUser}
                >
                    {userText}
                </Button>
            </ButtonSet>
        </FluidForm>
    </Column>
    <Column>
    <!-- {#if resetPasswordRes}
        <br />
        <p>{resetPasswordRes}</p>
    {/if} -->
    </Column>
</Row>

<style>
    @font-face {
        font-family: round;
        src: url(junegull.ttf) format('ttf');
    }
    #head {
        font-family: round;
    }
    .right {
        float: right;
    }
</style>