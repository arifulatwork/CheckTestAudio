import { type Dispatch, type SetStateAction } from 'react';

import { type BravoriTextBoxProps } from '.';

export const validateFn =
  (
    validation: BravoriTextBoxProps['validation'],
    setIsValid: Dispatch<SetStateAction<boolean>>,
    onValidate: BravoriTextBoxProps['onValidate']
  ) =>
  (val: string) => {
    if (!validation) {
      setIsValid(true);
      if (onValidate) onValidate(true);
      return;
    }

    let valid = false;
    if (typeof validation === 'function') {
      valid = validation(val);
    } else {
      valid = validation.test(val);
    }

    setIsValid(valid);
    if (onValidate) onValidate(valid);
  };
