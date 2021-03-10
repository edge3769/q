<script context="module">
    export async function preload({ path }, { user }) {
        if (!user) {
            this.redirect(302, `enter`);
        }
        return { user }
    }
</script>

<script>
    export let user
    import Image from '../components/Image.svelte'
    import Input from '../components/Input/Input.svelte'
    import {
        Tag,
        Row,
        Button,
        Column,
        TextArea,
        TextInput,
        ButtonSet,
        FluidForm,
        RadioButton,
        RadioButtonGroup
    } from 'carbon-components-svelte'
    import { goto } from '@sapper/app'
    import * as api from 'api'

    let name
    let price
    let description
    let nameInvalid
    let itype = 'product'

    let token = user.token
    let files = []
    let tags = []
    let current
    let image
    let desc
    let open
    let tag
    let ref

    $: if (!open) {
        desc='Show Tags'
    } else {
        desc='Hide Tags'
    }

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
            description
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

<Row noGutter>
    <Column>
        <RadioButtonGroup selected={itype}>
            <RadioButton labelText='Product' value='product' />
            <RadioButton labelText='Service' value='service' />
        </RadioButtonGroup>
    </Column>
</Row>

<Row noGutter>
    <Column noGutter>
        <TextInput
            on:blur={addTag}
            on:focus={() => (current=ref)}
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
                bind:invalid={nameInvalid}
                invalidText='Name taken'
                labelText="Name"
                bind:value={name} 
            />
            <TextInput labelText="Price" bind:value={price} />
        </FluidForm>
            <TextArea labelText="Description" bind:value={description} />
    </Column>
</Row>

<Row noGutter>
    <Column>     
        <ButtonSet stacked>
            <Button on:click={add}>Add</Button>
        </ButtonSet>
    </Column>
</Row>