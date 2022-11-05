const { signUp } = require("../controllers/auth");
const { User } = require("../models/user");
const { RequestError } = require("../helpers");
describe("SignUp controller test", () => {
  it("shoud 201 if user created", async () => {
    const mUser = {
      email: "ivan@gmail.com",
      subscription: "starter",
    };

    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const mRes = mockResponse();

    const mReq = {
      body: {
        password: "123456",
        email: "aaaivan@gmail.com",
      },
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => !mUser);
    jest.spyOn(User, "create").mockImplementationOnce(() => mUser);

    await signUp(mReq, mRes);
    expect(mRes.status).toHaveBeenCalledWith(201);
    expect(mRes.json).toHaveBeenCalledWith(mUser);
  });

  it("should 409 if user email is in use", async () => {
    const mUser = {
      email: "ivan@gmail.com",
      subscription: "starter",
    };

    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const mRes = mockResponse();

    const mReq = {
      body: {
        password: "123456",
        email: "aaaivan@gmail.com",
      },
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => mUser);
    await signUp(mReq, mRes);
    expect(() => RequestError(409, "Email in use")).toThrow(
      new Error("Email in use")
    );
  });
});
