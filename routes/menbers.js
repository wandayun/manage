const router = require('koa-router')()
const xlsx = require('node-xlsx');
const path =require('path')

const {menberList,borrow,borrowList,salary,managerList,managerChange,menberDel,wagespaid,wagespayable,add} = require('../controller/menbers')
const {SuccessModel,ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/menbers')

/* 人员列表 */
router.get('/list',loginCheck,async function(ctx, next) {
    let input= ctx.query.input || ''
    const data=await menberList(input)

    ctx.body = new SuccessModel(data)
  
  });

router.get('/borrow',loginCheck,async function(ctx, next) {
    let style= ctx.query.style || ''
    let num= ctx.query.num || ''
    let menberid= ctx.query.menberid || ''
    let managerid = ctx.session.managerid 
    
    const data=await borrow(menberid,style,num,managerid)

    ctx.body = new SuccessModel(data)
  
  });

  router.get('/salary',loginCheck,async function(ctx, next) {
    let num= ctx.query.num || ''
    let menberid= ctx.query.menberid || ''
    
    const data=await salary(menberid,num)

    ctx.body = new SuccessModel(data)
  
  });

  router.get('/borrowList',loginCheck,async function(ctx, next) {
    const data=await borrowList()
    
    ctx.body = new SuccessModel(data)
  
  });

  router.get('/managerList',loginCheck,async function(ctx, next) {
    const data=await managerList()

    ctx.body = new SuccessModel(data)
  
  });

  router.get('/managerChange',loginCheck,async function(ctx, next) {
    let username= ctx.query.username || ''
    let password= ctx.query.password || ''
    let realname= ctx.query.realname || ''
    let id= ctx.query.id || ''
    const data=await managerChange(id,username,password,realname)

    ctx.body = new SuccessModel(data)
  
  });

  router.get('/menberDel',loginCheck,async function(ctx, next) {
    let menberid= ctx.query.menberid || ''
    
    const data=await menberDel(menberid)

    ctx.body = new SuccessModel(data)
  
  });

  router.get('/wagespaid',loginCheck,async function(ctx, next) {
    let num= ctx.query.num || ''
    let menberid= ctx.query.menberid || ''
    
    const data=await wagespaid(menberid,num)

    ctx.body = new SuccessModel(data)
  
  });
  router.get('/wagespayable',loginCheck,async function(ctx, next) {
    let num= ctx.query.num || ''
    let menberid= ctx.query.menberid || ''
    
    const data=await wagespayable(menberid,num)

    ctx.body = new SuccessModel(data)
  
  });
  router.get('/add',loginCheck,async function(ctx, next) {
    let name= ctx.query.name || ''
    let work= ctx.query.work || ''
    let salary= ctx.query.salary || ''
    const data=await add(name,work,salary)

    ctx.body = new SuccessModel(data)
  
  });
  
  router.post('/importExcel',async function(ctx, next) {
    let fileName = path.resolve(__dirname,'../excels/test.xlsx')
    let obj = xlsx.parse(fileName);
    console.log(ctx,ctx.request.body);
    ctx.body = new SuccessModel(ctx)  
    
  
  }); 
  module.exports = router;