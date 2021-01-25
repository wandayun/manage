const {exec} = require('../db/mysql')
const menberList = async (input)=>{

    let sql =`
        select * from menbers where 1=1
    `
    if (input) {
        sql += `and  name like '%${input}%' `
    }

    sql += `and state = 1`
    console.log(sql)
    const rows = await exec(sql)

    return rows || []
    
}

const borrow = async (menberid,style,num,managerid)=>{

    let sql1 =`
        select * from menbers where 1=1
    `
    if (menberid) {
        sql1 += `and  id =  ${menberid}`
    }

    const rows1 = await exec(sql1)
    let numchange = 0
    let totalnum = 0
    if(style == 1){
        numchange = parseInt(num)+parseInt(rows1[0][`manager${managerid}`])
        totalnum = parseInt(num)+parseInt(rows1[0]['totalborrowing'])
    }else{
        numchange = parseInt(rows1[0][`manager${managerid}`])-parseInt(num)
        totalnum = parseInt(rows1[0]['totalborrowing'])-parseInt(num)
    }
    
    let time = new Date().getTime()
    
    let sql2 =`
        insert into borrowing (managerid,menberid,num,style,time) values (${managerid},${menberid},${num},${style},${time})
    `
    console.log('sql2',sql2)
    const rows2 = await exec(sql2)

    let sql3 =`
        UPDATE menbers SET manager${managerid} = ${numchange} , totalborrowing = ${totalnum} WHERE id = ${menberid};
    `
    console.log('sql3',sql3)
    const rows3 = await exec(sql3)

    return rows3
}

const add = async (name,work,salary)=>{

    let sql =`
        insert into menbers (name,work,salary) values ('${name}','${work}',${salary})
    `
    console.log('sql',sql)
    const rows = await exec(sql)

    return rows || []
    
}

const borrowList = async ()=>{

    let sql =`
        select * from borrowing 
    `

    const rows = await exec(sql)

    return rows || []
    
}



const salary = async (menberid,num)=>{

    let sql =`
            UPDATE menbers SET salary = ${num} WHERE id = ${menberid};
        `

    const rows = await exec(sql)

    return rows || []
    
}

const wagespaid = async (menberid,num)=>{

    let sql =`
            UPDATE menbers SET wagespaid = ${num} WHERE id = ${menberid};
        `

    const rows = await exec(sql)

    return rows || []
    
}

const wagespayable = async (menberid,num)=>{

    let sql =`
            UPDATE menbers SET wagespayable = ${num} WHERE id = ${menberid};
        `

    const rows = await exec(sql)

    return rows || []
    
}


const managerList = async ()=>{

    let sql =`
        select * from manageusers
    `

    const rows = await exec(sql)

    return rows || []
    
}

const managerChange = async (id,username,password,realname)=>{

    let sql =`
        UPDATE manageusers SET username = '${username}' , password = '${password}', realname = '${realname}' WHERE id = ${id};
    `
    console.log(sql)
    const rows = await exec(sql)

    return rows || []
    
}

const menberDel = async (menberid)=>{

    let sql =`
            UPDATE menbers SET state = 0 WHERE id = ${menberid};
        `

    const rows = await exec(sql)

    return rows || []
    
}
module.exports = {
    menberList,
    borrow,
    borrowList,
    salary,
    managerList,
    managerChange,
    menberDel,
    wagespayable,
    wagespaid,
    add
}