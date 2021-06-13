import {useEffect} from "react";
import {useSelector} from "react-redux";
import {get} from "./utils/http/fetching_utils";

const App = () => {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    get("/auth/is_authenticated")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-5 container-fluid fade-in">
      <h1>Bonjour&nbsp;{auth.user.firstname}!</h1>
      <div className="mt-5 ml-3">
        <h2>User Data</h2>
        <div className="kv_pair">
          <span>FIRSTNAME</span>
          <span>{auth.user.firstname}</span>
        </div>
        <div className="kv_pair">
          <span>LASTNAME</span>
          <span></span>
          {auth.user.lastname}
        </div>
        <div className="kv_pair">
          <span>EMAIL</span>
          <span></span>
          {auth.user.email}
        </div>
        <div className="kv_pair">
          <span>SEX</span>
          <span></span>
          {auth.user.sex}
        </div>
        <div className="kv_pair">
          <span>CREATED_AT</span>
          <span></span>
          {auth.user.created_at}
        </div>
      </div>
      <div className="mt-5 ml-3">
        <h2>Role Data</h2>
        <div className="kv_pair">
          <span>PRODUCT</span>
          <span>{auth.role.product}</span>
        </div>
        <div className="kv_pair">
          <span>NAME</span>
          <span></span>
          {auth.role.name}
        </div>
      </div>
      <div className="mt-5 ml-3">
        <h2>Preferences Data</h2>
        <div className="kv_pair">
          <span>LANGUAGE</span>
          <span>{auth.preferences.language}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
