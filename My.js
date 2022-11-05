export default function compose(middlewares) {
	if (!Array.isArray(middlewares)) throw new TypeError('the args need to be array')
	if (middlewares.length === 0) throw new Errow('xxx')
	if (!middlewares.every(middleware => typeof middleware === 'function')) throw new TypeError('the item of args should be function')
	if (middlewares.length === 1) return middlewares[0]
	
	return async function (ctx, next) {
		const len = middlewares.length
		if (!next) next = Promise.resolve()
		console.log('len', len)
		await doMiddleware(0)
		
		async function doMiddleware(i) {
			if (i === len) return await next()
			try{
				await getMid(i)(ctx, async () => {
					await doMiddleware(i+1)
				})
			}catch(e){
				console.log(e)
			}
		}
		
		function getMid(i) {
			const middleware = (i === len ? next : middlewares[i])
			return middleware
		}
	}
}
