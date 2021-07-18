const fs = require('fs');
const path = require('path')
const TASK_PATH = __dirname;
const files = fs.readdirSync(TASK_PATH).filter( fileName => fileName !== 'cron.js');
const queue = require('async/queue');

const cronQueue = queue( async function({onTick}) {
    await onTick();
});
const CronJob = require('cron').CronJob;

const startCron= ({expression, onTick, timeZone, runOnInit}) => {
  const job = new CronJob(expression, onTick, null, false, timeZone, undefined, runOnInit);
  job.start();
}

const runAllCronJobs = () => {
  
  files.forEach(fileName => {
    const filePath = path.join(TASK_PATH, fileName);
    if(/(task[.]js$)/i.test(fileName) === false ){
      throw new Error(`${filePath} have wrong file name(must have Task.js)`);
    }
    
    const cron = require(filePath);
    if(!cron.expression){
      throw new Error(`${filePath} must have expression`);
    }
    if(typeof cron.onTick !== 'function'){
      throw new Error(`${filePath} ontick function must be a function`);
    }
    if(!cron.isActive){
      return;
    }
    const {expression} = cron;
    
    const timeZone = cron.options?.timeZone || 'Asia/Ho_Chi_Minh';
    const runOnInit = cron.options?.runOnInit || false;
    const waitingFinish = cron.options?.waitingFinish || false;
    const onTick =  waitingFinish ? () => cronQueue.push({onTick: cron.onTick}) : cron.onTick;
    startCron({expression, onTick, timeZone, runOnInit, waitingFinish});
  })
}


module.exports = runAllCronJobs;




