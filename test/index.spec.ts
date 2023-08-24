import { getLogData, initLogMessageCls, LogRoot, setOnLog } from "../src";

initLogMessageCls();

const stub = jest.fn();

class TestClass {
  @LogRoot()
  mainMethod() {
    setOnLog("user", "Rick Grimes");
    stub(getLogData());
    this.childMethod();
    this, this.childMethodWithOwnRoot();
    stub(getLogData());
  }

  childMethod() {
    setOnLog("age", "5");
  }

  @LogRoot()
  childMethodWithOwnRoot() {
    setOnLog("age", "10");
    stub(getLogData());
  }
}

describe("LogRoot", () => {
  const instance = new TestClass();
  instance.mainMethod();

  it("should only contain 'Rick Grimes', in the log data, on the first pass", () => {
    expect(stub).toHaveBeenNthCalledWith(1, new Map([["user", "Rick Grimes"]]));
  });

  it("should contain the same user, but with the age 10, since age is overwritten by the second child method", () => {
    expect(stub).toHaveBeenNthCalledWith(
      2,
      new Map([
        ["user", "Rick Grimes"],
        ["age", "10"],
      ])
    );
  });

  it("should contain the user with age 5, when looking at the logRoot of the root trunk", () => {
    expect(stub).toHaveBeenNthCalledWith(
      3,
      new Map([
        ["user", "Rick Grimes"],
        ["age", "5"],
      ])
    );
  });
});
