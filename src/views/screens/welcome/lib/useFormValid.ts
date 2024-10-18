import { useMemo, useState } from 'react';

/* 
    A simple hook to keep track of form validity.
    Usage:

    const [isFormValid, setFormFieldValidity] = useFormValid(['email', 'password']);

    ...
    when field validity changes, you update it using setFormValidity
    <Input isValid={(bool) => setFormFieldValidity('email', bool)} />

    ...
    You can control eg. the submit button by using the isFormValid variable

    <Button enabled={isFormValid} />
*/

const useFormValid = (formFields: string[]) => {
  const initialValue = formFields.reduce(
    (obj, fieldName) => {
      return { ...obj, [fieldName]: false };
    },
    {} as { [key: string]: boolean }
  );

  const [formState, setFormState] = useState(initialValue);

  const setFormFieldValidity = (name: string, value: boolean) => {
    setFormState((previous) => ({ ...previous, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return Object.entries(formState).every((item) => item[1] === true);
  }, [formState]);

  return [isFormValid, setFormFieldValidity] as [boolean, typeof setFormFieldValidity];
};

export default useFormValid;
