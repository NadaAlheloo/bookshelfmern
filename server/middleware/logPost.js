
    module.exports = (req, res, next) => {
      if (req.method === 'POST' && req.session.userId) {
        console.log(`[${new Date().toISOString()}] POST by user ${req.session.userId}`);
      }
      next();
    };
    