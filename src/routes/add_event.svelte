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
        RadioButtonGroup,
        DatePicker,
        DatePickerInput
    } from 'carbon-components-svelte'
    import { goto } from '@sapper/app'
    import * as api from 'api'

    let name
    let price
    let start_date
    let end_date
    let start_time
    let description
    let nameInvalid
    let itype = 'product'

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
            start_date,
            end_date,
            start_time,
            description
        }
        let res = await api.post('events', data, token)
        if (res.nameError) {
            nameInvalid = true
        }
        if (res.id) {
            goto(`event/${res.id}`)
        }
    }
</script>

<svelte:window on:keydown={keydown} />
    
<svelte:head>
    <title>Add Event</title>
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
        <DatePicker bind:value={start_date} datePickerType='single'>
            <DatePickerInput labelText='Start Date' />
        </DatePicker>
        <FluidForm>
            <Input
                bind:invalid={nameInvalid}
                invalidText='Name taken'
                labelText="Name"
                bind:value={name} 
            />
            
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