import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import { AuthClassDemo, Form } from "./component/Demo/ClassDemo";
import {FuncDemo, AuthFuncDemo } from "./component/Demo/FuncDemo";
import { isAuthenticate } from "./utils/url_AuthCheck";

const div = document.getElementById("mainBody");
const root = ReactDOM.createRoot(div);
root.render(<App />);
