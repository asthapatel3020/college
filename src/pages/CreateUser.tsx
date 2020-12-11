/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'

const CreateUser = () => {
  const [message, setMassage] = useState({ msg: '', color: '' })

  const userData = [
    // {
    //   email: 'astha.patel@intesols.com.au', //User email which we are using for registration
    //   fname: 'Astha',
    //   lname: 'Patel', //User Name which we are using for display
    //   password: 'passworD@123', //User Password (Require numbers, Require special character, Require uppercase letters, Require lowercase letters)
    //   usegranttype: 'allaccess', //Acceess you want to assign to user
    //   phonenumber: '+919624077112',
    //   role: 'Owner|Admin',
    //   campus: '101|102',
    //   organizationid: ''
    // },
    {
      email: 'asthap32@gmail.com', //User email which we are using for registration
      fname: 'Amit',
      lname: 'Jain', //User Name which we are using for display
      password: 'passworD@123', //User Password (Require numbers, Require special character, Require uppercase letters, Require lowercase letters)
      usegranttype: 'limitedaccess', //Acceess you want to assign to user
      phonenumber: '+919624077111',
      role: 'Trainer',
      campus: '100',
      organizationid: ''
    }
  ]

  const HandleClick = () => {
    // eslint-disable-next-line array-callback-return
    userData.map((item) => {
      Auth.signUp({
        username: item.email,
        password: item.password,
        attributes: {
          'custom:campusId': item.campus,
          'custom:organizationId': item.organizationid,
          'custom:role': item.role,
          'custom:firstName': item.fname,
          'custom:lastName': item.lname,
          phone_number: item.phonenumber,
          'custom:resetPasswordFlag': 'true'
        }
      })
        .then((data) => {
          console.log('signin', data)
          setMassage({ msg: 'User Created Successfully', color: 'green' })
        })
        .catch((err) => {
          console.log('signin', err)
          setMassage({ msg: err.message, color: 'red' })
        })
    })
  }

  return (
    <>
      <div>
        <button onClick={HandleClick} className="createUser">
          Create User
        </button>
        <div>
          <span style={{ color: `${message.color}` }}>{message.msg}</span>
        </div>
      </div>
    </>
  )
}

export default CreateUser
