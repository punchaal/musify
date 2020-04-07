import { ValidatorForm} from 'react-material-ui-form-validator';
const Validate = {
  ERROR_LEN : "Password must be more than 6 characters",
  REQUIRED:"This field is required",
  INVALID_EMAIL:"Email is not valid",
  PASSWORD_MISMATCH: "The passwords do not match",
  ALPHA: "Name needs to be alphabetical",
  // custom rule will have name 'isPasswordMatch'
  passwordMismatch(passwordCompare){
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== passwordCompare) {
          return false;
      }
      return true;
    });
  },

  //validation for min password length
  minLengthCheck(){
  ValidatorForm.addValidationRule('minLen', (value) => {
    if (value.length <= 6) {
        return false;
    }
    return true;
  });
  }
}
  export default Validate