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
  preferredDate: z.string().describe('The preferred date for the appointment (YYYY-MM-DD).'),
  preferredTime: z.string().describe('The preferred time for the appointment (HH:mm).'),
  barberName: z.string().describe('The name of the barber.'),
});
export type SuggestAlternativeTimesInput = z.infer<
  typeof SuggestAlternativeTimesInputSchema
>;

const SuggestAlternativeTimesOutputSchema = z.object({
  alternativeTimes: z
    .array(z.string())
    .describe('An array of suggested alternative time slots (HH:mm).'),
  reason: z.string().describe('The reason why the original time was unavailable.'),
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
  prompt: `You are a helpful assistant for a barber shop reservation system.
When the user's preferred time is unavailable, suggest up to 3 alternative time slots that are close to their initial choice.
Explain briefly why the original time was unavailable.

Preferred Date: {{{preferredDate}}}
Preferred Time: {{{preferredTime}}}
Barber Name: {{{barberName}}}

Ensure the alternative times are within the same day unless absolutely necessary.
Format the alternative times as HH:mm.`,
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
