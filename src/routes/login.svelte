<svelte:window on:keydown={keydown} />

<script context='module'>
  import { routes } from "$lib/utils";
    export const load = ({session}) => {
        if (session.user) {
            return {
                redirect: routes.index,
                status: 302
            }
        }
        return {
            props: {}
        }
    }
</script>

<script>
    import {
        Row,
        Form,
        Modal,
        Button,
        Column,
        ButtonSet,
        InlineLoading,
    } from 'carbon-components-svelte';
    import { api } from '$lib/utils'
    import Input from '$lib/components/Input/Input.svelte'
    import { goto } from '$app/navigation';
    import { session } from '$app/stores'
    import { newUser } from '$lib/stores' 
    import { post } from '$lib/utils/fetch/post'
    import { checkEmail } from '$lib/utils/checkEmail'
    import NavNotification from '$lib/components/Notifications/NavNotification.svelte'

    $: if($newUser) {
        userText = 'Login instead'
    } else {
        userText = 'Join instead'
    }

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

    let noPassword
    let noPasswordModal

    const checkNoPassword = async() => {
        let noUserPassword = await api.get(`users/check-no-password/${username}`).then(r => r.res)
        return noUserPassword
    }

    const keydown=(e)=>{
        switch(e.keyCode){
            case 13:
                $newUser ? join(): login()
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
        $newUser = !$newUser
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
        if (!password && !await checkNoPassword()){
            passwordInvalid = true
            passwordError = 'Empty'
            loginLoading = false
            return
        }
        usernameInvalid=false
        passwordInvalid=false
        let r = await post('auth/login', { username, password }).then(
            (res)=>{
                loginLoading=false
                return res
            })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.token) {
            r.user ? $session.user = r.user : {}
            goto(routes.index)
        }
    }

    const join  = async function() {
        joinLoading = true
        // if ($newUser && !email){
        //     emailInvalid = true
        //     emailError = 'Empty'
        //     joinLoading = false
        //     return
        // }
        // if (!username){
        //     usernameInvalid = true
        //     usernameError = 'Empty'
        //     joinLoading = false
        //     return
        // }
        // if (checkEmail(username)){
        //     usernameInvalid = true
        //     usernameError = 'Unaccepted'
        //     joinLoading = false
        //     return
        // }
        if (!password && !noPassword){
            noPasswordModal = true
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
        if (r.emailError) {
            emailInvalid = true
            emailError = r.emailError
        }
        if (r.usernameError) {
            usernameInvalid = true
            usernameError = r.usernameError
        }
        if (r.emailError) {
            passwordInvalid = true
            passwordError = r.passwordError
        }
        console.log(r)
        if (r.token) { //TODO-unsafe
            r.user ? $session.user = r.user : {}
            goto('/edit')
        } else {
        }
    }
</script>

<NavNotification />

<Modal
    danger
    bind:open={noPasswordModal}
    modalHeading='Create user account without a password'
    primaryButtonText='Confirm'
    secondaryButtonText='Cancel'
    on:click:button--primary={()=>{noPasswordModal=false; noPassword=true; join();}}
    on:click:button--secondary={()=>{noPasswordModal=false}}
>
    <p>
        This will create a user account without a password, allowing
        anyone to access it. Continue?
    </p>
</Modal>

<svelte:head>
    <title>Login</title>
</svelte:head>

<Row noGutter>
    <Column sm={8} md={8} lg={8} xlg={8}>
        <Form>
            {#if $newUser}
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
                on:blur={checkNoPassword}
            />
            {#if !noPassword}
            <Input
                bind:invalid={passwordInvalid}
                invalidText={passwordError}
                bind:value={password}
                labelText='Password'
                bind:ref={passwordRef}
                password
            />
            {/if}
            <ButtonSet stacked>
                {#if !$newUser}
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
                {:else}
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
        </Form>
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
        src: url('/junegull.ttf');
    }
    #head {
        font-family: round;
    }
    .right {
        float: right;
    }
</style>