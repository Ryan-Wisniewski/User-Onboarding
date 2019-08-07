import React from 'react'
import axios from 'axios';
import { Form, Field, withFormik, Formik } from 'formik'
import * as Yup from 'yup'

const Forms = ({errors, touched, value}) => {

    return(
        <div className='#'>
            <Form>

                <Field type="text" name="name" placeholder='Name Here' className='field' />
                {touched.name && errors.name && <p className='error'>{errors.name}</p>}

                <Field type="email" name="email" placeholder='Email Here' className='field' />
                {touched.email && errors.email && <p className='error'>{errors.email}</p>}

                <Field type="password" name="password" placeholder='Password Here' className='field' />
                {touched.password && errors.password && <p className='error'>{errors.password}</p>}

                <label className='checkbox-container'>
                    Terms of Service
                    <Field type='checkbox' name='term' className='field' />
                    <span className='checkmark' />
                </label>

                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

const FormikForm = withFormik({
    //because its deconstructed you dont need value.name for each.
    mapPropsToValues({ name, email, password, term }){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            term: term || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),

    handleSubmit(value){
        axios.post('https://reqres.in/api/users', value)
            .then(res => console.log('result', res))
            .catch(err => console.log(err.response))
    }
})(Forms)

export default FormikForm