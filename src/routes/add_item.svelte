<svelte:window on:keydown={keydown} />

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
    import {initialCaps} from 'utils'
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
        InlineLoading,
    } from 'carbon-components-svelte'
    import { goto } from '@sapper/app'
    import * as api from 'api'

    $: itype = initialCaps(itype)

    let nameInvalid

    let link
    let name
    let price
    let itext
    let itype
    let redirect

    let token = user.token
    let tags = []
    let loading
    let image

    const keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (e.ctrlKey){
                    add()
                }
        }
    }

    const add=async()=>{
        loading = true
        let data = {
            tags,
            name,
            image,
            price,
            itype,
            itext
        }
        let res = await api.post('items', data, token).finally(
            (r)=>{
                loading=false
                return r
            }
        )
        if (res.nameError) {
            nameInvalid = true
        }
        if (res.id) {
            goto(`item/${res.id}`)
        }
    }
</script>

<svelte:head>
    <title>Add Item</title>
</svelte:head>

<Image bind:image />

<Tag placeholder={tags.length > 0 ? `${tags.length} tags` : 'Add tag'} bind:tags />

<Row noGutter>
    <Column>
        <FluidForm>
            <Input
                bind:invalid={nameInvalid}
                invalidText='Name taken'
                labelText="Name"
                bind:value={name} 
            />
            <!-- <TextInput labelText="Item Type" bind:value={itype} /> -->
            <Checkbox bind:checked={redirect} 
                labelText="Let the item's listing redirect to a link" />
            {#if redirect}
                <TextInput labelText="Link" bind:value={link} />
            {/if}
            {#if !redirect}
                <TextArea placeholder='Description(Markdown)' labelText="Description(markdown)" bind:value={itext} />
            {/if}
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