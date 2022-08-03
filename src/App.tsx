import React, { useEffect, useState } from 'react'

function App() {
  const [multTableSize, setMultTableSize] = useState('')

  const drawTable = (tableSize: number) => {
    if (tableSize <= 0) return

    // функция для определения ширины текущего ряда
    const calculateWidth = (multiplier: number) => {
      return (multiplier * tableSize).toString().length
    }

    let table = '' // начальная таблица умножения в формате строки
    const buffer = ' ' // буфер-заполнение пустого пространства между чисел

    for (let i = 0; i < tableSize + 1; i++) {
      let tableRow = ''

      for (let j = 0; j < tableSize + 1; j++) {
        if (j === 0 && i === 0) {
          // пустая ячейка в оглавлении таблицы

          tableRow += '  '

        } else if (i === 0) { //оформление столбцов

          tableRow += buffer.repeat(calculateWidth(j) - j.toString().length + 1) + j
          
        } else if (j === 0) { //оформление колонок

          tableRow += buffer.repeat(calculateWidth(j) - i.toString().length + 1) + i + '|'
        } else { //оформление результата в таблице

          tableRow += buffer.repeat(calculateWidth(j) - (j * i).toString().length) + j * i + buffer
        }
      }

      if (i === 1) {
        // оформление горизонтального разделителя

        table += buffer.repeat(2) + '-'.repeat(tableRow.length - 3) + '\n'
      }
      table += tableRow + '\n'
    }

    console.log(table)
  }

  const tableHandler = (tableSize: string) => {
    if (Number(tableSize) > 53) {
      if (
        window.confirm(
          'Вы точно хотите такую большую таблицу? Форматирование может быть некрасивым',
        )
      ) {
        drawTable(Number(tableSize))
      }
    } else {
      drawTable(Number(tableSize))
    }
  }

  useEffect(() => {
    tableHandler(multTableSize)
  }, [multTableSize])

  return (
    <div className='App'>
      <label className='App__label'>
        Введите число, до которого необходимо отобразить таблицу умножения
      </label>
      <input
        type='number'
        value={multTableSize}
        onChange={(e) => {
          if (e.target.value === '') {
            setMultTableSize('')
          }
          setMultTableSize(e.target.value)
        }}
      />
    </div>
  )
}

export default App
