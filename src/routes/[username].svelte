<script context='module'>
    import * as api from 'api'
    export async function preload({params}){
        let {username} = params
        let user = await api.get(`user/${username}`)
        if (user == '404')(
            this.error(404, 'User not Found')
        )
        if (user == '423')(
            this.error(423, 'User not visible')
        )
        return {user}
    }
</script>

<script>
    export let user
    import {
        Column,
        Link,
        Row
    } from 'carbon-components-svelte'
    import Img from '../components/Img.svelte'
    import marked from 'marked'

    let about
    if (user.about) about = marked(user.about)
    let open
</script>

<Img
    bind:open
    urls={user.images || []}
/>

<Row>
    <Column>
        <div style='width: 111px; height: 111px;'>
            <img width=100% height=100% alt='userImage' src={user.image}>
        </div>
    </Column>
    <Column>
        <h2>{user.username}</h2>
        {#if user.name}
            <p>{user.name}</p>
        {/if}
        {#if user.address}
            <p>{user.address}</p>
        {/if}
        {#if user.email}
            <p>{user.email}</p>
        {/if}
        {#if user.website}
            <Link href={user.website}>{user.website}</Link>
        {/if}
        {#if user.phone}
            <p>{user.phone}</p>
        {/if}
        {#if !user.images_empty}
            <div><Link href={null} on:click={open}>Gallery</Link></div>
        {/if}
        {#if !user.items_empty}
            <div><Link href='items/{user.id}'>Items</Link></div>
        {/if}
    </Column>
</Row>

<Row>
    <Column>
        {#if about}
            <p>{@html about}</p>
        {/if}
    </Column>
</Row>