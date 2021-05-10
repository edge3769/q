<svelte:window on:keydown={keydown} />

<script context="module">
    import * as api from 'api.js';
    export async function preload({params}, { user }) {
        if (!user){
            this.redirect(302, 'login')
        }
        user = await api.get(`users/${user.id}`)
        return {user}
    }
</script>
    
<script>
    export let user
    import { goto, stores } from '@sapper/app';
    import {
        InlineLoading,
        FluidForm,
        TextInput,
        Checkbox,
        TextArea,
        Button,
        Column,
        Row,
    } from 'carbon-components-svelte'
    import Input from '../components/Input/Input.svelte'
    import Image from '../components/Image.svelte'
    import Tag from '../components/Tag.svelte'
    import { checkEmail } from 'utils'

    $: checkUsername(username)

    $: if(username) username = username.toLowerCase()
    $: if(email) email = email.toLowerCase()

    let { session } = stores();

    let show_email = user.show_email
    let username = user.username
    let visible = user.visible
    let address = user.address
    let website = user.website
    let image = user.image
    let email = user.email
    let phone = user.phone
    let about = user.about
    let token = user.token
    let name = user.name
    let tags = user.tags || []

    let usernameInvalid
    let usernameError

    let emailInvalid
    let emailError

    let loading

    const keydown=(e)=>{
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    edit()
                }
        }
    }

    const checkUsername=async()=>{
        if (username != user.username){
            usernameInvalid = await api.get(`check_username/${username}`).then(r => !r.res)
        }
    }

    const edit=async()=>{
        loading = true  
        if (!email){
            emailInvalid = true
            emailError = 'Empty'
            loading = false
            return
        }
        if (!checkEmail(email)){
            emailInvalid = true
            emailError = 'Unaccepted'
            loading = false
            return 
        }
        if (!username){
            usernameInvalid = true
            usernameError = 'Empty'
            loading = false
            return
        }
        if (checkEmail(username)){
            usernameInvalid = true
            usernameError = 'Unaccepted'
            loading = false
            return
        }
        let data = {
            show_email,
            username,
            visible,
            website,
            address,
            email,
            phone,
            about,
            image,
            tags,
            name,
        } 
        let res = await api.put('users', data, token).finally(
            (r)=>{
                loading = false
                return r
            }
        )
        if (res.id) {
            $session.user = res
            goto(`${res.username}`)
        }
    }
</script>

<svelte:head>
    <title>Edit</title>
</svelte:head>

<Image bind:image />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Public'/>
    </Column>
</Row>

<Tag bind:tags />
    
<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalidText={usernameError}
                bind:invalid={usernameInvalid}
                bind:value={username}
                labelText="Username"
            />
            <Checkbox labelText='Show email in profile' bind:checked={show_email} />
            <TextInput labelText="Email" bind:value={email} />
            <TextInput labelText="Name" bind:value={name} />
            <TextInput labelText="Phone" bind:value={phone} />
            <TextInput labelText="Address" bind:value={address} />
            <TextInput labelText="Website" bind:value={website} />
            <TextArea rows={11} placeholder='About (Markdown)' bind:value={about} />
        </FluidForm>
    </Column>
</Row>
    
<Row noGutter>
    <Column>
        <Button as let:props>
            <div on:click={edit} {...props}>
                <p>Edit</p>
                {#if loading}
                    <div class='right'>
                        <InlineLoading />
                    </div>
                {/if}
            </div>
        </Button>
    </Column>
</Row>

<style>
    .right {
        float: right;
    }
</style>