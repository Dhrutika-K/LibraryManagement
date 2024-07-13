import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./screens/Login";
import AdminLogin from "./screens/AdminLogin";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import SignInForm from "./components/Form/Register";
import AllBook from './screens/AllBook';
import IssueRequest from './screens/IssueRequest';
import Messages from './screens/Messages';
import UserIssuedBook from './screens/UserIssuedBook';
import AllIssuedBook from './screens/AllissuedBook';
import AddBook from './screens/AddBook';
import AllStudent from './screens/AllStudent';
import RecomdationBook from './screens/Recommdation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignInForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        {/* 
        <Route path="/dashboard/" element={<UserHome />} />
        <Route path="/dashboard/RecomBook" element={<Recom_Book />} />
        <Route path="/dashboard/issue_return" element={<IssueReturn />} />
        <Route path="/dashboard/returnBook" element={<ReturnBook />} />
        <Route path="/dashboard/addEmployee" element={<Addemployee />} /> */}
        <Route path="/stuReqIssue" element={<IssueRequest />} />
        <Route path="/notifications" element={<Messages />} />
        <Route path="/allBook" element={<AllBook />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stuIssuedBook" element={<UserIssuedBook />} />
        <Route path="/allissuedBook" element={<AllIssuedBook />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/manageStudent" element={<AllStudent />} />
        <Route path="/recommandation" element={<RecomdationBook />} />
      </Routes>
    </Router>
  );
}

export default App;
