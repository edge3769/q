<script>
    export let usernameInvalid
    export let usernameError
    export let passwordInvalid
    export let passwordError

    export let username

    let { session } = stores();

    const login = async function() {
        loginLoading = true
        if (!username){
            usernameInvalid = true
            usernameError = 'Empty'
            loginLoading = false
            return
        }
        if (!password){
            passwordInvalid = true
            passwordError = 'Empty'
            loginLoading = false
            return
        }
        usernameInvalid=false
        passwordInvalid=false
        let r = await post('auth/login', { username, password }).finally(
            (r)=>{
                console.log(r)
                loginLoading=false
                return r
            })
        usernameError = r.usernameError
        passwordError = r.passwordError
        usernameInvalid = r.usernameInvalid
        passwordInvalid = r.passwordInvalid
        if (r.user) {
            $session.user = await r.user
            $logged = true
            $isSideNavOpen = true
            goto('/')
        }
    }
</script>