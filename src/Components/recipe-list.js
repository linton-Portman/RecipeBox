import React, { Component } from 'react';


class RecipeList extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      name: '',
      ingredients : [],
      key : ''
    }

    // function bindings of this..
    this.handleEdit = this.handleEdit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.addEditToStorage = this.addEditToStorage.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

handleEdit(event){
  let item = event.target.id; // get name of item clicked 
  this.setState({key: item}); // set state so we can use this value later
  let value = window.localStorage.getItem(item); // get details of recipe using the key(name of item)
  value = JSON.parse(value).join(); // turn array into strings 
  document.querySelector('input').value = item; // set input box value 
  document.querySelector('textarea').value = value; // set textarea value
}

addEditToStorage(){
  //add state to local Storage if not blank
  if(this.state.name !== '' && this.state.ingredients !==''){
      this.props.saveEditedRecipe(this.state.name, this.state.ingredients, this.state.key); // send data back up to main component
  }


}

// 2 way data binding
handleOnChange(){
    this.setState({
      name : document.querySelector('input').value,
      ingredients : document.querySelector('textarea').value
    });
    
}

deleteRecipe(event){
  localStorage.removeItem(event.target.id); // remove item from local storage
 this.setState({});// trigger re-render
}

  render() {
    
    return (
      <div className="jumbotron">

         <div id="accordion" role="tablist" aria-multiselectable="true">
              {Object.keys(this.props.recipes).map((key, index)=>{

                var value = JSON.parse(this.props.recipes[key]);
                  
         

                    return(
                <div className="card" key={key}>
                  <div className="card-header" role="tab" >
                    <h3 className="mb-0">
                      <a data-toggle="collapse" data-parent="#accordion" href={'#toggle'+index} aria-expanded="true" aria-controls="collapseOne">
                        {key}
                      </a>
                    </h3>
                  </div>

                  <div id={'toggle'+index} className="collapse " role="tabpanel" aria-labelledby="headingOne">
                    
                    <div className="card-block ">
                      <p className="list-title" >Ingredients</p>
                       <ul className="list-group ">
                                {value.map(function(item){
                                  return (
                                           <li className="list-group-item" key={item}>{item}</li>
                                          )
                                })}
                      </ul>
                    </div>
                    <div className="card-footer">
                            <span><a id={key} className="btn btn-warning space" data-toggle="modal" href="#myModal" onClick={this.handleEdit}>Edit</a><a id={key} className="btn btn-danger space" onClick={this.deleteRecipe}>Delete</a></span>
                        </div>
                  </div>
                </div>
                    )

                    })}
          </div>
                      {/*Modal*/}
            <div id="myModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-title">
                            <h3>Edit Recipe</h3>
                        </div>
                        
                        <div className="modal-body">
                            <div>
                                <h4 >Name</h4>
                                <input type="text" onChange={this.handleOnChange}></input> 
                            </div>
                              <div>
                                <h4>Ingredients</h4>
                                <textarea onChange={this.handleOnChange}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <span><a className="btn btn-warning space" data-toggle="modal" href="#myModal" onClick={this.addEditToStorage}>Save</a><a className="btn btn-danger space" data-toggle="modal" href="#myModal">Cancel</a></span>
                        </div>
                    
                    </div>
                </div>
            </div>
         

      </div>


      
    );
  }
}

export default RecipeList;