const Header = (props) => {
	console.log(props);
	return (
		//return component to be rendered
		<header>
			<h1>{props.title}</h1>
			<span className="stats">Players: {props.totalPlayers}</span>
		</header>
	);
};

const Player = (props) => {
	return (
		<div className="player">
			<span className="player-name">{props.name}</span>
			<button onClick={() => props.removePlayer(props.id)}>✖</button>
			{/* composition */}
			<Counter />
		</div>
	);
};
// class allows you to initialize state
class Counter extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		score: 0,
	// 	};
	// }
	state = {
		score: 0,
	};

	incrementScore() {
		// this.setState({
		// 	// state is never modified directly thus setState()
		// 	//sometimes updates to the DOM don't happen immediately.
		// 	score: this.state.score + 1,
		// });
		this.setState((prevState) => {
			return {
				score: prevState.score + 1,
			};
		});
	}
	decrementScore = () => {
		// arrow functions are ✨✨
		// this.setState({
		// 	score: this.state.score - 1,
		// });
		this.setState((prevState) => ({ score: prevState.score + 1 }));
	};

	// render() is required in class componenets
	render() {
		return (
			// this.functionName.bind(this) vs () => this.functionName()
			// this has to be binded. use arrow functions.
			// arrow functions use lexical this binding.
			<div className="counter">
				<button
					className="counter-action decrement"
					onClick={this.decrementScore}
				>
					-
				</button>
				<span className="counter-score">{this.state.score}</span>
				<button
					className="counter-action increment"
					onClick={() => this.incrementScore()}
					// if the function is an arrow function, then you can just do onClick={this.incrementScore} no parenthesis
				>
					+
				</button>
			</div>
		);
	}
}

class App extends React.Component {
	state = {
		players: [
			{
				name: "Gare",
				id: 1,
			},
			{
				name: "Michael",
				id: 2,
			},
			{
				name: "Stephanie",
				id: 3,
			},
			{
				name: "Soren",
				id: 4,
			},
		],
	};

	handleRemovePlayer = (id) => {
		this.setState((prevState) => {
			return {
				players: prevState.players.filter((p) => p.id !== id),
			};
		});
	};

	render() {
		return (
			<div className="scoreboard">
				<Header title="Scoreboard" totalPlayers={this.state.players.length} />

				{/* Player List */}
				{this.state.players.map((player) => {
					return (
						<Player
							name={player.name}
							key={player.id.toString()}
							id={player.id}
							removePlayer={this.handleRemovePlayer}
						/>
					);
				})}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
