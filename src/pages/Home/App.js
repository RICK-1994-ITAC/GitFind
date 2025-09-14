import Header from "../../components/Header/header";
import logo from "../../assets/logo.png";
import "./App.css";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import ItemList from "../../components/ItemList/item";
import { useState } from "react";
import "./responsivo.css"
import { api } from "../../services/api";


function App() {
  const [user,setUser]= useState('');
  const [currentUser,setCurrentUser]= useState(" ");
  const [userData, setUserData] = useState(null);

  const searchUser = async ()=>{
    await api.get(`${user}`)
    .then((itemJson) => {
        const {name, avatar_url, bio,login} =itemJson.data
        setCurrentUser({name, avatar_url, bio, login})
      }
    )
    await api.get(`${user}/repos`)
    .then(
      (repos)=>{
        setUserData(repos.data)        
      }
    )
  }

  const firstUser = (e)=>setUser(e.target.value)

  const removeItemList = (e)=>{
    const idButton = e.target.closest(".itemListDiv").dataset.id
    const idNumberButton = Number(idButton)

   setUserData(item=>item.filter(item=> item.id !== idNumberButton));
   console.log(idNumberButton);
   
   
  }

  return (
    <div className="App">
      <Header />

      <div className="content">
        <img src= {logo}alt="logoGit" className="logo"/>

        <div className="content-right">

          <div className="header-input">
            <Input onchangeProp= {firstUser}/>
            
            <Button onclickProp = {searchUser}/>
          </div>

          <div className="infos-content">
            <img src={currentUser.avatar_url} alt="imgperfil"/>

            <div className="info-perfil">

              <div>
                <h3>{currentUser===" "? "Usuário" :currentUser.name}</h3>
                <span>{`@${currentUser.login===undefined?"link-name": currentUser.login}`}</span>
              </div>
              
              <p>{currentUser.bio === undefined?'Bio':currentUser.bio}</p>
            </div>
          </div>

          <hr></hr>

          <div className="repositories">

            <h4>Repositórios</h4>

            {userData === null ? "": userData.map(rep =>
              <div key={rep.id} data-id={rep.id}className="itemListDiv">
                <ItemList title ={rep.name} description ={rep.description} linkRep={rep} onclickProp = {removeItemList} />
                <button onClick={removeItemList} className="buttonRemove">X</button>
                {console.log(userData)}
                <hr/>
              </div>)}  
            
            
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
