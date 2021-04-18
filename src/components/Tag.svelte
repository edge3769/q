<script>
    export let tags = []
    export let placeholder = 'Add Tag'
    import { createEventDispatcher } from 'svelte'
    import {
        Tag,
        Row,
        Column,
        TextInput
    } from 'carbon-components-svelte'

    const dispatch = createEventDispatcher()

    let focused
    let value
    let open

    const focus=()=>{
        focused=true
        if(tags.length > 0) open=true
    }

    const blur=()=>{
        focused=false
        add()
    }

    const keydown=(e)=>{
        switch(e.keyCode){
            case 32:
                if (focused){
                    value = value.split(' ')[0]
                    add()
                }
            case 13:
                if (focused){
                    add()
                }
        }
    }

    const add=()=>{
        if (value && !tags.includes(value)){
            tags=[...tags, value]
            open=true
            value=''
        }
        dispatch('change')
    }

    const del=(tag)=>{
        tags=tags.filter(t => t != tag)
        dispatch('change')
    }

    const clear=()=>{
        tags=[]
        open=false
    }
</script>

<svelte:window on:keydown={keydown} />

<Row noGutter>
    <Column xlg={4} lg={4} md={4} sm={4}>
        <TextInput placeholder={placeholder} on:focus={focus} on:blur={blur} bind:value />
        <slot />
    </Column>
</Row>

{#if open}
    <Row noGutter>
        <Column xlg={4} lg={4} md={4} sm={4}>
            <Tag on:click={clear} type='magenta'>
                Clear
            </Tag>
            {#each tags as tag}
                <Tag filter on:click={del(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}
