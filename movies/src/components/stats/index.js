import React , { Component } from 'react'
import './stats.css'
import { SelectField, MenuItem } from 'material-ui';

class Stats extends Component{
    render(){
        return(
            <div className="statsBar">
                <SelectField
                 floatingLabelText=" t a g s"
                 floatingLabelStyle={{
                    color:"#962A38"          
                  }}
                  listStyle={{
                    background:"#962A38",          
                  }}
                >
                <MenuItem 
                      value={-1} 
                      primaryText="all" 
                      onClick={() =>this.props.updateShowingMovies("all")}
                      />
                    {
                    this.props.tags === undefined ? "" :
                    this.props.tags.map( (tag , index)  =>
                    {
                        return <MenuItem 
                                  key={index} 
                                  value={index} 
                                  primaryText={tag} 
                                  onClick={() =>this.props.updateShowingMovies(tag)}
                                  />
                      })
                    }
                </SelectField>

            </div>
        );
    }
}

export default Stats;