import React from "react";
import { NavLink } from "react-router-dom";
import { Input, Form, Button, message } from "antd";
import "antd/dist/antd.css";
import Aux from "../../../hoc/_Aux";
// import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import "./signin.scss";
import "./../../../assets/scss/style.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import UserApi from "../../../api/user";
import { useDispatch } from "react-redux";
import { savetoken, saveuser } from "../../../store/Category/auth";
import { Spin } from "antd";
const SignUp1 = () => {
  const [form] = Form.useForm();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const history = useHistory();
  const validateMessages = {
    required: "Không được để trống !",
    types: {
      string: "${label} không hợp lệ !",
      number: "${label} không hợp lệ !",
    },
    string: {
      max: "${label} tối đa 255 ký tự !",
    },
    number: {
      range: "${label} trong khoảng 1-100 !",
    },
    pattern: {
      mismatch: "${label} không hợp lệ !",
    },
  };
  const onSubmit = async (user) => {
    setloading(true);
    const respone = await UserApi.login(user);
    console.log(respone);
    dispatch(saveuser(respone));
    dispatch(savetoken(respone))
    if (respone?.error) {
      setloading(false);
      if (respone.error?.message == "USERNAME_NOT_EXIST") {
        message.error("UserName đã tồn tại");
        console.log(message.error.message);
      } else if (respone.error?.message == "USER_PASSWORD_FALSE") {
        message.error("Sai Mật Khẩu");
      }
    } else if (respone.type == 1 || respone.type == 2) {
      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
    }
  };
 
  return (
    <Aux>
      {/* <Breadcrumb/> */}

      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              {/* {loading ? <Spin className='huy'/>:''} */}
              <h3 className="mb-3">SmileTech</h3>
              <h4 className="mb-4">Đăng Nhập</h4>
              <Form validateMessages={validateMessages} onFinish={onSubmit}>
                <Form.Item
                  name="user_name"
                  label="UserName"
                  required
                  rules={[{ required: true }, { type: "string", max: 255 }]}
                  style={{ width: "100%", paddingRight: "10px" }}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  required
                  rules={[
                    { required: true, whitespace: true },
                    { type: "string", max: 255 },
                  ]}
                  style={{ width: "100%", paddingRight: "10px" }}
                >
                  <Input.Password placeholder="" />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="button-login"
                    htmlType="submit"
                    type="primary"
                  >
                    Signin
                  </Button>
                </Form.Item>
              </Form>
              {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Lưu thông tin đăng nhập</label>
                                    </div>
                                </div> */}

              <p className="mb-2 text-muted">
                Quên mật khẩu ?{" "}
                <NavLink to="/auth/reset-password-1">Lấy lại</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Bạn không có tài khoản ?{" "}
                <NavLink to="/auth/signup">Đăng kí</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp1;
