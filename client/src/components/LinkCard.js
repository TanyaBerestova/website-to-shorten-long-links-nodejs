import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h3 style={{paddingBottom: '1rem'}}>Информация по ссылке</h3>

      <p>Сокращенная ссылка: <a href={link.short_link} target="_blank" rel="noopener noreferrer">{link.short_link}</a></p>
      <p>Исходная ссылка: <a href={link.origin_link} target="_blank" rel="noopener noreferrer">{link.origin_link}</a></p>
      <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}
