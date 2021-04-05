import * as api from 'api'

export function post(req, res) {
    const { username, password } = req.body
    api.post('tokens', { username, password }).then(response => {
        if (response.user) req.session.user = response.user;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(response))
    })
}