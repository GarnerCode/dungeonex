import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://jqzchcmztltibbhbvlhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemNoY216dGx0aWJiaGJ2bGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MTQ2MzcsImV4cCI6MTk5ODE5MDYzN30.IraKiPfH-mT1f_H_gg2we_ymD4GN4D05g7LxrxKOF0U')