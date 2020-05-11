const chalk = require('chalk');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner

const files = require('./lib/files');
const render = require('./lib/render')

// clear();
console.log(
  chalk.green(
    figlet.textSync('Auto BEM Flex', { horizontalLayout: 'full' })
  )
);

console.log(chalk.green('快速创建符合bem-flex 规范的小程序组件和页面'));

const inquirer = require('./lib/inquirer');

const run = async (cb) => {
  const credentials = await inquirer.askGithubCredentials();
  cb && cb(credentials)
}

run((credentials) => {
    console.log(chalk(files.getCurrentDirectoryBase()))
    const status = new Spinner('正在创建对应布局的组件中 ...');
    status.start();
    render(credentials)
    status.stop()
    console.log(chalk.green('✅ 组件创建完成'));
});

