export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 300, suffix: '+', label: 'Tiket CS Ditangani per Hari (Peak)' },
  { value: 85, suffix: '%', label: 'First-Contact Resolution Rate' },
  { value: 5, suffix: '', label: 'Platform Job Listing Dioperasikan' },
]
