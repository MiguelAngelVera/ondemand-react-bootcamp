import React from 'react'

export default function CartSelector(data) {
  return (
    <select name="qty" defaultValue={data.qty} onChamge>
      {[...Array(data.data.stock + 1).keys()].slice(1).map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
}
