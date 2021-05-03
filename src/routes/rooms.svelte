<script context='module'>
    import * as api from 'api'
    export async function preload({}, {user}){
        if(!user){
            this.redirect(302, 'enter')
        }
        let rooms
        let {items, total, page} = await api.get('xrooms', user.token) || {}
        if (Array.isArray(items)) {
            rooms = items
        } else {
            rooms = []
        }
        return {rooms, total, page, user}
    }
</script>

<script>
    export let rooms, total, page, user
    import {
        Row,
        Link,
        Column,
    } from 'carbon-components-svelte'
    import {onMount} from 'svelte'
    import Tag from '../components/Tag.svelte'
    import { goto } from '@sapper/app'

    let tags

    $: if(typeof document != 'undefined' && total>100 && document.body.scrollTop==document.body.scrollHeight){
        page++
        get()
    }

    let go=(room)=>{
        goto(`room/${room.id}`)
    }

    let get=async()=>{
        let tagString = JSON.stringify(tags)
        let res = await api.get(`xrooms?tags=${tagString}&page=${page}`, user.token)
        rooms = res.items
        total = res.total
    }
</script>

<Tag on:change={get} bind:tags />

{#each rooms as room}
    <br />
    <Row noGutter>
        <Column>
            <p class:unseen={room.unseen} class='item' on:click={go(room)}>{room.name}</p>
        </Column>
    </Row>
{/each}

<style>
    .item {
        width: min-content;
        cursor: pointer; 
    }
    .item:hover {
        color: grey;
    }
    .unseen {
        font-weight: 600;
    }
</style>