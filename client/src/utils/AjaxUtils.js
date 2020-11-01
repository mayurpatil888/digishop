import store from "src/store";
import {setAlert} from "src/actions/alerts";

const ajaxUtils = {
  showBackendErrors: (resp) => {
    const error = resp.data && resp.data.errors;
    if( Array.isArray(error)){
      error.forEach((e) => {
        store.dispatch(setAlert(e.msg, 'danger'));
      });
    } else {
      store.dispatch(setAlert(error.msg, 'danger'));
    }
  }
};

export default ajaxUtils;