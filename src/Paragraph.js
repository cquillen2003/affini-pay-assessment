import React, { Component } from 'react';
import Word from './Word';

class Paragraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowClick: true
		};
		this.lines = props.text.split('\n').filter(line => line.trim().length > 0).map(line => line.trim().split(' '));

		this.setAllowClick = this.setAllowClick.bind(this);
	}

	setAllowClick(isAllowed) {
		this.setState({ allowClick: isAllowed })
	}

	render() {
		return (
			<div style={{ marginBottom: '1.2rem' }}>
				{ this.lines.map((line, i) => (
					<div key={i}>
						{ line.map((word, j) => (
							<Word 
								key={j}
								word={word} 
								allowClick={this.state.allowClick}
								setAllowClick={this.setAllowClick}
							/>
						)) }
					</div>
				)) }
			</div>
		)
	}
}

export default Paragraph;