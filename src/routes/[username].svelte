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
    import User16 from 'carbon-icons-svelte/lib/User16'
    import Phone16 from 'carbon-icons-svelte/lib/Phone16'
    import Earth16 from 'carbon-icons-svelte/lib/Earth16'
    import Email16 from 'carbon-icons-svelte/lib/Email16'
    import Location16 from 'carbon-icons-svelte/lib/Location16'
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
            <p>{user.name}</p>
        {/if}
        {#if user.username}
            <div>
                <User16 />
                <span>{user.username}</span>
            </div>
        {/if}
        {#if user.address}
            <div>
                <Location16 />
                <span>{user.address}</span>
            </div>
        {/if}
        {#if user.show_email && user.email}
            <div>
                <Email16 />
                <span>{user.email}</span>
            </div>
        {/if}
        {#if user.website}
            <div>
                <Earth16 />
                <Link href={user.website}>{user.website}</Link>
            </div>
        {/if}
        {#if user.phone}
            <div>
                <Phone16 />
                <span>{user.phone}</span>
            </div>
        {/if}
        {#if !user.items_empty}
            <Link href='items/{user.id}'>Items</Link>
        {/if}
        {#if $session.user && $session.user.username == user.username}
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