import axios from 'axios'

/** Cliente HTTP compartilhado (timeout; sem baseURL fixa para permitir múltiplos hosts se necessário). */
export const http = axios.create({
  timeout: 15000,
})
