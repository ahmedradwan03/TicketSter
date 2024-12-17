interface ValidationError {
    success: boolean;
    error: { flatten: () => { fieldErrors: Record<string, string[]> } };
}

export const handelValidationErrors = (validation: ValidationError): string => {
    return Object.values(validation.error.flatten().fieldErrors).flat().join(', ');
};
