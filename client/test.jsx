import React from 'react'

export class Test extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <button onClick={()=>this.props.testFunc("asd")}></button>
    }
    
}