module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        const user = await ctx.app.mysql.get('usertokens', {
          loginName: decode.loginName
        });

        if (token == user.token) {
          await next();
        } else {
          ctx.status = 401;
          ctx.body = {
            message: '该账户已在其他设备登录',
          };
          return;
        }
      } catch (error) {
        if (error.message == 'jwt expired') {
          ctx.status = 401;
        }
        ctx.body = {
          message: error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
      };
      return;
    }
  };
};