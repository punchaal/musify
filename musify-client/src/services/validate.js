import { ValidatorForm} from 'react-material-ui-form-validator';
const Validate = {
  ERROR_LEN : "Password must be more than 6 characters",
  ERROR_LEN_BIO : "Bio must be less than 150 characters.",
  REQUIRED:"This field is required",
  INVALID_EMAIL:"Email is not valid",
  PASSWORD_MISMATCH: "The passwords do not match",
  ALPHA: "Name needs to be alphabetical",
  MIN_PASSWORD_LEN: 6,
  MAX_BIO_LEN: 150,
  // custom rule will have name 'isPasswordMatch'
  passwordMismatch(passwordCompare){
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== passwordCompare) {
          return false;
      }
      return true;
    });
  },

  //validation for min length
  minLengthCheck(l){
  ValidatorForm.addValidationRule('minLen', (value) => {
    if (value.length < l) {
        return false;
    }
    return true;
  });
  },

//validation for max length
//validation for min password length
maxLengthCheck(l){
  ValidatorForm.addValidationRule('maxLen', (value) => {
    if (value.length >= l) {
        return false;
    }
    return true;
  });
  }


}
  export default Validate