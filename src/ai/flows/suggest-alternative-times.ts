
'use server';

/**
 * @fileOverview A flow to suggest alternative time slots when the preferred time is unavailable.
 *
 * - suggestAlternativeTimes - A function that suggests alternative time slots.
 * - SuggestAlternativeTimesInput - The input type for the suggestAlternativeTimes function.
 * - SuggestAlternativeTimesOutput - The return type for the suggestAlternativeTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeTimesInputSchema = z.object({
  preferredDate: z.string().describe('Željeni datum za termin (GGGG-MM-DD).'),
  preferredTime: z.string().describe('Željeno vrijeme za termin (HH:mm).'),
  barberName: z.string().describe('Ime barbera.'),
  availableSlots: z
    .array(z.string())
    .describe(
      'Lista dostupnih termina (HH:mm) za odabranog barbera na dati dan.'
    ),
});
export type SuggestAlternativeTimesInput = z.infer<
  typeof SuggestAlternativeTimesInputSchema
>;

const SuggestAlternativeTimesOutputSchema = z.object({
  alternativeTimes: z
    .array(z.string())
    .describe('Niz predloženih alternativnih termina (HH:mm).'),
  reason: z.string().describe('Razlog zašto originalno vrijeme nije bilo dostupno.'),
});
export type SuggestAlternativeTimesOutput = z.infer<
  typeof SuggestAlternativeTimesOutputSchema
>;

export async function suggestAlternativeTimes(
  input: SuggestAlternativeTimesInput
): Promise<SuggestAlternativeTimesOutput> {
  return suggestAlternativeTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeTimesPrompt',
  input: {schema: SuggestAlternativeTimesInputSchema},
  output: {schema: SuggestAlternativeTimesOutputSchema},
  prompt: `Vi ste koristan asistent za sistem rezervacija u berbernici.
Kada željeno vrijeme korisnika nije dostupno, vaš zadatak je da predložite do 3 alternativna termina iz liste DOSTUPNIH termina.
Predloženi termini trebaju biti što bliži prvobitnom izboru korisnika.
Ukratko objasnite zašto originalno vrijeme nije bilo dostupno.

Željeni datum: {{{preferredDate}}}
Željeno vrijeme: {{{preferredTime}}}
Ime barbera: {{{barberName}}}

Lista dostupnih termina za danas:
{{#each availableSlots}}
- {{this}}
{{/each}}

Izaberite najbolje alternative ISKLJUČIVO iz gornje liste. Nemojte izmišljati termine.
Formatirajte alternativna vremena kao HH:mm.`,
});

const suggestAlternativeTimesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeTimesFlow',
    inputSchema: SuggestAlternativeTimesInputSchema,
    outputSchema: SuggestAlternativeTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
