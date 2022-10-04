import React from "react";

const Back = () => {
	const style = {
		tpdm: {
			color: "#c82333",
			fontSize: '6em',
			paddingRight: '60px',
			paddingTop: '150px',
			fontWeight: 'bold',
		},
	};
//d-flex justify-content-right
	return (
		<div className="d-flex justify-content-end">
			<span style={style.tpdm}>Incremental</span>
		</div>
	)
}

export default Back;