import React, { useEffect, useState } from 'react'

const SignIn = () => {
  const [values, setValues] = useState({ userEmail: "", userPw: "" });
  const [validation, setValidation] = useState({ userEmail: false, userPw: false });

  useEffect(() => {
    const emailReg = /@/;
    if (emailReg.test(values.userEmail)) {
      setValidation({ ...validation, userEmail: true });
    } else {
      setValidation({ ...validation, userEmail: false });
    }
  }, [values.userEmail]);
  useEffect(() => {
    if (values.userPw.length >= 8) {
      setValidation({ ...validation, userPw: true });
    } else {
      setValidation({ ...validation, userPw: false });
    }
  }, [values.userPw]);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row">
        <label htmlFor="userEmail" className="text-lg w-1/4 text-left">
          이메일
        </label>
        <div className="flex flex-col w-full">
          <input
            id="userEmail"
            name="userEmail"
            value={values.userEmail}
            type="email"
            onChange={(e) => setValues({ ...values, userEmail: e.target.value })}
            data-testid="email-input"
            placeholder="your-email@email.com"
            className="w-3/4 py-1 px-2 border-[1px] placeholder:italic placeholder:text-slate-400"
          />
          {!validation.userEmail && <span className="text-sm text-orange-600 text-left">이메일을 확인해주세요.</span>}
        </div>
      </div>
      <div className="flex flex-row">
        <label htmlFor="userPw" className="text-lg w-1/4 text-left">
          비밀번호
        </label>
        <div className="flex flex-col w-full">
          <input
            id="userPw"
            name="userPw"
            value={values.userPw}
            type="password"
            onChange={(e) => setValues({ ...values, userPw: e.target.value })}
            data-testid="password-input"
            placeholder="8자 이상 입력해주세요."
            className="w-3/4 py-1 px-2 border-[1px] placeholder:italic placeholder:text-slate-400"
            minLength={8}
          />
          {!validation.userPw && (
            <span className="text-sm text-orange-600 text-left">비밀번호를 8자 이상 입력해주세요.</span>
          )}
        </div>
      </div>
      <button type="submit" data-testid="signin-button" className="p-2 bg-orange-200 transition-all hover:bg-orange-300 w-full disabled:bg-slate-300" disabled={validation.userEmail && validation.userPw ? false : true}>
        회원가입
      </button>
    </div>
  );
}

export default SignIn;
