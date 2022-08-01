import React, { useEffect, useState } from 'react'

function App() {
  const [multTableSize, setMultTableSize] = useState('')

  const drawTable = (tableSize: number) => {
    if (tableSize <= 0) return

    // функция для определения ширины текущего ряда
    const calculateRowWidth = (multiplier: number) => {
      return (multiplier * tableSize).toString().length
    }

    let table = '' // начальная таблица умножения в формате строки
    const buffer = ' ' // буфер-заполнение пустого пространства между чисел

    for (let i = 0; i < tableSize + 1; i++) {
      let tableRow = ''

      for (let j = 0; j < tableSize + 1; j++) {
        if (j === 0 && i === 0) {
          // пустая ячейка в оглавлении таблицы

          tableRow += '   '
        } else if (i === 0 && j > 0 && j < 10) {
          // номера столбцов
          tableRow += buffer.repeat(calculateRowWidth(j)) + j
        } else if (i === 0 && j >= 10) {
          // номера столбцов больше 10
          tableRow += buffer.repeat(calculateRowWidth(j) - 1) + j
        } else if (j === 0 && i >= 100) {
          // номера строк больше 100
          tableRow += buffer.repeat(calculateRowWidth(j) - 1) + i + '|'
        } else if (j === 0 && i >= 10) {
          // номера строк больше/равных 10
          tableRow += buffer.repeat(calculateRowWidth(j)) + i + '|'
        } else if (j === 0) {
          // номера остальных строк
          tableRow += buffer.repeat(calculateRowWidth(j) + 1) + i + '|'
        } else if (calculateRowWidth(j) === 1 && calculateRowWidth(tableSize + 1) === 1) {
          //если ряд содержит только однозначные числа
          tableRow += j * i + ' '
        } else if (calculateRowWidth(j) === 1) {
          // оформление однозначных чисел

          tableRow += buffer.repeat(calculateRowWidth(j) - 1) + j * i + ' '
        } else if (calculateRowWidth(j) === 2) {
          // оформление двухзначных чисел

          if (j * i <= 9) {
            tableRow += buffer.repeat(calculateRowWidth(j) - 1) + j * i + ' '
          } else {
            tableRow += j * i + ' '
          }
        } else if (calculateRowWidth(j) === 3) {
          // оформление трехзначных чисел

          if (j * i <= 9) {
            tableRow += buffer.repeat(calculateRowWidth(j) - 1) + j * i + ' '
          } else if (j * i > 9 && j * i <= 99) {
            tableRow += buffer + j * i + ' '
          } else {
            tableRow += j * i + ' '
          }
        } else if (calculateRowWidth(j) === 4) {
          // оформление четырехзначных чисел

          if (j * i <= 9) {
            tableRow += buffer.repeat(calculateRowWidth(j) - 1) + j * i + ' '
          } else if (j * i > 99 && j * i <= 999) {
            tableRow += buffer + j * i + ' '
          } else if (j * i > 9 && j * i <= 99) {
            tableRow += buffer.repeat(calculateRowWidth(j) - 2) + j * i + ' '
          } else {
            tableRow += j * i + ' '
          }
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

  const tableHandler = (tableSize: string) =>{
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