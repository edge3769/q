<svelte:window on:keydown={keydown} />

<script context="module">
    import * as api from 'api'
    export async function preload(page, { user }) {
        let n = page.query.n
        if (user) {
            this.redirect(302, '/');
        }
        return {n}
    }
</script>
    
<script>
    export let n

    import {
        Row,
        FluidForm,
        Checkbox,
        Button,
        Column,
        ButtonSet,
        InlineLoading,
    } from 'carbon-components-svelte';
    import Input from '../components/Input/Input.svelte'
    import { goto, stores } from '@sapper/app';
    import { isSideNavOpen, logged, notify } from '../stores.js'
    import { post, checkEmail } from 'utils.js'
    import NavNotification from '../components/Notifications/NavNotification.svelte'

    if(n && process.browser) {
        $notify = n
        goto('login')
    }

    let newUser

    let { session } = stores();
    let usernameInvalid = false
    let username = null
    let usernameError

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

    const keydown = (e) => {
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

    const resetPassword=async()=>{
        if(!username){
            usernameInvalid = true
            return
        }
        resetPasswordLoading = true
        const res = await api.put('forgot_password', {username}).finally(
            (r)=>{
                console.log(r)
                resetPasswordLoading = false
                return r
            }
        )
        console.log(res, res.r)
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
                console.log(r)
                loginLoading=false
                return r
            })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.user) {
            $session.user = await r.user
            $logged = true
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
        const r = await post(`auth/join`, { email, username, password }).finally(
            (r)=>{
                console.log(r)
                joinLoading = false
                return r
            }
        )
        usernameInvalid = r.usernameInvalid
        usernameError = r.usernameError
        passwordInvalid = r.passwordInvalid
        passwordError = r.passwordError
        if (r.user) {
            $session.user = r.user
            $logged = true
            $isSideNavOpen = true
            goto('edit')
        }
    }
</script>

<NavNotification />

<svelte:head>
    <title>Login</title>
</svelte:head>

<Row noGutter>
    <Column>
        <Checkbox bind:checked={newUser} labelText='New User' />
    </Column>
</Row>

<Row noGutter>
    <Column>
        <FluidForm>
            {#if newUser}
                <Input
                    bind:invalid={emailInvalid}
                    invalidText={emailError}
                    bind:value={email}
                    labelText='Email'
                    focus
                />
            {/if}
            <Input
                bind:invalid={usernameInvalid}
                invalidText={usernameError}
                bind:value={username}
                labelText='Username'
            />
            <Input
                bind:invalid={passwordInvalid}
                invalidText={passwordError}
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
    </ButtonSet>
    <!-- {#if resetPasswordRes}
        <br />
        <p>{resetPasswordRes}</p>
    {/if} -->
    </Column>
</Row>

<style>
    .right {
        float: right;
    }
</style>