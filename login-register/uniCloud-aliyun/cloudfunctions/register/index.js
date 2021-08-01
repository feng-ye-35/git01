'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection("users");//操作对应名称的表users
	const res = await collection.where({
		user_name:event.user_name
	}).get();//与SQL类似,查询语句,where后跟条件。查询到的结果赋值给res
	let status=0;//用于标记状态
	console.log('res:',res)//打印res查看接收到的样式
	let user = res.data; 
	if (user.length != 0) {//如果根据用户名查询到的结果user数组内长度不为0，证明用户名已存在。
		status = 1;
	} else{//用户名不重复,则添加用户信息到数据库
		let res =await collection.add({"user_name":event.user_name,"password":event.password});
	}
	return {"status":status}//0——用户名不存在"注册成功"; 1——用户名已存在;
};

