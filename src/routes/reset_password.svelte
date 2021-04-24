<svelte:window on:keydown={keydown} />

<script context='module'>
    import * as api from 'api'
    export async function preload(page, {user}){
        if(user){
            this.redirect(302, 'login')
        }
        let token = page.query.q
        let res = await api.get('check_reset_password_token', token)
        if(res != 'true'){
            this.redirect(302, `login?n=invalid`)
        }
    }
</script>

<script>
    export let token

    import {
        InlineLoading,
        ButtonSet,
        FluidForm,
        Button,
        Column,
        Row
    } from 'carbon-components-svelte'
    import Input from '../components/Input/Input.svelte'
    import { goto } from '@sapper/app'
    import { notify } from '../stores'
    import { post } from 'utils.js'

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
        let res = await api.put('reset_password', {password}, token).finally(
            ()=>loading=false
        )
        if(res.email) {
            $notify = 'resetSuccess'
            await post('auth/login', {username, password})
        } else {
            $notify = 'invalidLink'
            goto('login')
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