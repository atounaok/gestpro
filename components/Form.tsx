import React, { useState } from 'react'

const Form = (username: string) => {
  return (
    <form>
        <label htmlFor="nom">Nom</label>
        <input type="text" id='nom' name='nom' value={username}/>
    </form>
  )
}

export default Form