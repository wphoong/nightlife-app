import React from "react";
import Header from "./Header.js";

class SearchPage extends React.Component {
	state = {
		city: "",
		bars: []
	};
	onTextChange = (e) => {
		const input = e.target.value;
		this.setState(() => ({ city: input }));
	};
	onGoingChange = (e, props) => {
		const arr = this.state.bars[props.index];
		arr.going+=1;
		this.setState({arr});
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
						bar["going"] = 0;
						bar["index"] = dataArr.indexOf(bar);
					});

					console.log(dataArr);
					this.setState((prevState) => ({bars: [...prevState, ...dataArr] }));
					
				});
		}
	};
	render() {
		return (
			<div>
				<Header />
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
											<button value={going} index={index} onClick={( (e) => this.onGoingChange(e, {index} )) }><p>{going}</p></button>						
											<a href={url}>Visit Yelp Link</a>
											
										</div>

									</div>);
							})
					}
				</div>
			</div>
		);

	}
};

export default SearchPage;