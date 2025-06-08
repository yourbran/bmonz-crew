export interface Routine {
  name: string
  cls: 'R' | 'S'
}

export interface WeightOption {
  value: number
}

export interface AngleOption {
  value: number
}

export interface Exercise {
    id: number
    name: string
    unit: 'Reps' | 'Sec'
    value: number
    sets: number
    rest: number
  }
  
  export interface User {
    id: number
    name: string
  }
  
  export interface ExerciseSummary {
    name: string
  }
  
  export interface ExerciseData {
    date: string
    value: number
  }