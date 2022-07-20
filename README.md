# Log Message CLS Hooked

[![npm version](https://badge.fury.io/js/logmessage-cls-hooked.svg)](https://badge.fury.io/js/logmessage-cls-hooked)

A `LogRoot` Method Decorator that uses [cls-hooked](https://www.npmjs.com/package/cls-hooked) to handle and propagate log message details between different methods deeper in the callstack, removing the need to propagate a paremeter just for logging purposes.

Inspired by [Typeorm Transactional CLS Hooked](https://github.com/odavid/typeorm-transactional-cls-hooked/)

## Installation
```
npm install logmessage-cls-hooked --save
yarn add logmessage-cls-hooked
```

## Initialization

In order to use it, you will first need to initialize the cls-hooked namespace before your application is started

```typescript
import { initLogMessageCls } from 'logmessage-cls-hooked';

initLogMessageCls() // Initialize cls-hooked
//...
app = express()
//...
```

## Log Root

A Log root is a context that will receive log properties from all the subsequent methods that are called below it.

Imagine the following scenario:

```typescript
import { getLogData, LogRoot, setOnLog } from "logmessage-cls-hooked";

class SomeClass {

    @LogRoot()
    sayHi() {
        setOnLog('action', 'hi')
        const language = this.getLanguage()
        getLogData() // action=hi, lang=japanese
    }

    private getLanguage() {
        setOnLog('lang', 'japanese')
        getLogData() // action=hi, lang=japanese
        return 'japanese'
    }

}
```

If you want to create a new context to add properties without making a mess in the parent context, just add a new LogRoot like that:


```typescript
import { getLogData, LogRoot, setOnLog } from "logmessage-cls-hooked";

class SomeClass {

    @LogRoot()
    sayHi() {
        setOnLog('action', 'hi')
        const language = this.getLanguage()
        getLogData() // action=hi
    }

    @LogRoot()
    private getLanguage() {
        setOnLog('lang', 'japanese')
        getLogData() // action=hi, lang=japanese
        return 'japanese'
    }

}
```
