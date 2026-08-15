## CSS选择器
CSS选择器用于选择标签。

### 基础选择器
+ 标签选择器：用HTML标签作为名称的选择器。

```html
    
    <style>
        p{
            color: red;
        }
    </style>

    
    <p>标签选择器</p>

```

+ 类选择器：选择一个或多个指定标签。

```html
        
    <style>
        .red{
            color: red;
        }
        .font35{
            font-size: 35px;
        }
    </style>

    <!-- 选择一个 -->
    <div class="red">类选择器1</div>

    <!-- 选择多个 -->
    <div class="red font35">类选择器2</div>ht
    
```

+ id选择器：选择唯一指定标签，经常和JavaScript搭配使用。

```html

    <style>
        #weiyi{
            color: red;
        }
    </style>

    <div id="weiyi">id选择器</div>

```

+ 通配符选择器：选择页面所有标签。

```html
    
    <style>
        /* 清除所有便签内外边距 */
        * {
            margin: 0;
            padding: 0;
        }
    </style>	

```

### 复合选择器
+ 后代选择器：用于选择父元素中的所有子级元素，可以嵌套。

```html
    
    <style>
        div a{
            color: red;
        }
    </style>	
    
    <!-- 所有a标签都被选择 -->
    <div>
        <a href="#">后代1</a>

        <div>
            <a href="#">后代2</a>

        </div>

    </div>

```

+ 子选择器：用于选择最近一级元素。

```html
    
    <style>
        div > a {
            color: red;
        }
    </style>	
    
    <!-- 只有第一个a标签被选择 -->
    <div>
        <a href="#">后代1</a>

        <span>
            <a href="#">后代2</a>

        </span>

    </div>

```

+ 并集选择器：用于选择多组标签。

```html
    
    <style>
        div,
        p,
        ul li {
            color: red;
        }
    </style>

    
    <div>熊大</div>

    <p>熊二</p>

    <ul>
        <li>猪妈妈</li>

        <li>猪爸爸</li>

        <li>小猪佩奇</li>

    </ul>

```

+ 伪链接选择器：用于修改`<a><a/>`标签样式，以下书写顺序不能变，否则不生效。

```html
        
    <style>
        /* 选择未访问的链接 */
        a:link {
            color: red;
        }
        /* 选择已访问的链接 */
        a:visited {
            color: green;
        }
        /* 选择鼠标悬浮时的链接 */
        a:hover {
            color: pink;
        }
        /* 选择鼠标点下未松开时的链接 */
        a:active {
            color: orange;
        }
    </style>

    
    <a href="#">伪链接选择器</a>

```

+ :focus伪类选择器：选取获得光标的表单元素，一般为input标签。

```html
        
    <style>
        input:focus {
            background-color: yellow;
        }
    </style>

    
     <input type="text">

```



## CSS样式
### 字体属性
+ `font-style:normal/italic;`:字体风格，其中normal表示正常字体，italic表示斜体
+ `font-weight: 400/700;`：字体粗细，其中400表示正常字体，700表示加粗字体
+ `font-size: 16px;`：字号大小
+ `font-family: 'Microsoft Yahei';`：字体
+ `font:italic 700 16px 'Microsoft Yahei'`复合写法，表示斜体、加粗、字号、字体，不能更改顺序，其中字号、字体必须出现

### 文本属性
+ `color: red/#FF0000/rgb(255,0,0);`：文本颜色
+ `text-align: left/center/right;`：文本对齐
+ `text-decoration: none/underline/line-through;`：文本装饰，分别表示 无装饰线、下划线、删除线。
+ `text-indent: 2em;`：文本缩进
+ `line-height: 26px;`：行间距，`行间距 = 上间距 + 文本高度 + 下间距`

> 单行文字垂直居中：设置行高与盒子高度相等，如：`height: 50px;`、`line-height: 50px;`。
>

### 背景属性
+ `background-color: red/#FF0000/rgb(255,0,0);`：背景颜色，默认值是`transparent`(透明)。
+ `background-image: none/url(图片路径)`：背景图片。
+ `background-repeat: repeat/no-repeat/repeat-x/repeat-y`：背景平铺，分别表示：横、纵向平铺（默认）/不平铺/横向平铺/纵向平铺。
+ `background-attachment: scroll/fixed;`:背景固定。scroll(默认)图片随内容滚动，fixed图片固定不动。
+ `background-position: x y;`：背景位置。其中x、y可以是方位名称`top/center/bottom | left/center/right`，也可以是`精确单位`。
+ `background: red url(图片路径) no-repeat fixed top;`:复合写法。
+ `background: rgba(0,0,0,0.3);`:背景透明。

### 边框属性
+ `border-width: 15px`:边框粗细
+ `border-style: solid/dashed/dotted;`：边框样式，分别表示实线、虚线、点线。
+ `border-color:  red/#FF0000/rgb(255,0,0);`：边框颜色
+ `border: 1px solid red;`：复合写法，也可以分开写：`border-top/bottom/left/right: 1px solid red;`，注意：边框会改变盒子大小。
+ `border-collapse: collapse;`边框合并，可以用于表格相邻边框合并到一起。

```html
    
    <!-- 表格模板  -->
    <style>
        table {
            margin: 0 auto;
            width: 800px;
            height: 249px;
        }

        table,
        th,td {
            border: 1px solid pink;
            border-collapse: collapse;
            font-size: 14px;
            text-align: center;
        }
    </style>

```

### 边距属性
+ `padding-left/right/top/bottom: 5px;`:左/右/上/下 内边距，`内边距会改变盒子大小`，复合写法：
    - `padding: 5px;`：表示上下左右都是5像素。
    - `padding: 5px 10px;`：表示上下是5像素，左右都是10像素。
    - `padding: 5px 10px 20px;`：表示上是5像素，左右都是10像素，下是20像素。
    - `padding: 5px 10px 20px 30px;`：表示顺时针，上右下左分别为5像素、10像素、20像素、30像素。
+ `margin-left/right/top/bottom: 5px;`:左/右/上/下 外边距，`外边距会改变盒子大小`，复合写法：
    - `margin: 5px;`：表示上下左右都是5像素。
    - `margin: 0 auto;`：表示上下是0像素，左右居中，前提是标签必须`设有宽度`才能生效。
    - `margin: 5px 10px 20px;`：表示上是5像素，左右都是10像素，下是20像素。
    - `margin: 5px 10px 20px 30px;`：表示顺时针，上右下左分别为5像素、10像素、20像素、30像素。

> 块元素水平居中：①给块元素设置宽度`width: 100px;`②设置外边距`margin: 0 auto;`
>
> 行内元素、行内块元素水平居中：给其父元素添加`text-align: center;`
>

### 布局定位属性
+ `display: none/block/inline/inline-block;`：显示模式转换，分别表示隐藏、转换为块元素、转换为行内元素、转换为行内块元素。
+ `position: static/relative/absolute/fixed/sticky;`：定位，分别表示静态定位、相对定位、绝对定位、固定定位、粘性定位。
+ `z-index: 1;`：定位叠放次序。数值越大盒子越靠上，默认是auto，数字后面不能加单位。
+ `float: none/left/right;`：浮动，分别表示不浮动(默认)、左浮动、右浮动。
+ `clear: both;`：清除浮动，必须在浮动元素后放一个空元素。
+ `visibility: visible/hidden;`：显示与隐藏标签，隐藏后的元素继续占有原来的位置。
+ `overflow: visivle/hidden/scroll/auto;`：溢出标签。
    - `bisible`:不剪切内容，也不添加滚动条。
    - `hidden`：超出部分隐藏，可以清除浮动，必须给设置浮动的父级元素添加才能生效。
    - `scroll`：不管超出与否，总是显示滚动条。
    - `auto`：超出自动显示滚动条，不超出不显示滚动条。

### 用户界面属性
+ `cursor: default/pointer/move/text/not-allowed`：鼠标样式，分别表示默认/小手/移动/文本/禁止。
+ `outline: none`：用于input、textarea取消表单轮廓。
+ `resize: none`：用于禁止textarea拖拽。
+ `vertical-align: middle`：使图片、表单等行内块元素与文字垂直居中（给图片等行内块设置），可以解决图片底部默认空白缝隙问题。

### 其他属性
+ `list-style: none;`：去除`<li>`标签前面的项目符号
+ `border-radius: 12px/50%;`：圆角边框，注意点：
    - 正方形变成正圆可以设置`50%`或者`高度/宽度的一半`
    - 矩形一般会设置为高度的一半
    - 也可以写成`border-radius: 5px 10px 15px 20px;`，分别表示上、右、下、左。
+ `box-shadow: 5px 5px 10px 10px rgba(0,0,0,.3);`:盒子阴影，对应值：
    - 值1(`h-shadow`)：阴影的水平距离，必写。
    - 值2(`v-shadow`)：阴影的垂直距离，必写。
    - 值3(`blur`)：阴影模糊度，可选。
    - 值4(`spread`)：阴影大小，可选。
    - 值5(`color`)：阴影颜色，可选。
+ `text-shadow: 5px 5px 10px rgba(0,0,0,.3);`:文字阴影，对应值：
    - 值1(`h-shadow`)：阴影的水平距离，必写。
    - 值2(`v-shadow`)：阴影的垂直距离，必写。
    - 值3(`blur`)：阴影模糊度，可选。
    - 值5(`color`)：阴影颜色，可选。

## CSS书写规范
建议遵循以下顺序：

1. 布局定位属性：`display`/`position`/`float`/`clear`/`visibility`/`overflow`
2. 自身属性：`width`/`height`/`margin`/`padding`/`border`/`background`
3. 文本属性：`color`/`font`/`text-decoration`/`text-align`/`vertical-align`/`white-space`/`break-work`
4. 其他属性（CSS3）：`content`/`cursor`/`border-radius`/`box-shadow`/`text-shadow`/`background:linear-gradient`...

## CSS引入方式
+ 嵌入式：用`<style></style>`标签写于HTML内部。

```html

    <style>
        p{
            color: red;
        }
    </style>

    
```

+ 行内式：在标签内部使用`style属性`设定CSS样式。

```html
    
    <div style="color: red;font-size: 12px;">行内式</div>

    
```

+ 链接式：新建一个独立的xx.css文件，通过`<link>`标签引入的。

```html
    
    <link rel="stylesheet" href="css文件路径">
    
```

## 元素的显示模式
元素的显示模式就是HTML中的元素以什么方式进行显示，HTML元素分为`块元素`和`行内元素`两种类型。

### 块元素
+ 常见的块元素：`<h1>-<h6>`、`<p>`、`<div>`、`<ul>`、`<ol>`、`<li>`。
+ 块元素的特点：
    - 独占一行
    - 可以设置高度、宽度、内外边距
    - 宽度默认是容器的100%
    - 可以放行内元素或块元素
+ 注意：文字类的块元素不能放块元素：如`<p>`、`<h1>-<h6>`

### 行内元素
+ 常见的行内元素：`<a>`、`<strong>`、`<b>`、`<em>`、`<i>`、`<s>`、`<ins>`、`<u>`、`<span>`。
+ 行内元素的特点：
    - 一行显示多个
    - 设置宽高无效
    - 默认宽度是内容的宽度
    - 行内元素只能放文本和行内元素
+ 注意：链接里面不能放链接

### 行内块元素
+ 常见的行内块元素：`<img />`、`<input />` 、`<td>`、`<button>`
+ 特点：
    - 一行显示多个
    - 默认宽度是内容的宽度
    - 可以设置高度、宽度、内外边距
    - 行内块与行内块直接具有间距

## CSS三大特性
### 层叠性
相同的标签用了相同的样式，后面的样式会覆盖原来的样式。

```html
        
    <style>
        div {
            color: red;
        }
        div {
            color: pink;
        }
    </style>

    
     <!-- 最终为字体为粉色 -->
     <div>长江后浪推前浪，前浪死在沙滩上</div>

```

### 继承性
子标签会继承父标签的某些样式。

```html

    <style>
        div {
             /* 表示行高继承父元素的1.5倍 */
            font:12px/1.5 Microsoft YaHei;
        }
    </style>

    <div>
        <p>龙生龙凤生凤，老鼠的儿子会打洞</p>

    </div>

```

### 优先级
+ 同一元素指定多个选择器会优先级的产生。
+ 权重：
    - 继承 或 *                                                             0 0 0 0
    - 标签选择器、伪元素选择器                               0 0 0 1
    - 类选择器、伪类选择器、属性选择器                0 0 1 0
    - 行内式style=""                                                    1 0 0 0
    - !important                                                           无穷大
+ 权重叠加
    - 复合选择器会有权重叠加的问题
    - 权重虽然会叠加，当是不会进位，比较时从左到右比较

## 盒子模型
+ CSS本质是一个盒子，里面装着html元素，包括：内容(`content`)、内边距(`padding`)、边框(`border`)、外边距(`margin`)

```plain
------------------------------------------
|                 margin                 |  
| -------------------------------------- |
| |               border               | |
| | ---------------------------------- | |
| | |             padding            | | |
| | | ------------------------------ | | |
| | | |           content          | | | |
| | | |                            | | | |
| | | |                            | | | |
| | | ------------------------------ | | |
| | ---------------------------------- | |
|  ------------------------------------- |
------------------------------------------
```

+ 外边距合并：两个父子关系的块元素同时设置外边距会出现外边距合并。

```html

    <style>
        .father {
            margin-top: 50px;
            width: 400px;
            height: 400px;
            background-color: green;
        }
        .son {
            margin-top: 100px;/* 不生效 */
            width: 100px;
            height: 100px;
            background-color: pink;
        }
    </style> 

    <div class="father">
        <div class="son"></div>

    </div>

```

解决方案：①给父元素添加边框`border`②给父元素添加内边距`padding`③给父元素添加`overflow: hidden;`

## CSS布局方式
### 标准流
标准流就是标签按照默认的方式排列

+ 块元素独占一行，从上到下排列
+ 行内元素一行多个，从左到右排列，碰到盒子边沿自动换行

### 浮动 
很多布局效果标准流无法完成，浮动可以让多个块元素在一行排列显示。

#### 浮动的特点
+ 脱离标准流控制，移动到指定位置，浮动的盒子不再保留原先的位置(浮动的盒子只会影响后面的标准流)。
+ 多个元素设置浮动会在一行显示并且顶端对齐，如果一行装不下会自动换行。
+ 任何元素添加浮动后都具有行内块元素相似的特性

> 网页布局准则：多个块元素纵向排列用`标准流`，多个块元素横向排列用`浮动`。
>
> 一般的策略是：父元素用标准流排列上下位置，子元素用浮动排列左右位置。
>

#### 清除浮动
+ 原因：由于父盒子很多情况下，不方便给高度，但是子盒子浮动又不占有位置，最后父盒子高度为0，就会影响下面的标准流盒子。
+ 方法：

```html

    <style>
        .clearfix:after {
            content: "";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
        
        .clearfix {
            /* IE6、7专有 */
            *zoom: 1;
        }
    </style>


    <!-- 要清除浮动的父盒子 -->
    <div class="clearfix"></div>


```

```html

    <style>
        .clearfix:before,.clearfix:after {
            content: "";
            display: table;
        }

        .clearfix:after {
            clear:both;
        }  
        
        .clearfix {
            /* IE6、7专有 */
            *zoom: 1;
        }
    </style>


    <!-- 要清除浮动的父盒子 -->
    <div class="clearfix"></div>


```

    - 额外标签法：给浮动元素后面加一个空标签(如`<br />`)，给其设置样式`clear:both;`
    - 给父元素添加`overflow:hidden;`
    - after伪元素：相当额外标签法的升级版
    - 双伪元素

### 定位
当标准流和浮动无法快速实现时，需要用定位实现；定位可以使盒子固定在某个盒子的任意位置，并且压住其他盒子。

定位 = 定位模式(`static/relative/absolute/fixed/sticky`) + 边偏移(`top/bottom/left/right`)，定位模式决定元素的定位方式，边偏移决定元素的最终位置。

#### 五种定位模式
+ 静态定位 static：标准流默认定位方式，没有边偏移。
+ 相对定位 relative：相对于盒子原来位置进行移动，原来标准流的位置继续占有（不脱标）。
+ 绝对定位 absolute：相对于盒子祖先元素位置进行移动，特点：
    - 如果`没有祖先元素`或者`祖先元素没有定位`，则以浏览器为标准定位（Document文档）。
    - 如果祖先元素有定位，以`最近一级`有定位的祖先元素为标准定位。
    - 绝对定位`不再占有原来的位置`（脱标）。
+ 固定定位 fixed :相对于浏览器可视窗口经行移动，不随滚动条滚动，不再占有原来的位置（脱标）。
+ 粘性定位 sticky ：可以认为是相对定位和固定定位的结合。特点：
    - 相对于浏览器可视窗口经行移动（固定定位的特点）
    - 原来标准流的位置继续占有（相对定位的特点）。
    - 必须添加top/bottom/left/right任意一个才生效。

> 小技巧：
>
> 1. 一般使用`子绝父相`，子元素不需要占有位置（绝对定位），而父元素需要占有位置（相对定位）。
> 2. 定位可以配合margin使用实现居中效果，如：①定位的盒子`left:50%;`②定位的盒子`margin-left:负宽度的一半;`
> 3. 可以通过`z-index`来设置定位的叠放次序
>

#### 定位的特性
+ `行内元素`添加绝对定位或固定定位，可以直接设置高度和宽度。
+ `块元素`添加绝对定位或固定定位，如果不设置高度和宽度，默认大小是内容的大小。
+ 浮动元素、绝对定位/相对定位 元素都不会出发`外边距合并`问题。
+ `相对定位`不会压住下面标准流盒子里面的文字和图片，`绝对定位/固定定位` 会压住下面标准流所有的内容。

## CSS高级技巧
### 精灵图 (sprite)
+ 精灵图主要针对于小的`背景图片`使用。
+ 精灵图通过`background-position`来实现。
+ 一般情况下精灵图都是`负值`(x为左，y为上)。

### 文字图标 (iconfont)
+ 展示的是图标，本质是字体。
+ 文字图标的使用：

```html

    <style>
        /* 字体声min */
        @font-face {
            font-family: 'icomoon';
            src: url('fonts/icomoon.eot?vbezd7');
            src: url('fonts/icomoon.eot?vbezd7#iefix') format('embedded-opentype'),
                url('fonts/icomoon.ttf?vbezd7') format('truetype'),
                url('fonts/icomoon.woff?vbezd7') format('woff'),
                url('fonts/icomoon.svg?vbezd7#icomoon') format('svg');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }
    </style>


```

```html

    <style>
        span {
            font-family: 'icomoon';
        }
    </style>


    <span></span>

    
```

    1. 下载：`icomoon字库`-[http://icomoon.io](http://icomoon.io) 或 `阿里iconfont字库`-[http://www.iconfont.cn](http://www.iconfont.cn)
    2. 将下载的`fonts`文件夹放在根目录
    3. 引用
    4. 复制下载的`demo.html`里图标的右侧方块使用
+ 字体图标的追加：进入`icomoon字库`官网点击`Import Icons`导入`selection.json`，选择要添加的图标，重新下载并替换原来的文件即可。

### CSS三角
1. ▲：`border-top-color: pink;`
2. ▼：`border-top-color: pink;`
3. ◀ ：`border-right-color: pink;`
4. ▶：`border-left-color: pink;`

```html

    <style>
        div {
            width: 0;
            height: 0;
            line-height: 0;
            font-size: 0;
            border: 50px solid transparent;
            /* border-top-color: pink; */
            /* border-bottom-color: pink; */
            /* border-left-color: pink; */
            /* border-right-color: pink; */
        }
    </style>

    <div></div>

```

5. ◤◢：可以用定位拼成梯形。

```html

    <style>
        div {
            width: 0;
            height: 0;
            border-color: transparent red transparent transparent;
            border-style: solid;
            border-width: 22px 8px 0 0;
        }
    </style>

    <div></div>

```



### 图片底部空白间隙
图片底侧会有一个空白间隙，原因是行内块元素会和文字的基线对齐。

解决方案：

+ 给图片添加`vertical-align: middle/top/bottom;`等
+ 把图片转换为块元素`display:block;`

### 文字溢出省略号显示
+ 一行文字溢出显示省略号

```html

    <style>
        div {
            /* 强制文本一行内显示 */
            white-space: nowrap;
            /* 超出部分隐藏 */
            overflow: hidden;
            /* 文字超出部分用省略号表示 */
            text-overflow: ellipsis;
        }
    </style>

    <div>一行不能全部显示的文字</div>

```

+ 多行文字溢出显示省略号

```html

    <style>
        div {
            overflow: hidden;
            text-overflow: ellipsis;
            /* 弹性盒子模型显示 */
            display: -webkit-box;
            /* 限制在一个块元素显示的文本行数 */
            -webkit-line-clamp: 2;
            /* 设置或检索伸缩盒子对象的子元素的排列方式 */
            -webkit-box-orient: vertical;   
        }
    </style>

    <div>多行不能全部显示的文字</div>

```

### 文字环绕浮动元素
一个盒子里左边是图片，右边是文字，这时一般情况会使用左右浮动来布局。这种情况可以巧妙运用浮动元素不会压住文字的特性。

```html

    <style>
        .box {
            width: 300px;
            height: 70px;
        }
        .box .pic {
            /* 妙用 */
            float: left;
            width: 120px;
            height: 60px;
        }
        .box .pic img {
            width: 100%;
        }
    </style>

    <div class="box">
        <div class="pic">
            <img src="images/img.png" alt="">
        </div>

        <p>一堆文字...</p>

    </div>

    
```

### margin负值巧妙运用
+ 多个li设置边框和浮动会出现`边框粗细不统一`的情况，可以给li设置`margin-left: -1px`是边框粗细同一。
+ 在上面的情况设置鼠标移动边框变色会出现`一条边不变色`的情况，可以给盒子设置相对定位（如果有定位可以提高盒子层级`z-index`）。

```html

    <style>
        ul li {
            /* 妙用1 */
            margin-left: -1px;
            float: left;
            list-style: none;
            width: 40px;
            height: 50px;
            border: 1px solid red;
        }

        ul li:hover {
            /* 妙用2 */
            position: relative;
            border: 1px solid blue;
        }
    </style>

    <ul>
        <li></li>

        <li></li>

        <li></li>

    </ul>

    
```

### 行内块巧妙运用
做分页时我们通常利用ul>li设置样式来做，这种情况可以直接利用行内块一行显示并且自带间隔来做。

```html

    <style>
        .box a {
            /* 妙用 */
            display: inline-block;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            text-decoration: none;
            border: 1px solid gray;
        }

        .box .pre,
        .box .next {
            width: 80px;
        }

        .box input,
        .box button {
            width: 50px;
            height: 50px;
        }

        .box .current,
        .box .elp {
            border: 0;
        }       
    </style>

    <div class="box">
        <a href="#" class="pre">&lt;&lt;上一页</a>

        <a href="#" class="current">1</a>

        <a href="#">2</a>

        <a href="#">3</a>

        <a href="#">4</a>

        <a href="#">5</a>

        <a href="#">6</a>

        <a href="#" class="elp">...</a>

        <a href="#" class="next">&gt;&gt;下一页</a>

        到第<input type="text">页<button>确定</button>

    </div>

```

## CSS初始化
不同浏览器对有些标签的默认值是不同的，CSS初始化是指重设浏览器样式，消除不同浏览器对HTML文本呈现的差异。

```html

    <style>
        /* 清除内外边距 */
        * {
            margin: 0;
            padding: 0
        }

        /* 斜体文字不倾斜 */
        em,
        i {
            font-style: normal
        }

        /* 去掉li的小圆点 */
        li {
            list-style: none
        }

        img {
            /* 照顾低版本浏览器，如果图片外卖包含了链接会有边框的问题 */
            border: 0;
            /* 取消图片底部有空白缝隙问题 */
            vertical-align: middle
        }

        /* 鼠标经过时变成小手 */
        button {
            cursor: pointer
        }

        a {
            color: #666;
            /* 取消a的底线 */
            text-decoration: none
        }

        a:hover {
            color: #c81623
        }

        button,
        input {
            font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif
        }

        body {
            /* CSS3 抗锯齿形 让文字显示的更加清晰 */
            -webkit-font-smoothing: antialiased;
            background-color: #fff;
            font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
            color: #666
        }

        .hide,
        .none {
            display: none
        }

        /* 清除浮动 */
        .clearfix:after {
            visibility: hidden;
            clear: both;
            display: block;
            content: ".";
            height: 0
        }

        .clearfix {
            *zoom: 1
        }
    </style>

```

## CSS3
### 新增选择器
+ 属性选择器：可以根据属性选取元素

```html
   
    <style>
        /* 必须是input 具有value属性 */
        input[value] {
            color: red;
        }

        /* 必须是input 具有type属性 类型是文本框 */
        input[type=text] {
            color: green;
        }

        /* 必须是div 具有class属性 class属性值以icon开头 */
        div[class^=icon] {
            color: blue;
        }

        /* 必须是div 具有class属性 class属性值以data结尾 */
        div[class^=data] {
            color: orange;
        }

        /* 必须是div 具有class属性 class属性值内包含pic */
        div[class^=pic] {
            color: pink;
        }
    </style>

```

+ 结构伪类选择器：根据文档结构选取元素

```html
   
    <style>
        /* 选取ul里面的第一个孩子 li */
        ul li:first-child {
            background-color: red;
        }

        /* 选取ul里面的最后一个孩子 li */
        ul li:last-child {
            background-color: green;
        }

        /*选取ul里面的第3孩子li (括号里面可以是数字，关键字，公式) 
            数字：从1开始
            关键字：even偶数，odd奇数
            公式：从0开始，必须是n
                2n    --> 偶数
                  2n+1  --> 奇数
                5n    --> 5的倍数
                  n+5   --> 从第5个开始（包含第5个）到最后
               -n+5   --> 前5个（包含第5个） 
        */
        ul li:nth-child(3) {
            background-color: blue;
        }
    </style>

```

> `nth-of-type`和`nth-child`的用法一样，区别：
>
> + `nth-child`：对父元素里面所有孩子排序，先找到第n个孩子，然后看看是否与标签匹配
> + `nth-of-type`：对父元素里面指定元素经行排序，先匹配标签，再根据标签找第n个孩子
>

```html

    <style>
        /* 光头强和熊大 全没被选取 */
        section div:nth-child(1) {
            background-color: red;
        }

        /* 只选取熊大 */
        section div:nth-of-type(1) {
            background-color: blue;
        }
    </style>

    <section>
        <p>光头强</p>

        <div>熊大</div>

        <div>熊二</div>

    </section>

```

+ 伪元素选择器：可以利用CSS创建标签，从而简化HTML结构。创建的标签在文档树中是`找不到`的，且创建的元素是`行内元素`。可以用于配合字体图标使用、清除浮动、仿土豆视频效果。

```html

    <style>
        div::before {
            /* 必须写content才生效 */
            content: "老鼠";
        }

        div::after {
            content: "大米";
        }
    </style>

    <div>爱</div>

```

### 盒子模型
CSS3中可以通过`box-sizing`来指定盒子模型

+ `box-sizing:content-box;`：默认盒子模型，盒子大小 = width + padding + border.
+ `box-sizing:border-box;`：新增盒子模型，盒子大小 = width,意味着padding和border不会撑大盒子，可以在初始化设置。

```html

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing:border-box;
        }
    </style>

```

### 新增特性
+ filter函数：`filter:blur(5px);`,blur模糊处理，数字越大越模糊。
+ calc函数：`width:calc(100% - 80px);`,括号里面可以使用+ - * / 来进行计算。
+ 过度：`transition: all 0.5s ease 0`，分别表示变化的属性，花费时间，运动曲线，何时开始；后面两个值可以省略。过度一般配合hover使用，谁用过度给谁加。
