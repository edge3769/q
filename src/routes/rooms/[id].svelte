<script context='module'>
    export async function preload({params}, {user}){
        if(!user){
            this.redirect('302', 'enter')
        }
        let {id} = params
        let tagString = JSON.stringify([])
        let url = `xrooms?id=${id}&tags=${tagString}&page=1`
        let res = await api.get(url, user.token)
        let rooms
        if (Array.isArray(res.items)) {
            rooms = res.items
        } else {
            rooms = []
        }
        let total = res.total
        let pages = res.pages
        if (res == '401'){
            this.redirect(302, 'enter')
        }
        if (res == '404'){
            this.error(404, 'User not Found')
        }
        return {rooms, total, pages, id}
    }
</script>

<script>
    export let rooms = []
    export let total = 0
    export let pages = 0
    export let id

    import { goto } from '@sapper/app'
    import { myTags } from '../../stores'
    import {
        PaginationNav,
        Column,
        Search,
        Link,
        Tag,
        Row, } from 'carbon-components-svelte'
    import * as api from 'api'
    import { onMount } from 'svelte';
    

    onMount(()=>{
        ref.focus()
    })

    let page = 0

    let open
    let current
    let got
    let tag
    let ref

    let go=(room)=>{
        goto(`room/${room.id}`)
    }

    let keydown = (e) => {
        switch(e.keyCode){
            case 13:
                if (current==ref){
                    addTag()
                }
        }
    }

    let focused=()=>{
        current=ref
        if ($myTags.length > 0)open=true
    }

    let addTag = () => {
        if (tag && !$myTags.includes(tag)){
            $myTags = [...$myTags, tag]
            open=true
            tag = ''
        }
    }

    let delTag = (tag) => {
        $myTags=$myTags.filter(t => t != tag)
    }

    let clear = () => {
        $myTags = []
        open = false
    }

    let get = async function(){
        let tagString = JSON.stringify($myTags)
        let url = `rooms?id=${id}&tags=${tagString}&page=${page+1}`
        let res = await api.get(url)
        if (!Array.isArray(res.items)){
            rooms = res.items
        }
        total = res.total
        pages = res.pages
        got = true
    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>My Rooms</title>
</svelte:head>

<Row noGutter>
    <Column noGutter>
        <Search
            on:focus={focused}
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
            {#each $myTags as tag}
                <Tag filter on:click={delTag(tag)}>{tag}</Tag>
            {/each}
        </Column>
    </Row>
{/if}

{#each rooms as room}
    <br/>
    <Row noGutter>
        <div>
            <Link on:click={go(room)} href=''>{room.name}</Link>
        </div>
    </Row>
{/each}

{#if got && total < 1}
<Row noGutter>
    <p>There don't seem to be any results</p>
</Row>
{/if}

{#if total>10}
    <PaginationNav loop bind:page bind:total={pages}/>
{/if}