import React from "react";
import { useDispatch } from "react-redux";
//import { store } from "../../stores/store";

import { Button } from "react-bootstrap";

import { setForm } from "../../stores/ui/uiActions";
import { typeForm } from "../types/typeForm";

const NewProjectTemplate = () => {
	const dispatch = useDispatch();
	//const { ui } = store.getState();

	return (
		<>
			<h1>New Project Template</h1>
			<Button onClick={() => dispatch(setForm(typeForm.Nothing)) }>Close</Button>
		</>
	);
};

export default NewProjectTemplate;
