const {exec} = require('../db/mysql')
const login = async (username,password)=>{
    const sql =`
        select * from manageusers where username='${username}' and password='${password}'
    `
    console.log(sql)
    const rows = await exec(sql)
    return rows[0] || {}
    
}

module.exports = {
    login
}