import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "@/redux/features/Auth/authSlice"
import SeasonReducer from '@/redux/features/seasons/seasonSlice'
import WorkoutReducer from '@/redux/features/workout/workoutSlice'
import AdminReducer from '@/redux/features/admin/adminSlice'
import CategoryReducer from '@/redux/features/category/categorySlice'
import DashboardReducer from '@/redux/features/dashboard/dashboardSlice'
import UserReducer from '@/redux/features/users/userSlice'
import TeamReducer from '@/redux/features/team/teamSlice'
import CommonReducer from '@/redux/features/common/commonSlice'
import ChallengeReducer from '@/redux/features/challenges/challengeSlices'
import ChallengeSubmissionReducer from '@/redux/features/challengesubmissions/challengeSubmissionSlice'
import WorkoutSubmissionReducer from '@/redux/features/workoutsubmissions/workoutSubmissionSlice'
import CouponsReducer from '@/redux/features/coupons/couponSlice'
import PaymentReducer from '@/redux/features/payments/paymentSlice'
import RankingReducer from '@/redux/features/rankings/rankingSlice'
import NotificationReducer from '@/redux/features/notifications/notificationSlice'
import EmailReducer from '@/redux/features/email/emailSlice'
import KettleBuckReducer from'@/redux/features/kettlebucks/kettlebuckSlice'
import submissionsUIReducer from '@/redux/features/submissions/submissionsSlice';
import AthleteSubmissionReducer from '@/redux/features/athletesubmissions/athleteSubmissionSlice'
import UploadVideosReducer from '@/redux/features/uploadvideos/uploadVideosSlice'

const rootReducer=combineReducers({
    
auth:AuthReducer,
season:SeasonReducer,
workout:WorkoutReducer,
admin:AdminReducer,
category:CategoryReducer,
dashboard:DashboardReducer,
users:UserReducer,
teams:TeamReducer,
common:CommonReducer,
challenge:ChallengeReducer,
challengeSubmissions:ChallengeSubmissionReducer,
workoutSubmissions:WorkoutSubmissionReducer,
coupons:CouponsReducer,
payments:PaymentReducer,
rankings:RankingReducer,
notifications:NotificationReducer,
email:EmailReducer,
kettlebucks:KettleBuckReducer,
submissionsUI: submissionsUIReducer,
athleteSubmissions:AthleteSubmissionReducer,
uploadVideos:UploadVideosReducer,


}
)


export default rootReducer