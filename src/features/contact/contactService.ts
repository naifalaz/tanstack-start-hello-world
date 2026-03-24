// src/features/contact/contactService.ts
import { supabase } from "../../lib/supabaseClient";

export type ContactFormState = {
	name: string;
	email: string;
	message: string;
};

export async function submitContactMessage(data: ContactFormState) {
	const { data: inserted, error } = await supabase
		.from("messages")
		.insert({
			name: data.name,
			email: data.email,
			message: data.message,
		})
		.select("id, name, email, message, status, created_at")
		.single();

	if (error) {
		throw new Error(`Failed to submit message: ${error.message}`);
	}

	return inserted;
}