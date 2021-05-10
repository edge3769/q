<script context='module'>
    import * as api from 'api'
    export async function preload({params}, {user}){
        const {id} = params
        if(!user){
            this.redirect('302', 'enter')
        }
        const room = await api.get(`rooms/${id}`, user.token)
        // if(!room.open && !room.users.includes(user.username)){
        //     this.error('Unauthorized')
        // }
        let { items, page, total } = await api.get(`messages?id=${id}`, user.token)
        if (!Array.isArray(items)) items = []
        return {room, items, page, total, user, id}
    }
</script>

<script>
    export let room, items, page, total, user, id
    import {goto} from '@sapper/app'
    import { context } from '../../stores.js'
    import {
        Row,
        Column,
        TextArea,
    } from 'carbon-components-svelte'
    import io from 'socket.io-client'
    import {onMount} from 'svelte'

    $context = room.name
    const socket = io()
    let mounted
    let value
    let ref


    $: if(mounted && total > 100 && window.scrollY==0){
        get()
    }

    onMount(()=>{
        window.scrollTo({left: 0, top: document.body.scrollHeight})
        mounted = true
        ref.focus()
    })

    socket.on('connect', ()=>{
        socket.emit('join', id)
    })

    socket.on('msg', async(obj)=>{
        await api.put(`seen?id=${id}`, {}, user.token)
        items = [...items, obj]
        updateScroll()
    })

    let keydown = (e) => {
        switch(e.keyCode){
            case 13:
                send()
        }
    }

    let get=async()=>{
        res = await api.get(`messages?id=${id}&page=${page+1}`, user.token)
        items = res.items
        total = res.total
        page++
    }

    let exit=async()=>{
        socket.emit('leave', room.id)
        await api.put('leave', {id:room.id}, user.token)
        goto('/')
    }

    let go=()=>{
        if(room.user == user.username){
            goto(`edit/${room.id}`)
        }
    }

    let send=async()=>{
        if(!value) return
        value=value.trim()
        let obj = {user: user.username, id, value}
        items = [...items, obj]
        socket.emit('msg', obj)
        await api.put('messages', {id, value}, user.token)
        updateScroll()
        value=''
    }

    let updateScroll=()=>{
        setTimeout(()=>{
            window.scrollTo({left: 0, top: document.body.scrollHeight})
        }, 0)
    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>'Rooms'</title>
</svelte:head>

<Row noGutter>
    <Column>
            <span>
                <p on:click={go} class:head-link={room.user == user.username} class='head'>
                    {room.name}
                </p>
                <p on:click={exit} class='small'>Leave</p>
            </span>
        <div class='head-space'></div>
    </Column>
</Row>

{#each items as item}
    <Row noGutter>
        <Column>
            <p class='small'>{item.user}</p>
            <p class='message'>{item.value}</p>            
        </Column>
    </Row>
{/each}

<Row noGutter>
    <Column>
        <TextArea rows={1} bind:ref bind:value />
    </Column>
</Row>

<style>
    .small {
        color: grey; 
        font-size: 0.75rem;
        cursor: pointer;
    }
    .message {
        overflow-wrap: break-word;
    }
    .head-space {
        height: 0.5rem;
    }
    .head-link {
        cursor: pointer;
    }
    .head {
        font-size: .875rem;
        line-height: 1.125em;
        font-weight: 600;
        letter-spacing: .16px;
    }
</style>