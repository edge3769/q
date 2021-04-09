import * as api from 'api'

export function post(req, res) {
    const { email, username, password } = req.body
    api.post('users', { email, username, password }).then(response => {
        if (response.user) req.session.user = response.user
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(response))
    })
}