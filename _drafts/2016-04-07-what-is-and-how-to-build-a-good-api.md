---
title: 怎么设计一个好的API
category: API 后端
---

* 不需要管是否RESTful（林波：这肯定的啦，没有人说API一定必须是RESTful的）。唯一的判断点在于，是否能满足工业需求（又扯到工业需求是什么）

## 意图

* 什么是意图
* RESTful有时无法支持复杂的意图（仅有6～7个general的动词）

## Domain Specific API

* Command设计模式（通常与业务场景和领域模型强相关，把系统中的动作抽象成领域特定的API出来）
* Task-based

## API是什么

* 一种表达方式？（对建模领域的表达方式）那么因此它可以用：
    * 任意方式表达
    * 任意数据格式
    * 协议（本质上就是一个协议。理论上只要双方使用同一套协议就能通信，但当然我们旨在让这套协议更加优秀。那么问题来了，优秀协议的标准在哪里？

## 工业需求与API标准

我们说过，API好坏的标准在于它是否满足了工业需求，相当于说它是跟软件工程发展时代相关的东西，离开时代的上下文去讨论是没有意义的。那么，现在的工业对API的需求为何？满足这些需求的API有什么特征？