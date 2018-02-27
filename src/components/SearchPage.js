import React from "react";
import Header from "./Header.js";
import { connect } from "react-redux";
import { startLogin } from '../actions/auth.js';
import { startAddLastSearch, startSetLastSearch } from "../actions/search.js";


class SearchPage extends React.Component {
	state = {
		city: "",
		bars: [],
		lastSearch: this.props.search ? this.props.search : ""
	};
	onTextChange = (e) => {
		const input = e.target.value;
		this.setState(() => ({ city: input }));
	};
	onGoingChange = (e, props) => {
		if (this.props.auth.uid) {

			const arr = this.state.bars[props.index];
			console.log("current bar ", arr);
			console.log(this.props.auth.uid);

			if (arr.going.includes(this.props.auth.uid)) {
				const index = arr.going.findIndex((x) =>  x == this.props.auth.uid);

				arr.going.splice(index, 1);
			} else {
				arr.going.push(this.props.auth.uid);
			}

			this.setState(() => ({ arr }));
			console.log("new arr ", arr);

		} else {
			this.props.startLogin();
			this.props.history.push("/");
		}
	};
	search = (e) => {
		e.preventDefault();

		if (this.state.city != "") {

			const city = this.state.city.split(' ').join('');

			const url = "https://yelp-api-microservice.glitch.me/api/" + city;
			console.log("requested url", url);

			fetch(url)
				.then((resp) => resp.json())
				.then((data) => {
					const dataArr = data.businesses;

					dataArr.forEach((bar) => {
						bar["going"] = [];
						bar["index"] = dataArr.indexOf(bar);
					});

					console.log(dataArr);
					this.setState((prevState) => ({bars: [...prevState, ...dataArr] }));
					this.props.startAddLastSearch(city);
					
				});
		}
	};
	componentDidMount = () => {
			console.log("mounted");
			console.log(this.props.search);

			if (this.state.lastSearch != "" && this.props.auth.uid) {
				const city = this.state.lastSearch

				const url = "https://yelp-api-microservice.glitch.me/api/" + city;
				console.log("requested url", url);

				fetch(url)
					.then((resp) => resp.json())
					.then((data) => {
						let dataArr = data.businesses;

						dataArr.forEach((bar) => {
							bar["going"] = [];
							bar["index"] = dataArr.indexOf(bar);
						});

						console.log(dataArr);

						this.setState(() => ({ bars: dataArr}));
					});
			}
	};
	render() {
		return (
			<div>
				<Header lastSearch={this.state.location} />
				<div className="container-fluid">
					<h1>Night Life Bar Finder</h1>
					<form onSubmit={this.search}>
						<input type="text" value={this.state.city} onChange={this.onTextChange} placeholder="Enter your City"/>
						<input type="submit" placeholder="Search"/>
					</form>
				</div>
				<hr />
				<div className="container-fluid">
					{
						this.state.bars.length == 0 ? "" : 
							this.state.bars.map(({index, id, name, rating, review_count, price, display_phone, location, image_url, url, going}) => {
								return (
									<div key={index} className="row">
										<div className="col-md-3">
											<img className="img-fluid img-thumbnail" src={image_url} height="200" width="200"/>
										</div>
										<div className="col-md-9">
											<h3>{name}</h3>
											<p>Price: {price}  |<span> Rating: {rating} Stars |</span> <span> Reviews: {review_count}</span></p>
											
											<p>Phone: {display_phone}</p>
											<p>Location: {location.display_address.join(" ")}</p>
											<a href={url}>Visit Yelp Link</a>
											<button value={going} index={index} onClick={( (e) => this.onGoingChange(e, {index} )) }><p>{going.length}</p></button>						

											
										</div>

									</div>);
							})
					}
				</div>
			</div>
		);

	}
};

const mapStateToProps = (state, props) => ({
  auth: state.auth,
  search: state.search
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startAddLastSearch: (search) => dispatch(startAddLastSearch(search)),
  startSetLastSearch: () => dispatch(startSetLastSearch())
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);