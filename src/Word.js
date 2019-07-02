import React, { Component } from 'react';
import LoadingIndicator from './LoadingIndicator';
import axios from 'axios';
import './Word.css';

const baseUrl = 'https://googledictionaryapi.eu-gb.mybluemix.net/';

class Word extends Component {
	constructor(props) {
		super(props);
		this.state = {
			highlighted: false,
			defined: false,
			meaning: null
		};

		this.showDefinition = this.showDefinition.bind(this);
		this.hideDefinition = this.hideDefinition.bind(this);
	}


	async showDefinition() {
		if (this.props.allowClick) {

			this.props.setAllowClick(false);
			this.setState({ highlighted: true });
			
			try {
				var res = await this.getDefinition(this.props.word);
				if (res.status !== 200 || !res.data) throw new Error();
				var meaning = this.findDefinition(res.data);
	
				this.setState({ 
					defined: true,
					meaning: meaning
				});
			}
			catch (error) {
				this.setState({ 
					defined: true,
					meaning: 'There was a problem looking up the definition.  Please try again later.'
				});
			}

		}
	}

	async getDefinition(word) {
		var res = await axios.get(baseUrl + `?define=${word}&lang=en`);
		return res;
	}

	//TODO: Return multiple definitions
	findDefinition(response) {
		var meaning;
		if (response.length > 0 && response[0].meaning) {
			meaning = response[0].meaning;
			if (meaning.noun && meaning.noun.length > 0) {
				return meaning.noun[0].definition;
			}
			if (meaning.verb && meaning.verb.length > 0) {
				return meaning.verb[0].definition;
			}
			if (meaning.adjective && meaning.adjective.length > 0) {
				return meaning.adjective[0].definition;
			}
		}

		return 'No definition was found.  Please try another word.';
	}

	hideDefinition() {
		this.setState({ 
			highlighted: false,
			defined: false
		});
		this.props.setAllowClick(true);
	}

	//TODO: Use Popper.js library for improved/dynamic positioning of the popover
	render() {
		var { word } = this.props;
		var { highlighted, defined, meaning } = this.state;
		return (
			<div
				onClick={this.showDefinition}
				className={highlighted ? 'word word-highlighed' : 'word'}>
				{ word }
				{ highlighted &&
					<div className="popover">
						<div className="popover-header">
							<div className="popover-header-title">Definition:</div>
							<div onClick={this.hideDefinition} className="popover-header-close">
								Close
							</div>
						</div>
						{ defined && meaning ?
							<div>{ meaning }</div> :
							<LoadingIndicator/>
						}
					</div>
				}
			</div>
		)
	}
}

export default Word;