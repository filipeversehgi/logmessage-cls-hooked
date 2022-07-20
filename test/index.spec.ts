import { getLogData, initLogMessageCls, LogRoot, setOnLog } from "../src";

initLogMessageCls();

class TestClass {

    @LogRoot()
    pegaFaturas() {
        setOnLog('userid', 'thiago')
        this.getRepository();
        console.log('Pegou as faturas', getLogData());
    }

    // @LogRoot()
    getRepository() {
        const faturas = [1, 2, 3];
        setOnLog('qtdFaturas', faturas.length);
        console.log('Pegou as faturas', getLogData());
    }
}

const instance = new TestClass();
instance.pegaFaturas();