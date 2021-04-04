<script context='module'>
    import * as api from 'api'
    export async function preload({params}, {user}){
        if (!user){
            this.redirect(302, 'login')
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
        FluidForm,
        ButtonSet,
        TextInput,
        Checkbox,
        TextArea,
        Column,
        Button,
        Modal,
        Row,
    } from 'carbon-components-svelte'
    import {initialCaps} from 'utils'
    import Tag from '../../components/Tag.svelte'
    import Image from '../../components/Image.svelte'
    import Input from '../../components/Input/Input.svelte'

    $: itype = initialCaps(itype)

    let nameInvalid

    let itext = item.itext
    let visible = item.visible
    let images = item.images
    let price = item.price
    let itype = item.itype
    let image = item.image
    let name = item.name
    let tags = item.tags
    let files = []
    let delOpen
    let file

    if (images){
        for (file of images){
            files = [...files, {file: file, name: file.name, ref: null, status: 'completed'}]
        }
    }

    let keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    edit()
                }
        }
    }

    let del = async function(){
        let res = await api.del(`items/${item.id}`, user.token)
        if (res.yes){
            goto(`items/${user.id}`)
        }
    }

    let edit = async function(){
        images = files.map((f)=>{
            f = f.file
        })
        let data = {
            itext,
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
        if (res.nameError) {
            nameInvalid = true
        }
        if (res.id){
            goto(`item/${res.id}`)
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

<Tag bind:tags />

<Row noGutter>
    <Column>
        <FluidForm>
            <Input 
                labelText="Name" 
                bind:value={name}
                bind:invalid={nameInvalid}
                invalidText='Name taken'
            />
            <TextInput labelText="Type" bind:value={itype} />
        </FluidForm>
            <TextArea labelText="Text" bind:value={itext} />
    </Column>
</Row>

<Row noGutter>
    <ButtonSet stacked>
        <Button on:click={() => (delOpen=true)}>Delete Item</Button>
        <Button on:click={edit}>Edit</Button>
    </ButtonSet>
</Row>