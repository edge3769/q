<script context='module'>
    import * as api from 'api'
    export async function preload({params}, {user}){
        if (!user){
            this.redirect(302, 'enter')
        }
        let {id} = params
        let item = await api.get(`items/${id}`)
        return { item, user }
    }
</script>

<script>
    export let item, user
    import { goto } from '@sapper/app'
    import {
        RadioButtonGroup,
        RadioButton,
        FluidForm,
        ButtonSet,
        TextInput,
        Checkbox,
        TextArea,
        Column,
        Button,
        Modal,
        Row,
        Tag
    } from 'carbon-components-svelte'
    import Image from '../../components/Image.svelte'

    let description = item.description
    let visible = item.visible
    let images = item.images
    let price = item.price
    let itype = item.itype
    let image = item.image
    let name = item.name
    let tags = item.tags
    let files = []
    let current
    let delOpen
    let file
    let open
    let ref
    let tag

    if (images){
        for (file of images){
            files = [...files, {file: file, name: file.name, ref: null, status: 'completed'}]
        }
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

    let del = async function(){
        let res = await api.del(`items/${item.id}`, user.token)
        if (res.yes){
            goto('items')
        }
    }

    let edit = async function(){
        images = files.map((f)=>{
            f = f.file
        })
        let data = {
            description,
            id: item.id,
            images,
            image,
            visible,
            price,
            itype,
            name,
            tags,
        }
        let res = await api.put('items', data, user.token)
        if (res.id){
            goto(`item/${item.id}`)
        }
    }
</script>

<svelte:window on:keydown={keydown} />

<Modal
    bind:open={delOpen}
    modalHeading='Delete item'
    primaryButtonText='Delete'
    secondaryButtonText='Cancel'
    on:click:button--secondary={() => (delOpen=false)}
    on:submit={del}
>
    <p>Sure you want to delete this item?</p>
</Modal>

<svelte:head>
    <title>Edit Item</title>
</svelte:head>

<Image bind:files bind:image />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Visible' />
    </Column>
</Row>

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
            on:focus={() => {open=true;current=ref}}
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
            <TextInput labelText="Name" bind:value={name} />
            <TextInput labelText="Price" bind:value={price} />
        </FluidForm>
            <TextArea labelText="Description" bind:value={description} />
    </Column>
</Row>

<Row noGutter>
    <ButtonSet stacked>
        <Button on:click={() => (delOpen=true)}>Delete Item</Button>
        <Button on:click={edit}>Edit</Button>
    </ButtonSet>
</Row>