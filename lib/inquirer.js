const inquirer = require('inquirer');
const files = require('./files');

module.exports = {

  askGithubCredentials: () => {
    const questions = [
      // {
      //   name: 'prefix',
      //   type: 'input',
      //   message: `组件前缀(公司或者框架拼音首字母缩写 例如 'bb'):`,
      //   default: 'bb',
      //   validate: function( value ) {
      //     return true;
      //   }
      // },
      {
        name: 'name',
        type: 'input',
        message: '组件名称:',
        validate: function(value) {

          if (value.length) {
            return true;
          } else {
            return '请输入组件名称';
          }
        }
      },

      {
        name: 'type',
        type: 'list',
        default: 'component',
        message: '类型:',
        choices: [
          'component',
          'page'
        ]
      },

      {
        name: 'direction',
        type: 'list',
        default: 'row',
        message: '选择排列方向 默认 row :',
        choices: [
          'row | 从左到右',
          // 'row-reverse | 从右到左',
          'column | 从上到下',
          // 'column-reverse | 从下到上'
        ],
        filter: function (val) {
          return val.split(' | ')[0]
        }
      },

      // layout_row-left
      {
        name: 'left',
        type: 'input',
        when: function(e){
          // return e.direction === 'row' || e.direction === 'row-reverse'
          return e.direction === 'row'
        },
        message: '输入 left 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      {
        name: 'nextLeft',
        type: 'input',
        when: function(e){
          return e.direction === 'row' && !!e.left.length
        },
        message: '输入下一个 left 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      // layout_row-top
      {
        name: 'top',
        type: 'input',
        when: function(e){
          // return e.direction === 'column' || e.direction === 'column-reverse'
          return e.direction === 'column'
        },
        message: '输入 top 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      {
        name: 'nextTop',
        type: 'input',
        when: function(e){
          return e.direction === 'column' && !!e.top.length
        },
        message: '输入下一个 top 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      // layout_row-center
      {
        name: 'center',
        type: 'input',
        message: '输入 center 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      {
        name: 'nextCenter',
        type: 'input',
        when: function(e){
          return !!e.center.length
        },
        message: '输入下一个 center 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      // layout_row-right
      {
        name: 'right',
        type: 'input',
        when: function(e){
          return e.direction === 'row'
        },
        message: '输入 right 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      {
        name: 'nextRight',
        type: 'input',
        when: function(e){
          return e.direction === 'row' && !!e.right.length
        },
        message: '输入下一个 right 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      // layout_row-bottom
      {
        name: 'bottom',
        type: 'input',
        when: function(e){
          return e.direction === 'column'
        },
        message: '输入 bottom 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      },

      {
        name: 'nextBottom',
        type: 'input',
        when: function(e){
          return e.direction === 'column' && !!e.bottom.length
        },
        message: '输入下一个 bottom 位置要添加的组件名称 以空格间隔:',
        filter: function (val) {

          if (val.length) {
            return val.split(' ')
          } else {
            return []
          }
        }
      }
    ];

    return inquirer.prompt(questions);
  },
}