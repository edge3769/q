<script context='module'>
    export async function preload({params}, {user}){
        if(!user){
            this.redirect(302, login)
        }
        return {user}
    }
</script>

<script>
    export let user
    
    import Paystack from '../components/Paystack.svelte'
    import {
        Row,
        Column,
        Button
    } from 'carbon-components-svelte'

    let config = {
        key: 'pk_test_fbb94b292c93cb01076ea26d9d936571e4f80ca0',
        email: 'angelwingseducation@gmail.com',
        amount: 190233,
        currency: "NGN",
        embed: false,
        value: "Pay",
        callback: (res)=>{
            return
        },
        onClose: ()=>{
            return
        }
    }
</script>

<Paystack {config} />

<Row>
    <Column>
        {#if !user.paid}
            <p>Not subscribed</p>
            <Button 
                on:click={()=>{config.open = true}}
                size='small'
            >
                Pay
            </Button>
        {:else}
            <p>Subscribed</p>
        {/if}

        {#if user.paid}
            <p>Renew</p>
        {/if}
    </Column>
</Row>