import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../api/authApi'
import './Login.css'
const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [usernameErrText, setUsernameErrText] = useState('')
  const [passwordErrText, setPasswordErrText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameErrText('')
    setPasswordErrText('')

    const data = new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()

    let err = false

    if (username === '') {
      err = true
      setUsernameErrText('Please fill this field')
    }
    if (password === '') {
      err = true
      setPasswordErrText('Please fill this field')
    }

    if (err) return

    setLoading(true)

    try {
      const res = await authApi.login({ username, password })
      setLoading(false)
      localStorage.setItem('token', res.token)
      navigate('/')
    } catch (err) {
      const errors = err.data.errors
      errors.forEach(e => {
        if (e.param === 'username') {
          setUsernameErrText(e.msg)
        }
        if (e.param === 'password') {
          setPasswordErrText(e.msg)
        }
      })
      setLoading(false)
    }
  }

  return (
    <>
      <div className="login_box">
        <div className='left'>
          <Box
            component='form'
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div class="name-page">
                      SIGN IN
            </div>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              disabled={loading}
              error={usernameErrText !== ''}
              helperText={usernameErrText}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
              disabled={loading}
              error={passwordErrText !== ''}
              helperText={passwordErrText}
            />
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              variant='outlined'
              fullWidth
              type='submit'
              loading={loading}
            >
              Login
            </LoadingButton>
          </Box>
          <Button
            component={Link}
            to='/signup'
            sx={{ textTransform: 'none' }}
          >
            Don't have an account? Signup
          </Button>
        </div>
        <div className='right'>
            <div class="right-text">
                   
            </div>
        </div>
      </div>
    </>
  )
}

export default Login