// Import AuthType Enum
import AuthType from "./AuthType";

/** @notice Pre-Load all components for frequently used routes */
import WelcomeComponent from "@/views/Welcome.vue";
import LoginComponent from "@/views/Login.vue";

/**
 * @notice These routes uses lazy loading for the components
 *
 * route level code-splitting
 * this generates a separate chunk (about.[hash].js) for this route
 * which is lazy-loaded when the route is visited.
 */
const routes = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeComponent,
    meta: { Auth_requirements: AuthType.public_only }
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
    meta: { Auth_requirements: AuthType.public_only }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue"),
    meta: { Auth_requirements: AuthType.public_only }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
    meta: { Auth_requirements: AuthType.public }
  },
  {
    path: "/help",
    name: "help",
    component: () => import("@/views/Help.vue"),
    meta: { Auth_requirements: AuthType.public }
  }
];

export default routes;
