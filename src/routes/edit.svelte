<script context="module">
    import * as api from 'api.js';
    export async function preload({params}, { user }) {
        if (!user){
            this.redirect(302, 'enter')
        }
        //user = api.get(`user/?id=${user.id}`)
    }
</script>
    
<script>
    import { goto, stores } from '@sapper/app';
    import {
        FluidForm,
        TextInput,
        Checkbox,
        TextArea,
        Button,
        Column,
        Row,
        Tag
    } from 'carbon-components-svelte'
    import Input from '../components/Input/Input.svelte'
    import Image from '../components/Image.svelte'

    let { session } = stores();

    let username = $session.user.username
    let visible = $session.user.visible
    let address = $session.user.address
    let website = $session.user.website
    let images = $session.user.images || []
    let image = $session.user.image
    let tags = $session.user.tags || []
    let email = $session.user.email
    let phone = $session.user.phone
    let about = $session.user.about
    let token = $session.user.token
    let name = $session.user.name

    let usernameInvalid
    let usernameError
    let files = []
    let current
    let open
    let tag
    let ref

    images.forEach(i=>{
        files = [...files, {url:i, name:'null', ref:null, status:'complete'}]
    })

    $: if (username === '') {
        usernameInvalid=true
        usernameError='No username'
    } else {
        usernameInvalid=false
    }

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
        console.log(tag)
        tags = tags.filter(t => t != tag)
        console.log(tags)
    }

    let checkUsername = async () => {
        if (username != $session.user.username){
            usernameInvalid = await api.get(`check_username/${username}`).then(r => !r.res)
        }
    }

    let edit = async () => {
        images = []
        files.map(f=>{
            images.push(f.url)
        })
        images = images
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
        console.log(res)
        if (res.id) {
            $session.user = res;
            goto('/')
        }
    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>Edit Profile</title>
</svelte:head>

<Image bind:files bind:image />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Visible'/>
    </Column>
</Row>

<Row noGutter>
    <Column noGutter>
        <TextInput
            on:focus={() => {open=true; current=ref}}
            placeholder='Add tag'
            bind:value={tag}
            bind:ref
        />
    </Column>
</Row>

{#if open}
    <Row noGutter>
        <Column>
            <Tag
                on:click={clear}
                type='magenta'
            >
                Clear
            </Tag>
            {#each tags as tag}
                <Tag filter on:click={delTag(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}
    
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
            <TextInput
                labelText="Email"
                bind:value={email}
            />
            <TextInput labelText="Name" bind:value={name} />
            <TextInput labelText="Phone" bind:value={phone} />
            <TextInput labelText="Address" bind:value={address} />
            <TextInput labelText="Website" bind:value={website} />
        </FluidForm>
    </Column>
</Row>
    
<Row noGutter>
    <Column>
        <TextArea labelText='About(Markdown)' bind:value={about} />
    </Column>
</Row>
    
<Row noGutter>
    <Column>
        <Button on:click={edit}>Edit</Button>
    </Column>
</Row>