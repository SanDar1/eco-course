import UsersList from "../UsersListComponent/UsersList";
import Main from "../MainComponent/Main";
import Authorization from "../AuthorizationComponent/Authorization";
import GovernmentsList from "../GovernmentsListComponent/GovernmentsList";
import Profile from "../ProfileComponent/Profile";

import {
  ADMIN_DEPARTMENT_ROUTE,
  ADMIN_GOVERNMENT_ROUTE,
  ADMIN_LOGIN_ROUTE,
  ADMIN_REGISTER_ROUTE,
  GOVERNMENT_LOGIN_ROUTE,
  GOVERNMENT_REGISTER_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTER_ROUTE,
  USER_PROFILE, USER_VIOLATION,
  USERS_ROUTE
} from "../../utils/consts";
import Violation from "../ViolationComponent/Violation";
import DepartmentsList from "../DepartmentsListComponent/DepartmentsList";


export const authRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Authorization
  },
  {
    path: REGISTER_ROUTE,
    Component: Authorization
  },
  {
    path: GOVERNMENT_LOGIN_ROUTE,
    Component: Authorization
  },
  {
    path: GOVERNMENT_REGISTER_ROUTE,
    Component: Authorization
  },
  {
    path: ADMIN_LOGIN_ROUTE,
    Component: Authorization
  },
  {
    path: ADMIN_REGISTER_ROUTE,
    Component: Authorization
  },
]

export const adminRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: USERS_ROUTE,
    Component: UsersList
  },
  {
    path: ADMIN_GOVERNMENT_ROUTE,
    Component: GovernmentsList
  },
  {
    path: ADMIN_DEPARTMENT_ROUTE,
    Component: DepartmentsList
  },
]

export const governmentRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: USER_VIOLATION,
    Component: Violation
  },
  {
    path: USER_PROFILE,
    Component: Profile
  },
]

export const userRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: USER_PROFILE,
    Component: Profile
  },
  {
    path: USER_VIOLATION,
    Component: Violation
  },
]
