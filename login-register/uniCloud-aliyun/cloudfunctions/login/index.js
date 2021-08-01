'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => { //event为客户端上传的参数
	const collection = db.collection("users"); //操作对应名称的表users
	const res = await collection.where({
		user_name: event.user_name
	}).get();//与SQL类似,查询语句,where后跟条件。查询到的结果赋值给res
	let status = 0; //用于标记状态
	let user = res.data;
	if (user.length == 0) {
		status = 1;
	}//查不到,用户名不存在。
	if (user.length != 0 && user[0].password != event.password) {
		status = 2;
	} //查到,但密码和表内存的密码不一致。
	return {//0——登录成功;1——用户名不存在;2——密码错误;
		"status": status,
	}
};
