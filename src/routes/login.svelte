<script context="module">
    export async function preload({ user }) {
        if (user) {
            this.redirect(302, '/');
        }
    }
</script>
    
<script>
    import {
        Row,
        FluidForm,
        Button,
        Column,
        ButtonSet,
        InlineLoading
    } from 'carbon-components-svelte';
    import Input from '../components/Input/Input.svelte'
    import { goto, stores } from '@sapper/app';
    import { isSideNavOpen, logged } from '../stores.js'
    import { post } from 'utils.js';

    let { session } = stores();
    let usernameInvalid = false
    let passwordInvalid = false
    let usernameError
    let passwordError

    let username = null
    let password = null
    let loginLoading
    let joinLoading

    let keydown = (e) => {
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

    let join  = async function() {
        joinLoading = true
        if (!username){
            usernameInvalid = true
            usernameError = 'Empty'
            joinloading = false
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
        let r = await post(`auth/join`, { username, password })
            .then((r)=>{
                joinLoading=false
                return r
            })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.user) {
            $session.user = r.user
            $logged = true
            $isSideNavOpen = true
            goto('edit')
        }
    }

    let login = async function() {
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
        let r = await post(`auth/login`, { username, password })
            .then((r)=>{
                loginLoading=false
                return r
            })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (await r.user) {
            $session.user = await r.user
            $logged = true
            $isSideNavOpen = true
            goto('/')
        }
    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>Login</title>
</svelte:head>

<Row noGutter>
    <Column>
        <FluidForm>
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
            <Button as let:props>
                <div on:click={login} {...props}>
                    <p>Login</p>
                    {#if loginLoading}
                        <InlineLoading />
                    {/if}
                </div>
            </Button>
            <Button as let:props
                kind='ghost'
            >
                <div on:click={join} {...props}>
                    <p>Join</p>
                    {#if joinLoading}
                        <InlineLoading />
                    {/if}
                </div>                
            </Button>
    </ButtonSet>
    </Column>
</Row>