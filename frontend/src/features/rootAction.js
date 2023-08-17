import { resetAuthState } from "./auth/authSlice";
import { resetLearnState } from "./learn/learnSlice";
import { resetLevelAssessmentState } from "./level-assessment/levelAssessmentSlice";
import { clearAsyncStorage } from "./auth/authThunks";

const logOut = () => (dispatch) => {
  dispatch(clearAsyncStorage());
  dispatch(resetAuthState());
  dispatch(resetLearnState());
  dispatch(resetLevelAssessmentState());
};

export default logOut;
