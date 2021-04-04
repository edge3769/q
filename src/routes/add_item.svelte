<script context="module">
    export async function preload({ path }, { user }) {
        if (!user) {
            this.redirect(302, `login`);
        }
        return { user }
    }
</script>

<script>
    export let user
    import Image from '../components/Image.svelte'
    import Tag from '../components/Tag.svelte'
    import Input from '../components/Input/Input.svelte'
    import {
        Row,
        Button,
        Column,
        Checkbox,
        TextArea,
        TextInput,
        ButtonSet,
        FluidForm,
    } from 'carbon-components-svelte'
    import { goto } from '@sapper/app'
    import * as api from 'api'

    let nameInvalid

    let link
    let name
    let price
    let itext
    let itype
    let redirect

    let token = user.token
    let files = []
    let tags = []
    let current
    let image
    let open
    let tag
    let ref

    let clear = () => {
        tags = []
        open = false
    }

    let keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (current==ref){
                    addTag()
                }
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

    let add = async function() {
        let images = files.map((f)=>{
            f = f.file
        })
        let data = {
            tags,
            name,
            image,
            price,
            itype,
            images,
            itext
        }
        let res = await api.post('items', data, token)
        if (res.nameError) {
            nameInvalid = true
        }
        if (res.id) {
            goto(`item/${res.id}`)
        }
    }
</script>

<svelte:window on:keydown={keydown} />
    
<svelte:head>
    <title>Add Item</title>
</svelte:head>

<Image bind:image bind:files />

<Tag bind:tags />

<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalid={nameInvalid}
                invalidText='Name taken'
                labelText="Name"
                bind:value={name} 
            />
            <TextInput labelText="Item Type" bind:value={itype} />
            <Checkbox bind:checked={redirect} 
                labelText="Let the item's listing redirect to a link" />
            {#if redirect}
                <TextInput labelText="Link" bind:value={link} />
            {/if}
            <TextArea labelText="Text(markdown)" bind:value={itext} />
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <Column>     
        <ButtonSet stacked>
            <Button on:click={add}>Add</Button>
        </ButtonSet>
    </Column>
</Row>