import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			describe('404 error', () => {
				it('should show a 404 error, with prepared message if page does not exist', done => {
				  request(app)
					.get('/quotes')
					.end((err, res) => {
					  expect(res.status).to.eql(404);
					  expect(res.body.message).to.eql(`Can't find /quotes on this server`);
					  done(err);
					});
				});
			  });
			  
		}, []);

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;


