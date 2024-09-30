import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwt_decode from "jwt-decode";
import * as actions from '../../store/actions'
import { connect } from "react-redux"
import { loginUserSuccess } from '../../services/UserService';

const LoginSuccess = (props) => {
    const {id, tokenLogin} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        callApi()
    }, [])

    const callApi = async () => {
        let res = await loginUserSuccess(id, tokenLogin)
        if(res && res.status === 'OK') {
            toast.success("Đăng nhập thành công!")
            localStorage.setItem("access_token", JSON.stringify(res?.access_token))
            localStorage.setItem("refresh_token", JSON.stringify(res?.refresh_token))
            if(res?.access_token) {
                const decoded = jwt_decode(res.access_token)
                if(decoded.id) {
                    await props.getDetailUser(decoded.id, res.access_token)
                }
            }

            if(props.detailUser.isAdmin) {
                navigate("/admin")
            }else {
                navigate("/")
            }
        }
    }
  return (
    <div>LoginSuccess</div>
  )
}


function mapStateToProps (state) {
    return  {
        detailUser: state.users
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getDetailUser: (id, token) => dispatch(actions.getDetailUser(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSuccess)
