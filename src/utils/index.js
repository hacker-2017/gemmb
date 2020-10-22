import Md5 from 'js-md5'


// 加密
export const encryption = function (password) {
	const md5 = Md5.create()
    md5.update(password)
    const digest = md5.digest()
    return `{MD5}` + md5.base64(digest)
}







