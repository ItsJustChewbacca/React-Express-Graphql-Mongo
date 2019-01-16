import { updateAddBookMutation } from './AddBook'

// Pull serialized mutations from localstorage
function getPending() {
  return JSON.parse(localStorage.getItem('addBook')) || []
}

// Store serialized mutations in localstorage
function setPending(mutations) {
  localStorage.setItem('addBook', JSON.stringify(mutations))
}

// Delegate incoming responses to the correct update function
function updateHandler(resp) {
  // IMPORTANT: You need one of these for every custom update function you use!
  if (resp.data.addBook) return updateAddBookMutation
  else return () => {}
}

// Return a dummy update function scoped to a request with a specific id
function proxyUpdateForId(id) {
  return (proxy, resp) => {
    updateHandler(resp)(proxy, resp)
    if (resp.data.__optimistic) return
    setPending(getPending().filter(mutation => mutation.id !== id))
  }
}

// The main component wrapper
Replace <Mutation> calls with this
 export const OfflineMutation = props => (
  <Mutation {...props}>
    {mutationFunction => (
      props.children(params => {
        const id = Math.random()
        const { mutation } = props
        params.optimisticResponse.__optimistic = true
        setPending(getPending().concat({ id, params, mutation }))
        params.update = proxyUpdateForId(id)
        return mutationFunction(params)
      })
    )}
  </Mutation>
)
// Restore pending requests
// This should be called after a page refresh
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

