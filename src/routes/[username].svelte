<script context='module'>
    import * as api from 'api'
    export async function preload({params}){
        let {username} = params
        let user = await api.get(`users/${username}`)
        if (user == '404')(
            this.error(404, 'User not Found')
        )
        if (!user.visible)(
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
    import { stores } from '@sapper/app'
    import {parseMarkdown} from 'utils'

    let { session } = stores()

    let about
    if (user.about) about = parseMarkdown(user.about)
</script>

<Row>
    {#if user.image}
        <Column lg={2} sm={2} md={2} xlg={2}>
            <div style='width: 111px; height: 111px;'>
                <img style='width: 100%; height: 100%' width=100 height=100 alt='userImage' src={user.image}>
            </div>
        </Column>
    {/if}
    <Column lg={4} sm={4} md={4} xlg={4}>
        {#if user.name}
            <h2>{user.name}</h2>
        {/if}
        {#if user.username}
            <p>{user.username}</p>
        {/if}
        {#if user.address}
            <p>{user.address}</p>
        {/if}
        {#if user.show_email && user.email}
            <p>{user.email}</p>
        {/if}
        {#if user.website}
            <Link href={user.website}>{user.website}</Link>
        {/if}
        {#if user.phone}
            <p>{user.phone}</p>
        {/if}
        <!-- {#if !user.images_empty}
            <div><Link href={null} on:click={open}>Gallery</Link></div>
        {/if} -->
        {#if !user.items_empty}
            <Link href='items/{user.id}'>Items</Link>
        {/if}
        {#if $session.user.username == user.username}
            <Link href='edit'>Edit</Link>
        {/if}
    </Column>
</Row>

<br />

<Row>
    <Column lg={6} sm={6} md={6} xlg={6}>
        {#if about}
            <p>{@html about}</p>
        {/if}
    </Column>
</Row>