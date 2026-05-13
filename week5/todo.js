const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
let list = [];
program
  .name('counter')
  .description('CLI to do file based todo application')
  .version('0.8.0');

program.command('addtodo')
  .description('used to add todo in list of tasks')
  .option('-ad',' --add', 'add todo to list')
  .argument('<task>', 'todo to list')
  .action((option,task) => {
    const list = list.push(task);
    console.log(list);
  });

program.parse();