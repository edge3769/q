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
    import { abslink } from 'utils'

    $: itype = initialCaps(itype)

    let nameInvalid

    let itext = item.itext
    let visible = item.visible
    let images = item.images
    let redirect = item.redirect
    let price = item.price
    let link = item.link
    let itype = item.itype
    let image = item.image
    let name = item.name
    let tags = item.tags

    let linkInvalid
    let linkError = 'Add a url scheme to the link, something like "http://, at the beginning'

    let delOpen
    let delLoading
    let editLoading

    const keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    edit()
                }
        }
    }

    const del = async function(){
        delLoading = true
        let res = await api.del(`items/${item.id}`, user.token).finally(
            (r)=>{
                delLoading = false
                return r
            }
        )
        if (res.yes){
            goto(`items/${user.id}`)
        } //TODO else reload the page
    }

    const edit = async function(){
        editLoading = true
        if(!abslink.test(link)){
            linkInvalid = true
            editLoading = false
            return
        }
        let data = {
            itext,
            id: item.id,
            image,
            link,
            redirect,
            visible,
            price,
            itype,
            name,
            tags,
        }
        let res = await api.put('items', data, user.token).finally(
            (r)=>{
                editLoading = false
                return r
            }
        )
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

<Image bind:image />

<Row noGutter>
    <Column>
        <Checkbox bind:checked={visible} labelText='Visible' />
    </Column>
</Row>

<Tag placeholder={tags.length > 0 ? `${tags.length} tags` : 'Add tag'} bind:tags />

<Row noGutter>
    <Column>
        <FluidForm>
            <Input 
                labelText="Name" 
                bind:value={name}
                bind:invalid={nameInvalid}
                invalidText='Name taken'
            />
            <!-- <TextInput labelText="Item type" bind:value={itype} /> -->
            <Checkbox bind:checked={redirect} 
                labelText="Let the item's listing redirect to a link" />
            {#if redirect}
                <Input 
                    invalid={linkInvalid}
                    invalidText={linkError}
                    labelText='Link' 
                    bind:value={link} 
                />
            {:else}
                <TextArea placeholder='Description(Markdown)' labelText="Description(markdown)" bind:value={itext} />
            {/if}
        </FluidForm>
    </Column>
</Row>

<Row noGutter>
    <ButtonSet stacked>
        <Button on:click={() => (delOpen=true)}>Delete Item</Button>
        <Button on:click={edit}>Edit</Button>
    </ButtonSet>
</Row>