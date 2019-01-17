import React from 'react';
import { Mutation } from 'react-apollo';
import { updateAddBookMutation } from '../components/AddBook';

function getPending() {
  return JSON.parse(localStorage.getItem('addBook')) || []
}

function setPending(mutations) {
  localStorage.setItem('addBook', JSON.stringify(mutations))
}

function updateHandler(resp) {
  if (resp.data.addBook) return updateAddBookMutation
  else return () => {}
}

function proxyUpdateForId(id) {
  return (proxy, resp) => {
    updateHandler(resp)(proxy, resp)
    if (resp.data.__optimistic) return
    setPending(getPending().filter(mutation => mutation.id !== id))
  }
}

export function restoreRequests(client) {
  getPending()
  .forEach(pendingMutation => {
    const { id, params, mutation } = pendingMutation
    params.optimisticResponse.__optimistic = true
    params.update = proxyUpdateForId(id)
    params.mutation = mutation
    client.mutate(params)
  })
}

export const OfflineMutation = props => (
  <Mutation {...props}>
    {(mutationFunction, result) => {
      return props.children(params => {
        const id = Math.random();
        const { mutation } = props;
        params.optimisticResponse.__optimistic = true;
        setPending(getPending().concat({ id, params, mutation }));
        params.update = proxyUpdateForId(id);
        return mutationFunction(params);
      });
    }}
  </Mutation>
)