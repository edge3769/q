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

    let { session } = stores();

    let username = user.username
    let visible = user.visible
    let address = user.address
    let website = user.website
    let images = user.images
    let image = user.image
    let email = user.email
    let phone = user.phone
    let about = user.about
    let token = user.token
    let name = user.name
    let tags = user.tags

    let usernameInvalid
    let usernameError
    let files = []
    let current
    let tag
    let ref

    // images.forEach(i=>{
    //     files = [...files, {url:i, name:'null', ref:null, status:'complete'}]
    // })

    let clear = () => {
        open=false
        tags = []
    }

    let keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (current==ref) addTag()
        }
    }

    let addTag = () => {
        if (tag != '' && !tags.includes(tag)){
            tags = [...tags, tag]
            open=true
            tag=''
        }
    }

    let delTag = (tag) => {
        tags = tags.filter(t => t != tag)
    }

    let checkUsername = async () => {
        if (username != user.username){
            usernameInvalid = await api.get(`check_username/${username}`).then(r => !r.res)
        }
    }

    let edit = async () => {
        images = []
        files.forEach(f=>{
            images = [...images, f.url]
        })
        let data = {
            username,
            visible,
            website,
            address,
            images,
            email,
            phone,
            about,
            image,
            tags,
            name,
        } 
        let res = await api.put('users', data, token)
        if (res.id) {
            $session.user = res;
            goto(`${res.username}`)
        }
    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>Edit</title>
</svelte:head>

<Image bind:files bind:image />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Visible'/>
    </Column>
</Row>

<Tag placeholder={tags.length > 0 ? `${tags.length} tags` : 'Add tag'} bind:tags />
    
<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalidText={usernameError}
                bind:invalid={usernameInvalid}
                on:blur={checkUsername}
                bind:value={username}
                labelText="Username"
            />
            <TextInput labelText="Email" bind:value={email} />
            <TextInput labelText="Name" bind:value={name} />
            <TextInput labelText="Phone" bind:value={phone} />
            <TextInput labelText="Address" bind:value={address} />
            <TextInput labelText="Website" bind:value={website} />
            <TextArea placeholder='Markdown' labelText='About(Markdown)' bind:value={about} />
    </FluidForm>
    </Column>
</Row>
    
<Row noGutter>
    <Column>
        <Button on:click={edit}>Edit</Button>
    </Column>
</Row>