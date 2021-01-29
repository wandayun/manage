
const router = require('koa-router')()
const {login} = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resModel')

router.prefix('/api/user')
/* GET home page. */
router.post('/login',async function(ctx, next) {
  const {username,password} = ctx.request.body
  //const {username,password} = req.query
  const data=await login(username,password)
  if(data.username){
    ctx.session.managerid = data.id
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.session.power = data.power
    ctx.body = new SuccessModel()
      return
  }
  ctx.body = new ErrorModel('denglushibai')

});

router.get('/power',async function(ctx, next) {
  const session = ctx.session
  
  ctx.body = {
    errno:0,
    power:session.power,
  }

});

router.get('/test',async function(ctx, next) {
  const session = ctx.session
  console.log('list')
  if(session.view == null){
    session.view = 0
  }
  session.view++
  ctx.body = {
    errno:0,
    viewnum:session.view,
  }

});

module.exports = router;
