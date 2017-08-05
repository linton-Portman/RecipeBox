import React, { Component } from 'react';
import Header from './Components/header';
import RecipeList from './Components/recipe-list';

import './Styles/css/main.css';

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      serverData : {}
    }
    // function data binding(this).
    this.dataBindName= this.dataBindName.bind(this);
    this.dataBindIngredients = this.dataBindIngredients.bind(this);
    this.addRecipe= this.addRecipe.bind(this);
    this.resetValues = this.resetValues.bind(this);
    this.saveEditedRecipe = this.saveEditedRecipe.bind(this);
    
  }
// on render get localStorage data, so page can render with data..
componentWillMount(){
  this.setState({
    serverData: window.localStorage
  });
 
}


// 2 way data bind 
dataBindName(){
  let name = document.querySelector('#input').value;
  return name;
}
// 2 way data bind
dataBindIngredients(){
  let ingredients = document.querySelector('#textarea').value;
  return ingredients;
}

addRecipe(){
  let name = this.dataBindName(); //get name input value.
  let ingredients = this.dataBindIngredients(); // get ingredients input value
  // only add recipe if input is not blank
  if(name !== '' && ingredients !== ''){
    ingredients = ingredients.split(',');// create array of ingredients
      
      window.localStorage.setItem(name, JSON.stringify(ingredients));// add recipe to local storage **must be strings**
      // update state 
        this.setState({
        serverData: window.localStorage
      });
    
  }  
    this.resetValues();// make inputs blank for next recipe add
}

resetValues(){
  document.querySelector('#input').value ='';
  document.querySelector('#textarea').value = '';
}

// method passed as a prop
saveEditedRecipe(name, ingredients, key){
      localStorage.removeItem(key); // remove item from local storage using the key 
      let newIngredients = ingredients.split(','); // create an array of new ingredients 
      localStorage.setItem(name, JSON.stringify(newIngredients) ); // add edited recipe to local storage
      this.setState({}); // trigger re-render
}



  render() {



    return (
      <div >
        <Header/>
        <RecipeList recipes={this.state.serverData} saveEditedRecipe = {this.saveEditedRecipe} />
        
         <div className="header-div">
          <a className="btn btn-danger addRecipeButton" href="#addModal" data-toggle="modal"  >Add recipe</a>

                    {/*Modal*/}
            <div id="addModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-title">
                            <h3>Add Recipe</h3>
                        </div>
                        
                        <div className="modal-body">
                            <div>
                                <h4>Name</h4>
                                <input id="input" type="text" onChange={this.dataBindName} placeholder="Recipe Name"></input>
                            </div>
                              <div>
                                <h4>Ingredients</h4>
                                <textarea id="textarea" onChange={this.dataBindIngredients} placeholder="Seperate ingredients with a comma ',' "></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <span><a className="btn btn-warning space" data-toggle="modal" href="#addModal" onClick={this.addRecipe}>Save</a><a className="btn btn-danger space" data-toggle="modal" href="#addModal" onClick={this.resetValues}>Cancel</a></span>
                        </div>
                    
                    </div>
                </div>
            </div>




      </div>

      </div>
    );
  }
}

export default App;
