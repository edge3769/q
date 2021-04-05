import * as api from 'api'

export function post(req, res) {
    api.del(`tokens?id=${req.session.user.id}`, req.session.user.token)
    delete req.session.user
    res.end(JSON.stringify({ ok: true }))
}