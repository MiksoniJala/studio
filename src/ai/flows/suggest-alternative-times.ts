
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
Kada željeno vrijeme korisnika nije dostupno, predložite do 3 alternativna termina koja su blizu njihovog prvobitnog izbora.
Ukratko objasnite zašto originalno vrijeme nije bilo dostupno.

Željeni datum: {{{preferredDate}}}
Željeno vrijeme: {{{preferredTime}}}
Ime barbera: {{{barberName}}}

Osigurajte da su alternativni termini istog dana, osim ako je apsolutno neophodno.
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
