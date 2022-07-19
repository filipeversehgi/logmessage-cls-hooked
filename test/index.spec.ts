import { addToSessionProp, getSessionProps as getLogProps, initLogMessageCls, LogRoot, setSessionProp as setLogProp } from "../src/log-root";

initLogMessageCls();

class TestClass {

    @LogRoot()
    runTest() {
        setLogProp('user', 'test@gmail.com')
        addToSessionProp('posts', 'A');
        this.subMethod();
        console.log('T1', getLogProps())
        return true;
    }

    subMethod() {
        setLogProp('name', 'test-1234')
    }

    @LogRoot()
    runTestB() {
        setLogProp('user', 'another@gmail.com')
        addToSessionProp('posts', 'B');
        console.log('T2', getLogProps())
        return true
    }

    @LogRoot()
    runTestC() {
        setLogProp('user', 'fulano@gmail.com')
        setLogProp('name', 'omg');
        addToSessionProp('posts', 'C');
        this.runTestB();
        console.log('T3', getLogProps())
        return true
    }
    
    runTestD() {
        console.log('T4', getLogProps())
        return true
    }
}

const instance = new TestClass();
instance.runTest();
instance.runTestB();
instance.runTestC();
instance.runTestD();