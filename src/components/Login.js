import { useHistory } from "react-router-dom"
import { useUser } from "../context/UserContextProvider"
import { useIsMounted } from "../hooks/useIsMounted"

const Login = () => {
  const history = useHistory()
  const { error, loading, userDispatch } = useUser()
  const isMounted = useIsMounted()
  const handleFormSubmit = e => {
    e.preventDefault()
    const login = e.target.elements.login.value
    const password = e.target.elements.password.value
    userDispatch({
      type: "LOGIN_INIT",
    })
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur, ${response.statusText}`)
        }
        return response.json()
      })
      .then(result => {
        if (isMounted) {
          userDispatch({
            type: "LOGIN_SUCCESS",
            payload: result,
          })
          // si ok nous allons rediriger l'utilisateur vers "todos"
          history.replace("/todos")
        }
      })
      .catch(e => {
        if (isMounted) {
          userDispatch({
            type: "LOGIN_FAILURE",
            payload: e.message,
          })
        }
      })
  }
  return (
    <section>
      <h2 className="text-center">Log in</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <form className="row g-3 mt-3" onSubmit={handleFormSubmit}>
          <div className="col-auto">
            <label htmlFor="login" className="visually-hidden">
              Login
            </label>
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="login"
              required
            />
          </div>
          <div className="col-auto">
            <label htmlFor="password" className="visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Log in
            </button>
          </div>
        </form>
      )}
      {error && <p className="alert alert-danger">{error}</p>}
    </section>
  )
}

export default Login