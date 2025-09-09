import Header from "../../components/Header/header";
import logo from "../../assets/logo.png";
import "./App.css";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import ItemList from "../../components/ItemList/item";
import { useState } from "react";
import "./responsivo.css"


function App() {
  const [user,setUser]= useState('');
  const [currentUser,setCurrentUser]= useState(" ");
  const [userData, setUserData] = useState(null)

  const searchUser = async ()=>{
    await fetch(`https://api.github.com/users/${user}`)
    .then((user)=> user.json())
    .then((itemJson) => {
        const {name, avatar_url, bio,login} =itemJson
        setCurrentUser({name, avatar_url, bio, login})
      }
    )
    await fetch(`https://api.github.com/users/${user}/repos`)
    .then(newRepos => newRepos.json() )
    .then(
      (repos)=>{
        setUserData(repos)
      }
    )
  }

  const firstUser = (e)=>setUser(e.target.value)



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

            {userData!= null? userData.map(rep => 
              <ItemList title ={rep.name} description ={rep.description} key={rep.id}/>
            ): ""}  
            
            
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
