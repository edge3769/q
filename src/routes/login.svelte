<svelte:window on:keydown={keydown} />

<script context="module">
    import * as api from 'api'
    export async function preload(page, { user }) {
        const notify = page.query.notify
        if (user) {
            this.redirect(302, '/');
        }
        return {notify}
    }
</script>
    
<script>
    export let notify
    
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
    import { isSideNavOpen, logged } from '../stores.js'
    import { post, checkEmail } from 'utils.js'
    import ExpiredLink from '../components/Notifications/ExpiredLink.svelte'
    import InvalidLink from '../components/Notifications/InvalidLink.svelte'
    import ResetSuccess from '../components/Notifications/ResetSuccess.svelte';

    $: if(username) username = username.toLowerCase()
    $: if(email) email = email.toLowerCase()

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

    let resetPasswordStatus
    let loginLoading
    let joinLoading

    const resetPassword=async()=>{
        if(!username){
            usernameInvalid = true
            return
        }
        resetPasswordStatus = 'loading'
        const res = await api.put('forgot_password', {username}).then(
            (r)=>{
                resetPasswordStatus = 'done'
                return r
            }
        )
        if(res.sent){
            resetPasswordStatus = 'sent'
        }
    }

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

    const join  = async function() {
        joinLoading = true
        if (!email){
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
        const r = await post(`auth/join`, { email, username, password }).then(
            (r)=>{
                joinLoading=false
                return r
            })
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
        let r = await post('auth/login', { username, password }).then(
            (r)=>{
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
</script>

{#if notify == 'expiredLink'}
    <ExpiredLink />
{:else if notify == 'InvalidLink'}
    <InvalidLink />
{:else if notify == 'resetSuccess'}
    <ResetSuccess />
{/if}

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
                <Button kind='ghost' as let:props>
                    <div on:click={resetPassword} {...props}>
                        <p>Reset Password</p>
                        {#if resetPasswordStatus == 'loading'}
                            <div class='right'>
                                <InlineLoading />
                            </div>
                        {/if}
                    </div>                
                </Button>
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
    {#if resetPasswordStatus == 'sent'}
        <br />
        <p>Check your email</p>
    {/if}
    </Column>
</Row>

<style>
    .right {
        float: right;
    }
</style>