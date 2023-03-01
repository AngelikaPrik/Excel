import { storage } from '@core/utils'

function toHTML(key: string) {
  const hash = key.split(':')[1]
  const model = storage(key)
  const date = new Date(model.openingDate).toLocaleDateString()
  const time = new Date(model.openingDate).toLocaleTimeString()

  return `
	<li class="db__record">
		<a href="#excel/${hash}">${model.title}</a>
		<strong>${date} ${time}</strong>
 	</li>
	`
}

function getAllKeys() {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createTableRecords() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>Пока не создано ни одной таблицы</p>`
  }

  return `
	<div class="db__list-header">
		<span>Название таблицы</span>
		<span>Дата открытия</span>
	</div>
	<ul class="db__list">
	${keys.map(toHTML).join('')}
	</ul>
	`
}
