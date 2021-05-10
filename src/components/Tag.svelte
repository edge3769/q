<script>
    export let tags = []
    export let tagGroups = []
    export let is_focused = false
    import { createEventDispatcher } from 'svelte'
    import TagInput from './TagInput.svelte'
    import { onMount } from 'svelte'
    import {
        Tag,
        Row,
        Column,
    } from 'carbon-components-svelte'
    import { stores } from '@sapper/app'

    let { session } = stores()

    onMount(()=>{
        if($session.user){
            tagGroups = $session.user.tagGroups
        }
    })

    $: if(ref && is_focused) ref.focus()

    const dispatch = createEventDispatcher()

    let tagGroup = false
    let focused
    let value
    let open
    let ref

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
            // case 32:
            //     if (focused){
            //         value = value.split(' ')[0]
            //         add()
            //     }
            //     break
            case 13:
                if (focused){
                    add()
                }
        }
    }

    const toggleTagGroup=()=>{
        tagGroup = !tagGroup
    }

    const initCreate=()=>{
        return
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
        <TagInput 
            bind:ref 
            on:focus={focus}
            on:click={toggleTagGroup}
            on:blur={blur} 
            bind:value
            placeholder={tags.length > 0 ? `${tags.length} ${tags.length > 1 ? 'tags' : 'tag'}` : 'Add tag'}
            {...$$restProps}
        />
        <slot />
    </Column>
</Row>

{#if open}
    <Row noGutter>
        <Column xlg={4} lg={4} md={4} sm={4}>
            {#if tags.length > 0}
                <Tag on:click={clear} type='magenta'>
                    Clear
                </Tag>
            {/if}
            <!-- {#if tagGroup}
                <Tag on:click={initCreate} type='magenta'>
                    All tag groups
                </Tag>
                <Tag on:click={initCreate} type='magenta'>
                    New tag group
                </Tag>
            {/if} -->
            {#each tags as tag}
                <Tag filter on:click={del(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}
