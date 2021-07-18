
module.exports = {
  isActive: true,
  expression: '*/5 * * * * *',
  options: {
    timeZone: 'Asia/Ho_Chi_Minh',
    runOnInit: false,
    waitingFinish: false,
  },
  onTick:  () => {
    return new Promise((resolve, reject) =>{
      setTimeout(() => resolve('ok'), 10000);
    })
  }
};