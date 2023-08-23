# wanted-pre-onboarding-frontend 사전과제 

안녕하세요, 원티드 프론트엔드 인턴십 지원자 **이유나** 입니다.

### 🗓️ 진행기간 : 2023.08.01 - 2023.08.11

### 👉 [배포링크](https://wanted-pre-onboarding-frontend-lfu3n7s74-lyn94.vercel.app/)
## 프로젝트의 실행 방법
1. 레포지토리 복사:
```
https://github.com/lyn94/wanted-pre-onboarding-frontend.git
```
2. 경로 이동:
```
cd wanted-pre-onboarding-frontend
```
3. 설치:
```
npm install
```
4. 프로젝트 실행:
```
npm start
```
## 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>

## 이 프로젝트에 구현된 기능
1. 로그인
* 유효성 통과에 대한 정보를 상태값으로 저장해두고, useEffect hook을 이용하여 상태값 변경
* 정규식을 통한 이메일에 '@' 포함 여부 검사
* 유저의 email, password를 api를 통해 응답요청(post), 로그인 성공시(response의 상태값이 200) 응답값을 localStorage에 저장하고, 유저에게 로그인 성공 메시지 표시
* 로그인 정보를 모두 입력했을 경우에만 button을 disabled={false} 처리 되도록 작업
* 로그인 성공시 로그인 완료시 localStorage의 토근 값을 가져오고 react-router-dom의 useNavigate hook을 이용하여 '/todo' 페이지로 이동
* 해당 사용자가 없는 경우(response의 상태값이 404), 유저에게 에러메시지 표시
* 그 외 에러사항은 콘솔로 에러 표시
```js
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

const onSignIn = (e) => {
    e.preventDefault();
    auth(values, "signin")
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        alert("로그인 성공!");
      }
    })
    .catch((error) => {
      const errorRes = error.response.data;
      console.log(errorRes);
      if (errorRes.statusCode === 404) {
        alert(errorRes.message);
      }
    })
    .finally(() => {
      localStorage.getItem("access_token") && navigate("/todo");
    })
  };
return ( ... );
```
2. 회원가입
* 유효성 검사 과정, 버튼의 disabled 처리 방식은 로그인 페이지와 동일
* 회원가입 성공시(response의 상태값이 200), 회원가입 완료 안내 메시지 표시와 useNavigate를 이용하여 '/signin' 페이지로 이동
* 회원가입 실패시(response의 상태값이 400) 유저에게 에러메시지 표시
* 그 외 에러사항은 콘솔 표시
```js
const [values, setValues] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState({ email: false, password: false });
  const navigate = useNavigate();
  useEffect(() => {
    // 로그인 로직과 동일
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
  return ( ... );
```
3. 투두리스트
* 투두 리스트 컴포넌트, 투두 추가 컴포넌트으로 분리
* 최상위 컴포넌트에서 투두 리스트를 getTodo 기능, useEffect를 사용하여 초기 렌더링시 getTodo 되도록 작업
* 하위 컴포넌트에서 create, update, delete 기능의 과정이 성공적으로 끝나면 getTodo 하도록 작업
* 투두 수정시 수정모드의 여부를 상태값으로 저장
* 투두 리스트에서 체크박스 선택시 완료여부만 update 되도록 작업

**Todo.js**
```js
const [todoList, setTodoList] = useState([]);
  const getTodo = () => {
    getTodos()
    .then((res) => {
      setTodoList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getTodo();
  }, []);
return (
  <div>
    <AddTodo getTodo={getTodo} />
    <div>
      {!todoList.length ? (
        <p>할 일을 추가해보세요.</p>
      ) : (
        todoList.map((todo) => {
          return (
            <TodoList
              ...
              getTodo={getTodo}
            />
          );
        })
      )}
    </div>
  </div>
)
```
**AddTodo.js**
```js
  const [todoText, setTodoText] = useState("");
    const onAdd = (e) => {
      e.preventDefault();
      if (!todoText) {
        alert("내용을 입력해주세요.");
        return;
      }
      createTodo({ todo: todoText, isComplete: false })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            setTodoText("");
            getTodo();
          }
        })
        .catch((error) => console.log(error));
    };
    return ( ... );
```
**TodoList.js**
```js
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState({ id, todo, isCompleted });
  const onEdit = (e) => {
    const edited = e.target.value;
    setEditedValue({ id, todo: edited, isCompleted });
  };
  const onUpdateTodo = (e) => {
    e.preventDefault();
    updateTodo(editedValue)
      .then(() => {
        setEditMode(false);
        getTodo();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onUpdateCompleted = (e) => {
    const checked = e.target.checked;
    setEditedValue({ id, todo, isCompleted: checked });
    updateTodo({ id, todo, isCompleted: checked })
      .then(() => {
        getTodo();
      })
      .catch((error) => console.log(error));
  };
  const onDelete = () => {
    deleteTodo(id)
      .then(() => {
        getTodo();
        alert("삭제되었습니다.");
      })
      .catch((error) => console.log(error));
  };
  return ( ... );
```
4. 라우팅
* Navigation 처리를 위해 path와 라우팅 명칭을 Object 형식으로 분리
* 라우팅 전용 컴포넌트에서 useEffect를 이용하여 현재 위치(location)에 의존성을 부여하고 위치 변경시마다 토큰이 있는지 체크

**routerPaths.js**
```js
const RouterPaths = {
  home: { path: "/", name: "Home" },
  todo: { path: "/todo", name: "Todo" },
  signin: { path: "/signin", name: "Sign In" },
  signup: { path: "/signup", name: "Sign Up" },
};
```
**Routing.js**
```js
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      if (localStorage.getItem("access_token")) {
        alert("로그인 상태입니다.");
        navigate("/todo");
      }
    }
    if (location.pathname === "/todo") {
      if (!localStorage.getItem("access_token")) {
        alert("로그인 해주세요.");
        navigate("/signin");
      }
    }
  }, [location]);
  return (
    <Routes>
      <Route ... />
    </Routes>
  );
```
5. API
* common, auth, todo 세가지로 구분
* 모든 헤더에서 인증 토큰을 인지할 수 있도록 axios의 interceptors 사용

**clientApi.js** - common api
```js
const clientApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
```
