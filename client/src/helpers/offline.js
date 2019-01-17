import { updateAddBookMutation } from '../components/AddBook';

function getPending() {
  return JSON.parse(localStorage.getItem('offlineMutations')) || []
}

function setPending(mutations) {
  localStorage.setItem('offlineMutations', JSON.stringify(mutations))
}

export function addOfflineMutation(mutation) {
  setPending(getPending().concat(mutation));
}

function updateHandler(resp) {
  if (resp.data.addBook) return updateAddBookMutation
  else return () => {}
}

export function proxyUpdateForId(id) {
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
