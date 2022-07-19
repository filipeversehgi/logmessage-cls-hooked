import { getSessionProps as getLogProps, initLogMessageCls, LogRoot, setSessionProp as setLogProp } from "../src/log-root";

initLogMessageCls();

class TestClass {

    @LogRoot()
    runTest() {
        setLogProp('user', 'test@gmail.com')
        this.subMethod();
        console.log('T1', getLogProps('user', 'name'))
        return true;
    }

    subMethod() {
        setLogProp('name', 'test-1234')
    }

    @LogRoot()
    runTestB() {
        setLogProp('user', 'another@gmail.com')
        console.log('T2', getLogProps('user', 'name'))
        return true
    }

    @LogRoot()
    runTestC() {
        setLogProp('user', 'fulano@gmail.com')
        setLogProp('name', 'omg');
        this.runTestB();
        console.log('T3', getLogProps('user', 'name'))
        return true
    }
    
    runTestD() {
        console.log('T4', getLogProps('user', 'name'))
        return true
    }
}

const instance = new TestClass();
instance.runTest();
instance.runTestB();
instance.runTestC();
instance.runTestD();