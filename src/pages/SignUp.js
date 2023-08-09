import React, { useEffect, useState } from "react";
import { auth } from "../lib/client/api/authApi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState({ email: false, password: false });
  const navigate = useNavigate();
  useEffect(() => {
    const emailReg = /@/;
    if (emailReg.test(values.email)) {
      setValidation({ ...validation, email: true });
    } else {
      setValidation({ ...validation, email: false });
    }
  }, [values.email]);
  useEffect(() => {
    if (values.password.length >= 8) {
      setValidation({ ...validation, password: true });
    } else {
      setValidation({ ...validation, password: false });
    }
  }, [values.password]);
  const onSignUp = (e) => {
    e.preventDefault();
    auth(values, "signup")
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.");
          navigate("/signin");
        }
      })
      .catch((error) => {
        const errorRes = error.response.data;
        if (errorRes.statusCode === 400) {
          alert(errorRes.message);
        }
      });
  };
  return (
    <form onSubmit={onSignUp} className="flex flex-col gap-1">
      <div className="flex flex-row">
        <label htmlFor="email" className="text-lg w-1/4 text-left">
          이메일
        </label>
        <div className="flex flex-col w-full">
          <input
            id="email"
            name="email"
            value={values.email}
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            data-testid="email-input"
            placeholder="your-email@email.com"
            className="w-3/4 py-1 px-2 border-[1px] placeholder:italic placeholder:text-slate-400"
          />
          {!validation.email && <span className="text-sm text-orange-600 text-left">이메일을 확인해주세요.</span>}
        </div>
      </div>
      <div className="flex flex-row">
        <label htmlFor="password" className="text-lg w-1/4 text-left">
          비밀번호
        </label>
        <div className="flex flex-col w-full">
          <input
            id="password"
            name="password"
            value={values.password}
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            data-testid="password-input"
            placeholder="8자 이상 입력해주세요."
            className="w-3/4 py-1 px-2 border-[1px] placeholder:italic placeholder:text-slate-400"
            minLength={8}
          />
          {!validation.password && (
            <span className="text-sm text-orange-600 text-left">비밀번호를 8자 이상 입력해주세요.</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        data-testid="signup-button"
        className="p-2 bg-orange-200 transition-all hover:bg-orange-300 w-full disabled:bg-slate-300"
        disabled={validation.email && validation.password ? false : true}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
