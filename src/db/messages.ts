// src/db/messages.ts
import { supabase } from './supabaseClient'

export async function submitMessage(input: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      name: input.name,
      email: input.email,
      subject: input.subject ?? null,
      message: input.message,
    })
    .select('id,status,created_at')
    .single()

  if (error) throw error
  return data
}