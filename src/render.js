const fs = require('fs')

// 根据配置生成小程序组件具体内容
const config = {
    name: 'bb-family-card-group',
    type: 'component',
    direction: 'column',
    top: [ 'bb-family-card', 'bb-info' ],
    center: [ 'bb-component-02' ],
    bottom: [ 'bb-component-03' ]
}

// 生成节点列表字符串
function renderNode (nodes) {
    return nodes.map(node => `
                <${node}></${node}>
    `).join(``)
}

// 生成wxml模版文件
function renderWXML (options) {
    let beforeTpl = ``
    let centerTpl = ``
    let afterTpl = ``
    let innerTpl = ``

    // 生成横着的view
    // 需要方向是横轴同时左侧存在
    if (options.direction === 'row') {

        if (
            !options.left.length && 
            !options.right.length && 
            !options.center.length
        ) {
            innerTpl = `
    <view class="${ options.name }__inner" >
        <text>${ options.name }__inner</text>
    </view>
            `
        } else {

            beforeTpl = `
    <view class="${ options.name }__left" >
        ${
            options.left.length ? 
            renderNode(options.left) : 
            `<text>${ options.name }__left</text>`
        }
    </view>
            `

            afterTpl = `
    <view class="${ options.name }__right" >
        ${
            options.right.length ? 
            renderNode(options.right) : 
            `<text>${ options.name }__right</text>`
        }
    </view>
            `

            centerTpl = `
    <view class="${ options.name }__center" >
        ${
            options.center.length ? 
            renderNode(options.center) : 
            `<text>${ options.name }__center</text>`
        }
    </view>
            `

            innerTpl = `
                ${ beforeTpl }
                ${ centerTpl }
                ${ afterTpl }
            `
        }
    } 
    
    else if (options.direction === 'column') {

        if (
            !options.top.length && 
            !options.bottom.length && 
            !options.center.length
        ) {
            innerTpl = `
    <view class="${ options.name }__inner" >
        <text>${ options.name }__inner</text>
    </view>
            `
        } else {
            beforeTpl = `
    <view class="${ options.name }__top" >
        ${
            options.top.length ? 
            renderNode(options.top) : 
            `<text>${ options.name }__top</text>`
        }
    </view>
            `

            afterTpl = `
    <view class="${ options.name }__bottom" >
        ${
            options.bottom.length ? 
            renderNode(options.bottom) : 
            `<text>${ options.name }__bottom</text>`
        }
    </view>
            `

            centerTpl = `
    <view class="${ options.name }__center" >
        ${
            options.center.length ? 
            renderNode(options.center) : 
            `<text>${ options.name }__center</text>`
        }
    </view>
            `

            innerTpl = `
                ${ beforeTpl }
                ${ centerTpl }
                ${ afterTpl }
            `
        }
    }

    return `<!-- ${ options.type } - ${ options.name } -->
<view class="${ options.name }" >
${ innerTpl }
</view>
    `

    // console.log(tpl)
}

// 生成less模版文件
function renderLESS (options) {
    let beforeTpl = ``
    let centerTpl = ``
    let afterTpl = ``
    let innerTpl = ``

    if (options.direction === 'row') {

        if (
            !options.left.length && 
            !options.right.length && 
            !options.center.length
        ) {
            innerTpl = `
    .bb-family-card-group__inner {

    }
            `
        } else {

            beforeTpl = `
    .bb-family-card-group__left {

    }
    `

    centerTpl = `
    .bb-family-card-group__center {

    }
    `

    afterTpl = `
    .bb-family-card-group__right {

    }
            `

            innerTpl = `
                ${ beforeTpl }
                ${ centerTpl }
                ${ afterTpl }
            `
        }
    }

    else if (options.direction === 'column') {

        if (
            !options.top.length && 
            !options.bottom.length && 
            !options.center.length
        ) {
            innerTpl = `
    .bb-family-card-group__inner {

    }
            `
        } else {
            beforeTpl = `
    .bb-family-card-group__top {

    }
            `

            centerTpl = `
    .bb-family-card-group__center {

    }
            `

            afterTpl = `
    .bb-family-card-group__bottom {

    }
            `

            innerTpl = `
                ${ beforeTpl }
                ${ centerTpl }
                ${ afterTpl }
            `
        }
    }

    return `// ${ options.type } - ${ options.name }
.bb-family-card-group {
    display: flex;
    flex-direction: ${ options.direction };
    justify-content: space-between;
    flex-grow: 1;
    align-self: center;

    ${ innerTpl }
}
    `
}

// 生成json模版文件
function renderJSON (options) {
    return `{
    "component": true
}
    `
}

// 生成js模版文件
function renderJS (options) {
    return `// ${ options.type } - ${ options.name }
Component({
    data: {},
    properties: {},
    methods: {}
})
    `
}

function render (options) {
    // renderLESS(options)
    // renderJSON()
    // renderJS(options)
    fs.mkdirSync(`./component/${ options.name }`);

    fs.writeFileSync(`./component/${ options.name }/${ options.name }.wxml`, renderWXML(options), (err) => {
        
        if (err) {
            throw err;
        }
    })

    fs.writeFileSync(`./component/${ options.name }/${ options.name }.less`, renderLESS(options), (err) => {
        
        if (err) {
            throw err;
        }
    })

    fs.writeFileSync(`./component/${ options.name }/${ options.name }.js`, renderJS(options), (err) => {
        
        if (err) {
            throw err;
        }
    })

    fs.writeFileSync(`./component/${ options.name }/${ options.name }.json`, renderJSON(), (err) => {
        
        if (err) {
            throw err;
        }
    })
}

// render(config)

module.exports = render