---
layout: post
title: JavaScript语言精粹与ES6
---

本篇起源，源于我最近重看老道（Douglas Crockford）的《JavaScript: The Good Parts》，以及一些关于ES6的新特性。最近所做工作基本都与JS相关，与原以为有兴趣的Java反无相干。JS能做到且被用来做的事情太多，前端工程化路上各个话题随便拿出来都是一长篇大论，有时感觉眼花缭乱。ES6中令人兴奋的一个特性是模块化，最近写的做的一些东西也与模块化有关。但仔细一想，何致兴奋如此，模块不是Java早就有的特性么。于是不妨一问，JavaScript作为语言本身，优劣何在？学习语言的本质是什么？就此问题出发，决定学习重温一下语言里精妙的部分，思考JS作为语言本身的特点，及一些想法。

由此也决定了，本篇不会是基本语法的学习记，也不一定会在具体问题上太深入，希望就“好的特性——一般的思考”一线展开笔记。另外，只要认为是好的东西，不区分是否ES6。

## 语言核心 JavaScript Core

JavaScript是弱类型的语言，弱类型并非无类型，它只是比较弱。首先在数字类型没有区分整数还是浮点数，其次在对象不具备强类型，因此写得好的代码表达力强且力量强大。其次，函数式编程与声明式编程的不同在于，函数计算产生结果，而非影响结果。“计算”作为一个动作具备独立性。

### 语言组成与语法 Specification, Grammar

* 简明的类型系统（数字、字符串、布尔值、对象、`null`和`undefined`）
* 简明的对象表达法（键名可以是任意字符串，键值任意，并可以通过`obj[key]`方式拿到，若key是个合法的 **标识符** ，可以通过`obj.key`的方式检索）
* 原型（Prototype，类似于继承，又涉及元数据）
* 反射（其实主要就是`typeof`和`instanceof`两个操作符，反射支持相对薄弱。是否足够和有必要复杂支持则是另外话题）
* 函数（闭包，作用域渗透，返回函数本身，这些特性使得它在表达力、功能性上比静态的Java强得太多）

> JavaScript设计得最出色的就是它的函数的实现。它几乎接近于完美。但是，想必你也能预料到，JavaScript的函数也存在瑕疵。  —— Douglas Crockford

若老道说的是函数内this作用域的错误绑定，在ES6中已经修复了。

### 原型

代码需要重用，而语言需要提供机制来支持。强类型的Java天然有继承机制，而JavaScript通过原型来实现。

继承：

* 属性。默认property shadow，检索时会向上搜寻原型链中已定义的属性。嗯就跟面向对象的继承外观上是一样的
* 方法。特指对象里的函数

创建：

* 

### 函数

闭包表达力虽强，但其实也就是可访问性的另一个方案。不使用语法层面的访问控制，就使得代码在表达力上增强了，同时访问控制就需要通过闭包这样的语法来做。在JS中只能利用函数级作用域来做访问控制。看一段简单的代码：

```
var incrementer = (function() {
   var count = 0; // not accessible from outside like incrementer.count --> undefined
   return {
      increment: function() {
         return ++count;
      }
   }；
})();
```

对象里的函数称为方法，此时方法中的`this`被绑定到该对象上。但当函数不是对象的属性时，它的`this`值绑定到全局对象上。

## 人人都爱ES6

这是与己有关的ES6语法。为何强调与己有关？说明不是抄的啊！列一些切身感受到好的特性：

* 可变参数取代类数组对象`argument`
* 修复错误的this函数作用域绑定
* 支持尾递归优化
* `for...of`循环语法与destructuring

### for...of循环与destructuring

不认为解构是destructuring的恰当翻译。以往循环一个数组，大概有几种方法：

1. （ES5前）`for (var i = 0; i < array.length; i++)`
2. （ES5）数组内建了`forEach`方法如下。但它依靠注册回调，不能在中途中断循环。
	```js
		var posts = [{ title: '1' }, { title: '2'}, { title: '3' }]
		posts.forEach(function(post) {
			doSomething(post.title);
		})
	```
3. 又想index，又想break循环：`for...in`循环：`for (var index in iterable_like)`。但它取出来的index并不是数字，而是字符串，并且它可能迭代到原型链上的属性。简单一句，它是为迭代对象属性而生的。
4. 使用类库。比如jQuery的`$.each`，或underscore的`_.each()`方法。

ES6开始，你可以使用最理想的方式来迭代数组了：`for...of`。它修复了`for...in`迭代数组的所有缺陷，并且不只能迭代数组，还可以迭代任何“可迭代”的元素。`可迭代`，就类似于Java的接口，你必须声明。声明方法是：__为对象添加`[Symbol.iterator]()`方法__。

__因此，最佳实践是：迭代对象时使用`for...in`方式，迭代数组时使用`for...of`方式。想要自己设计的对象可以被迭代时，实现`[Symbol.iterator()]`方法。__