import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps{
  date: Date      // estou pegando a data que vem do componente HabitDay. Necessário passar a variavel e o nome da Interface em "export function HabitsList({ date }: HabitsListProps) {"
  onCompletedChanged: ( completed: number) => void // void indica que a função não tem retorno
}

interface HabitsInfo { // estou pegando as informações que retorna o api.get('day'......, 
  possibleHabits: {
    id: string;
    title: string;
    created_at: string
  }[]
  completedHabits: string[]
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>() // aqui vai ser salva a informação dos hábitos

//   useEffect(() => {
//   console.log("Estou no HabitsList")
//   console.log(date)
//   api.get('day', {
//     params:{
//       date: date.toISOString()
//     }
//   }).then(response => console.log(response.data ))
// },[])
  
// consumo o API com a rota /day, retorna um objeto com duas propriedades (um array dos possibleHabits e um dos completedHabits), pego com 'interface HabitsInfo'
  useEffect(() => {
  api.get('day', {
    params:{
      date: date.toISOString()
    }
  }).then(response => {
    setHabitsInfo(response.data)
  })
},[])

async function handleToggleHabit(habitId : string) {
    await api.patch(`/habits/${habitId}/toggle`)
    
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId) // o ! diz para o Typescrypt vai existir nesse momento e não vai estar não definida

    let completedHabits: string[] = [] // Hábitos que foram completados nesse dia

    if(isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId] // os ...habitsInfo indicam que vai copiar todo o que já existe dentro de habitsInfo
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length)
}

const isDateInPast = dayjs(date)
  .endOf('day')
  .isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
          {habitsInfo?.possibleHabits.map(habit => {      // é feita uma listagem, o ? no habitsInfo é porque no começo ela vai estar indefinida
            return (
              <Checkbox.Root 
              key={habit.id}
              onCheckedChange={() => handleToggleHabit(habit.id)}
              checked={habitsInfo.completedHabits.includes(habit.id)}
              disabled={isDateInPast}
              className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
  
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                  {habit.title}
              </span>
            </Checkbox.Root>
            )
          })}
          
          





          {/* <Checkbox.Root className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Corrigir Bugs xD
            </span>
          </Checkbox.Root> */}
        </div>
  )
}