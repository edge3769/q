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
    } from 'carbon-components-svelte';
    import Input from '../components/Input/Input.svelte'
    import { goto, stores } from '@sapper/app';
    import { post } from 'utils.js';

    let { session } = stores();
    let usernameInvalid = false
    let passwordInvalid = false
    let usernameError
    let passwordError

    let username = null
    let password = null

    $: if (username === '') {
        usernameInvalid=true
        usernameError='No username'
    } else {
        usernameInvalid=false
    }
    $: if (password === '') {
        passwordInvalid=true
        passwordError='No password'
    } else {
        passwordInvalid=false
    }

    let join  = async function() {
        usernameInvalid=false
        if (usernameInvalid || passwordInvalid) return
        let r = await post(`auth/join`, { username, password })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.user) {
            $session.user = r.user
            goto('edit')
        }
    }

    let login = async function() {
        usernameInvalid=false
        if (usernameInvalid || passwordInvalid) return
        let r = await post(`auth/login`, { username, password })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.user) {
            $session.user = r.user
            goto('/')
        }
    }
</script>

<svelte:head>
    <title>Enter</title>
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
            <Button 
                on:click={login}
            >
                Login
            </Button>
            <Button
                on:click={join}
                rel='prefetch'
                kind='ghost'
            >
                Join
            </Button>
    </ButtonSet>
    </Column>
</Row>