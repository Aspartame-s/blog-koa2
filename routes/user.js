const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    ctx.body = {
        errno: 0,
        username,
        password
    }
})

router.get('/session-test', async function (ctx, next) {
    if(!ctx.session.viewCount) {
        console.log(123)
        ctx.session.viewCount = 0
        // a++
    }
    // console.log(ctx.session.view)
    ctx.session.viewCount++
    ctx.body = {
        errno: 0,
        session: ctx.session.viewCount
    }
})



module.exports = router
