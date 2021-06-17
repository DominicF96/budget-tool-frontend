import {useSelector} from "react-redux";

const App = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="mt-5 container-fluid fade-in">
      <h1>Bonjour&nbsp;{user.firstname}!</h1>
      <div className="mt-5 ml-3">
        <h2>User Data</h2>
        <div className="kv_pair">
          <span>FIRSTNAME</span>
          <span>{user.firstname}</span>
        </div>
        <div className="kv_pair">
          <span>LASTNAME</span>
          <span></span>
          {user.lastname}
        </div>
        <div className="kv_pair">
          <span>EMAIL</span>
          <span></span>
          {user.email}
        </div>
        <div className="kv_pair">
          <span>SEX</span>
          <span></span>
          {user.sex}
        </div>
        <div className="kv_pair">
          <span>CREATED_AT</span>
          <span></span>
          {user.created_at}
        </div>
      </div>
      <div className="mt-5 ml-3">
        <h2>Role Data</h2>
        <div className="kv_pair">
          <span>PRODUCT</span>
          <span>{user.role.product}</span>
        </div>
        <div className="kv_pair">
          <span>NAME</span>
          <span></span>
          {user.role.name}
        </div>
      </div>
      <div className="mt-5 ml-3">
        <h2>Preferences Data</h2>
        <div className="kv_pair">
          <span>LANGUAGE</span>
          <span>{user.preferences.language}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
