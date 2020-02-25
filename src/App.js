import React, { Component } from 'react';
import CardList from './components/cardList/CardList.js';
// import { robots } from './robots';
import SearchBox from './components/searchBox/SearchBox.js';
import Scroll from './Scroll.js';
import 'tachyons';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // robots: robots,
      robots: [],
      searchfield: ''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState({robots: users}))
  }

  onSearchChange = (event) => {
    // console.log('event.target.value', event.target.value)
    this.setState({ searchfield: event.target.value });
  };

	render() {
    const filteredRobots = this.state.robots.filter((robot)=>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    // console.log(filteredRobots);
    if (this.state.robots.length === 0){
      return <h2>Loading...</h2>;
    } else {
		return (
			<div className='tc'>
        <h1 className= 'title'>Robots Friends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
			</div>
      
		);
	}
}
}

export default App;