import { FormGroup, FormControl } from "@angular/forms";

// Validate Form
export default function validateForm(formGroup: FormGroup): void
{
  Object.keys(formGroup.controls).forEach((field: string) =>
  {
    const control = formGroup.get(field);

    if (control instanceof FormControl)
    {
      control.markAsTouched({ onlySelf: true });
    }
    else if (control instanceof FormGroup)
    {
      validateForm(control);
    }
  });
}